
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Menu,
    X,
    ShieldCheck,
    ChevronDown,
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
            className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${scrolled
                    ? "shadow-[0_4px_20px_rgba(21,50,75,0.09)]"
                    : "shadow-sm"
                }`}
        >
            {/* TOP TRUST BAR */}
            <div className="hidden border-b border-gray-100 bg-[#F4F7FA] sm:block">
                <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-[11px] sm:px-8 lg:px-10">
                    <div className="flex items-center gap-2 text-[#526579]">
                        <ShieldCheck
                            size={14}
                            className="text-[#12A89D]"
                        />
                        <span>
                            Property marketing made simpler across Kerala
                        </span>
                    </div>

                    <span className="font-medium text-[#526579]">
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
                            className="group relative flex h-[78px] items-center whitespace-nowrap text-[13px] font-semibold text-[#35495D] transition-colors duration-200 hover:text-[#12A89D]"
                        >
                            {link.label}

                            <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 rounded-t-full bg-[#12A89D] transition-transform duration-200 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>

                {/* DESKTOP CTA */}
                <div className="hidden items-center lg:flex">
                    <Link
                        href="/promote-property"
                        className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#12A89D] px-5 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0D938A] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A89D] focus-visible:ring-offset-2"
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
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[#15324B] transition-colors hover:bg-[#F4F7FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A89D]"
                        >
                            <Menu size={21} />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex w-[85%] flex-col border-l border-gray-100 bg-white p-0 sm:max-w-sm"
                        >
                            {/* MOBILE HEADER */}
                            <div className="flex h-[76px] items-center justify-between border-b border-gray-100 px-6">
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
                            <div className="mx-5 mt-6 flex items-center gap-2 rounded-lg bg-[#EAF7F5] p-3">
                                <ShieldCheck
                                    size={19}
                                    className="shrink-0 text-[#12A89D]"
                                />

                                <p className="text-xs font-medium leading-5 text-[#34576A]">
                                    Discover better ways to promote your property.
                                </p>
                            </div>

                            {/* MOBILE LINKS */}
                            <div className="mt-5 flex flex-col px-5">
                                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
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
                                            className="group flex min-h-[54px] items-center justify-between border-b border-gray-100 px-2 text-[14px] font-semibold text-[#35495D] transition-colors hover:text-[#12A89D]"
                                        >
                                            {link.label}

                                            <ArrowUpRight
                                                size={17}
                                                className="text-gray-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#12A89D]"
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
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#12A89D] text-sm font-bold text-white transition-colors hover:bg-[#0D938A]"
                                >
                                    Post Your Property

                                    <ArrowUpRight size={17} />
                                </Link>

                                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
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
