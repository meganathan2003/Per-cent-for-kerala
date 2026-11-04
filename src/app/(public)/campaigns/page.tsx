"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

/* Palette: Trust Blue + Sand (soft, low glare)
   ink #1f2d3d | muted #55657a | page #fbf9f4 | blue #2b5d94 | blue hover #3a70ab
   soft blue #e4eef8 | pale blue #eef4fb | sand #f8ecd9 | accent #e9a55a | accent text #9a6226 */

const EASE = [0.22, 1, 0.36, 1] as const;

const categories = ["All", "Villas", "Apartments", "Land", "Commercial"];

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
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85",
        tag: "Sample Campaign",
        highlights: [
            "Residential location",
            "5 cents of land",
            "Kakkanad, Ernakulam",
            "Illustrative campaign presentation",
        ],
        audience: "Local home builders, land buyers and property investors.",
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
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
        tag: "Premium Property",
        highlights: [
            "Contemporary villa design",
            "Spacious living areas",
            "Kochi region",
            "Premium property presentation",
        ],
        audience: "Families, professionals and premium home buyers.",
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
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
        tag: "Urban Living",
        highlights: [
            "Modern apartment concept",
            "Urban residential location",
            "Kochi region",
            "Lifestyle-focused presentation",
        ],
        audience: "Working professionals, families and first-time home buyers.",
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
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
        tag: "Lifestyle",
        highlights: [
            "Contemporary architecture",
            "Spacious interiors",
            "Kozhikode region",
            "Lifestyle-led presentation",
        ],
        audience: "Regional families and potential residential buyers.",
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
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
        tag: "Commercial",
        highlights: [
            "Commercial property concept",
            "Business-oriented presentation",
            "Thiruvananthapuram region",
            "Investor-focused promotion",
        ],
        audience: "Business owners, commercial buyers and property investors.",
        strategy: "Business-focused creatives and targeted digital promotion.",
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
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
        tag: "Residential",
        highlights: [
            "Residential apartment concept",
            "Kottayam region",
            "Modern living presentation",
            "Regional audience focus",
        ],
        audience: "Families and residential property seekers.",
        strategy:
            "Regional social media promotion and property-focused creatives.",
    },
];

type Campaign = (typeof campaigns)[number];

export default function CampaignsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selected, setSelected] = useState<Campaign | null>(null);

    // close on Escape + lock page scroll while the popup is open
    useEffect(() => {
        if (!selected) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelected(null);
        };

        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [selected]);

    const filtered =
        activeCategory === "All"
            ? campaigns
            : campaigns.filter((item) => item.category === activeCategory);

    return (
        <main className="min-h-screen overflow-x-clip bg-[#fbf9f4] text-[#1f2d3d] antialiased">
            {/* HEADER: back link on the left, small heading */}
            <header className="mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2b5d94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                >
                    <ArrowLeft
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <h1 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                            Campaigns that bring properties into focus.
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#55657a]">
                            Illustrative campaign concepts showing how different property
                            types can be marketed across Kerala.
                        </p>
                    </div>

                    <Link
                        href="/promote-property"
                        className="group inline-flex h-11 shrink-0 items-center justify-center self-start rounded-full bg-[#2b5d94] px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 md:self-auto"
                    >
                        Promote Your Property
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>
            </header>

            {/* FILTER BAR (stays visible under the navbar while scrolling) */}
            <div className="sticky top-[72px] z-30 border-y border-[#1f2d3d]/10 bg-[#fbf9f4]/90 backdrop-blur-lg sm:top-20">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
                    <div className="-mx-5 min-w-0 flex-1 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                        <div className="flex w-max gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    aria-pressed={activeCategory === category}
                                    className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:text-sm ${activeCategory === category
                                        ? "bg-[#2b5d94] text-white"
                                        : "bg-white text-[#1f2d3d] ring-1 ring-[#1f2d3d]/15 hover:ring-[#2b5d94]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="hidden shrink-0 text-xs text-[#55657a] sm:block">
                        {filtered.length} {filtered.length === 1 ? "campaign" : "campaigns"}
                    </p>
                </div>
            </div>

            {/* CAMPAIGN GRID: image first, text below, no heavy card boxes */}
            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item, index) => (
                            <motion.article
                                layout="position"
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelected(item)}
                                    aria-label={`View ${item.title} campaign`}
                                    className="group block w-full text-left focus-visible:outline-none"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e4eef8] ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-[#2b5d94]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1f2d3d]">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <p className="flex items-center gap-1.5 text-xs text-[#55657a]">
                                            <MapPin size={13} className="shrink-0" />
                                            <span className="truncate">
                                                {item.location} · {item.category}
                                            </span>
                                        </p>

                                        <div className="mt-2 flex items-start justify-between gap-3">
                                            <h2 className="font-display text-xl leading-snug transition-colors duration-300 group-hover:text-[#2b5d94]">
                                                {item.title}
                                            </h2>
                                            <ArrowUpRight
                                                size={20}
                                                className="mt-1 shrink-0 text-[#e9a55a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </div>

                                        <p className="mt-2 text-sm font-semibold text-[#9a6226]">
                                            {item.price}
                                            <span className="ml-2 font-normal text-[#55657a]">
                                                · {item.size}
                                            </span>
                                        </p>
                                    </div>
                                </button>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                <p className="mt-12 text-center text-xs leading-6 text-[#55657a]">
                    These are illustrative campaign concepts only. They are not active
                    property listings, verified offers or live advertisements.
                </p>

                {/* slim CTA */}
                <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#e4eef8] p-6 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <p className="font-display text-xl sm:text-2xl">
                            Want a campaign like this for your property?
                        </p>
                        <p className="mt-1 text-sm text-[#55657a]">
                            Tell us about it and our team will plan the right approach.
                        </p>
                    </div>

                    <Link
                        href="/promote-property"
                        className="group inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#2b5d94] px-7 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Start Your Campaign
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            {/* DETAILS POPUP: split layout on desktop, stacked on mobile */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-end justify-center bg-[#1f2d3d]/50 backdrop-blur-sm sm:items-center sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setSelected(null);
                        }}
                        role="presentation"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="campaign-title"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-[#fbf9f4] shadow-2xl sm:max-h-[88dvh] sm:rounded-3xl lg:flex-row"
                        >
                            {/* photo */}
                            <div className="relative h-44 shrink-0 sm:h-60 lg:h-auto lg:w-[42%]">
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1f2d3d]">
                                    {selected.tag}
                                </span>
                            </div>

                            {/* info (scrolls on its own) */}
                            <div className="relative min-h-0 flex-1 overflow-y-auto">
                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    aria-label="Close campaign details"
                                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#1f2d3d]/15 bg-white text-[#1f2d3d] transition duration-300 hover:bg-[#e4eef8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94]"
                                >
                                    <X size={18} />
                                </button>

                                <div className="p-5 pb-8 sm:p-7 lg:p-8">
                                    <p className="pr-12 text-xs font-semibold text-[#9a6226]">
                                        {selected.category} · Sample campaign
                                    </p>

                                    <h2
                                        id="campaign-title"
                                        className="mt-2 pr-12 font-display text-2xl leading-tight sm:text-3xl"
                                    >
                                        {selected.title}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#55657a]">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={15} />
                                            {selected.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Ruler size={15} />
                                            {selected.size}
                                        </span>
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-[#e4eef8] p-4 sm:p-5">
                                        <p className="text-xs font-semibold text-[#55657a]">
                                            Illustrative property value
                                        </p>
                                        <p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                                            {selected.price}
                                        </p>
                                    </div>

                                    <p className="mt-5 text-sm leading-7 text-[#55657a]">
                                        {selected.description}
                                    </p>

                                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                                        {selected.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex items-start gap-2.5 text-sm"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="mt-0.5 shrink-0 text-[#2b5d94]"
                                                />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-[#f8ecd9] p-4">
                                            <Target size={18} className="text-[#9a6226]" />
                                            <h3 className="mt-3 text-sm font-bold">Target audience</h3>
                                            <p className="mt-1 text-xs leading-5 text-[#55657a]">
                                                {selected.audience}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-[#eef4fb] p-4">
                                            <Megaphone size={18} className="text-[#2b5d94]" />
                                            <h3 className="mt-3 text-sm font-bold">Marketing approach</h3>
                                            <p className="mt-1 text-xs leading-5 text-[#55657a]">
                                                {selected.strategy}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-5 text-xs leading-5 text-[#55657a]">
                                        This sample shows how a campaign could be presented. It is
                                        not an active listing and has no live contact details.
                                    </p>

                                    <Link
                                        href={`/promote-property?campaign=${selected.id}`}
                                        className="group mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#2b5d94] px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                                    >
                                        Promote a Similar Property
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>

                                    <p className="mt-3 text-center text-[11px] text-[#55657a]">
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