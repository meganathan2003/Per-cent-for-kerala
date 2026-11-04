"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

/* Palette: Trust Blue + Sand
   ink #1f2d3d | muted #55657a | blue #2b5d94 | blue hover #3a70ab
   soft blue #e4eef8 | page #fbf9f4 | accent #e9a55a | accent text #9a6226 */

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

    // glass gets a little more frosted after scrolling, so links stay readable
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 top-0 z-50 overflow-hidden border-b backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-500 ${scrolled
                ? "border-white/60 bg-white/45 shadow-[0_8px_32px_rgba(31,45,61,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
                : "border-white/50 bg-white/25 shadow-[0_6px_24px_rgba(31,45,61,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
                }`}
        >
            {/* specular highlight (liquid shine on the glass) */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/50 to-transparent"
            />
            {/* soft colour glow on the left edge */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 top-0 h-full w-48 bg-[#2b5d94]/10 blur-2xl"
            />

            <nav className="relative mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-10">
                {/* BRAND LOGO */}
                <Link
                    href="/"
                    aria-label="Per-Cent Kerala home"
                    className="relative z-10 flex shrink-0 items-center"
                >
                    <Image
                        src="/images/app-logo.png"
                        alt="Per-Cent Kerala"
                        width={450}
                        height={100}
                        priority
                        className="h-11 w-auto object-contain sm:h-14"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="relative z-10 hidden items-center gap-6 lg:flex xl:gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="group relative whitespace-nowrap py-3 text-[13px] font-semibold text-[#1f2d3d] transition-colors duration-300 hover:text-[#2b5d94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                        >
                            {link.label}
                            <span className="absolute bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[#e9a55a] transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}

                    {/* DESKTOP CTA */}
                    <Link
                        href="/promote-property"
                        className="group inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#2b5d94]/95 px-5 text-xs font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                    >
                        Sell your property
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* MOBILE NAVIGATION */}
                <div className="relative z-10 lg:hidden">
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger
                            aria-label="Open navigation menu"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/50 text-[#1f2d3d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition duration-300 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94]"
                        >
                            <Menu className="h-5 w-5" />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-[85%] border-l border-white/60 bg-[#fbf9f4]/75 p-6 backdrop-blur-2xl backdrop-saturate-150 sm:max-w-sm sm:p-7"
                        >
                            <SheetTitle className="font-display text-2xl text-[#1f2d3d]">
                                Explore
                            </SheetTitle>

                            <div className="mt-10 flex flex-col">
                                {links.map((link, index) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.07, duration: 0.35 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="group flex items-center justify-between border-b border-[#1f2d3d]/10 py-5 font-display text-lg font-medium text-[#1f2d3d] transition-colors duration-300 hover:text-[#2b5d94]"
                                        >
                                            {link.label}
                                            <ArrowUpRight
                                                size={18}
                                                className="text-[#e9a55a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* MOBILE CTA */}
                            <Link
                                href="/promote-property"
                                onClick={() => setMenuOpen(false)}
                                className="mt-9 flex h-12 items-center justify-center rounded-full bg-[#2b5d94] px-6 text-sm font-bold text-white transition duration-300 hover:bg-[#3a70ab]"
                            >
                                Promote My Property
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>

                            <p className="mt-10 text-xs leading-6 text-[#55657a]">
                                Thoughtful property marketing for owners across Kerala.
                            </p>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </motion.header>
    );
}