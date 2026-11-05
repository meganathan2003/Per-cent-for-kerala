
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  RefreshCw,
  Users,
  Mail,
  ShieldCheck,
  CircleCheck,
  CircleX,
  AlertCircle,
  Pencil,
  UserX,
  UserCheck,
  X,
  Save,
  Plus,
  Loader2,
} from "lucide-react";

import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/validations/api-error";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  status?: string;
  createdAt?: string;
}

interface AdminForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const emptyForm: AdminForm = {
  name: "",
  email: "",
  password: "",
  role: "OPERATIONS",
};

function getAdmins(response: any): Admin[] {
  const body = response?.data;
  const data = body?.data ?? body;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.admins)) return data.admins;

  return [];
}

function formatDate(date?: string) {
  if (!date) return "N/A";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isAdminActive(admin: Admin) {
  if (typeof admin.isActive === "boolean") return admin.isActive;
  return admin.status?.toUpperCase() === "ACTIVE";
}

function Spinner() {
  return <Loader2 size={16} className="animate-spin" />;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [success, setSuccess] = useState("");

  const [modalType, setModalType] = useState<"ADD" | "EDIT" | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const [form, setForm] = useState<AdminForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Fetch admins
  const loadAdmins = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const response = await api.get("/admins");
      setAdmins(getAdmins(response));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load administrator accounts.")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadAdmins();
  }, [loadAdmins]);

  // Form field handler
  function updateField(field: keyof AdminForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // Add admin modal
  function openAddModal() {
    setModalType("ADD");
    setEditingAdmin(null);
    setForm(emptyForm);
    setActionError("");
    setSuccess("");
  }

  // Edit admin modal
  function openEditModal(admin: Admin) {
    setModalType("EDIT");
    setEditingAdmin(admin);

    setForm({
      name: admin.name ?? "",
      email: admin.email ?? "",
      password: "",
      role: admin.role ?? "",
    });

    setActionError("");
    setSuccess("");
  }

  // Close modal
  function closeModal() {
    if (saving) return;

    setModalType(null);
    setEditingAdmin(null);
    setForm(emptyForm);
    setActionError("");
  }

  // Create / Update admin
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.role.trim()
    ) {
      setActionError("Name, email and role are required.");
      return;
    }

    if (modalType === "ADD" && form.password.length < 12) {
      setActionError("Password must contain at least 12 characters.");
      return;
    }

    setSaving(true);
    setActionError("");
    setSuccess("");

    try {
      if (modalType === "ADD") {
        // POST /admins
        await api.post("/admins", {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role.trim().toUpperCase(),
        });
      } else if (modalType === "EDIT" && editingAdmin) {
        // PATCH /admins/:id
        await api.patch(`/admins/${editingAdmin.id}`, {
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role.trim().toUpperCase(),
        });
      }

      // Fetch actual updated backend data
      const response = await api.get("/admins");
      const updatedAdmins = getAdmins(response);

      setAdmins(updatedAdmins);

      if (modalType === "EDIT" && editingAdmin) {
        const updatedAdmin = updatedAdmins.find(
          (admin) => admin.id === editingAdmin.id
        );

        if (!updatedAdmin) {
          setActionError(
            "Admin was updated, but could not be found in the refreshed list."
          );
          return;
        }

        if (
          updatedAdmin.email.toLowerCase() !== form.email.trim().toLowerCase() ||
          updatedAdmin.name !== form.name.trim() ||
          updatedAdmin.role.toUpperCase() !== form.role.trim().toUpperCase()
        ) {
          setActionError(
            "Backend returned different admin details. Please check the update API."
          );
          return;
        }

        setSuccess("Administrator updated successfully.");
      } else {
        setSuccess("Administrator created successfully.");
      }

      setModalType(null);
      setEditingAdmin(null);
      setForm(emptyForm);
    } catch (err) {
      setActionError(
        getApiErrorMessage(
          err,
          modalType === "ADD"
            ? "Unable to create administrator."
            : "Unable to update administrator."
        )
      );
    } finally {
      setSaving(false);
    }
  }

  // Activate / Deactivate
  async function handleStatusChange(admin: Admin) {
    if (updatingStatusId || saving) return;

    const currentlyActive = isAdminActive(admin);
    const nextStatus = !currentlyActive;

    const confirmed = window.confirm(
      currentlyActive
        ? `Are you sure you want to deactivate ${admin.name}?`
        : `Are you sure you want to activate ${admin.name}?`
    );

    if (!confirmed) return;

    setUpdatingStatusId(admin.id);
    setActionError("");
    setSuccess("");

    try {
      // Backend expects isActive: boolean
      await api.patch(`/admins/${admin.id}/status`, {
        isActive: nextStatus,
      });

      const response = await api.get("/admins");
      setAdmins(getAdmins(response));

      setSuccess(
        `${admin.name} has been ${nextStatus ? "activated" : "deactivated"
        }.`
      );
    } catch (err) {
      setActionError(
        getApiErrorMessage(err, "Unable to update administrator status.")
      );
    } finally {
      setUpdatingStatusId(null);
    }
  }

  const activeCount = admins.filter(isAdminActive).length;

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Admin Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage administrator accounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => void loadAdmins(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {refreshing ? <Spinner /> : <RefreshCw size={16} />}
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={openAddModal}
            disabled={loading || saving || Boolean(updatingStatusId)}
            className="flex items-center gap-2 rounded-lg bg-[#172B35] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#263F4C] disabled:opacity-50"
          >
            <Plus size={17} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span className="flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </span>

          <button
            onClick={() => void loadAdmins(true)}
            disabled={refreshing}
            className="font-semibold underline disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {actionError && !modalType && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {actionError}
        </p>
      )}

      {success && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Admins</p>
            <Users size={20} className="text-[#9A763E]" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {loading ? "—" : admins.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Active Admins</p>
            <ShieldCheck size={20} className="text-[#9A763E]" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#172B35]">
            {loading ? "—" : activeCount}
          </h2>
        </div>
      </div>

      {/* Admin Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#172B35]">
            Administrator Accounts
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Manage administrator accounts and their access.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12">
            <Spinner />
            <p className="text-sm text-gray-500">
              Loading administrators...
            </p>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-10 text-center">
            <Users size={32} className="mx-auto mb-3 text-gray-300" />
            <h3 className="font-medium text-gray-700">
              No administrators found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your first administrator.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Administrator</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Created At</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {admins.map((admin) => {
                  const active = isAdminActive(admin);
                  const isSuperAdmin =
                    admin.role?.toUpperCase() === "SUPER_ADMIN";
                  const isUpdating = updatingStatusId === admin.id;

                  return (
                    <tr key={admin.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F3EB] font-semibold text-[#9A763E]">
                            {admin.name?.charAt(0)?.toUpperCase() ?? "A"}
                          </div>
                          <div>
                            <p className="font-medium text-[#172B35]">
                              {admin.name || "Unnamed Admin"}
                            </p>
                            <p className="text-xs text-gray-400">
                              ID: {admin.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail size={15} className="text-gray-400" />
                          {admin.email || "N/A"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {admin.role?.replaceAll("_", " ") || "N/A"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${active
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                            }`}
                        >
                          {active ? (
                            <CircleCheck size={13} />
                          ) : (
                            <CircleX size={13} />
                          )}
                          {active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-500">
                        {formatDate(admin.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        {isSuperAdmin ? (
                          <span className="block text-right text-xs text-gray-400">
                            Protected account
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(admin)}
                              disabled={Boolean(updatingStatusId) || saving}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              onClick={() => void handleStatusChange(admin)}
                              disabled={Boolean(updatingStatusId) || saving}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium disabled:opacity-50 ${active
                                  ? "border-red-200 text-red-600 hover:bg-red-50"
                                  : "border-green-200 text-green-700 hover:bg-green-50"
                                }`}
                            >
                              {isUpdating ? (
                                <Spinner />
                              ) : active ? (
                                <UserX size={14} />
                              ) : (
                                <UserCheck size={14} />
                              )}

                              {isUpdating
                                ? "Updating..."
                                : active
                                  ? "Deactivate"
                                  : "Activate"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="admin-modal-title"
                  className="text-lg font-bold text-[#172B35]"
                >
                  {modalType === "ADD"
                    ? "Add New Administrator"
                    : "Edit Administrator"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {modalType === "ADD"
                    ? "Create a new administrator account."
                    : "Update administrator details."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  disabled={saving}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#9A763E] disabled:bg-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  disabled={saving}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#9A763E] disabled:bg-gray-100"
                />
              </div>

              {/* Password - Add only */}
              {modalType === "ADD" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    required
                    minLength={12}
                    maxLength={128}
                    disabled={saving}
                    placeholder="Minimum 12 characters"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#9A763E] disabled:bg-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Password must contain at least 12 characters.
                  </p>
                </div>
              )}

              {/* Role */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  required
                  disabled={saving}
                  placeholder="Enter role (e.g. OPERATIONS)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#9A763E] disabled:bg-gray-100"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Allowed roles: SALES, OPERATIONS.
                </p>
              </div>

              {/* Modal Error */}
              {actionError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {actionError}
                </p>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    !form.name.trim() ||
                    !form.email.trim() ||
                    !form.role.trim() ||
                    (modalType === "ADD" && form.password.length < 12)
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#172B35] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#263F4C] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Spinner />
                      {modalType === "ADD" ? "Creating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      {modalType === "ADD" ? "Create Admin" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
