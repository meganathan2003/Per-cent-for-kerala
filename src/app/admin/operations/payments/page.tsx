
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

interface Payment {
  id: string;
  paymentNumber?: string;
  referenceNumber?: string;
  amount?: number | string;
  status?: string;
  paymentMethod?: string;
  method?: string;
  createdAt?: string;
  updatedAt?: string;
  property?: {
    title?: string;
    name?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
  customer?: {
    name?: string;
    email?: string;
  };
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

function formatAmount(amount?: number | string) {
  if (amount === undefined || amount === null || amount === "") return "—";

  const value = Number(amount);

  if (Number.isNaN(value)) return String(amount);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
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

function getStatusClass(status?: string) {
  switch (status?.toUpperCase()) {
    case "SUCCESS":
    case "COMPLETED":
    case "PAID":
      return "bg-green-50 text-green-700";

    case "PENDING":
    case "PROCESSING":
      return "bg-yellow-50 text-yellow-700";

    case "FAILED":
    case "REJECTED":
      return "bg-red-50 text-red-700";

    case "REFUNDED":
      return "bg-purple-50 text-purple-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getPayments(response: any): Payment[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.payments)) return data.payments;

  return [];
}

export default function Page() {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
      const response = await api.get("/payments");
      setItems(getPayments(response));
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to load payments."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredItems = useMemo(() => {
    return items.filter((payment) => {
      const customerName =
        payment.customer?.name ?? payment.user?.name ?? "";

      const propertyName =
        payment.property?.title ?? payment.property?.name ?? "";

      const searchValue = search.toLowerCase();

      const matchesSearch = [
        payment.id,
        payment.paymentNumber,
        payment.referenceNumber,
        customerName,
        propertyName,
        payment.customer?.email,
        payment.user?.email,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const successfulCount = items.filter((payment) =>
    ["SUCCESS", "COMPLETED", "PAID"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const pendingCount = items.filter((payment) =>
    ["PENDING", "PROCESSING"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const failedCount = items.filter((payment) =>
    ["FAILED", "REJECTED"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const totalAmount = items.reduce((total, payment) => {
    const amount = Number(payment.amount);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Payments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and coordinate property payments.
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
          <p className="text-sm text-gray-500">Total Payments</p>
          <h2 className="mt-2 text-2xl font-bold text-[#172B35]">
            {loading ? "—" : items.length}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            All payment records
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Payment Amount</p>
          <h2 className="mt-2 text-xl font-bold text-[#172B35]">
            {loading ? "—" : formatAmount(totalAmount)}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Combined recorded amount
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Successful</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {loading ? "—" : successfulCount}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Completed payments
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Pending / Failed</p>
          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {loading ? "—" : pendingCount + failedCount}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Awaiting or unsuccessful payments
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search payment, property or customer..."
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#172B35]"
        >
          <option value="ALL">All Statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="COMPLETED">Completed</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
          <option value="REJECTED">Rejected</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      {/* Payment Records */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#172B35]">
            Payment Records
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {loading
              ? "Fetching payments..."
              : `${filteredItems.length} records found`}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#8A6A32] border-t-transparent" />
            <p className="text-sm font-medium text-gray-500">
              Loading payments...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium text-gray-700">
              No payments found
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Payment</th>
                  <th className="px-5 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Method</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((payment, index) => (
                  <tr
                    key={payment.id ?? index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#172B35]">
                        {payment.paymentNumber ??
                          payment.referenceNumber ??
                          `Payment ${index + 1}`}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {payment.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {payment.property?.title ??
                        payment.property?.name ??
                        "—"}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700">
                        {payment.customer?.name ??
                          payment.user?.name ??
                          "—"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {payment.customer?.email ??
                          payment.user?.email ??
                          ""}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#172B35]">
                      {formatAmount(payment.amount)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {payment.paymentMethod ?? payment.method ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(payment.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status ?? "UNKNOWN"}
                      </span>
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
