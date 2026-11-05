
"use client";

import { useMemo, useState } from "react";

type CampaignStatus = "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELLED";

interface Campaign {
  id: string;
  name: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  createdAt: string;
}

const initialCampaigns: Campaign[] = [];

const statusStyles: Record<CampaignStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OperationsCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    objective: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name.toLowerCase().includes(search.toLowerCase()) ||
        campaign.objective.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || campaign.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, statusFilter]);

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "ACTIVE").length,
    draft: campaigns.filter((c) => c.status === "DRAFT").length,
    completed: campaigns.filter((c) => c.status === "COMPLETED").length,
  };

  function handleCreateCampaign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.objective.trim()) {
      setError("Please enter campaign name and objective.");
      return;
    }

    if (
      form.startDate &&
      form.endDate &&
      new Date(form.endDate) < new Date(form.startDate)
    ) {
      setError("End date cannot be before start date.");
      return;
    }

    const newCampaign: Campaign = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      objective: form.objective.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
    };

    setCampaigns((previous) => [newCampaign, ...previous]);

    setForm({
      name: "",
      objective: "",
      startDate: "",
      endDate: "",
    });

    setShowCreateModal(false);
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Campaigns
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor campaign activities and support property promotions.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setShowCreateModal(true);
          }}
          className="rounded-lg bg-[#172B35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#263f4b]"
        >
          + Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Campaigns", value: stats.total },
          { label: "Active", value: stats.active },
          { label: "Drafts", value: stats.draft },
          { label: "Completed", value: stats.completed },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#172B35]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#172B35]">
              All Campaigns
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Campaign records and their current status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#8A6A32]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-gray-200 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl">📢</span>
            </div>

            <h3 className="font-semibold text-gray-700">
              No campaigns found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create a campaign or change your search filters.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created At</th>
                </tr>
              </thead>

              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#172B35]">
                        {campaign.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {campaign.objective}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {campaign.startDate || "—"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {campaign.endDate || "—"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[campaign.status]}`}
                      >
                        {campaign.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(campaign.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#172B35]">
                Create Campaign
              </h2>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Example: Kerala Property Promotion"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Campaign Objective
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.objective}
                  onChange={(e) =>
                    setForm({ ...form, objective: e.target.value })
                  }
                  placeholder="Describe the campaign objective..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A6A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#172B35] px-5 py-2 text-sm font-semibold text-white"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
