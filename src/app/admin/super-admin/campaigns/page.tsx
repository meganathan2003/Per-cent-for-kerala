
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  RefreshCw,
  Megaphone,
  CalendarDays,
  Wallet,
  AlertCircle,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

type CampaignStatus =
  | "DRAFT"
  | "PENDING"
  | "PENDING_APPROVAL"
  | "SUBMITTED"
  | "APPROVED"
  | "ACTIVE"
  | "LAUNCHED"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

interface Campaign {
  id: string;
  name?: string;
  title?: string;
  property?: {
    id?: string;
    title?: string;
    name?: string;
  };
  propertyName?: string;
  budget?: number;
  amount?: number;
  status?: string;
  createdAt?: string;
}

interface CampaignForm {
  name: string;
  budget: string;
  status: CampaignStatus;
}

const initialForm: CampaignForm = {
  name: "",
  budget: "",
  status: "DRAFT",
};

const statusOptions: CampaignStatus[] = [
  "DRAFT",
  "PENDING",
  "PENDING_APPROVAL",
  "SUBMITTED",
  "APPROVED",
  "ACTIVE",
  "LAUNCHED",
  "COMPLETED",
  "REJECTED",
  "CANCELLED",
];

function getCampaigns(response: any): Campaign[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.campaigns)) return data.campaigns;

  return [];
}

function formatDate(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(value?: number) {
  if (value == null) return "N/A";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusStyle(status?: string) {
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "ACTIVE":
    case "LAUNCHED":
      return "bg-green-50 text-green-700";

    case "PENDING":
    case "SUBMITTED":
    case "PENDING_APPROVAL":
      return "bg-amber-50 text-amber-700";

    case "REJECTED":
    case "CANCELLED":
      return "bg-red-50 text-red-700";

    case "COMPLETED":
      return "bg-blue-50 text-blue-700";

    case "DRAFT":
      return "bg-gray-100 text-gray-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getCampaignName(campaign: Campaign) {
  return campaign.name ?? campaign.title ?? "Untitled Campaign";
}

function getCampaignBudget(campaign: Campaign) {
  return campaign.budget ?? campaign.amount;
}

export default function CampaignManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [form, setForm] = useState<CampaignForm>(initialForm);

  const loadCampaigns = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await api.get("/campaigns", {
        timeout: 15000,
      });

      setCampaigns(getCampaigns(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load campaigns.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadCampaigns();
  }, [loadCampaigns]);

  // Search and status filtering
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const name = getCampaignName(campaign).toLowerCase();
      const propertyName = (
        campaign.property?.title ??
        campaign.property?.name ??
        campaign.propertyName ??
        ""
      ).toLowerCase();

      const matchesSearch =
        name.includes(search.toLowerCase()) ||
        propertyName.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        campaign.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, statusFilter]);

  // Statistics
  const activeCampaigns = campaigns.filter((campaign) =>
    ["ACTIVE", "LAUNCHED"].includes(
      campaign.status?.toUpperCase() ?? ""
    )
  ).length;

  const pendingCampaigns = campaigns.filter((campaign) =>
    ["PENDING", "SUBMITTED", "PENDING_APPROVAL"].includes(
      campaign.status?.toUpperCase() ?? ""
    )
  ).length;

  const completedCampaigns = campaigns.filter(
    (campaign) => campaign.status?.toUpperCase() === "COMPLETED"
  ).length;

  // Open create modal
  function openCreateModal() {
    setSelectedCampaign(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setShowFormModal(true);
  }

  // Open edit modal
  function openEditModal(campaign: Campaign) {
    setSelectedCampaign(campaign);

    setForm({
      name: getCampaignName(campaign),
      budget: String(getCampaignBudget(campaign) ?? ""),
      status: (campaign.status?.toUpperCase() ??
        "DRAFT") as CampaignStatus,
    });

    setError("");
    setSuccess("");
    setShowFormModal(true);
  }

  // Create or update campaign
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const budget = Number(form.budget);

    if (!name) {
      setError("Campaign name is required.");
      return;
    }

    if (
      form.budget.trim() !== "" &&
      (!Number.isFinite(budget) || budget < 0)
    ) {
      setError("Please enter a valid campaign budget.");
      return;
    }

    const payload = {
      name,
      budget: form.budget.trim() === "" ? undefined : budget,
      status: form.status,
    };

    setSaving(true);

    try {
      if (selectedCampaign) {
        await api.patch(
          `/campaigns/${selectedCampaign.id}`,
          payload
        );

        setSuccess("Campaign updated successfully.");
      } else {
        await api.post("/campaigns", payload);

        setSuccess("Campaign created successfully.");
      }

      setShowFormModal(false);
      setSelectedCampaign(null);
      setForm(initialForm);

      await loadCampaigns(true);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          selectedCampaign
            ? "Unable to update campaign."
            : "Unable to create campaign."
        )
      );
    } finally {
      setSaving(false);
    }
  }

  // Open delete confirmation
  function openDeleteModal(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setError("");
    setShowDeleteModal(true);
  }

  // Delete campaign
  async function handleDelete() {
    if (!selectedCampaign) return;

    setDeleting(true);
    setError("");

    try {
      await api.delete(`/campaigns/${selectedCampaign.id}`);

      setShowDeleteModal(false);
      setSelectedCampaign(null);
      setSuccess("Campaign deleted successfully.");

      await loadCampaigns(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to delete campaign.")
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Campaign Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, review and manage all property marketing campaigns.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => void loadCampaigns(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-lg bg-[#172B35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#263f4b]"
          >
            <Plus size={17} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} />
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-auto"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Campaigns</p>
            <Megaphone size={20} className="text-[#9A763E]" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {campaigns.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Active Campaigns</p>
            <CalendarDays size={20} className="text-green-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {activeCampaigns}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending Campaigns</p>
            <Wallet size={20} className="text-amber-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {pendingCampaigns}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Completed Campaigns</p>
            <CalendarDays size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {completedCampaigns}
          </h2>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-[#172B35]">
              All Campaigns
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage campaign records and permissions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#8A6A32]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#8A6A32]"
            >
              <option value="ALL">All Status</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            <RefreshCw
              size={20}
              className="mx-auto mb-3 animate-spin"
            />
            Loading campaigns...
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="p-10 text-center">
            <Megaphone
              size={32}
              className="mx-auto mb-3 text-gray-300"
            />

            <h3 className="font-medium text-gray-700">
              No campaigns found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create a campaign or change your search filters.
            </p>

            <button
              onClick={openCreateModal}
              className="mt-4 text-sm font-semibold text-[#8A6A32] hover:underline"
            >
              + Create your first campaign
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Campaign</th>
                  <th className="px-5 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Budget</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Created At</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#172B35]">
                        {getCampaignName(campaign)}
                      </div>

                      <div className="mt-1 text-xs text-gray-400">
                        ID: {campaign.id}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {campaign.property?.title ??
                        campaign.property?.name ??
                        campaign.propertyName ??
                        "N/A"}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      {formatAmount(getCampaignBudget(campaign))}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          campaign.status
                        )}`}
                      >
                        {campaign.status?.replaceAll("_", " ") ??
                          "UNKNOWN"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {formatDate(campaign.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(campaign)}
                          title="Edit campaign"
                          className="rounded-lg border border-gray-200 p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(campaign)}
                          title="Delete campaign"
                          className="rounded-lg border border-gray-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#172B35]">
                  {selectedCampaign
                    ? "Edit Campaign"
                    : "Create Campaign"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {selectedCampaign
                    ? "Update campaign information."
                    : "Enter the new campaign details."}
                </p>
              </div>

              <button
                onClick={() => setShowFormModal(false)}
                disabled={saving}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign Name *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter campaign name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign Budget (INR)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                  placeholder="Enter campaign budget"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as CampaignStatus,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setShowFormModal(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#172B35] px-5 py-2 text-sm font-semibold text-white hover:bg-[#263f4b] disabled:opacity-50"
                >
                  {saving && <RefreshCw size={15} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : selectedCampaign
                      ? "Update Campaign"
                      : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={21} className="text-red-600" />
            </div>

            <h2 className="text-lg font-bold text-[#172B35]">
              Delete Campaign?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <strong>{getCampaignName(selectedCampaign)}</strong>?
              This action cannot be undone.
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={() => void handleDelete()}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && (
                  <RefreshCw size={15} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Delete Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
