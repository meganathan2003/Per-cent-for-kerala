import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* Palette: Trust Blue + Sand
   ink #1f2d3d | muted #55657a | blue #2b5d94 | soft blue #e4eef8
   accent #e9a55a | accent text #9a6226 */

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
    "group flex w-fit items-center gap-2 text-sm text-[#55657a] transition-colors duration-300 hover:text-[#2b5d94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e4eef8]";

const arrowClass =
    "opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100";

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-[#e4eef8] text-[#1f2d3d]">
            {/* soft top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#2b5d94] via-[#e9a55a] to-[#f9e6dc]" />

            {/* THREE COLUMN FOOTER */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
                {/* COLUMN 1: BRAND */}
                <div className="max-w-md md:col-span-2 lg:col-span-1">
                    <Link href="/" className="inline-flex" aria-label="Per-Cent Kerala home">
                        <Image
                            src="/images/app-logo.png"
                            alt="Per-Cent Kerala"
                            width={200}
                            height={90}
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <p className="mt-5 text-sm leading-7 text-[#55657a]">
                        Helping property owners across Kerala connect their properties
                        with the right audience through thoughtful, planned and focused
                        property marketing.
                    </p>

                    <blockquote className="mt-7 border-l-2 border-[#e9a55a] pl-4">
                        <p className="font-display text-lg italic leading-7 text-[#2b5d94]">
                            "The right property deserves the right attention."
                        </p>
                    </blockquote>

                    <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-[#9a6226]">
                        Property marketing across Kerala
                    </p>
                </div>

                {/* COLUMN 2: QUICK LINKS */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f2d3d]">
                        Explore
                    </h3>

                    <div className="mt-6 space-y-4">
                        {quickLinks.map((link) => (
                            <Link key={link.label} href={link.href} className={linkClass}>
                                <span>{link.label}</span>
                                <ArrowUpRight size={14} className={arrowClass} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* COLUMN 3: SERVICES */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f2d3d]">
                        What We Do
                    </h3>

                    <div className="mt-6 space-y-4">
                        {services.map((service) => (
                            <Link key={service.label} href={service.href} className={linkClass}>
                                <span>{service.label}</span>
                                <ArrowUpRight size={14} className={arrowClass} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-[#1f2d3d]/10 bg-[#d8e6f4]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
                    <p className="text-xs leading-6 text-[#55657a]">
                        © {currentYear} Per-Cent Kerala. All rights reserved.
                    </p>

                    <p className="text-xs leading-6 text-[#55657a]">
                        Thoughtful marketing. Meaningful connections.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/contact"
                            className="text-xs font-medium text-[#1f2d3d] transition-colors duration-300 hover:text-[#2b5d94]"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/how-it-works"
                            className="text-xs font-medium text-[#1f2d3d] transition-colors duration-300 hover:text-[#2b5d94]"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}