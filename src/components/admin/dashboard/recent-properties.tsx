
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export interface RecentProperty {
    id: string;
    title: string;
    ownerName: string;
    location: string;
    status: string;
}

interface RecentPropertiesProps {
    properties: RecentProperty[];
    isLoading: boolean;
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        SUBMITTED: "bg-blue-50 text-blue-700",
        UNDER_REVIEW: "bg-amber-50 text-amber-700",
        VERIFICATION: "bg-amber-50 text-amber-700",
        VERIFIED: "bg-green-50 text-green-700",
        REJECTED: "bg-red-50 text-red-700",
        ON_HOLD: "bg-gray-100 text-gray-600",
    };

    const label = status.replaceAll("_", " ");

    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
            {label}
        </span>
    );
}

export default function RecentProperties({
    properties,
    isLoading,
}: RecentPropertiesProps) {
    return (
        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-5">
                <div>
                    <h2 className="font-semibold text-[#172B35]">
                        Recent Properties
                    </h2>
                    <p className="mt-1 text-xs text-gray-400">
                        Latest property submissions
                    </p>
                </div>

                <Link
                    href="/admin/properties"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#A98B53] hover:text-[#172B35]"
                >
                    View all <ArrowRight size={14} />
                </Link>
            </div>

            {isLoading ? (
                <div className="space-y-4 p-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-14 animate-pulse rounded-lg bg-gray-100" />
                    ))}
                </div>
            ) : properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                    <Building2 size={28} className="text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-500">
                        No properties found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        New property submissions will appear here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {properties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/admin/properties/${property.id}`}
                            className="flex flex-col gap-3 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#172B35]">
                                    {property.title}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {property.ownerName} · {property.location}
                                </p>
                            </div>

                            <div className="shrink-0">
                                <StatusBadge status={property.status} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
