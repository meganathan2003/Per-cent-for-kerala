
"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

interface PaymentConfiguration {
  id: string;
  name?: string;
  title?: string;
  paymentMethod?: string;
  method?: string;
  provider?: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  upiId?: string;
  merchantId?: string;
  currency?: string;
  status?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

function getConfigurations(response: any): PaymentConfiguration[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.configurations)) return data.configurations;

  // Support an API returning one active configuration object.
  if (data && typeof data === "object" && data.id) {
    return [data];
  }

  return [];
}

function Detail({
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
      <p className="break-all text-sm font-medium text-[#172B35]">
        {value !== undefined && value !== null && value !== ""
          ? String(value)
          : "—"}
      </p>
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PaymentSettingsPage() {
  const [items, setItems] = useState<PaymentConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/payment-configurations/active");
      setItems(getConfigurations(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load payment settings.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Payment Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and monitor active payment configurations.
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
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

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Loading payment configurations...
        </div>
      )}

      {/* Empty */}
      {!loading && !error && items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            ₹
          </div>

          <h2 className="mt-4 font-semibold text-[#172B35]">
            No Active Payment Configuration
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are currently no active payment configurations.
          </p>
        </div>
      )}

      {/* Configuration Cards */}
      {!loading && items.length > 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <p className="text-sm text-gray-500">
                Active Configurations
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#172B35]">
                {items.length}
              </h2>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Active
            </span>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {items.map((config, index) => {
              const method =
                config.paymentMethod ?? config.method ?? "Payment Method";

              const isActive =
                config.isActive === true ||
                config.status?.toUpperCase() === "ACTIVE";

              return (
                <div
                  key={config.id ?? index}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between border-b border-gray-100 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F0E8] text-xl font-bold text-[#8A6A32]">
                        ₹
                      </div>

                      <div>
                        <h2 className="font-semibold text-[#172B35]">
                          {config.name ??
                            config.title ??
                            method}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                          {config.provider ?? method}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {config.status ??
                        (config.isActive ? "ACTIVE" : "UNKNOWN")}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2">
                    <Detail
                      label="Payment Method"
                      value={method}
                    />

                    <Detail
                      label="Provider"
                      value={config.provider}
                    />

                    <Detail
                      label="Account Holder"
                      value={config.accountName}
                    />

                    <Detail
                      label="Account Number"
                      value={config.accountNumber}
                    />

                    <Detail
                      label="Bank Name"
                      value={config.bankName}
                    />

                    <Detail
                      label="UPI ID"
                      value={config.upiId}
                    />

                    <Detail
                      label="Merchant ID"
                      value={config.merchantId}
                    />

                    <Detail
                      label="Currency"
                      value={config.currency ?? "INR"}
                    />
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                    <div className="flex flex-wrap justify-between gap-2 text-xs text-gray-500">
                      <span>
                        Created: {formatDate(config.createdAt)}
                      </span>

                      <span>
                        Updated: {formatDate(config.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
