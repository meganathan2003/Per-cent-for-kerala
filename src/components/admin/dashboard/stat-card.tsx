
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    isLoading?: boolean;
}

export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconColor = "text-[#172B35]",
    isLoading = false,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    {isLoading ? (
                        <div className="mt-3 h-9 w-24 animate-pulse rounded bg-gray-100" />
                    ) : (
                        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#172B35]">
                            {value}
                        </h3>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                        {description}
                    </p>
                </div>

                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 ${iconColor}`}>
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
}
