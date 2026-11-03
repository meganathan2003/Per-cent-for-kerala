
import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    MapPin,
    Mail,
    Phone,
} from "lucide-react";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Campaign Examples", href: "/campaigns" },
    { label: "Packages", href: "/packages" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
];

const services = [
    { label: "Promote Your Property", href: "/promote-property" },
    { label: "Property Marketing", href: "/packages" },
    { label: "Campaign Planning", href: "/how-it-works" },
    { label: "Marketing Packages", href: "/packages" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-[#173D32] text-white">

            {/* TOP BRAND MESSAGE */}
            <div className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                        <Link
                            href="/promote-property"
                            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#E8D7C1] px-6 py-3.5 text-sm font-semibold text-[#303B35] transition duration-300 hover:-translate-y-1 hover:bg-[#DCC4A5]"
                        >
                            Promote your property
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* THREE COLUMN FOOTER */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:px-10 lg:py-16">

                {/* COLUMN 1: BRAND */}
                <div className="max-w-md">
                    <Link href="/" className="inline-flex">
                        <Image
                            src="/images/app-logo.png"
                            alt="Per-Cent Kerala"
                            width={200}
                            height={90}
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <p className="mt-5 text-sm leading-7 text-white/65">
                        Helping property owners across Kerala connect their
                        properties with the right audience through thoughtful,
                        planned and focused property marketing.
                    </p>

                    <blockquote className="mt-7 border-l-2 border-[#D6AD7B] pl-4">
                        <p className="font-display text-lg italic leading-7 text-[#E8D7C1]">
                            "The right property deserves the right attention."
                        </p>
                    </blockquote>

                    <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                        Property marketing across Kerala
                    </p>
                </div>

                {/* COLUMN 2: QUICK LINKS */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                        Explore
                    </h3>

                    <div className="mt-6 space-y-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="group flex w-fit items-center gap-2 text-sm text-white/60 transition hover:text-[#E8C9A5]"
                            >
                                <span>{link.label}</span>
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* COLUMN 3: SERVICES */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                        What We Do
                    </h3>

                    <div className="mt-6 space-y-4">
                        {services.map((service) => (
                            <Link
                                key={service.label}
                                href={service.href}
                                className="group flex w-fit items-center gap-2 text-sm text-white/60 transition hover:text-[#E8C9A5]"
                            >
                                <span>{service.label}</span>
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

                    <p className="text-xs leading-6 text-white/45">
                        © {currentYear} Per-Cent Kerala. All rights reserved.
                    </p>

                    <p className="text-xs leading-6 text-white/45">
                        Thoughtful marketing. Meaningful connections.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/contact"
                            className="text-xs text-white/55 transition hover:text-[#E8C9A5]"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/how-it-works"
                            className="text-xs text-white/55 transition hover:text-[#E8C9A5]"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
