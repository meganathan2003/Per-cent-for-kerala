
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getProperties,
  type Property,
} from "@/services/property.service";

import { getApiErrorMessage } from "@/lib/validations/api-error";

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

function formatPrice(value: number | string) {
  const amount = Number(value);

  if (Number.isNaN(amount)) return String(value);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isValidPropertyId(id: unknown): id is string {
  if (typeof id !== "string") return false;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(id);
}

function StatusBadge({ status }: { status?: string }) {
  const styles: Record<string, string> = {
    VERIFIED: "bg-green-50 text-green-700",
    PENDING: "bg-yellow-50 text-yellow-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status?.toUpperCase() ?? ""] ??
        "bg-gray-100 text-gray-600"
        }`}
    >
      {status ?? "UNKNOWN"}
    </span>
  );
}

export default function Page() {
  const router = useRouter();

  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [openingId, setOpeningId] = useState<string | null>(null);

  // Fetch all properties
  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const data = await getProperties();

      if (!Array.isArray(data)) {
        throw new Error("Invalid properties response from server.");
      }

      // Keep the records, but log invalid IDs for debugging.
      const invalidRecords = data.filter(
        (property) => !isValidPropertyId(property?.id)
      );

      if (invalidRecords.length > 0) {
        console.error(
          "Properties with invalid IDs received from API:",
          invalidRecords
        );
      }

      setItems(data);
    } catch (err) {
      console.error("GET ALL PROPERTIES ERROR:", err);

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

  // Search and status filtering
  const filteredItems = useMemo(() => {
    return items.filter((property) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch = [
        property.title,
        property.id,
        property.category,
        property.city,
        property.district,
        property.owner?.name,
        property.owner?.email,
        property.owner?.phone,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        property.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  // Summary counts
  const verifiedCount = items.filter(
    (item) => item.status?.toUpperCase() === "VERIFIED"
  ).length;

  const pendingCount = items.filter(
    (item) => item.status?.toUpperCase() === "PENDING"
  ).length;

  const rejectedCount = items.filter(
    (item) => item.status?.toUpperCase() === "REJECTED"
  ).length;

  // Open property details only with a valid UUID
  const openProperty = (id: string) => {
    if (!isValidPropertyId(id)) {
      setError(
        "This property has an invalid ID. Please check the property record."
      );

      console.error("Invalid property ID:", id);
      return;
    }

    setOpeningId(id);

    router.push(
      `/admin/operations/properties/${encodeURIComponent(id)}`
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Properties
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review submitted properties and their verification progress.
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
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span>{error}</span>

          <button
            onClick={() => void load()}
            disabled={loading}
            className="font-semibold underline disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Properties
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#172B35]">
            {loading ? "—" : items.length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            All submitted properties
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Pending Verification
          </p>

          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {loading ? "—" : pendingCount}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Awaiting verification
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Verified</p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {loading ? "—" : verifiedCount}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Verification completed
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Rejected</p>

          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {loading ? "—" : rejectedCount}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Rejected properties
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search property, owner or location..."
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Property Records */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#172B35]">
            Property Records
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {loading
              ? "Fetching properties..."
              : `${filteredItems.length} records found`}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#8A6A32] border-t-transparent" />

            <p className="text-sm font-medium text-gray-500">
              Loading properties...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
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
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((property, index) => {
                  const validId = isValidPropertyId(property.id);

                  const checks = property.verification
                    ? [
                      property.verification.identityVerified,
                      property.verification.ownershipVerified,
                      property.verification.locationVerified,
                      property.verification.photosVerified,
                      property.verification.siteVisitCompleted,
                    ].filter(Boolean).length
                    : 0;

                  return (
                    <tr
                      key={validId ? property.id : `invalid-${index}`}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#172B35]">
                          {property.title || "Untitled Property"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {validId ? property.id : "Invalid property ID"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {property.owner?.name ?? "—"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {property.owner?.email ?? "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {property.city}, {property.district}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {property.category}
                      </td>

                      <td className="px-5 py-4 font-medium text-[#172B35]">
                        {formatPrice(property.price)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {checks}/5 completed
                        </p>

                        <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${(checks / 5) * 100}%`,
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={property.status} />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => openProperty(property.id)}
                          disabled={
                            !validId ||
                            openingId !== null
                          }
                          title={
                            !validId
                              ? "This property has an invalid ID"
                              : "View property details"
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#172B35] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {openingId === property.id ? (
                            <>
                              <Spinner />
                              Opening...
                            </>
                          ) : (
                            "View Details"
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
