
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getPropertyById,
  getPropertyDocuments,
  uploadPropertyDocument,
  getDocumentAccess,
  reviewPropertyDocument,
  deletePropertyDocument,
  updatePropertyVerification,
  type Property,
  type PropertyDocument,
  type VerifyPropertyPayload,
} from "@/services/property.service";

import { getApiErrorMessage } from "@/lib/validations/api-error";

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

function formatPrice(value: string | number) {
  const amount = Number(value);

  if (Number.isNaN(amount)) return String(value);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status?: string }) {
  const styles: Record<string, string> = {
    VERIFIED: "bg-green-50 text-green-700",
    PENDING: "bg-yellow-50 text-yellow-700",
    VERIFICATION: "bg-blue-50 text-blue-700",
    IN_REVIEW: "bg-blue-50 text-blue-700",
    REJECTED: "bg-red-50 text-red-700",
    ON_HOLD: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status?.toUpperCase() ?? ""] ??
        "bg-gray-100 text-gray-600"
        }`}
    >
      {status ?? "UNKNOWN"}
    </span>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-[#172B35]">
        {value === null || value === undefined || value === ""
          ? "—"
          : value}
      </p>
    </div>
  );
}

const verificationItems = [
  { key: "identityVerified", label: "Identity Verification" },
  { key: "ownershipVerified", label: "Ownership Verification" },
  { key: "locationVerified", label: "Location Verification" },
  { key: "photosVerified", label: "Property Photos Verification" },
  { key: "siteVisitCompleted", label: "Site Visit Completed" },
] as const;

const documentTypes = [
  { value: "OWNER_ID", label: "Owner ID" },
  { value: "OWNERSHIP_DEED", label: "Ownership Deed" },
  { value: "TAX_RECEIPT", label: "Tax Receipt" },
  { value: "PROPERTY_PHOTO", label: "Property Photo" },
  { value: "LOCATION_PROOF", label: "Location Proof" },
  { value: "OTHER", label: "Other" },
];

function formatFileSize(bytes?: number | null) {
  if (!bytes) return "—";

  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isImageDocument(document: PropertyDocument) {
  const format = document.format?.toLowerCase();

  return ["jpg", "jpeg", "png", "webp"].includes(format ?? "");
}

function isPdfDocument(document: PropertyDocument) {
  return document.format?.toLowerCase() === "pdf";
}

export default function PropertyDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const propertyId =
    typeof params?.id === "string" ? params.id : "";

  const [property, setProperty] = useState<Property | null>(null);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] =
    useState("OWNER_ID");
  const [uploading, setUploading] = useState(false);

  // Document action state
  const [actionDocumentId, setActionDocumentId] =
    useState<string | null>(null);

  // Rejection state
  const [rejectingDocumentId, setRejectingDocumentId] =
    useState<string | null>(null);
  const [rejectionRemarks, setRejectionRemarks] = useState("");

  // Preview state
  const [previewDocument, setPreviewDocument] =
    useState<PropertyDocument | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");

  // Site visit confirmation modal state
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [siteVisitSaving, setSiteVisitSaving] = useState(false);

  const loadProperty = useCallback(
    async (isRefresh = false) => {
      if (
        !propertyId ||
        propertyId === "undefined" ||
        propertyId === "null"
      ) {
        setProperty(null);
        setDocuments([]);
        setError("Invalid property ID. Please open a valid property.");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const propertyData = await getPropertyById(propertyId);

        setProperty(propertyData);

        try {
          const documentData = await getPropertyDocuments(propertyId);
          setDocuments(documentData);
        } catch (documentError) {
          setDocuments([]);

          setError(
            getApiErrorMessage(
              documentError,
              "Property loaded, but documents could not be loaded."
            )
          );
        }
      } catch (propertyError) {
        setProperty(null);
        setDocuments([]);

        setError(
          getApiErrorMessage(
            propertyError,
            "Unable to load property."
          )
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [propertyId]
  );

  useEffect(() => {
    void loadProperty();
  }, [loadProperty]);

  // Upload property document
  async function handleUpload() {
    if (!propertyId) {
      setError("Invalid property ID.");
      return;
    }

    if (!selectedFile) {
      setError("Please select a document.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      await uploadPropertyDocument(propertyId, {
        type: selectedDocumentType,
        file: selectedFile,
      });

      setSelectedFile(null);

      const fileInput = document.getElementById(
        "document-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      setSuccess("Document uploaded successfully.");

      await loadProperty(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to upload document.")
      );
    } finally {
      setUploading(false);
    }
  }

  // Preview document
  async function handlePreview(document: PropertyDocument) {
    setPreviewDocument(document);
    setPreviewUrl("");
    setPreviewError("");
    setPreviewLoading(true);

    try {
      const access = await getDocumentAccess(document.id);
      setPreviewUrl(access.url);
    } catch (err) {
      setPreviewError(
        getApiErrorMessage(err, "Unable to preview document.")
      );
    } finally {
      setPreviewLoading(false);
    }
  }

  // Verify individual document
  async function handleVerify(documentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to verify this document?"
    );

    if (!confirmed) return;

    setActionDocumentId(documentId);
    setError("");
    setSuccess("");

    try {
      await reviewPropertyDocument(documentId, {
        status: "VERIFIED",
      });

      setSuccess("Document verified successfully.");

      await loadProperty(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to verify document.")
      );
    } finally {
      setActionDocumentId(null);
    }
  }

  // Reject individual document
  async function handleReject(documentId: string) {
    if (!rejectionRemarks.trim()) {
      setError("Please enter a rejection reason.");
      return;
    }

    setActionDocumentId(documentId);
    setError("");
    setSuccess("");

    try {
      await reviewPropertyDocument(documentId, {
        status: "REJECTED",
        remarks: rejectionRemarks.trim(),
      });

      setRejectingDocumentId(null);
      setRejectionRemarks("");

      setSuccess("Document rejected successfully.");

      await loadProperty(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to reject document.")
      );
    } finally {
      setActionDocumentId(null);
    }
  }

  // Delete individual document
  async function handleDelete(documentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document? This action cannot be undone."
    );

    if (!confirmed) return;

    setActionDocumentId(documentId);
    setError("");
    setSuccess("");

    try {
      await deletePropertyDocument(documentId);

      setSuccess("Document deleted successfully.");

      await loadProperty(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to delete document.")
      );
    } finally {
      setActionDocumentId(null);
    }
  }

  // Confirm physical site visit
  async function handleSiteVisitConfirmation() {
    if (!propertyId || !property) {
      setError("Invalid property ID.");
      return;
    }

    if (property.verification?.siteVisitCompleted) {
      setShowSiteVisitModal(false);
      return;
    }

    setSiteVisitSaving(true);
    setError("");
    setSuccess("");

    try {
      const verification = property.verification;
      const currentStatus: VerifyPropertyPayload["status"] =
        verification?.status === "PENDING" ||
          verification?.status === "VERIFIED" ||
          verification?.status === "REJECTED"
          ? verification.status
          : "PENDING";

      const payload: VerifyPropertyPayload = {
        // Preserve the current status.
        status: currentStatus,

        identityVerified: verification?.identityVerified ?? false,
        ownershipVerified: verification?.ownershipVerified ?? false,
        locationVerified: verification?.locationVerified ?? false,
        photosVerified: verification?.photosVerified ?? false,

        siteVisitCompleted: true,
      };

      await updatePropertyVerification(propertyId, payload);

      setShowSiteVisitModal(false);
      setSuccess("Physical site visit confirmed successfully.");

      await loadProperty(true);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          "Unable to confirm the site visit."
        )
      );
    } finally {
      setSiteVisitSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#8A6A32] border-t-transparent" />

        <p className="text-sm font-medium text-gray-500">
          Loading property details...
        </p>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
        <p className="text-sm font-medium text-red-600">{error}</p>

        {propertyId && (
          <button
            onClick={() => void loadProperty()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#172B35] px-5 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        )}

        <button
          onClick={() => router.back()}
          className="ml-3 mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
        Property not found.
      </div>
    );
  }

  const verification = property.verification;

  const completedChecks = verification
    ? verificationItems.filter((item) => verification[item.key]).length
    : 0;

  const progress =
    (completedChecks / verificationItems.length) * 100;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-3 text-sm font-medium text-[#8A6A32] hover:underline"
          >
            ← Back to Properties
          </button>

          <h1 className="text-2xl font-bold text-[#172B35]">
            Property Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review property information, documents and verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={property.status} />

          <button
            onClick={() => void loadProperty(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50"
          >
            {refreshing ? (
              <>
                <Spinner />
                Refreshing...
              </>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Property Overview */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {property.category}
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#172B35]">
              {property.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {property.address}, {property.city}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Property Price</p>

            <p className="mt-1 text-2xl font-bold text-[#8A6A32]">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="mb-2 text-sm font-semibold text-[#172B35]">
            Description
          </p>

          <p className="text-sm leading-6 text-gray-600">
            {property.description || "No description available."}
          </p>
        </div>

        <div className="mt-6 grid gap-5 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem label="Category" value={property.category} />

          <DetailItem
            label="Property Area"
            value={`${property.area} ${property.areaUnit ?? ""}`}
          />

          <DetailItem label="Property ID" value={property.id} />

          <DetailItem
            label="Submitted Date"
            value={formatDate(property.createdAt)}
          />
        </div>
      </div>

      {/* Owner and Location */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 font-semibold text-[#172B35]">
            Owner Information
          </h2>

          <div className="space-y-5">
            <DetailItem
              label="Owner Name"
              value={property.owner?.name}
            />

            <DetailItem
              label="Email Address"
              value={property.owner?.email}
            />

            <DetailItem
              label="Phone Number"
              value={property.owner?.phone}
            />

            <DetailItem
              label="Owner ID"
              value={property.owner?.id}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 font-semibold text-[#172B35]">
            Location Information
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <DetailItem label="Address" value={property.address} />
            <DetailItem label="City" value={property.city} />
            <DetailItem label="District" value={property.district} />
            <DetailItem label="State" value={property.state} />
            <DetailItem label="Pincode" value={property.pincode} />

            <DetailItem
              label="Coordinates"
              value={
                property.latitude != null &&
                  property.longitude != null
                  ? `${property.latitude}, ${property.longitude}`
                  : null
              }
            />
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-[#172B35]">
              Verification Checklist
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review the verification checks completed by Operations.
            </p>
          </div>

          <StatusBadge status={verification?.status ?? "PENDING"} />
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Verification progress</span>

            <span>
              {completedChecks}/{verificationItems.length} completed
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {verificationItems.map((item) => {
            const completed = verification?.[item.key] ?? false;
            const isSiteVisit = item.key === "siteVisitCompleted";

            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    {item.label}
                  </p>

                  {isSiteVisit && (
                    <p className="mt-1 text-xs text-gray-400">
                      Confirm after physically visiting the property.
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${completed
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                      }`}
                  >
                    {completed ? "Verified" : "Pending"}
                  </span>

                  {/* Small button beside Site Visit only */}
                  {isSiteVisit && !completed && (
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setSuccess("");
                        setShowSiteVisitModal(true);
                      }}
                      disabled={siteVisitSaving}
                      className="rounded-md bg-[#172B35] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#263f4b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rejection reason */}
        {verification?.rejectionReason && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Rejection Reason
            </p>

            <p className="mt-1 text-sm text-red-600">
              {verification.rejectionReason}
            </p>
          </div>
        )}

        <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
          <DetailItem
            label="Verified At"
            value={formatDate(verification?.verifiedAt)}
          />

          <DetailItem
            label="Last Updated"
            value={formatDate(property.updatedAt)}
          />
        </div>
      </div>

      {/* Upload Property Document */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-[#172B35]">
          Upload Property Document
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload supporting documents for this property.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="document-type"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Document Type
            </label>

            <select
              id="document-type"
              value={selectedDocumentType}
              onChange={(event) =>
                setSelectedDocumentType(event.target.value)
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="document-file"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Select File
            </label>

            <input
              id="document-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-medium"
            />

            <p className="mt-1 text-xs text-gray-400">
              PDF, JPG, PNG or WEBP. Maximum 10 MB.
            </p>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => void handleUpload()}
              disabled={!selectedFile || uploading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#172B35] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Spinner />
                  Uploading...
                </>
              ) : (
                "Upload Document"
              )}
            </button>
          </div>
        </div>

        {selectedFile && (
          <p className="mt-3 text-xs text-gray-500">
            Selected: {selectedFile.name} (
            {formatFileSize(selectedFile.size)})
          </p>
        )}
      </div>

      {/* Property Documents */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-[#172B35]">
              Property Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Preview, review and manage uploaded documents.
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {documents.length} Documents
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-gray-200 p-8 text-center">
            <p className="text-sm font-medium text-gray-600">
              No documents uploaded
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Uploaded documents will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-5 divide-y divide-gray-100">
            {documents.map((document) => {
              const busy = actionDocumentId === document.id;

              return (
                <div key={document.id} className="py-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-semibold text-[#172B35]">
                        {document.fileName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {document.type.replaceAll("_", " ")}
                        {" · "}
                        {formatFileSize(document.fileSize)}
                        {" · "}
                        {formatDate(document.createdAt)}
                      </p>

                      <div className="mt-3">
                        <StatusBadge status={document.reviewStatus} />
                      </div>

                      {document.reviewRemarks && (
                        <div className="mt-3 rounded-lg bg-red-50 p-3">
                          <p className="text-xs font-semibold text-red-700">
                            Review Remarks
                          </p>

                          <p className="mt-1 text-sm text-red-600">
                            {document.reviewRemarks}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => void handlePreview(document)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#172B35] hover:bg-gray-50"
                      >
                        Preview
                      </button>

                      {document.reviewStatus !== "VERIFIED" && (
                        <>
                          <button
                            onClick={() => void handleVerify(document.id)}
                            disabled={busy}
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            {busy ? <Spinner /> : "Verify"}
                          </button>

                          <button
                            onClick={() => {
                              setError("");
                              setRejectingDocumentId(document.id);
                              setRejectionRemarks("");
                            }}
                            disabled={busy}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => void handleDelete(document.id)}
                        disabled={busy}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Document rejection form */}
                  {rejectingDocumentId === document.id && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Rejection Reason
                      </label>

                      <textarea
                        value={rejectionRemarks}
                        onChange={(event) =>
                          setRejectionRemarks(event.target.value)
                        }
                        rows={3}
                        maxLength={1000}
                        placeholder="Explain why this document is rejected..."
                        className="w-full rounded-lg border border-red-200 bg-white p-3 text-sm outline-none focus:border-red-400"
                      />

                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setRejectingDocumentId(null);
                            setRejectionRemarks("");
                          }}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => void handleReject(document.id)}
                          disabled={!rejectionRemarks.trim() || busy}
                          className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          {busy ? <Spinner /> : "Confirm Rejection"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onClick={() => {
            setPreviewDocument(null);
            setPreviewUrl("");
            setPreviewError("");
          }}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-[#172B35]">
                  {previewDocument.fileName}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {previewDocument.type.replaceAll("_", " ")}
                </p>
              </div>

              <button
                onClick={() => {
                  setPreviewDocument(null);
                  setPreviewUrl("");
                  setPreviewError("");
                }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Close ✕
              </button>
            </div>

            <div className="min-h-[60vh] flex-1 overflow-auto bg-gray-100 p-3">
              {previewLoading ? (
                <div className="flex min-h-[50vh] items-center justify-center gap-3 text-sm text-gray-500">
                  <Spinner />
                  Loading document...
                </div>
              ) : previewError ? (
                <div className="flex min-h-[50vh] items-center justify-center text-sm text-red-600">
                  {previewError}
                </div>
              ) : previewUrl && isImageDocument(previewDocument) ? (
                <div className="flex min-h-[50vh] items-center justify-center">
                  <img
                    src={previewUrl}
                    alt={previewDocument.fileName}
                    className="max-h-[70vh] max-w-full rounded-lg object-contain"
                  />
                </div>
              ) : previewUrl && isPdfDocument(previewDocument) ? (
                <iframe
                  src={previewUrl}
                  title={previewDocument.fileName}
                  className="h-[70vh] w-full rounded-lg bg-white"
                />
              ) : previewUrl ? (
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
                  <p className="text-sm text-gray-600">
                    Preview is not available for this file type.
                  </p>

                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#172B35] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Open Document
                  </a>
                </div>
              ) : null}
            </div>

            {previewUrl && (
              <div className="flex justify-end border-t border-gray-200 p-3">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#172B35] px-4 py-2 text-sm font-semibold text-white"
                >
                  Open / Download
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Site Visit Confirmation Modal */}
      {showSiteVisitModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!siteVisitSaving) {
              setShowSiteVisitModal(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-visit-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f0e5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8A6A32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <h2
              id="site-visit-title"
              className="text-lg font-bold text-[#172B35]"
            >
              Confirm Site Visit
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Have you physically visited this property and completed
              the site inspection?
            </p>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs leading-5 text-amber-800">
                Only confirm if the physical site visit has actually
                been completed. This action will mark the Site Visit
                Completed checklist item as verified.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSiteVisitModal(false)}
                disabled={siteVisitSaving}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleSiteVisitConfirmation()}
                disabled={siteVisitSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#172B35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#263f4b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {siteVisitSaving ? (
                  <>
                    <Spinner />
                    Confirming...
                  </>
                ) : (
                  "Confirm Site Visit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
