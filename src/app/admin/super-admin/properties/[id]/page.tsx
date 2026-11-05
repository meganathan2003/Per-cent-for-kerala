
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
  uploadPropertyDocument,
  getPropertyDocuments,
  getDocumentAccess,
  reviewPropertyDocument,
  deletePropertyDocument,
  type Property,
  type PropertyDocument,
  type UpdatePropertyPayload,
} from "@/services/property.service";
import { getApiErrorMessage } from "@/lib/validations/api-error";

const DOCUMENT_TYPES = [
  "OWNER_ID",
  "OWNERSHIP_DEED",
  "TAX_RECEIPT",
  "PROPERTY_PHOTO",
  "LOCATION_PROOF",
  "OTHER",
];

function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status?: string }) {
  const value = status?.toUpperCase() ?? "UNKNOWN";

  const styles: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700",
    IN_REVIEW: "bg-blue-50 text-blue-700",
    UNDER_REVIEW: "bg-blue-50 text-blue-700",
    VERIFIED: "bg-green-50 text-green-700",
    VERIFICATION: "bg-blue-50 text-blue-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
    SUBMITTED: "bg-purple-50 text-purple-700",
    ON_HOLD: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[value] ?? "bg-gray-100 text-gray-600"
        }`}
    >
      {status ?? "Unknown"}
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
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="break-words text-sm font-medium text-[#172B35]">
        {value !== undefined && value !== null && value !== ""
          ? String(value)
          : "—"}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold text-[#172B35]">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function PropertyDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [documentType, setDocumentType] = useState("OWNER_ID");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "RESIDENTIAL",
    address: "",
    city: "",
    district: "",
    pincode: "",
    price: "",
    area: "",
    areaUnit: "sqft",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const loadProperty = useCallback(async () => {
    const data = await getPropertyById(params.id);

    setProperty(data);

    setForm({
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "RESIDENTIAL",
      address: data.address ?? "",
      city: data.city ?? "",
      district: data.district ?? "",
      pincode: data.pincode ?? "",
      price: String(data.price ?? ""),
      area: String(data.area ?? ""),
      areaUnit: data.areaUnit ?? "sqft",
      ownerName: data.owner?.name ?? "",
      ownerEmail: data.owner?.email ?? "",
      ownerPhone: data.owner?.phone ?? "",
    });

    const documentList = await getPropertyDocuments(params.id);
    setDocuments(documentList);
  }, [params.id]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getPropertyById(params.id);

        if (!active) return;

        setProperty(data);

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          category: data.category ?? "RESIDENTIAL",
          address: data.address ?? "",
          city: data.city ?? "",
          district: data.district ?? "",
          pincode: data.pincode ?? "",
          price: String(data.price ?? ""),
          area: String(data.area ?? ""),
          areaUnit: data.areaUnit ?? "sqft",
          ownerName: data.owner?.name ?? "",
          ownerEmail: data.owner?.email ?? "",
          ownerPhone: data.owner?.phone ?? "",
        });

        const documentList = await getPropertyDocuments(params.id);

        if (active) {
          setDocuments(documentList);
        }
      } catch (err) {
        if (active) {
          setError(
            getApiErrorMessage(err, "Unable to load property.")
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [params.id]);

  function updateForm(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleUpdateProperty() {
    if (!property) return;

    const payload: UpdatePropertyPayload = {
      owner: {
        name: form.ownerName.trim(),
        email: form.ownerEmail.trim() || null,
        phone: form.ownerPhone.trim(),
      },
      property: {
        title: form.title.trim(),
        description: form.description.trim() || null,
        category: form.category,
        address: form.address.trim(),
        city: form.city.trim(),
        district: form.district.trim(),
        pincode: form.pincode.trim() || null,
        price: Number(form.price),
        area: Number(form.area),
        areaUnit: form.areaUnit,
      },
    };

    if (
      !payload.property?.title ||
      !payload.property.address ||
      !payload.property.city ||
      !payload.owner?.name ||
      !payload.owner.phone ||
      !Number.isFinite(payload.property?.price) ||
      (payload.property?.price ?? 0) <= 0 ||
      !Number.isFinite(payload.property?.area) ||
      (payload.property?.area ?? 0) <= 0
    ) {
      setError("Please enter valid property and owner details.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const updated = await updateProperty(property.id, payload);

      setProperty(updated);
      setEditOpen(false);
      await loadProperty();

      setMessage("Property details updated successfully.");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to update property.")
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadDocument() {
    if (!selectedFile) {
      setError("Please select a document.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      await uploadPropertyDocument(params.id, {
        type: documentType,
        file: selectedFile,
      });

      setSelectedFile(null);

      const input = document.getElementById(
        "property-document-input"
      ) as HTMLInputElement | null;

      if (input) input.value = "";

      await loadProperty();

      setMessage("Document uploaded successfully.");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to upload document.")
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDocumentAccess(
    documentId: string,
    download: boolean
  ) {
    setActionLoading(documentId);
    setError("");

    try {
      const access = await getDocumentAccess(documentId);

      if (download) {
        const link = document.createElement("a");
        link.href = access.url;
        link.download = access.fileName || "document";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        window.open(
          access.url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to access document.")
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDocumentReview(
    documentId: string,
    status: "VERIFIED" | "REJECTED"
  ) {
    const reason = remarks[documentId]?.trim();

    if (status === "REJECTED" && !reason) {
      setError("Please provide a rejection reason.");
      return;
    }

    setActionLoading(documentId);
    setError("");
    setMessage("");

    try {
      await reviewPropertyDocument(documentId, {
        status,
        remarks: reason,
      });

      await loadProperty();

      setMessage(
        status === "VERIFIED"
          ? "Document verified successfully."
          : "Document rejected successfully."
      );
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to review document.")
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteDocument(documentId: string) {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    setActionLoading(documentId);
    setError("");
    setMessage("");

    try {
      await deletePropertyDocument(documentId);
      await loadProperty();
      setMessage("Document deleted successfully.");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to delete document.")
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteProperty() {
    if (!property) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this property? It will be soft deleted."
    );

    if (!confirmed) return;

    setActionLoading("property");
    setError("");

    try {
      await deleteProperty(property.id);
      router.push("/admin/super-admin/properties");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to delete property.")
      );
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="text-sm text-[#8A6A32]">
          ← Back
        </button>
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!property) {
    return <div className="rounded-xl bg-white p-8 text-center">Property not found.</div>;
  }

  return (
    <section className="space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm font-semibold text-[#8A6A32] hover:underline"
      >
        ← Back to Properties
      </button>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#172B35]">
              {property.title}
            </h1>
            <StatusBadge status={property.status} />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {property.city}, {property.district}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="rounded-lg bg-[#172B35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#263f4c]"
          >
            Edit Property
          </button>

          <button
            onClick={handleDeleteProperty}
            disabled={actionLoading === "property"}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {actionLoading === "property" ? "Deleting..." : "Delete Property"}
          </button>
        </div>
      </div>

      {/* Property and Owner */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Section title="Property Information">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Property Title" value={property.title} />
              <DetailItem label="Category" value={property.category} />
              <DetailItem label="Price" value={`₹${Number(property.price).toLocaleString("en-IN")}`} />
              <DetailItem label="Area" value={`${property.area} ${property.areaUnit ?? "sqft"}`} />
              <DetailItem label="City" value={property.city} />
              <DetailItem label="District" value={property.district} />
              <DetailItem label="State" value={property.state} />
              <DetailItem label="Pincode" value={property.pincode} />
              <DetailItem label="Created At" value={formatDate(property.createdAt)} />
            </div>

            <div className="mt-5 border-t pt-5">
              <DetailItem label="Full Address" value={property.address} />
              {property.description && (
                <div className="mt-4">
                  <DetailItem label="Description" value={property.description} />
                </div>
              )}
            </div>
          </Section>

          <Section title="Verification Details">
            {property.verification ? (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-gray-500">Verification status</p>
                  <StatusBadge status={property.verification.status} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {([
                    ["Identity Verified", property.verification.identityVerified],
                    ["Ownership Verified", property.verification.ownershipVerified],
                    ["Location Verified", property.verification.locationVerified],
                    ["Photos Verified", property.verification.photosVerified],
                    ["Site Visit Completed", property.verification.siteVisitCompleted],
                  ] as [string, boolean][]).map(([label, completed]) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`text-sm font-semibold ${completed ? "text-green-600" : "text-yellow-600"}`}>
                        {completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t pt-4">
                  <h3 className="mb-3 text-sm font-semibold text-[#172B35]">Verification History</h3>

                  {property.verification.history?.length ? (
                    <div className="space-y-3">
                      {property.verification.history.map((item) => (
                        <div key={item.id} className="rounded-lg border p-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <StatusBadge status={item.status} />
                            <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {item.remarks || "No remarks"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No verification history available.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">No verification record available.</p>
            )}
          </Section>
        </div>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-5 font-semibold text-[#172B35]">Owner Information</h2>

          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F0E8] text-lg font-bold text-[#8A6A32]">
            {property.owner?.name?.charAt(0)?.toUpperCase() ?? "O"}
          </div>

          <div className="space-y-5">
            <DetailItem label="Owner Name" value={property.owner?.name} />
            <DetailItem label="Phone Number" value={property.owner?.phone} />
            <DetailItem label="Email Address" value={property.owner?.email} />
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-[#172B35] hover:bg-gray-50"
          >
            Edit Owner Details
          </button>
        </div>
      </div>

      {/* Documents */}
      <Section title={`Property Documents (${documents.length})`}>
        <div className="mb-6 grid gap-3 rounded-lg bg-gray-50 p-4 md:grid-cols-[1fr_1fr_auto]">
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            {DOCUMENT_TYPES.map((type) => (
              <option key={type} value={type}>{type.replace(/_/g, " ")}</option>
            ))}
          </select>

          <input
            id="property-document-input"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          />

          <button
            onClick={handleUploadDocument}
            disabled={uploading || !selectedFile}
            className="rounded-lg bg-[#172B35] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {documents.length ? (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-all text-sm font-semibold text-[#172B35]">
                      {doc.fileName}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {doc.type.replace(/_/g, " ")} · {formatDate(doc.createdAt)}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={doc.reviewStatus} />
                    </div>
                    {doc.reviewRemarks && (
                      <p className="mt-2 text-sm text-gray-500">
                        Remarks: {doc.reviewRemarks}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={actionLoading === doc.id}
                      onClick={() => handleDocumentAccess(doc.id, false)}
                      className="rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50"
                    >
                      Preview
                    </button>

                    <button
                      disabled={actionLoading === doc.id}
                      onClick={() => handleDocumentAccess(doc.id, true)}
                      className="rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50"
                    >
                      Download
                    </button>

                    {doc.reviewStatus === "PENDING" && (
                      <>
                        <button
                          disabled={actionLoading === doc.id}
                          onClick={() => handleDocumentReview(doc.id, "VERIFIED")}
                          className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Verify
                        </button>

                        <button
                          disabled={actionLoading === doc.id}
                          onClick={() => handleDocumentReview(doc.id, "REJECTED")}
                          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      disabled={actionLoading === doc.id}
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {doc.reviewStatus === "PENDING" && (
                  <input
                    value={remarks[doc.id] ?? ""}
                    onChange={(e) => setRemarks((prev) => ({
                      ...prev,
                      [doc.id]: e.target.value,
                    }))}
                    placeholder="Rejection remarks (required when rejecting)"
                    className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#8A6A32]"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">
            No documents uploaded yet.
          </p>
        )}
      </Section>

      {/* Edit Modal */}
      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !saving && setEditOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-property-title"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="edit-property-title" className="text-lg font-bold text-[#172B35]">
                Edit Property & Owner
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                disabled={saving}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#8A6A32]">Property Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {([
                    ["title", "Property Title"],
                    ["city", "City"],
                    ["district", "District"],
                    ["address", "Address"],
                    ["pincode", "Pincode"],
                    ["price", "Price"],
                    ["area", "Area"],
                    ["areaUnit", "Area Unit"],
                  ] as [keyof typeof form, string][]).map(([key, label]) => (
                    <label key={key} className="space-y-1">
                      <span className="text-xs font-medium text-gray-500">{label}</span>
                      <input
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#8A6A32]"
                      />
                    </label>
                  ))}

                  <label className="space-y-1">
                    <span className="text-xs font-medium text-gray-500">Category</span>
                    <select
                      value={form.category}
                      onChange={(e) => updateForm("category", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      {["RESIDENTIAL", "COMMERCIAL", "LAND", "VILLA", "APARTMENT", "ESTATE"].map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-medium text-gray-500">Description</span>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              </div>

              <div className="border-t pt-5">
                <h3 className="mb-4 text-sm font-semibold text-[#8A6A32]">Owner Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {([
                    ["ownerName", "Owner Name"],
                    ["ownerPhone", "Phone Number"],
                    ["ownerEmail", "Email Address"],
                  ] as [keyof typeof form, string][]).map(([key, label]) => (
                    <label key={key} className="space-y-1">
                      <span className="text-xs font-medium text-gray-500">{label}</span>
                      <input
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                disabled={saving}
                className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProperty}
                disabled={saving}
                className="rounded-lg bg-[#172B35] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
