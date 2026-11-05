
import api from "@/lib/api";

/* --------------------------------
   Dashboard Types
--------------------------------- */

export interface DashboardOverview {
  totalProperties?: number;
  pendingProperties?: number;
  verifiedProperties?: number;
  approvedProperties?: number;
  rejectedProperties?: number;

  totalPayments?: number;
  pendingPayments?: number;
  completedPayments?: number;

  totalCampaigns?: number;
  pendingCampaigns?: number;
  activeCampaigns?: number;

  totalQuotations?: number;
  pendingQuotations?: number;
}

export interface RecentProperty {
  id: string;
  title?: string;
  name?: string;
  city?: string;
  district?: string;
  status?: string;
  createdAt?: string;
}

export interface PendingPayment {
  id: string;
  paymentNumber?: string;
  referenceNumber?: string;
  amount?: number;
  status?: string;
  createdAt?: string;
}

export interface PendingCampaign {
  id: string;
  name?: string;
  title?: string;
  status?: string;
  createdAt?: string;
}

export interface RecentQuotation {
  id: string;
  quotationNumber?: string;
  status?: string;
  createdAt?: string;
}

/* --------------------------------
   API Response Types
--------------------------------- */

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* --------------------------------
   Response Helpers
--------------------------------- */

function extractData<T>(response: ApiResponse<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response
  ) {
    return response.data;
  }

  return response as T;
}

function extractArray<T>(response: unknown): T[] {
  const data = extractData(response as any);

  if (Array.isArray(data)) {
    return data as T[];
  }

  if (
    data &&
    typeof data === "object" &&
    "items" in data &&
    Array.isArray((data as any).items)
  ) {
    return (data as any).items as T[];
  }

  if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray((data as any).results)
  ) {
    return (data as any).results as T[];
  }

  return [];
}

/* --------------------------------
   Dashboard Overview
--------------------------------- */

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const response = await api.get("/dashboard/overview");

  return extractData<DashboardOverview>(response.data);
}

/* --------------------------------
   Recent Properties
--------------------------------- */

export async function getRecentProperties(): Promise<RecentProperty[]> {
  const response = await api.get("/dashboard/recent-properties");

  return extractArray<RecentProperty>(response.data);
}

/* --------------------------------
   Pending Payments
--------------------------------- */

export async function getPendingPayments(): Promise<PendingPayment[]> {
  const response = await api.get("/dashboard/pending-payments");

  return extractArray<PendingPayment>(response.data);
}

/* --------------------------------
   Pending Campaigns
--------------------------------- */

export async function getPendingCampaigns(): Promise<PendingCampaign[]> {
  const response = await api.get("/dashboard/pending-campaigns");

  return extractArray<PendingCampaign>(response.data);
}

/* --------------------------------
   Recent Quotations
--------------------------------- */

export async function getRecentQuotations(): Promise<RecentQuotation[]> {
  const response = await api.get("/dashboard/recent-quotations");

  return extractArray<RecentQuotation>(response.data);
}

/* --------------------------------
   Fetch Complete Dashboard
--------------------------------- */

export async function getDashboardData() {
  const [
    overview,
    recentProperties,
    pendingPayments,
    pendingCampaigns,
    recentQuotations,
  ] = await Promise.all([
    getDashboardOverview(),
    getRecentProperties(),
    getPendingPayments(),
    getPendingCampaigns(),
    getRecentQuotations(),
  ]);

  return {
    overview,
    recentProperties,
    pendingPayments,
    pendingCampaigns,
    recentQuotations,
  };
}
