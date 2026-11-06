
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    MapPin,
    Megaphone,
    Ruler,
    Target,
    X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   SAME DESIGN SYSTEM AS HOMEPAGE
========================================================= */

const C = {
    navy: "#142D35",
    navyDark: "#0D2027",
    teal: "#167D78",
    tealLight: "#83D4CA",
    tealSoft: "#E8F4F2",
    background: "#F5F7F7",
    text: "#34464B",
    body: "#52666B",
    muted: "#718084",
    border: "#DFE7E7",
    white: "#FFFFFF",
};

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
    "All",
    "Villas",
    "Apartments",
    "Land",
    "Commercial",
];

/* =========================================================
   CAMPAIGNS
========================================================= */

const campaigns = [
    {
        id: "plot-kakkanad",
        title: "Residential Plot Campaign",
        category: "Land",
        location: "Kakkanad, Ernakulam",
        price: "₹48 L",
        size: "5 cents",
        description:
            "A sample campaign showcasing how a residential plot can be presented to potential buyers through focused digital marketing.",
        image: "/images/kerala-land-estates.png",
        tag: "Sample Campaign",
        highlights: [
            "Residential location",
            "5 cents of land",
            "Kakkanad, Ernakulam",
            "Illustrative campaign presentation",
        ],
        audience:
            "Local home builders, land buyers and property investors.",
        strategy:
            "Location-focused social media creatives, regional audience targeting and enquiry generation.",
    },
    {
        id: "villa-kochi",
        title: "Luxury Villa Campaign",
        category: "Villas",
        location: "Kochi, Ernakulam",
        price: "₹1.2 Cr onwards",
        size: "2400 sq.ft",
        description:
            "An illustrative premium villa campaign designed to highlight architecture, lifestyle and property features.",
        image: "/images/kerala-house-villa.jpg",
        tag: "Premium Property",
        highlights: [
            "Contemporary villa design",
            "Spacious living areas",
            "Kochi region",
            "Premium property presentation",
        ],
        audience:
            "Families, professionals and premium home buyers.",
        strategy:
            "High-quality property creatives, location-based targeting and social media advertising.",
    },
    {
        id: "apartment-kochi",
        title: "Modern Apartment Promotion",
        category: "Apartments",
        location: "Kochi, Ernakulam",
        price: "₹65 Lakhs onwards",
        size: "1500 sq.ft",
        description:
            "A sample apartment marketing concept focused on modern living and urban home seekers.",
        image: "/images/kerala-apartments.png",
        tag: "Urban Living",
        highlights: [
            "Modern apartment concept",
            "Urban residential location",
            "Kochi region",
            "Lifestyle-focused presentation",
        ],
        audience:
            "Working professionals, families and first-time home buyers.",
        strategy:
            "Digital campaigns highlighting location, amenities and lifestyle benefits.",
    },
    {
        id: "villa-kozhikode",
        title: "Contemporary Villa Promotion",
        category: "Villas",
        location: "Kozhikode, Kerala",
        price: "₹90 Lakhs onwards",
        size: "2000 sq.ft",
        description:
            "A sample creative direction for presenting a residential villa to relevant regional audiences.",
        image: "/images/kerala-luxury-interior.png",
        tag: "Lifestyle",
        highlights: [
            "Contemporary architecture",
            "Spacious interiors",
            "Kozhikode region",
            "Lifestyle-led presentation",
        ],
        audience:
            "Regional families and potential residential buyers.",
        strategy:
            "Property storytelling, social media creatives and regional audience campaigns.",
    },
    {
        id: "commercial-trivandrum",
        title: "Commercial Space Campaign",
        category: "Commercial",
        location: "Thiruvananthapuram, Kerala",
        price: "Price on enquiry",
        size: "Commercial property",
        description:
            "An illustrative commercial property campaign concept for business owners and investors.",
        image: "/images/kerala-commercial.png",
        tag: "Commercial",
        highlights: [
            "Commercial property concept",
            "Business-oriented presentation",
            "Thiruvananthapuram region",
            "Investor-focused promotion",
        ],
        audience:
            "Business owners, commercial buyers and property investors.",
        strategy:
            "Business-focused creatives and targeted digital promotion.",
    },
    {
        id: "apartment-kottayam",
        title: "Premium Apartment Campaign",
        category: "Apartments",
        location: "Kottayam, Kerala",
        price: "₹55 Lakhs onwards",
        size: "1300 sq.ft",
        description:
            "An illustrative regional apartment promotion concept for residential property marketing.",
        image: "/images/sample-kozhikode-apartment.png",
        tag: "Residential",
        highlights: [
            "Residential apartment concept",
            "Kottayam region",
            "Modern living presentation",
            "Regional audience focus",
        ],
        audience:
            "Families and residential property seekers.",
        strategy:
            "Regional social media promotion and property-focused creatives.",
    },
];

type Campaign = (typeof campaigns)[number];

/* =========================================================
   CAMPAIGNS PAGE
========================================================= */

export default function CampaignsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selected, setSelected] = useState<Campaign | null>(null);

    const pageRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();

    const filtered =
        activeCategory === "All"
            ? campaigns
            : campaigns.filter(
                (item) => item.category === activeCategory
            );

    /* =========================================================
       GSAP ANIMATIONS
    ========================================================= */

    useEffect(() => {
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".campaign-hero-line",
                {
                    scaleX: 0,
                    transformOrigin: "left",
                },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.15,
                }
            );

            gsap.utils
                .toArray<HTMLElement>(".campaign-scroll-reveal")
                .forEach((element) => {
                    gsap.fromTo(
                        element,
                        {
                            opacity: 0,
                            y: 24,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.65,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 94%",
                                once: true,
                            },
                        }
                    );
                });

            gsap.fromTo(
                ".campaign-cta-decoration",
                {
                    scaleX: 0,
                    transformOrigin: "left",
                },
                {
                    scaleX: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".campaign-cta-section",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [reduceMotion]);

    /* =========================================================
       MODAL CONTROLS
    ========================================================= */

    useEffect(() => {
        if (!selected) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelected(null);
            }
        };

        document.addEventListener("keydown", onKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [selected]);

    /* =========================================================
       UI
    ========================================================= */

    return (
        <main
            ref={pageRef}
            className="min-h-screen overflow-x-clip bg-[#F5F7F7] text-[#142D35] antialiased"
        >
            {/* =====================================================
          01 — HERO
      ===================================================== */}

            <header className="mx-auto max-w-[1240px] px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16">

                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#167D78] transition-colors hover:text-[#142D35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78]"
                >
                    <ArrowLeft
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Back to Home
                </Link>

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, y: 22 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.55,
                        ease: EASE,
                    }}
                    className="mt-9 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
                >
                    <div className="max-w-[760px]">

                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#167D78]">
                            Property Marketing · Kerala
                        </p>

                        <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.05em] text-[#142D35] sm:text-5xl lg:text-[60px]">
                            Campaigns that bring
                            <span className="block text-[#167D78]">
                                properties into focus.
                            </span>
                        </h1>

                        <div className="campaign-hero-line mt-6 h-[2px] w-24 bg-[#167D78]" />

                        <p className="mt-6 max-w-[600px] text-sm leading-8 text-[#52666B] sm:text-base">
                            Explore illustrative campaign concepts showing how
                            different property types can be marketed across Kerala.
                        </p>

                    </div>

                    <Link
                        href="/promote-property"
                        className="group inline-flex min-h-[52px] items-center justify-center bg-[#167D78] px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#11645F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78] focus-visible:ring-offset-2"
                    >
                        Promote Your Property

                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>

                </motion.div>
            </header>

            {/* =====================================================
          02 — FILTER BAR
      ===================================================== */}

            <div className="sticky top-[72px] z-30 border-y border-[#DFE7E7] bg-[#F5F7F7]/95 backdrop-blur-xl sm:top-20">
                <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">

                    <div className="-mx-5 min-w-0 flex-1 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                        <div className="flex w-max gap-2">

                            {categories.map((category) => {
                                const isActive = activeCategory === category;

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        aria-pressed={isActive}
                                        className={`relative shrink-0 border px-5 py-2.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78] focus-visible:ring-offset-2 sm:text-sm ${isActive
                                                ? "border-[#142D35] bg-[#142D35] text-white"
                                                : "border-[#DFE7E7] bg-white text-[#52666B] hover:border-[#167D78] hover:text-[#167D78]"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}

                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={filtered.length}
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 5 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="hidden shrink-0 text-xs font-medium text-[#718084] sm:block"
                        >
                            {filtered.length}{" "}
                            {filtered.length === 1 ? "campaign" : "campaigns"}
                        </motion.p>
                    </AnimatePresence>

                </div>
            </div>

            {/* =====================================================
          03 — CAMPAIGN GRID
      ===================================================== */}

            <section className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

                <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

                    <AnimatePresence mode="popLayout">

                        {filtered.map((item, index) => (
                            <motion.article
                                layout
                                key={item.id}
                                initial={
                                    reduceMotion
                                        ? false
                                        : {
                                            opacity: 0,
                                            y: 24,
                                            scale: 0.98,
                                        }
                                }
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 12,
                                    scale: 0.98,
                                }}
                                transition={{
                                    duration: 0.42,
                                    delay: reduceMotion ? 0 : index * 0.055,
                                    ease: EASE,
                                    layout: {
                                        duration: 0.35,
                                        ease: EASE,
                                    },
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelected(item)}
                                    aria-label={`View ${item.title} campaign`}
                                    className="group block w-full text-left focus-visible:outline-none"
                                >

                                    {/* IMAGE */}

                                    <div className="relative aspect-[4/3] overflow-hidden border border-[#DFE7E7] bg-[#E8F4F2] ring-offset-2 transition-shadow duration-500 group-hover:shadow-[0_18px_40px_rgba(20,45,53,0.12)] group-focus-visible:ring-2 group-focus-visible:ring-[#167D78]">

                                        <motion.img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            initial={false}
                                            whileHover={
                                                reduceMotion
                                                    ? undefined
                                                    : { scale: 1.075 }
                                            }
                                            transition={{
                                                duration: 0.8,
                                                ease: EASE,
                                            }}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2027]/55 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                                        <span className="absolute left-4 top-4 border border-white/30 bg-[#142D35]/85 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                                            {item.tag}
                                        </span>

                                        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center bg-[#167D78] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <ArrowUpRight size={19} />
                                        </span>

                                    </div>

                                    {/* CONTENT */}

                                    <div className="mt-5">

                                        <p className="flex items-center gap-1.5 text-xs text-[#718084]">
                                            <MapPin
                                                size={13}
                                                className="shrink-0 text-[#167D78]"
                                            />

                                            <span className="truncate">
                                                {item.location} · {item.category}
                                            </span>
                                        </p>

                                        <div className="mt-3 flex items-start justify-between gap-3">

                                            <h2 className="text-xl font-bold leading-snug text-[#142D35] transition-colors duration-300 group-hover:text-[#167D78]">
                                                {item.title}
                                            </h2>

                                            <ArrowUpRight
                                                size={19}
                                                className="mt-1 shrink-0 text-[#167D78] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                            />

                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-[#167D78]">
                                            {item.price}

                                            <span className="ml-2 font-normal text-[#718084]">
                                                · {item.size}
                                            </span>
                                        </p>

                                        <div className="mt-5 h-px w-0 bg-[#167D78] transition-all duration-500 group-hover:w-full" />

                                    </div>

                                </button>
                            </motion.article>
                        ))}

                    </AnimatePresence>

                </div>

                {/* DISCLAIMER */}

                <p className="campaign-scroll-reveal mt-14 text-center text-xs leading-6 text-[#718084]">
                    These are illustrative campaign concepts only. They are not
                    active property listings, verified offers or live advertisements.
                </p>

                {/* =====================================================
            04 — CTA
        ===================================================== */}

                <div className="campaign-cta-section relative mt-14 overflow-hidden border border-[#DFE7E7] bg-[#E8F4F2] p-6 sm:p-9 lg:p-12">

                    <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#167D78]/15" />

                    <div className="pointer-events-none absolute -right-5 -top-12 h-44 w-44 rounded-full border border-[#167D78]/20" />

                    <div className="campaign-cta-decoration absolute left-0 top-0 h-[3px] w-full bg-[#167D78]" />

                    <div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">

                        <div className="max-w-[620px]">

                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#167D78]">
                                Your property deserves the right audience
                            </p>

                            <h2 className="mt-4 text-2xl font-bold leading-tight text-[#142D35] sm:text-3xl">
                                Want a campaign like this for your property?
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-[#52666B]">
                                Tell us about your property and our team will plan the
                                right marketing approach.
                            </p>

                        </div>

                        <Link
                            href="/promote-property"
                            className="group inline-flex min-h-[50px] w-full shrink-0 items-center justify-center bg-[#142D35] px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#167D78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78] focus-visible:ring-offset-2 sm:w-auto"
                        >
                            Start Your Campaign

                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                    </div>
                </div>

            </section>

            {/* =====================================================
          05 — CAMPAIGN DETAILS MODAL
      ===================================================== */}

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0D2027]/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setSelected(null);
                            }
                        }}
                        role="presentation"
                    >

                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="campaign-title"
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        y: 35,
                                        scale: 0.98,
                                    }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 25,
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: EASE,
                            }}
                            className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden border border-[#DFE7E7] bg-[#F5F7F7] shadow-2xl sm:max-h-[88dvh] lg:flex-row"
                        >

                            {/* MODAL IMAGE */}

                            <div className="relative h-48 shrink-0 overflow-hidden bg-[#E8F4F2] sm:h-64 lg:h-auto lg:w-[42%]">

                                <motion.img
                                    src={selected.image}
                                    alt={selected.title}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { scale: 1.08 }
                                    }
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: EASE,
                                    }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2027]/50 to-transparent" />

                                <span className="absolute left-4 top-4 border border-white/30 bg-[#142D35]/85 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                                    {selected.tag}
                                </span>

                            </div>

                            {/* MODAL CONTENT */}

                            <div className="relative min-h-0 flex-1 overflow-y-auto">

                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    aria-label="Close campaign details"
                                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-[#DFE7E7] bg-white text-[#142D35] transition-all duration-300 hover:rotate-90 hover:bg-[#E8F4F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78]"
                                >
                                    <X size={18} />
                                </button>

                                <div className="p-5 pb-8 sm:p-7 lg:p-9">

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, y: 12 }
                                        }
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: 0.08,
                                        }}
                                    >

                                        <p className="pr-12 text-xs font-bold uppercase tracking-[0.16em] text-[#167D78]">
                                            {selected.category} · Sample Campaign
                                        </p>

                                        <h2
                                            id="campaign-title"
                                            className="mt-3 pr-12 text-2xl font-bold leading-tight text-[#142D35] sm:text-3xl"
                                        >
                                            {selected.title}
                                        </h2>

                                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#718084]">

                                            <span className="flex items-center gap-1.5">
                                                <MapPin
                                                    size={15}
                                                    className="text-[#167D78]"
                                                />
                                                {selected.location}
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <Ruler
                                                    size={15}
                                                    className="text-[#167D78]"
                                                />
                                                {selected.size}
                                            </span>

                                        </div>
                                    </motion.div>

                                    {/* PROPERTY VALUE */}

                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, y: 12 }
                                        }
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: 0.14,
                                        }}
                                        className="mt-6 border border-[#DFE7E7] bg-[#E8F4F2] p-5"
                                    >

                                        <p className="text-xs font-semibold text-[#718084]">
                                            Illustrative property value
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-[#142D35] sm:text-3xl">
                                            {selected.price}
                                        </p>

                                    </motion.div>

                                    <p className="mt-5 text-sm leading-7 text-[#52666B]">
                                        {selected.description}
                                    </p>

                                    {/* HIGHLIGHTS */}

                                    <div className="mt-7">

                                        <h3 className="text-sm font-bold text-[#142D35]">
                                            Property highlights
                                        </h3>

                                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">

                                            {selected.highlights.map(
                                                (highlight, index) => (
                                                    <motion.li
                                                        key={highlight}
                                                        initial={
                                                            reduceMotion
                                                                ? false
                                                                : {
                                                                    opacity: 0,
                                                                    x: -8,
                                                                }
                                                        }
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.18 + index * 0.045,
                                                        }}
                                                        className="flex items-start gap-2.5 text-sm text-[#34464B]"
                                                    >

                                                        <CheckCircle2
                                                            size={16}
                                                            className="mt-0.5 shrink-0 text-[#167D78]"
                                                        />

                                                        <span>{highlight}</span>

                                                    </motion.li>
                                                )
                                            )}

                                        </ul>
                                    </div>

                                    {/* AUDIENCE AND STRATEGY */}

                                    <div className="mt-7 grid gap-4 sm:grid-cols-2">

                                        <div className="border border-[#DFE7E7] bg-white p-5">

                                            <Target
                                                size={19}
                                                className="text-[#167D78]"
                                            />

                                            <h3 className="mt-3 text-sm font-bold text-[#142D35]">
                                                Target audience
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-[#718084]">
                                                {selected.audience}
                                            </p>

                                        </div>

                                        <div className="border border-[#DFE7E7] bg-white p-5">

                                            <Megaphone
                                                size={19}
                                                className="text-[#167D78]"
                                            />

                                            <h3 className="mt-3 text-sm font-bold text-[#142D35]">
                                                Marketing approach
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-[#718084]">
                                                {selected.strategy}
                                            </p>

                                        </div>

                                    </div>

                                    <p className="mt-5 text-xs leading-5 text-[#718084]">
                                        This sample shows how a campaign could be presented.
                                        It is not an active listing and has no live contact details.
                                    </p>

                                    <Link
                                        href={`/promote-property?campaign=${selected.id}`}
                                        className="group mt-6 flex min-h-[50px] w-full items-center justify-center bg-[#167D78] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#11645F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D78] focus-visible:ring-offset-2"
                                    >
                                        Promote a Similar Property

                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>

                                    <p className="mt-3 text-center text-[11px] text-[#718084]">
                                        No payment required at this stage.
                                    </p>

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
