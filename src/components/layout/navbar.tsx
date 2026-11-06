"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Menu,
    ShieldCheck,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const links = [
    { label: "Home", href: "/" },
    { label: "Campaign Examples", href: "/campaigns" },
    { label: "Packages", href: "/packages" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
                ? "border-[#DFE7E7]/60 bg-white/50 shadow-[0_8px_30px_rgba(20,45,53,0.06)] backdrop-blur-2xl"
                : "border-white/10 bg-white/40 shadow-[0_2px_15px_rgba(20,45,53,0.03)] backdrop-blur-2xl"
                }`}
        >
            {/* TOP TRUST BAR */}
            <div
                className={`hidden border-b transition-colors duration-300 sm:block ${scrolled
                    ? "border-[#DFE7E7]/70 bg-[#F5F7F7]/55"
                    : "border-white/20 bg-white/25"
                    }`}
            >
                <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-[11px] sm:px-8 lg:px-10">
                    <div className="flex items-center gap-2 text-[#52666B]">
                        <ShieldCheck
                            size={14}
                            className="text-[#167D78]"
                        />

                        <span>
                            Property marketing made simpler across Kerala
                        </span>
                    </div>

                    <span className="font-medium text-[#52666B]">
                        Your Property. More Visibility. Better Reach.
                    </span>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:h-[78px] sm:px-8 lg:px-10">

                {/* BRAND */}
                <Link
                    href="/"
                    aria-label="Per-Cent Kerala home"
                    className="flex shrink-0 items-center"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Per-Cent Kerala"
                        width={450}
                        height={100}
                        priority
                        className="h-10 w-auto object-contain sm:h-12"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-7 lg:flex xl:gap-9">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative flex h-[78px] items-center whitespace-nowrap text-[13px] font-semibold text-[#34464B] transition-colors duration-200 hover:text-[#167D78]"
                        >
                            {link.label}

                            <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 rounded-t-full bg-[#167D78] transition-transform duration-200 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>

                {/* DESKTOP CTA */}
                <div className="hidden items-center lg:flex">
                    <Link
                        href="/promote-property"
                        className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#167D78] px-5 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0D2027] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78] focus-visible:ring-offset-2"
                    >
                        Post Property

                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                {/* MOBILE MENU */}
                <div className="lg:hidden">
                    <Sheet
                        open={menuOpen}
                        onOpenChange={setMenuOpen}
                    >
                        <SheetTrigger
                            aria-label="Open navigation menu"
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#DFE7E7] bg-white/70 text-[#142D35] backdrop-blur-md transition-colors hover:bg-[#E8F4F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78]"
                        >
                            <Menu size={21} />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex w-[85%] flex-col border-l border-[#DFE7E7] bg-white p-0 sm:max-w-sm"
                        >
                            {/* MOBILE HEADER */}
                            <div className="flex h-[76px] items-center justify-between border-b border-[#DFE7E7] px-6">
                                <Link
                                    href="/"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Image
                                        src="/images/logo.png"
                                        alt="Per-Cent Kerala"
                                        width={450}
                                        height={100}
                                        className="h-10 w-auto object-contain"
                                    />
                                </Link>

                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>
                            </div>

                            {/* MOBILE TRUST INFO */}
                            <div className="mx-5 mt-6 flex items-center gap-2 rounded-lg bg-[#E8F4F2] p-3">
                                <ShieldCheck
                                    size={19}
                                    className="shrink-0 text-[#167D78]"
                                />

                                <p className="text-xs font-medium leading-5 text-[#34464B]">
                                    Discover better ways to promote your property.
                                </p>
                            </div>

                            {/* MOBILE LINKS */}
                            <div className="mt-5 flex flex-col px-5">
                                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#718084]">
                                    Explore Per-Cent
                                </p>

                                {links.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{
                                            opacity: 0,
                                            x: 12,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.25,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="group flex min-h-[54px] items-center justify-between border-b border-[#DFE7E7] px-2 text-[14px] font-semibold text-[#34464B] transition-colors hover:text-[#167D78]"
                                        >
                                            {link.label}

                                            <ArrowUpRight
                                                size={17}
                                                className="text-[#718084] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#167D78]"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* MOBILE CTA */}
                            <div className="mt-auto p-5">
                                <Link
                                    href="/promote-property"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#167D78] text-sm font-bold text-white transition-colors hover:bg-[#0D2027]"
                                >
                                    Post Your Property

                                    <ArrowUpRight size={17} />
                                </Link>

                                <p className="mt-4 text-center text-[11px] leading-5 text-[#718084]">
                                    Helping property owners reach more people across Kerala.
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </motion.header>
    );
}