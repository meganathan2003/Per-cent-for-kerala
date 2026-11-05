
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

interface Quotation {
  id: string;
  quotationNumber?: string;
  referenceNumber?: string;
  title?: string;
  status?: string;
  amount?: number | string;
  totalAmount?: number | string;
  createdAt?: string;
  property?: {
    id?: string;
    title?: string;
    name?: string;
  };
  customer?: {
    name?: string;
    email?: string;
  };
  owner?: {
    name?: string;
    email?: string;
  };
}

function getQuotations(response: any): Quotation[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.quotations)) return data.quotations;

  return [];
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

function formatAmount(amount?: number | string) {
  if (amount === undefined || amount === null || amount === "") {
    return "—";
  }

  const value = Number(amount);

  if (Number.isNaN(value)) return String(amount);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

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

function getStatusClass(status?: string) {
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "ACCEPTED":
      return "bg-green-50 text-green-700";

    case "PENDING":
    case "DRAFT":
      return "bg-yellow-50 text-yellow-700";

    case "REJECTED":
    case "DECLINED":
      return "bg-red-50 text-red-700";

    case "SENT":
    case "SUBMITTED":
      return "bg-blue-50 text-blue-700";

    case "EXPIRED":
      return "bg-gray-100 text-gray-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function QuotationsPage() {
  const router = useRouter();

  const [items, setItems] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
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
      const response = await api.get("/quotations");
      setItems(getQuotations(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load quotations.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredQuotations = useMemo(() => {
    return items.filter((quotation) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        quotation.quotationNumber,
        quotation.referenceNumber,
        quotation.title,
        quotation.property?.title,
        quotation.property?.name,
        quotation.customer?.name,
        quotation.customer?.email,
        quotation.owner?.name,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        quotation.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const pendingCount = items.filter(
    (item) => item.status?.toUpperCase() === "PENDING"
  ).length;

  const approvedCount = items.filter((item) =>
    ["APPROVED", "ACCEPTED"].includes(
      item.status?.toUpperCase() ?? ""
    )
  ).length;

  const rejectedCount = items.filter((item) =>
    ["REJECTED", "DECLINED"].includes(
      item.status?.toUpperCase() ?? ""
    )
  ).length;

  const viewDetails = (id: string) => {
    if (navigatingId) return;

    setNavigatingId(id);
    router.push(`/admin/super-admin/quotations/${id}`);
  };

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Quotations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and monitor quotation records.
          </p>
        </div>

        <button
          onClick={() => void load(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {refreshing ? <Spinner /> : null}
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <span>{error}</span>

          <button
            onClick={() => void load(true)}
            disabled={refreshing}
            className="font-semibold underline disabled:opacity-50"
          >
            {refreshing ? "Retrying..." : "Retry"}
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Quotations</p>
          <h2 className="mt-2 text-2xl font-bold text-[#172B35]">
            {loading ? "—" : items.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {loading ? "—" : pendingCount}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Approved</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {loading ? "—" : approvedCount}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Rejected</p>
          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {loading ? "—" : rejectedCount}
          </h2>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search quotation, property or customer..."
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="APPROVED">Approved</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {/* Quotations Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#172B35]">
            Quotation Records
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {loading
              ? "Fetching quotations..."
              : `${filteredQuotations.length} quotations found`}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#9A763E] border-t-transparent" />
            <p className="text-sm font-medium text-gray-500">
              Loading quotations...
            </p>
          </div>
        ) : filteredQuotations.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium text-gray-700">
              No quotations found
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Quotation ID</th>
                  <th className="px-5 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Created Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredQuotations.map((quotation, index) => (
                  <tr
                    key={quotation.id ?? index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#172B35]">
                        {quotation.quotationNumber ??
                          quotation.referenceNumber ??
                          quotation.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {quotation.property?.title ??
                        quotation.property?.name ??
                        "—"}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700">
                        {quotation.customer?.name ??
                          quotation.owner?.name ??
                          "—"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {quotation.customer?.email ??
                          quotation.owner?.email ??
                          ""}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#172B35]">
                      {formatAmount(
                        quotation.totalAmount ?? quotation.amount
                      )}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(quotation.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(quotation.status)}`}
                      >
                        {quotation.status ?? "UNKNOWN"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => viewDetails(quotation.id)}
                        disabled={navigatingId !== null}
                        className="inline-flex items-center justify-end gap-2 font-semibold text-[#8A6A32] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {navigatingId === quotation.id ? (
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
