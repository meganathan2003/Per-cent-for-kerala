
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CreditCard,
  Megaphone,
  FileText,
  RefreshCw,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

import {
  getDashboardOverview,
  getRecentProperties,
  getPendingPayments,
  getPendingCampaigns,
  getRecentQuotations,
} from "@/services/dashboard.service";

import { getApiErrorMessage } from "@/lib/validations/api-error";

type DashboardData = {
  overview: any;
  recentProperties: any[];
  pendingPayments: any[];
  pendingCampaigns: any[];
  recentQuotations: any[];
};

const initialData: DashboardData = {
  overview: {},
  recentProperties: [],
  pendingPayments: [],
  pendingCampaigns: [],
  recentQuotations: [],
};

function extractArray(response: any): any[] {
  if (Array.isArray(response)) return response;

  const data = response?.data ?? response;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;

  return [];
}

function extractObject(response: any): any {
  const data = response?.data ?? response;
  return Array.isArray(data) ? {} : data ?? {};
}

function getOverviewValue(
  overview: any,
  keys: string[],
  fallback: number
): number {
  for (const key of keys) {
    const value = overview?.[key];

    if (typeof value === "number") return value;

    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return fallback;
}

function formatDate(value: any): string {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPropertyName(property: any): string {
  return (
    property?.title ??
    property?.name ??
    property?.propertyName ??
    "Untitled Property"
  );
}

function getStatus(status: any): string {
  return String(status ?? "PENDING").replaceAll("_", " ");
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  loading,
}: {
  title: string;
  value: number;
  icon: any;
  description: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div className="rounded-lg bg-[#F7F3EB] p-2">
          <Icon size={20} className="text-[#9A763E]" />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-[#172B35]">
        {loading ? (
          <span className="inline-block h-8 w-12 animate-pulse rounded bg-gray-200" />
        ) : (
          value.toLocaleString("en-IN")
        )}
      </h2>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-semibold text-[#172B35]">{title}</h2>

      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-medium text-[#9A763E] hover:underline"
      >
        View all
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}

function SectionLoading() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#9A763E] border-t-transparent" />
      Loading records...
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const [
        overviewResponse,
        propertiesResponse,
        paymentsResponse,
        campaignsResponse,
        quotationsResponse,
      ] = await Promise.all([
        getDashboardOverview(),
        getRecentProperties(),
        getPendingPayments(),
        getPendingCampaigns(),
        getRecentQuotations(),
      ]);

      const overview = extractObject(overviewResponse);

      setData({
        overview,
        recentProperties: extractArray(propertiesResponse),
        pendingPayments: extractArray(paymentsResponse),
        pendingCampaigns: extractArray(campaignsResponse),
        recentQuotations: extractArray(quotationsResponse),
      });
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load dashboard data.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const totalProperties = getOverviewValue(
    data.overview,
    ["totalProperties", "propertiesCount", "propertyCount"],
    data.recentProperties.length
  );

  const pendingPayments = getOverviewValue(
    data.overview,
    ["pendingPayments", "pendingPaymentsCount"],
    data.pendingPayments.length
  );

  const pendingCampaigns = getOverviewValue(
    data.overview,
    ["pendingCampaigns", "pendingCampaignsCount"],
    data.pendingCampaigns.length
  );

  const totalQuotations = getOverviewValue(
    data.overview,
    ["totalQuotations", "quotationsCount", "quotationCount"],
    data.recentQuotations.length
  );

  return (
    <section className="space-y-7">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here is your business overview.
          </p>
        </div>

        <button
          onClick={() => void loadDashboard(true)}
          disabled={loading || refreshing}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} />
          <span>{error}</span>

          <button
            onClick={() => void loadDashboard(true)}
            disabled={refreshing}
            className="ml-auto font-semibold underline disabled:opacity-50"
          >
            {refreshing ? "Retrying..." : "Retry"}
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon={Building2}
          description="Properties returned by the dashboard API"
          loading={loading}
        />

        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={CreditCard}
          description="Payments awaiting action"
          loading={loading}
        />

        <StatCard
          title="Pending Campaigns"
          value={pendingCampaigns}
          icon={Megaphone}
          description="Campaigns awaiting approval"
          loading={loading}
        />

        <StatCard
          title="Total Quotations"
          value={totalQuotations}
          icon={FileText}
          description="Quotations returned by the dashboard API"
          loading={loading}
        />
      </div>

      {/* Initial Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#9A763E] border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading dashboard information...
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Fetching properties, payments, campaigns and quotations.
          </p>
        </div>
      ) : (
        <>
          {/* Recent Properties */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <SectionHeader
              title="Recent Properties"
              href="/admin/super-admin/properties"
            />

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-gray-400">
                    <th className="pb-3 font-medium">Property</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Created</th>
                  </tr>
                </thead>

                <tbody>
                  {data.recentProperties.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-500"
                      >
                        No recent properties found.
                      </td>
                    </tr>
                  ) : (
                    data.recentProperties.slice(0, 5).map((property, index) => (
                      <tr
                        key={property.id ?? index}
                        className="border-b last:border-0"
                      >
                        <td className="py-4 font-medium text-[#172B35]">
                          {getPropertyName(property)}
                        </td>

                        <td className="py-4 text-gray-500">
                          {[property.city, property.district]
                            .filter(Boolean)
                            .join(", ") || "N/A"}
                        </td>

                        <td className="py-4">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {getStatus(property.status)}
                          </span>
                        </td>

                        <td className="py-4 text-gray-500">
                          {formatDate(property.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <SectionHeader
                title="Pending Payments"
                href="/admin/super-admin/payments"
              />

              <div className="mt-4 space-y-3">
                {data.pendingPayments.length === 0 ? (
                  <p className="py-5 text-center text-sm text-gray-500">
                    No pending payments.
                  </p>
                ) : (
                  data.pendingPayments.slice(0, 5).map((payment, index) => (
                    <div
                      key={payment.id ?? index}
                      className="flex items-center justify-between gap-3 border-b pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#172B35]">
                          {payment.paymentNumber ??
                            payment.referenceNumber ??
                            payment.id ??
                            "Payment"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {payment.amount != null
                            ? `₹${payment.amount}`
                            : "Amount unavailable"}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
                        {getStatus(payment.status)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <SectionHeader
                title="Pending Campaigns"
                href="/admin/super-admin/campaigns"
              />

              <div className="mt-4 space-y-3">
                {data.pendingCampaigns.length === 0 ? (
                  <p className="py-5 text-center text-sm text-gray-500">
                    No pending campaigns.
                  </p>
                ) : (
                  data.pendingCampaigns.slice(0, 5).map((campaign, index) => (
                    <div
                      key={campaign.id ?? index}
                      className="flex items-center justify-between gap-3 border-b pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#172B35]">
                          {campaign.name ??
                            campaign.title ??
                            campaign.id ??
                            "Campaign"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(campaign.createdAt)}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
                        {getStatus(campaign.status)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Quotations */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <SectionHeader
              title="Recent Quotations"
              href="/admin/super-admin/quotations"
            />

            <div className="mt-4 space-y-3">
              {data.recentQuotations.length === 0 ? (
                <p className="py-5 text-center text-sm text-gray-500">
                  No recent quotations found.
                </p>
              ) : (
                data.recentQuotations.slice(0, 5).map((quotation, index) => (
                  <div
                    key={quotation.id ?? index}
                    className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#172B35]">
                        {quotation.quotationNumber ??
                          quotation.id ??
                          "Quotation"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(quotation.createdAt)}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {getStatus(quotation.status)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
