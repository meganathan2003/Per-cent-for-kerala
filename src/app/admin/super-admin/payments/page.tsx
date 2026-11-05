
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
  paymentLink?: string;
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
}

interface Quotation {
  id: string;
  quotationNumber: string;
  totalAmount: number | string;
  status: string;
  property?: {
    title?: string;
    owner?: {
      name?: string;
      email?: string;
      phone?: string;
    };
  };
}

function getPayments(response: any): Payment[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.payments)) return data.payments;

  return [];
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

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Status badge colors
function getStatusClass(status?: string) {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
    case "SUCCESS":
    case "PAID":
    case "VERIFIED":
      return "bg-green-50 text-green-700";

    case "PENDING":
    case "PROCESSING":
    case "LINK_CREATED":
    case "UNDER_REVIEW":
      return "bg-yellow-50 text-yellow-700";

    case "FAILED":
    case "REJECTED":
    case "CANCELLED":
      return "bg-red-50 text-red-700";

    case "EXPIRED":
      return "bg-orange-50 text-orange-700";

    case "REFUNDED":
      return "bg-purple-50 text-purple-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

// Display LINK_CREATED as Pending and PAID as Paid
function getStatusLabel(status?: string) {
  switch (status?.toUpperCase()) {
    case "LINK_CREATED":
    case "PENDING":
    case "PROCESSING":
      return "Pending";

    case "PAID":
    case "COMPLETED":
    case "SUCCESS":
    case "VERIFIED":
      return "Paid";

    case "FAILED":
    case "REJECTED":
      return "Failed";

    case "EXPIRED":
      return "Expired";

    case "CANCELLED":
      return "Cancelled";

    case "REFUNDED":
      return "Refunded";

    default:
      return status ?? "Unknown";
  }
}

export default function Page() {
  const [items, setItems] = useState<Payment[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [loadingQuotations, setLoadingQuotations] = useState(false);
  const [creating, setCreating] = useState(false);

  const [quotationId, setQuotationId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [modalError, setModalError] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const selectedQuotation = quotations.find(
    (quotation) => quotation.id === quotationId
  );

  // Load payment records from backend
  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await api.get("/payments/");
      setItems(getPayments(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load payments.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Automatically refresh payment status every 10 seconds.
  // Razorpay webhook updates the database; this fetch gets the latest status.
  useEffect(() => {
    void load();

    const intervalId = window.setInterval(() => {
      void load(true);
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [load]);

  // Load accepted quotations
  const openCreateModal = async () => {
    setShowModal(true);
    setModalError("");
    setGeneratedLink("");
    setQuotationId("");
    setExpiryDate("");
    setQuotations([]);

    setLoadingQuotations(true);

    try {
      const response = await api.get("/quotations", {
        params: {
          status: "ACCEPTED",
        },
      });

      const quotationList = getQuotations(response);

      setQuotations(
        quotationList.filter(
          (quotation) =>
            quotation.status?.toUpperCase() === "ACCEPTED"
        )
      );
    } catch (err) {
      setModalError(
        getApiErrorMessage(
          err,
          "Unable to load accepted quotations."
        )
      );
    } finally {
      setLoadingQuotations(false);
    }
  };

  // Create Razorpay payment link
  const createPaymentLink = async () => {
    if (!selectedQuotation) {
      setModalError("Please select a quotation.");
      return;
    }

    if (!expiryDate) {
      setModalError("Please select an expiry date.");
      return;
    }

    const amount = Number(selectedQuotation.totalAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setModalError("Invalid quotation amount.");
      return;
    }

    setCreating(true);
    setModalError("");

    try {
      const response = await api.post("/payments/razorpay-link", {
        quotationId: selectedQuotation.id,
        amount,
        expiresAt: new Date(
          `${expiryDate}T23:59:59`
        ).toISOString(),
      });

      const body = response.data;
      const payment = body?.data ?? body;

      if (!payment?.paymentLink) {
        console.error("Payment API response:", body);
        throw new Error(
          "Razorpay payment link was not returned by the server."
        );
      }

      setGeneratedLink(payment.paymentLink);

      // Refresh payment list after link creation
      await load(true);
    } catch (err) {
      setModalError(
        getApiErrorMessage(
          err,
          "Unable to create payment link."
        )
      );
    } finally {
      setCreating(false);
    }
  };

  // Copy generated link
  const copyLink = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setModalError("");
    } catch {
      setModalError(
        "Unable to copy the link. Please copy it manually."
      );
    }
  };

  // Close modal
  const closeModal = () => {
    if (creating) return;

    setShowModal(false);
    setModalError("");
    setGeneratedLink("");
    setQuotationId("");
    setExpiryDate("");
  };

  // Search and status filtering
  const filteredItems = useMemo(() => {
    return items.filter((payment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        payment.paymentNumber,
        payment.referenceNumber,
        payment.property?.title,
        payment.property?.name,
        payment.user?.name,
        payment.user?.email,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchValue)
        );

      const paymentStatus = payment.status?.toUpperCase() ?? "";

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PENDING" &&
          ["PENDING", "LINK_CREATED", "PROCESSING"].includes(
            paymentStatus
          )) ||
        (statusFilter === "PAID" &&
          ["PAID", "COMPLETED", "SUCCESS", "VERIFIED"].includes(
            paymentStatus
          )) ||
        (statusFilter === "FAILED" &&
          ["FAILED", "REJECTED"].includes(paymentStatus)) ||
        paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  // Summary calculations
  const totalAmount = items.reduce(
    (total, payment) =>
      total + (Number(payment.amount) || 0),
    0
  );

  const paidCount = items.filter((payment) =>
    ["PAID", "COMPLETED", "SUCCESS", "VERIFIED"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const pendingCount = items.filter((payment) =>
    ["PENDING", "LINK_CREATED", "PROCESSING"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const failedCount = items.filter((payment) =>
    ["FAILED", "REJECTED"].includes(
      payment.status?.toUpperCase() ?? ""
    )
  ).length;

  const today = new Date();

  const minimumExpiryDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Payments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage all payment records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#172B35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263f4c]"
          >
            <span className="text-lg">+</span>
            Create Payment Link
          </button>

          <button
            type="button"
            onClick={() => void load(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Payments
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#172B35]">
            {loading ? "—" : items.length}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            All payment records
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Payment Amount
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#172B35]">
            {loading ? "—" : formatAmount(totalAmount)}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Sum of available payment amounts
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Paid Payments
          </p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {loading ? "—" : paidCount}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            {loading
              ? "Loading..."
              : `${pendingCount} pending · ${failedCount} failed`}
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
          <option value="ALL">All Payments</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="FAILED">Failed</option>
          <option value="EXPIRED">Expired</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-[#172B35]">
              Payment Records
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {loading
                ? "Fetching payment records..."
                : `${filteredItems.length} records found`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#8A6A32] border-t-transparent" />
            <p className="text-sm font-medium text-gray-500">
              Loading payments...
            </p>
            <p className="text-xs text-gray-400">
              Please wait while we fetch payment records.
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
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Payment ID
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Property
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Customer
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Amount
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Method
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Date
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((payment, index) => (
                  <tr
                    key={payment.id ?? index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-[#172B35]">
                      {payment.paymentNumber ??
                        payment.referenceNumber ??
                        payment.id}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {payment.property?.title ??
                        payment.property?.name ??
                        "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      <div>
                        <p>{payment.user?.name ?? "—"}</p>
                        {payment.user?.email && (
                          <p className="mt-1 text-xs text-gray-400">
                            {payment.user.email}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#172B35]">
                      {formatAmount(payment.amount)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {payment.paymentMethod ??
                        payment.method ??
                        "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(payment.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(payment.status)}`}
                      >
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Payment Link Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-[#172B35]">
                  Create Payment Link
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Generate a Razorpay payment link for a seller.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={creating}
                className="text-2xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6">
              {modalError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {modalError}
                </div>
              )}

              {!generatedLink ? (
                <>
                  {/* Quotation Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Accepted Quotation
                    </label>

                    {loadingQuotations ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Spinner />
                        Loading quotations...
                      </div>
                    ) : (
                      <select
                        value={quotationId}
                        onChange={(event) =>
                          setQuotationId(event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#172B35]"
                      >
                        <option value="">Select quotation</option>

                        {quotations.map((quotation) => (
                          <option
                            key={quotation.id}
                            value={quotation.id}
                          >
                            {quotation.quotationNumber}
                            {" - "}
                            {quotation.property?.title ?? "Property"}
                          </option>
                        ))}
                      </select>
                    )}

                    {!loadingQuotations && quotations.length === 0 && (
                      <p className="mt-2 text-xs text-amber-600">
                        No accepted quotations available.
                      </p>
                    )}
                  </div>

                  {/* Selected Quotation Details */}
                  {selectedQuotation && (
                    <>
                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">
                          Quotation Number
                        </p>
                        <p className="mt-1 font-medium text-gray-800">
                          {selectedQuotation.quotationNumber}
                        </p>

                        <p className="mt-3 text-xs text-gray-500">
                          Property
                        </p>
                        <p className="mt-1 font-medium text-gray-800">
                          {selectedQuotation.property?.title ?? "—"}
                        </p>

                        <p className="mt-3 text-xs text-gray-500">
                          Seller
                        </p>
                        <p className="mt-1 font-medium text-gray-800">
                          {selectedQuotation.property?.owner?.name ?? "—"}
                        </p>

                        <p className="mt-3 text-xs text-gray-500">
                          Quotation Amount
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#172B35]">
                          {formatAmount(selectedQuotation.totalAmount)}
                        </p>
                      </div>

                      {/* Expiry Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Payment Link Expiry
                        </label>

                        <input
                          type="date"
                          value={expiryDate}
                          min={minimumExpiryDate}
                          onChange={(event) =>
                            setExpiryDate(event.target.value)
                          }
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#172B35]"
                        />

                        <p className="mt-1 text-xs text-gray-400">
                          Payment link will expire on the selected date.
                        </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                /* Generated Link */
                <div className="space-y-4">
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="font-semibold text-green-700">
                      Payment link created successfully!
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      Share this link with the seller.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Razorpay Payment Link
                    </label>
                    <input
                      readOnly
                      value={generatedLink}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={copyLink}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-[#172B35] hover:bg-gray-50"
                  >
                    Copy Payment Link
                  </button>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-sm font-medium text-blue-600 hover:underline"
                  >
                    Open Payment Link
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-5">
              <button
                type="button"
                onClick={closeModal}
                disabled={creating}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {generatedLink ? "Close" : "Cancel"}
              </button>

              {!generatedLink && (
                <button
                  type="button"
                  onClick={createPaymentLink}
                  disabled={
                    creating ||
                    loadingQuotations ||
                    !selectedQuotation ||
                    !expiryDate
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#172B35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263f4c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating && <Spinner />}
                  {creating
                    ? "Generating..."
                    : "Generate Payment Link"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
