
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";
import { getApiErrorMessage } from "@/lib/validations/api-error";

export default function AdminLoginPage() {
  const router = useRouter();

  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isInitialized) {
      void initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  useEffect(() => {
    if (!isInitialized || !isAuthenticated || !user) return;

    if (user.role === "SUPER_ADMIN") {
      router.replace("/admin/super-admin/dashboard");
    } else if (user.role === "OPERATIONS") {
      router.replace("/admin/operations/dashboard");
    }
  }, [isInitialized, isAuthenticated, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login(email.trim(), password);

      const loggedInUser = useAuthStore.getState().user;

      if (loggedInUser?.role === "SUPER_ADMIN") {
        router.replace("/admin/super-admin/dashboard");
      } else if (loggedInUser?.role === "OPERATIONS") {
        router.replace("/admin/operations/dashboard");
      } else {
        setError("This account does not have admin portal access.");
      }
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to sign in."));
    }
  }

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7F9]">
        <Loader2 className="animate-spin text-[#172B35]" size={30} />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7F9] px-4 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#D8B779]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#172B35]/10 blur-3xl" />

      <div className="relative w-full max-w-[420px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-gray-200/80 bg-white p-7 shadow-[0_12px_50px_rgba(23,43,53,0.08)] sm:p-9"
        >
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172B35] shadow-lg shadow-[#172B35]/15">
              <ShieldCheck className="text-[#D8B779]" size={32} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#172B35]">
              Per-Cent Kerala
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Sign in to your admin account.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>

            <div className="group flex h-12 items-center gap-3 rounded-lg border border-gray-300 bg-white px-3.5 transition-all focus-within:border-[#172B35] focus-within:ring-2 focus-within:ring-[#172B35]/10">
              <Mail size={19} className="shrink-0 text-gray-400" />

              <input
                id="email"
                className="h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="group flex h-12 items-center gap-3 rounded-lg border border-gray-300 bg-white px-3.5 transition-all focus-within:border-[#172B35] focus-within:ring-2 focus-within:ring-[#172B35]/10">
              <LockKeyhole size={19} className="shrink-0 text-gray-400" />

              <input
                id="password"
                className="h-full w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#172B35]"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#172B35] text-sm font-semibold text-white shadow-md shadow-[#172B35]/10 transition-all hover:bg-[#243D49] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in to Dashboard"
            )}
          </button>

          <div className="border-t border-gray-100 pt-5 text-center">
            <p className="text-xs text-gray-400">
              <LockKeyhole size={12} className="mr-1 inline-block" />
              Secure Admin Access
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Per-Cent Kerala. All rights reserved.
        </p>
      </div>
    </main>
  );
}
