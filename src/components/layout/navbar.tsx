
"use client";

import { useState } from "react";
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

const links = [
    { label: "Home", href: "/" },
    { label: "Campaign Examples", href: "/campaigns" },
    { label: "Packages", href: "/packages" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="
                  fixed inset-x-0 top-0 z-100
    border-b border-white/30
    bg-white/40
    shadow-[0_4px_24px_rgba(0,0,0,0.06)]
    backdrop-blur-lg
    backdrop-saturate-150
    transition-all duration-300
            "
        >
            <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

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
                        className="h-12 w-auto object-contain sm:h-14"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="
                                group relative whitespace-nowrap py-3
                                text-[13px] font-semibold
                                text-[#303B35]
                                transition-colors duration-300
                                hover:text-[#A47758]
                            "
                        >
                            {link.label}

                            <span
                                className="
                                    absolute bottom-1 left-0
                                    h-0.5 w-full
                                    origin-left scale-x-0
                                    rounded-full
                                    bg-[#A47758]
                                    transition-transform duration-300
                                    group-hover:scale-x-100
                                "
                            />
                        </Link>
                    ))}

                    {/* DESKTOP CTA */}
                    <Link
                        href="/promote-property"
                        className="
                            group inline-flex h-11 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-[#E8D7C1]
                            px-5
                            text-xs font-bold text-[#303B35]
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#DCC4A5]
                            hover:shadow-md
                        "
                    >
                        Sell your property

                        <ArrowUpRight
                            className="
                                ml-2 h-4 w-4
                                transition-transform duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                            "
                        />
                    </Link>
                </div>

                {/* MOBILE NAVIGATION */}
                <div className="lg:hidden">
                    <Sheet
                        open={menuOpen}
                        onOpenChange={setMenuOpen}
                    >
                        <SheetTrigger
                            aria-label="Open navigation menu"
                            className="
                                flex h-11 w-11
                                items-center justify-center
                                rounded-full
                                border border-[#E5E1D8]
                                bg-white/80
                                text-[#303B35]
                                shadow-sm
                                transition-all duration-300
                                hover:bg-white
                            "
                        >
                            <Menu className="h-5 w-5" />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="
                                w-[85%] border-l
                                border-[#E8E5DC]
                                bg-[#FAF9F6]
                                p-6 sm:max-w-sm sm:p-7
                            "
                        >
                            <SheetTitle className="font-display text-2xl text-[#303B35]">
                                Explore
                            </SheetTitle>

                            <div className="mt-10 flex flex-col">
                                {links.map((link, index) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.08,
                                            duration: 0.35,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="
                                                group flex items-center
                                                justify-between
                                                border-b border-[#E5E3DB]
                                                py-5
                                                font-display text-lg
                                                font-medium
                                                text-[#303B35]
                                                transition-colors duration-300
                                                hover:text-[#A47758]
                                            "
                                        >
                                            {link.label}

                                            <ArrowUpRight
                                                size={18}
                                                className="
                                                    transition-transform duration-300
                                                    group-hover:translate-x-0.5
                                                    group-hover:-translate-y-0.5
                                                "
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* MOBILE CTA */}
                            <Link
                                href="/promote-property"
                                onClick={() => setMenuOpen(false)}
                                className="
                                    mt-9 flex h-12
                                    items-center justify-center
                                    rounded-full
                                    bg-[#E8D7C1]
                                    px-6
                                    text-sm font-bold text-[#303B35]
                                    transition-all duration-300
                                    hover:bg-[#DCC4A5]
                                "
                            >
                                Promote My Property
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>

                            <p className="mt-10 text-xs leading-6 text-[#626D66]">
                                Thoughtful property marketing for owners
                                across Kerala.
                            </p>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </motion.header>
    );
}
