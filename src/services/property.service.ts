
import api from "@/lib/api";

// --------------------------------------------------
// Property Types
// --------------------------------------------------

export interface Property {
    id: string;
    title: string;
    description?: string | null;
    category: string;
    address: string;
    city: string;
    district: string;
    state?: string | null;
    pincode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    price: number | string;
    area: number;
    areaUnit?: string | null;
    status: string;
    isDeleted?: boolean;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt?: string;

    owner: {
        id: string;
        name: string;
        email?: string | null;
        phone: string;
        createdAt?: string;
        updatedAt?: string;
    };

    verification: {
        id: string;
        propertyId?: string;
        status: string;
        identityVerified: boolean;
        ownershipVerified: boolean;
        locationVerified: boolean;
        photosVerified: boolean;
        siteVisitCompleted: boolean;
        rejectionReason?: string | null;
        verifiedById?: string | null;
        verifiedAt?: string | null;
        createdAt?: string;
        updatedAt?: string;

        history?: VerificationHistory[];
    } | null;

    documents: PropertyDocument[];
}

export interface VerificationHistory {
    id: string;
    status: string;
    remarks?: string | null;
    changedById?: string | null;
    createdAt: string;
}

// --------------------------------------------------
// Property Update Types
// --------------------------------------------------

export interface UpdatePropertyPayload {
    owner?: {
        name?: string;
        email?: string | null;
        phone?: string;
    };

    property?: {
        title?: string;
        description?: string | null;
        category?: string;
        address?: string;
        city?: string;
        district?: string;
        pincode?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        price?: number;
        area?: number;
        areaUnit?: string;
    };
}

// --------------------------------------------------
// Document Types
// --------------------------------------------------

export type DocumentReviewStatus =
    | "PENDING"
    | "VERIFIED"
    | "REJECTED";

export interface PropertyDocument {
    id: string;
    propertyId: string;
    type: string;
    fileName: string;
    fileUrl?: string;
    publicId?: string;
    resourceType?: string;
    fileSize?: number | null;
    format?: string | null;
    reviewStatus: DocumentReviewStatus;
    reviewedById?: string | null;
    reviewedAt?: string | null;
    reviewRemarks?: string | null;
    createdAt: string;
    updatedAt?: string;
}

export interface UploadDocumentPayload {
    type: string;
    file: File;
}

export interface ReviewDocumentPayload {
    status: "VERIFIED" | "REJECTED";
    remarks?: string;
}

export interface DocumentAccess {
    url: string;
    fileName: string;
    format?: string;
}

// --------------------------------------------------
// Common Helpers
// --------------------------------------------------

function validateId(id: string, label: string): string {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!id || !uuidRegex.test(id)) {
        throw new Error(`Invalid ${label}. Please check the ID.`);
    }

    return encodeURIComponent(id);
}

function extractResponseData(response: any): any {
    return response.data?.data ?? response.data;
}

function extractPropertyList(response: any): Property[] {
    const result = extractResponseData(response);

    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result?.items)) {
        return result.items;
    }

    if (Array.isArray(result?.properties)) {
        return result.properties;
    }

    throw new Error("Unexpected properties response from server.");
}

// --------------------------------------------------
// Property APIs
// --------------------------------------------------

// Get all active properties
export async function getProperties(): Promise<Property[]> {
    const response = await api.get("/properties");

    return extractPropertyList(response);
}

// Get property by ID
export async function getPropertyById(
    id: string
): Promise<Property> {
    const propertyId = validateId(id, "property ID");

    const response = await api.get(
        `/properties/${propertyId}`
    );

    const result = extractResponseData(response);

    if (!result || typeof result !== "object" || !result.id) {
        throw new Error("Invalid property response from server.");
    }

    return result as Property;
}

// --------------------------------------------------
// Property Management APIs
// --------------------------------------------------

// Update property and owner details
export async function updateProperty(
    id: string,
    payload: UpdatePropertyPayload
): Promise<Property> {
    const propertyId = validateId(id, "property ID");

    if (!payload.owner && !payload.property) {
        throw new Error("Please provide property or owner details to update.");
    }

    const response = await api.patch(
        `/properties/${propertyId}`,
        payload
    );

    return extractResponseData(response) as Property;
}

// Soft delete property
export async function deleteProperty(
    id: string
): Promise<void> {
    const propertyId = validateId(id, "property ID");

    await api.delete(`/properties/${propertyId}`);
}

// Restore soft-deleted property
export async function restoreProperty(
    id: string
): Promise<Property> {
    const propertyId = validateId(id, "property ID");

    const response = await api.patch(
        `/properties/${propertyId}/restore`
    );

    return extractResponseData(response) as Property;
}

// Update site visit status
export async function updateSiteVisitStatus(
    id: string,
    completed: boolean
) {
    const propertyId = validateId(id, "property ID");

    const response = await api.patch(
        `/properties/${propertyId}/site-visit`,
        { completed }
    );

    return extractResponseData(response);
}

// --------------------------------------------------
// Property Verification
// --------------------------------------------------

export interface VerifyPropertyPayload {
    status: "PENDING" | "VERIFIED" | "REJECTED";
    remarks?: string;
    identityVerified?: boolean;
    ownershipVerified?: boolean;
    locationVerified?: boolean;
    photosVerified?: boolean;
    siteVisitCompleted?: boolean;
}

export async function updatePropertyVerification(
    id: string,
    payload: VerifyPropertyPayload
) {
    const propertyId = validateId(id, "property ID");

    const response = await api.patch(
        `/properties/${propertyId}/verification`,
        payload
    );

    return extractResponseData(response);
}

// --------------------------------------------------
// Property Document APIs
// --------------------------------------------------

// Upload document
export async function uploadPropertyDocument(
    propertyId: string,
    payload: UploadDocumentPayload
): Promise<PropertyDocument> {
    const validPropertyId = validateId(
        propertyId,
        "property ID"
    );

    if (!payload.file) {
        throw new Error("Please select a document to upload.");
    }

    if (!payload.type?.trim()) {
        throw new Error("Please select a document type.");
    }

    const formData = new FormData();

    formData.append("document", payload.file);
    formData.append("type", payload.type);

    const response = await api.post(
        `/properties/${validPropertyId}/documents`,
        formData
    );

    return extractResponseData(response) as PropertyDocument;
}

// Get documents belonging to a property
export async function getPropertyDocuments(
    propertyId: string
): Promise<PropertyDocument[]> {
    const validPropertyId = validateId(
        propertyId,
        "property ID"
    );

    const response = await api.get(
        `/properties/${validPropertyId}/documents`
    );

    const result = extractResponseData(response);

    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result?.documents)) {
        return result.documents;
    }

    return [];
}

// Get secure preview/download URL
export async function getDocumentAccess(
    documentId: string
): Promise<DocumentAccess> {
    const validDocumentId = validateId(
        documentId,
        "document ID"
    );

    const response = await api.get(
        `/documents/${validDocumentId}/access`
    );

    const result = extractResponseData(response);

    if (!result?.url) {
        throw new Error("Document access URL was not returned.");
    }

    return result as DocumentAccess;
}

// Verify or reject document
export async function reviewPropertyDocument(
    documentId: string,
    payload: ReviewDocumentPayload
): Promise<PropertyDocument> {
    const validDocumentId = validateId(
        documentId,
        "document ID"
    );

    if (
        payload.status === "REJECTED" &&
        !payload.remarks?.trim()
    ) {
        throw new Error("Please provide a rejection reason.");
    }

    const response = await api.patch(
        `/documents/${validDocumentId}/verification`,
        payload
    );

    return extractResponseData(response) as PropertyDocument;
}

// Delete document
export async function deletePropertyDocument(
    documentId: string
): Promise<void> {
    const validDocumentId = validateId(
        documentId,
        "document ID"
    );

    await api.delete(
        `/documents/${validDocumentId}`
    );
}
