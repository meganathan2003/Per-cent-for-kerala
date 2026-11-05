
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface PropertyVerification {
  id: string;
  status: string;
  identityVerified: boolean;
  ownershipVerified: boolean;
  locationVerified: boolean;
  photosVerified: boolean;
  siteVisitCompleted: boolean;
  rejectionReason: string | null;
  verifiedAt: string | null;
}

interface PropertyDocument {
  id: string;
  name?: string;
  type?: string;
  status?: string;
}

interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  price: string;
  area: number;
  areaUnit: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  owner: PropertyOwner;
  verification: PropertyVerification | null;
  documents: PropertyDocument[];
}

function getProperties(response: any): Property[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.properties)) return data.properties;

  return [];
}

function formatPrice(price: string | number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function getStatusClass(status?: string) {
  switch (status?.toUpperCase()) {
    case "APPROVED":
      return "bg-green-50 text-green-700";
    case "VERIFIED":
      return "bg-emerald-50 text-emerald-700";
    case "PENDING":
      return "bg-yellow-50 text-yellow-700";
    case "UNDER_VERIFICATION":
      return "bg-blue-50 text-blue-700";
    case "REJECTED":
      return "bg-red-50 text-red-700";
    case "SUBMITTED_FOR_APPROVAL":
      return "bg-purple-50 text-purple-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function StatusBadge({ status }: { status?: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(status)}`}
    >
      {status?.replace(/_/g, " ") ?? "UNKNOWN"}
    </span>
  );
}

function Spinner({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${size === "lg" ? "h-8 w-8" : "h-4 w-4"
        }`}
    />
  );
}

export default function PropertiesPage() {
  const router = useRouter();

  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [navigatingPropertyId, setNavigatingPropertyId] = useState<
    string | null
  >(null);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await api.get("/properties");
      setItems(getProperties(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load properties.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleViewDetails = (propertyId: string) => {
    setNavigatingPropertyId(propertyId);

    router.push(
      `/admin/super-admin/properties/${propertyId}`
    );
  };

  const filteredProperties = useMemo(() => {
    return items.filter((property) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        property.title,
        property.owner?.name,
        property.owner?.email,
        property.owner?.phone,
        property.city,
        property.district,
        property.category,
        property.pincode,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(searchValue)
      );

      const matchesStatus =
        statusFilter === "ALL" ||
        property.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const pendingCount = items.filter((property) =>
    ["PENDING", "UNDER_VERIFICATION", "SUBMITTED_FOR_APPROVAL"].includes(
      property.status?.toUpperCase()
    )
  ).length;

  const verifiedCount = items.filter(
    (property) => property.status?.toUpperCase() === "VERIFIED"
  ).length;

  const approvedCount = items.filter(
    (property) => property.status?.toUpperCase() === "APPROVED"
  ).length;

  const rejectedCount = items.filter(
    (property) => property.status?.toUpperCase() === "REJECTED"
  ).length;

  return (
    <section className="space-y-6">

      {/* Navigation Loading Overlay */}
      {navigatingPropertyId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="flex min-w-[220px] flex-col items-center gap-3 rounded-xl bg-white p-8 shadow-xl">
            <Spinner size="lg" />
            <p className="text-sm font-semibold text-[#172B35]">
              Opening property details...
            </p>
            <p className="text-xs text-gray-400">
              Please wait
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Properties
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor all platform properties and their verification status.
          </p>
        </div>

        <button
          onClick={() => void load(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          {
            label: "Total Properties",
            count: items.length,
            color: "text-[#172B35]",
          },
          {
            label: "Pending Review",
            count: pendingCount,
            color: "text-yellow-600",
          },
          {
            label: "Verified",
            count: verifiedCount,
            color: "text-emerald-600",
          },
          {
            label: "Approved",
            count: approvedCount,
            color: "text-green-600",
          },
          {
            label: "Rejected",
            count: rejectedCount,
            color: "text-red-600",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <h2 className={`mt-2 text-2xl font-bold ${card.color}`}>
              {card.count}
            </h2>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search property, owner, phone or location..."
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="UNDER_VERIFICATION">Under Verification</option>
          <option value="VERIFIED">Verified</option>
          <option value="SUBMITTED_FOR_APPROVAL">
            Submitted for Approval
          </option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Properties Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#172B35]">
            All Property Records
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Showing {filteredProperties.length} of {items.length} properties
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <Spinner size="lg" />
            <p className="text-sm font-medium text-gray-500">
              Loading properties...
            </p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium text-gray-700">
              No properties found
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Owner</th>
                  <th className="px-5 py-4 font-medium">Location</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Verification</th>
                  <th className="px-5 py-4 font-medium">Documents</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProperties.map((property) => {
                  const verification = property.verification;

                  const verifiedChecks = verification
                    ? [
                      verification.identityVerified,
                      verification.ownershipVerified,
                      verification.locationVerified,
                      verification.photosVerified,
                      verification.siteVisitCompleted,
                    ].filter(Boolean).length
                    : 0;

                  const isNavigating =
                    navigatingPropertyId === property.id;

                  return (
                    <tr
                      key={property.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#172B35]">
                          {property.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {property.id.slice(0, 8)}...
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {property.owner?.name ?? "—"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {property.owner?.phone ?? "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <p>{property.city}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {property.district}, {property.state}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {property.category}
                      </td>

                      <td className="px-5 py-4 font-semibold text-[#172B35]">
                        {formatPrice(property.price)}
                        <p className="mt-1 text-xs font-normal text-gray-400">
                          {property.area} {property.areaUnit}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {verification ? (
                          <div>
                            <p className="font-semibold text-[#172B35]">
                              {verifiedChecks}/5
                            </p>
                            <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-green-500"
                                style={{
                                  width: `${(verifiedChecks / 5) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Not started
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {property.documents?.length ?? 0} files
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={property.status} />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleViewDetails(property.id)}
                          disabled={navigatingPropertyId !== null}
                          className="inline-flex items-center justify-end gap-2 font-semibold text-[#8A6A32] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isNavigating ? (
                            <>
                              <Spinner />
                              Opening...
                            </>
                          ) : (
                            "View Details →"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
