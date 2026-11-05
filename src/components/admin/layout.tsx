import type { Metadata } from "next";
import "./globals.css";
import AdminShell from "@/components/admin/layout/admin-shell";

export const metadata: Metadata = {
    title: {
        default: "Admin | Per-Cent Kerala",
        template: "%s | Per-Cent Kerala Admin",
    },
    description: "Per-Cent Kerala administration dashboard",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AdminShell>{children}</AdminShell>;
}