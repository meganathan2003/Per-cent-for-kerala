
import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    ArrowRight,
    MapPin,
} from "lucide-react";

/* =========================================================
   DESIGN SYSTEM — NAVY + TEAL
========================================================= */

const C = {
    navy: "#142D35",
    navyDark: "#0D2027",
    teal: "#167D78",
    tealLight: "#83D4CA",
    text: "#34464B",
    muted: "#718084",
    border: "#DFE7E7",
    background: "#F5F7F7",
    white: "#FFFFFF",
};

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

const linkClass =
    "group flex w-fit items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-[#83D4CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#83D4CA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#142D35]";

const arrowClass =
    "opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100";

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-[#142D35] text-white">

            {/* TOP ACCENT LINE */}
            <div className="h-[3px] w-full bg-[#167D78]" />

            {/* MAIN FOOTER */}
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:gap-20 lg:px-10 lg:py-20">

                {/* COLUMN 1 — BRAND */}
                <div className="max-w-[430px] md:col-span-2 lg:col-span-1">

                    <Link
                        href="/"
                        className="inline-flex items-center"
                        aria-label="Per-Cent Kerala home"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Per-Cent Kerala"
                            width={450}
                            height={100}
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <p className="mt-6 max-w-[400px] text-sm leading-8 text-white/65">
                        Helping property owners across Kerala connect their properties
                        with the right audience through thoughtful, planned and focused
                        property marketing.
                    </p>

                    {/* BRAND STATEMENT */}
                    <blockquote className="mt-8 border-l-2 border-[#167D78] pl-5">
                        <p className="text-lg font-medium italic leading-8 text-white">
                            "The right property deserves the right attention."
                        </p>
                    </blockquote>

                    <div className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#83D4CA]">
                        <MapPin className="h-3.5 w-3.5" />
                        Property marketing across Kerala
                    </div>
                </div>

                {/* COLUMN 2 — QUICK LINKS */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                        Explore
                    </h3>

                    <div className="mt-7 space-y-5">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={linkClass}
                            >
                                <span>{link.label}</span>

                                <ArrowUpRight
                                    size={14}
                                    className={arrowClass}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* COLUMN 3 — SERVICES */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                        What We Do
                    </h3>

                    <div className="mt-7 space-y-5">
                        {services.map((service) => (
                            <Link
                                key={service.label}
                                href={service.href}
                                className={linkClass}
                            >
                                <span>{service.label}</span>

                                <ArrowUpRight
                                    size={14}
                                    className={arrowClass}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTACT STRIP */}
            <div className="border-y border-white/10 bg-[#0D2027]">
                <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Have a property to promote?
                        </h3>

                        <p className="mt-1 text-sm text-white/55">
                            Let's discuss the right marketing approach for your property.
                        </p>
                    </div>

                    <Link
                        href="/promote-property"
                        className="group inline-flex min-h-[48px] w-fit items-center gap-3 bg-[#167D78] px-6 text-xs font-bold text-white transition duration-300 hover:bg-[#11645F]"
                    >
                        Promote your property

                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="bg-[#0D2027]">
                <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

                    <p className="text-xs leading-6 text-white/50">
                        © {currentYear} Per-Cent Kerala. All rights reserved.
                    </p>

                    <p className="text-xs leading-6 text-white/50">
                        Thoughtful marketing. Meaningful connections.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/contact"
                            className="text-xs font-medium text-white/65 transition-colors duration-300 hover:text-[#83D4CA]"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/how-it-works"
                            className="text-xs font-medium text-white/65 transition-colors duration-300 hover:text-[#83D4CA]"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
