
import Link from "next/link";
import {
    ArrowRight,
    CreditCard,
    Megaphone,
    FileText,
} from "lucide-react";

interface PendingTasksProps {
    pendingPayments: number;
    pendingCampaigns: number;
    pendingQuotations: number;
    isLoading: boolean;
}

const tasks = [
    {
        key: "payments",
        title: "Payments to verify",
        description: "Review submitted payment proofs",
        href: "/admin/payments",
        icon: CreditCard,
        color: "text-amber-600 bg-amber-50",
    },
    {
        key: "campaigns",
        title: "Campaigns pending",
        description: "Review campaign approval requests",
        href: "/admin/campaigns",
        icon: Megaphone,
        color: "text-blue-600 bg-blue-50",
    },
    {
        key: "quotations",
        title: "Recent quotations",
        description: "Review quotation activity",
        href: "/admin/quotations",
        icon: FileText,
        color: "text-purple-600 bg-purple-50",
    },
];

export default function PendingTasks({
    pendingPayments,
    pendingCampaigns,
    pendingQuotations,
    isLoading,
}: PendingTasksProps) {
    const counts: Record<string, number> = {
        payments: pendingPayments,
        campaigns: pendingCampaigns,
        quotations: pendingQuotations,
    };

    return (
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-[#172B35]">
                Pending Tasks
            </h2>
            <p className="mt-1 text-xs text-gray-400">
                Items that need attention
            </p>

            <div className="mt-5 space-y-3">
                {tasks.map((task) => {
                    const Icon = task.icon;

                    return (
                        <Link
                            key={task.key}
                            href={task.href}
                            className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition hover:border-gray-200 hover:bg-gray-50"
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${task.color}`}>
                                <Icon size={19} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-[#172B35]">
                                    {task.title}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {task.description}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                {isLoading ? (
                                    <div className="h-5 w-7 animate-pulse rounded bg-gray-100" />
                                ) : (
                                    <span className="text-sm font-semibold tabular-nums text-[#172B35]">
                                        {counts[task.key]}
                                    </span>
                                )}
                                <ArrowRight size={15} className="text-gray-400" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
