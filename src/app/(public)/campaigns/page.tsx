
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    ArrowLeft,
    MapPin,
    Sparkles,
    Megaphone,
    Target,
    TrendingUp,
    X,
    CheckCircle2,
    Ruler,
    IndianRupee,
} from "lucide-react";

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
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85",
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
        image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
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
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
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
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
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
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
        tag: "Commercial",
        highlights: [
            "Commercial property concept",
            "Business-oriented presentation",
            "Thiruvananthapuram region",
            "Investor-focused promotion",
        ],
        audience: "Business owners, commercial buyers and property investors.",
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
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
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

const strategies = [
    {
        number: "01",
        icon: Target,
        title: "Audience Targeting",
        description:
            "Identify relevant audiences based on property type, location and buyer interests.",
    },
    {
        number: "02",
        icon: Megaphone,
        title: "Creative Promotion",
        description:
            "Present your property through engaging visuals and carefully planned campaigns.",
    },
    {
        number: "03",
        icon: TrendingUp,
        title: "Enquiry Generation",
        description:
            "Generate interested buyer enquiries and share them with the property owner.",
    },
];

export default function CampaignsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedCampaign, setSelectedCampaign] =
        useState<(typeof campaigns)[number] | null>(null);

    useEffect(() => {
        if (!selectedCampaign) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedCampaign(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [selectedCampaign]);

    const filteredCampaigns =
        activeCategory === "All"
            ? campaigns
            : campaigns.filter(
                (campaign) => campaign.category === activeCategory
            );

    return (
        <main className="min-h-screen overflow-hidden bg-[#f8f7f2]">

            {/* HERO */}
            <section className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-[#142f27] px-5 py-24 text-center text-white sm:min-h-[540px] sm:px-6">
                <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#b68a59]/15 blur-[110px]" />
                <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d6ad7b]/10 blur-[110px]" />

                <div className="relative z-10 mx-auto max-w-4xl">
                    <Link
                        href="/"
                        className="mb-12 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-xs text-white/70 backdrop-blur-xl transition hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ad7b]/30 bg-[#d6ad7b]/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c49d] sm:text-xs">
                            <Sparkles size={15} />
                            Our Campaign Showcase
                        </span>

                        <h1 className="mt-8 font-display text-4xl leading-tight sm:text-5xl md:text-7xl">
                            Campaigns that bring
                            <span className="mt-2 block text-[#d6ad7b]">
                                properties into focus.
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                            Explore illustrative campaign concepts and discover how
                            strategic digital marketing can help your property reach
                            the right audience across Kerala.
                        </p>

                        <Link
                            href="/promote-property"
                            className="mt-9 inline-flex items-center rounded-full bg-[#d6ad7b] px-7 py-4 text-sm font-bold text-[#17392f] transition hover:-translate-y-1 hover:bg-[#e5c49d]"
                        >
                            Promote Your Property
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CAMPAIGN GRID */}
            <section className="px-5 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 md:grid-cols-2 md:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b68a59]">
                                Campaign inspiration
                            </p>

                            <h2 className="mt-3 font-display text-3xl text-[#17392f] sm:text-4xl md:text-5xl">
                                Every property deserves
                                <br className="hidden sm:block" /> a better spotlight.
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm leading-7 text-[#68746d] md:justify-self-end">
                            Explore sample campaign presentations to understand how
                            different property types can be marketed to relevant
                            audiences.
                        </p>
                    </div>

                    {/* FILTERS */}
                    <div className="mt-12 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                aria-pressed={activeCategory === category}
                                className={`rounded-full px-5 py-3 text-xs font-semibold transition-all duration-300 ${activeCategory === category
                                        ? "bg-[#17392f] text-white shadow-lg"
                                        : "border border-[#e4e3d9] bg-white text-[#53645a] hover:border-[#b68a59]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* CARDS */}
                    <motion.div
                        layout
                        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCampaigns.map((campaign, index) => (
                                <motion.article
                                    layout
                                    key={campaign.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.35, delay: index * 0.04 }}
                                    className="group overflow-hidden rounded-3xl border border-[#e8e5dc] bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCampaign(campaign)}
                                        className="block w-full text-left"
                                        aria-label={`View ${campaign.title} campaign`}
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={campaign.image}
                                                alt={campaign.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                                            <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                                                {campaign.tag}
                                            </span>

                                            <span className="absolute bottom-5 left-5 flex items-center gap-1.5 text-xs font-medium text-white">
                                                <MapPin size={14} />
                                                {campaign.location}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="font-display text-xl text-[#17392f]">
                                                    {campaign.title}
                                                </h3>

                                                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#b68a59] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                            </div>

                                            <p className="mt-3 text-sm leading-6 text-[#68746d]">
                                                {campaign.description}
                                            </p>

                                            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#eeede6] pt-5">
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#89928b]">
                                                        Illustrative price
                                                    </p>
                                                    <p className="mt-1 text-sm font-bold text-[#17392f]">
                                                        {campaign.price}
                                                    </p>
                                                </div>

                                                <span className="rounded-full bg-[#edf1eb] px-3 py-2 text-[10px] font-semibold text-[#53645a]">
                                                    {campaign.category}
                                                </span>
                                            </div>

                                            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#17392f]">
                                                View Campaign Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </button>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <p className="mt-8 text-center text-xs leading-6 text-[#89928b]">
                        These are illustrative campaign concepts only. They are not
                        active property listings, verified offers or live advertisements.
                    </p>
                </div>
            </section>

            {/* STRATEGY */}
            <section className="bg-[#eeefe8] px-5 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b68a59]">
                            Our approach
                        </p>

                        <h2 className="mt-3 font-display text-3xl text-[#17392f] sm:text-4xl md:text-5xl">
                            More than just promotion.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-[#68746d]">
                            A thoughtful marketing process that connects your property
                            with people most likely to be interested.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {strategies.map((strategy, index) => {
                            const Icon = strategy.icon;

                            return (
                                <motion.div
                                    key={strategy.number}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.12 }}
                                    className="rounded-3xl border border-[#e2e3d9] bg-white p-7 sm:p-9"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf1eb] text-[#17392f]">
                                            <Icon size={22} />
                                        </span>

                                        <span className="font-display text-3xl text-[#d6ad7b]">
                                            {strategy.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-8 font-display text-2xl text-[#17392f]">
                                        {strategy.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[#68746d]">
                                        {strategy.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-5 py-16 sm:px-6 sm:py-24">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#17392f] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
                    <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#b68a59]/15 blur-[100px]" />

                    <div className="relative z-10 mx-auto max-w-2xl">
                        <Sparkles className="mx-auto h-8 w-8 text-[#d6ad7b]" />

                        <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl">
                            Ready to put your property
                            <span className="block text-[#d6ad7b]">
                                in the spotlight?
                            </span>
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
                            Tell us about your property. Let&apos;s plan a marketing
                            campaign that makes it stand out.
                        </p>

                        <Link
                            href="/promote-property"
                            className="mt-9 inline-flex items-center rounded-full bg-[#d6ad7b] px-8 py-4 text-sm font-bold text-[#17392f] transition hover:-translate-y-1 hover:bg-[#e5c49d]"
                        >
                            Start Your Campaign
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CAMPAIGN DETAIL MODAL */}
            <AnimatePresence>
                {selectedCampaign && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071710]/75 p-3 backdrop-blur-md sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setSelectedCampaign(null);
                            }
                        }}
                        role="presentation"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="campaign-modal-title"
                            initial={{ opacity: 0, y: 35, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 25, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#f8f7f2] shadow-2xl sm:max-h-[90vh]"
                        >
                            {/* MODAL HEADER */}
                            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e8e5dc] bg-[#f8f7f2]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b68a59]">
                                        Illustrative Kerala property setting
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-[#53645a]">
                                        Sample campaign
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedCampaign(null)}
                                    aria-label="Close campaign details"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5dc] bg-white text-[#17392f] transition hover:bg-[#edf1eb]"
                                >
                                    <X size={19} />
                                </button>
                            </div>

                            {/* MODAL CONTENT */}
                            <div className="p-5 sm:p-8">
                                <div className="mb-5 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-[#3c8064]" />

                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3c8064]">
                                        Owner details reviewed · Sample only
                                    </span>
                                </div>

                                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                                    <img
                                        src={selectedCampaign.image}
                                        alt={selectedCampaign.title}
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                    <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                                        {selectedCampaign.tag}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b68a59]">
                                        {selectedCampaign.category} · Sample campaign
                                    </p>

                                    <h2
                                        id="campaign-modal-title"
                                        className="mt-2 font-display text-2xl leading-tight text-[#17392f] sm:text-4xl"
                                    >
                                        {selectedCampaign.title}
                                    </h2>

                                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#68746d]">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={15} />
                                            {selectedCampaign.location}
                                        </span>

                                        <span className="flex items-center gap-1.5">
                                            <Ruler size={15} />
                                            {selectedCampaign.size}
                                        </span>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-[#e8e5dc] bg-white p-5 sm:p-6">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#89928b]">
                                            Illustrative property value
                                        </p>

                                        <p className="mt-2 flex items-center font-display text-3xl font-semibold text-[#17392f] sm:text-4xl">
                                            {selectedCampaign.price}
                                        </p>

                                        <p className="mt-3 text-xs leading-6 text-[#89928b]">
                                            This sample shows how a property campaign could be
                                            presented. It is not an active listing and has no
                                            live contact details.
                                        </p>
                                    </div>
                                </div>

                                {/* PROPERTY HIGHLIGHTS */}
                                <div className="mt-8">
                                    <h3 className="font-display text-xl text-[#17392f]">
                                        Campaign highlights
                                    </h3>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {selectedCampaign.highlights.map((highlight) => (
                                            <div
                                                key={highlight}
                                                className="flex items-center gap-3 rounded-xl bg-white p-4"
                                            >
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b68a59]" />

                                                <span className="text-sm text-[#53645a]">
                                                    {highlight}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* MARKETING STRATEGY */}
                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-[#eaece4] p-5">
                                        <Target className="h-5 w-5 text-[#b68a59]" />

                                        <h4 className="mt-4 font-semibold text-[#17392f]">
                                            Target audience
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-[#68746d]">
                                            {selectedCampaign.audience}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-[#eaece4] p-5">
                                        <Megaphone className="h-5 w-5 text-[#b68a59]" />

                                        <h4 className="mt-4 font-semibold text-[#17392f]">
                                            Marketing approach
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-[#68746d]">
                                            {selectedCampaign.strategy}
                                        </p>
                                    </div>
                                </div>

                                {/* MODAL CTA */}
                                <div className="mt-8 rounded-2xl bg-[#17392f] p-5 text-white sm:p-7">
                                    <p className="font-display text-xl sm:text-2xl">
                                        Like this campaign style?
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-white/60">
                                        Tell us about your property. Our team will review
                                        whether a similar marketing approach is suitable.
                                    </p>

                                    <Link
                                        href={`/promote-property?campaign=${selectedCampaign.id}`}
                                        className="mt-6 flex w-full items-center justify-center rounded-full bg-[#d6ad7b] px-6 py-4 text-sm font-bold text-[#17392f] transition hover:-translate-y-1 hover:bg-[#e5c49d]"
                                    >
                                        Promote a Similar Property
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>

                                    <p className="mt-3 text-center text-[10px] text-white/40">
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
