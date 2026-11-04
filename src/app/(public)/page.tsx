
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    Camera,
    Megaphone,
    ShieldCheck,
    Sparkles,
    MapPin,
    Users,
    Target,
    Handshake,
    Play,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";

/* Minimal palette: warm off-white, white, soft blue and one amber accent. */

const categories = [
    {
        number: "01",
        title: "Houses & Villas",
        description: "Family homes and luxury villas.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    },
    {
        number: "02",
        title: "Land & Estates",
        description: "Plots, farms and plantations.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
    {
        number: "03",
        title: "Apartments",
        description: "Modern flats and residential spaces.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    },
    {
        number: "04",
        title: "Commercial",
        description: "Shops and business properties.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
    },
];

const campaigns = [
    {
        title: "A Home Above the Ordinary",
        location: "Kochi, Ernakulam",
        type: "Residential",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    },
    {
        title: "A Landscape of Possibilities",
        location: "Munnar, Idukki",
        type: "Land & Estate",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
    {
        title: "Designed for Modern Living",
        location: "Kozhikode, Kerala",
        type: "Residential",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    },
];

const steps = [
    {
        number: "01",
        title: "Tell us about your property",
        description:
            "Share your property details, location, expectations and marketing goals.",
        icon: MapPin,
        tint: "bg-[#eef4fb]",
    },
    {
        number: "02",
        title: "Choose your campaign",
        description:
            "We discuss your requirements and help you select a suitable marketing package.",
        icon: Target,
        tint: "bg-[#eef4fb]",
    },
    {
        number: "03",
        title: "We market your property",
        description:
            "Our team prepares the campaign, creates content and promotes your property.",
        icon: Megaphone,
        tint: "bg-[#eef4fb]",
    },
    {
        number: "04",
        title: "Connect with potential buyers",
        description:
            "Receive enquiries and, depending on your package, get support through the sales process.",
        icon: Handshake,
        tint: "bg-[#eef4fb]",
    },
];

const packages = [
    {
        name: "Basic",
        eyebrow: "Start with enquiries",
        description:
            "A simple property promotion approach focused on generating property enquiries.",
        promise: "Property promotion",
        promiseDescription: "A focused starting point",
        features: [
            "Property promotion",
            "Basic audience reach",
            "Enquiry details shared with owner",
            "Owner manages the sale",
        ],
        popular: false,
        card: "bg-white border-[#e5eaf0]",
        promiseBox: "bg-[#eef4fb]",
        icon: Users,
    },
    {
        name: "Premium",
        eyebrow: "Reach a wider audience",
        description:
            "A paid advertising campaign designed to give your property more visibility.",
        promise: "Paid ads",
        promiseDescription: "Facebook & Instagram",
        features: [
            "Everything in Basic",
            "Facebook advertising",
            "Instagram advertising",
            "Targeted audience campaigns",
            "Professional campaign creatives",
            "Enquiry generation and sharing",
        ],
        popular: true,
        card: "bg-white border-[#2b5d94] border-2",
        promiseBox: "bg-[#eef4fb]",
        icon: Megaphone,
    },
    {
        name: "Diamond",
        eyebrow: "Additional sales support",
        description:
            "A fuller property marketing service with buyer enquiry coordination and agreed follow-up support.",
        promise: "More support",
        promiseDescription: "Marketing and buyer coordination",
        features: [
            "Everything in Premium",
            "Complete digital marketing",
            "Multi-channel advertising",
            "Buyer enquiry coordination",
            "Follow-up and sales coordination",
        ],
        popular: false,
        card: "bg-white border-[#e5eaf0]",
        promiseBox: "bg-[#eef4fb]",
        icon: Sparkles,
    },
];

const reasons = [
    {
        icon: Camera,
        title: "Creative presentation",
        description:
            "Professional visual content that presents your property with care.",
        tint: "bg-[#eef4fb]",
    },
    {
        icon: Target,
        title: "Targeted promotion",
        description:
            "Campaigns planned around the audience your property needs to reach.",
        tint: "bg-[#eef4fb]",
    },
    {
        icon: Users,
        title: "Personal communication",
        description:
            "A team that understands your requirements before starting the campaign.",
        tint: "bg-[#eef4fb]",
    },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : delay,
                ease: EASE,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const heroItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

export default function Home() {
    return (
        <main className="overflow-x-hidden bg-[#fbf9f4] text-[#1f2d3d] antialiased">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#eef4fb]">
                <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#dcebf5] blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#dcebf5] blur-3xl" />

                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-36">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.12 },
                            },
                        }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            variants={heroItem}
                            className="mb-6 flex items-center justify-center gap-3 lg:justify-start"
                        >
                            <span className="h-px w-10 bg-[#e9a55a]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a6226]">
                                Property marketing · Kerala
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroItem}
                            className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                        >
                            Your property.
                            <br />
                            <span className="italic text-[#2b5d94]">
                                The right audience.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={heroItem}
                            className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#55657a] sm:text-lg lg:mx-0"
                        >
                            We bring property presentation, digital advertising and buyer
                            coordination together to help property owners across Kerala reach
                            their next opportunity.
                        </motion.p>

                        <motion.div
                            variants={heroItem}
                            className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center lg:justify-start"
                        >
                            <Link
                                href="/promote-property"
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                            >
                                Promote My Property
                                <ArrowUpRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>

                            <Link
                                href="/campaigns"
                                className="group inline-flex h-14 items-center justify-center rounded-full border border-[#2b5d94]/40 bg-white/80 px-8 text-sm font-semibold text-[#1f2d3d] transition duration-300 hover:-translate-y-0.5 hover:border-[#2b5d94] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                            >
                                Explore Campaigns
                                <Play className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={heroItem}
                            className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-[#1f2d3d]/15 pt-6 text-xs text-[#55657a] lg:justify-start"
                        >
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#2b5d94]" />
                                Owner-focused service
                            </span>
                            <span className="flex items-center gap-2">
                                <Camera size={16} className="text-[#2b5d94]" />
                                Creative presentation
                            </span>
                            <span className="flex items-center gap-2">
                                <Megaphone size={16} className="text-[#2b5d94]" />
                                Digital promotion
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                        className="relative mx-auto w-full max-w-[380px] sm:max-w-[430px] lg:ml-auto lg:mr-0 lg:max-w-[470px]"
                    >
                        <div className="group overflow-hidden rounded-t-[999px] rounded-b-3xl border border-[#1f2d3d]/15 bg-white p-3">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000"
                                alt="Beautiful modern property"
                                loading="eager"
                                className="h-[360px] w-full rounded-t-[999px] rounded-b-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-[440px] lg:h-[510px]"
                            />
                        </div>

                        <div className="absolute -bottom-6 left-1/2 w-[85%] max-w-[260px] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-xl sm:left-auto sm:-left-8 sm:w-auto sm:translate-x-0 lg:-left-12">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a6226]">
                                Our approach
                            </p>
                            <p className="mt-2 font-display text-xl leading-snug sm:text-2xl">
                                More than a listing. A marketing campaign.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* INTRO STRIP */}
            <section className="border-y border-[#e8e5dc] bg-[#fbf9f4]">
                <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 sm:px-6">
                    {[
                        ["01", "You share your property"],
                        ["02", "We build your campaign"],
                        ["03", "You receive enquiries"],
                    ].map(([number, label], index) => (
                        <Reveal key={number} delay={index * 0.1}>
                            <div className="flex items-center justify-center gap-4 sm:justify-start sm:gap-5">
                                <span className="font-display text-4xl text-[#e9a55a]">
                                    {number}
                                </span>
                                <span className="text-sm font-semibold">{label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* PROPERTY CATEGORIES */}
            <section className="bg-[#fbf9f4] py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6">
                    <Reveal className="mb-12 max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                            What we promote
                        </p>
                        <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                            Every property has its own character.
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#55657a] sm:text-base">
                            From family homes to expansive land, we help bring out what makes
                            your property worth discovering.
                        </p>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((item, index) => (
                            <Reveal key={item.number} delay={index * 0.08}>
                                <Link
                                    href="/promote-property"
                                    className="group relative block h-[320px] overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:h-[360px]"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#16283d]/85 via-[#16283d]/20 to-transparent" />

                                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1f2d3d]">
                                        {item.number}
                                    </span>

                                    <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2d3d] transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowUpRight size={19} />
                                    </span>

                                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                        <h3 className="font-display text-2xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-white/90">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="bg-[#eef4fb] py-20 sm:py-28"
            >
                <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <Reveal className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                            How it works
                        </p>
                        <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                            From your property to the right audience.
                        </h2>
                        <p className="mt-5 max-w-md text-sm leading-7 text-[#55657a] sm:text-base">
                            Start with a conversation. Our team will understand your
                            requirements, discuss the right package and plan your campaign.
                        </p>
                        <Link
                            href="/promote-property"
                            className="group mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#2b5d94]"
                        >
                            Start a conversation
                            <ArrowRight
                                className="transition-transform duration-300 group-hover:translate-x-2"
                                size={18}
                            />
                        </Link>
                    </Reveal>

                    <div className="space-y-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <Reveal key={step.number} delay={index * 0.08}>
                                    <div className="group flex items-start gap-4 rounded-2xl border border-[#1f2d3d]/5 bg-white p-5 shadow-[0_1px_0_rgba(31,45,61,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-md sm:gap-6 sm:p-6">
                                        <span
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.tint} text-[#2b5d94]`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-baseline justify-between gap-4">
                                                <h3 className="font-display text-xl sm:text-2xl">
                                                    {step.title}
                                                </h3>
                                                <span className="font-display text-xl text-[#2b5d94]/50">
                                                    {step.number}
                                                </span>
                                            </div>
                                            <p className="mt-2 max-w-lg text-sm leading-7 text-[#55657a]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CAMPAIGN EXAMPLES */}
            <section className="bg-[#fbf9f4] py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6">
                    <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                                Campaign inspiration
                            </p>
                            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                                See how your property could be presented.
                            </h2>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-[#55657a] sm:text-base">
                                Explore sample campaigns that show the possibilities of
                                creative property marketing.
                            </p>
                        </div>

                        <Link
                            href="/campaigns"
                            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#2b5d94]"
                        >
                            View all examples
                            <ArrowUpRight
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                size={18}
                            />
                        </Link>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((item, index) => (
                            <Reveal key={item.title} delay={index * 0.1}>
                                <Link
                                    href="/campaigns"
                                    className="group relative block h-[340px] overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:h-[380px]"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#16283d]/85 via-[#16283d]/15 to-transparent" />

                                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#1f2d3d]">
                                        Sample campaign
                                    </span>

                                    <div className="absolute inset-x-0 bottom-0 p-6 pr-20 text-white">
                                        <p className="flex items-center gap-2 text-xs text-white/90">
                                            <MapPin size={13} />
                                            {item.location}
                                        </p>
                                        <h3 className="mt-3 font-display text-2xl leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs text-white/85">
                                            {item.type}
                                        </p>
                                    </div>

                                    <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2d3d] transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowUpRight size={19} />
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    <p className="mt-7 text-center text-xs text-[#55657a]">
                        These are illustrative campaign concepts, not active property listings.
                    </p>
                </div>
            </section>

            {/* PACKAGES */}
            <section
                id="packages"
                className="relative overflow-hidden bg-[#fbf9f4] py-20 sm:py-28"
            >
                <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-[#1f2d3d]/5" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-[330px] w-[330px] rounded-full border border-[#1f2d3d]/5" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
                    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                            Choose your campaign
                        </p>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl">
                            Three ways to move your property forward.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-[#55657a] sm:text-base">
                            Whether you need a few enquiries, a wider advertising campaign or
                            additional sales support, choose the level of service that matches
                            your goal.
                        </p>
                    </Reveal>

                    <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {packages.map((plan, index) => {
                            const Icon = plan.icon;

                            return (
                                <Reveal
                                    key={plan.name}
                                    delay={index * 0.1}
                                    className={`h-full ${
                                        index === 2
                                            ? "md:col-span-2 lg:col-span-1"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className={`group relative flex h-full flex-col rounded-3xl border p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-8 ${plan.card}`}
                                    >
                                        {plan.popular && (
                                            <span className="absolute right-6 top-0 rounded-b-lg bg-[#2b5d94] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                                                Most popular
                                            </span>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#55657a]">
                                                {plan.name}
                                            </span>
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4fb] text-[#2b5d94]">
                                                <Icon size={18} />
                                            </span>
                                        </div>

                                        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#2b5d94]">
                                            {plan.eyebrow}
                                        </p>

                                        <h3 className="mt-2 font-display text-4xl">
                                            {plan.name}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-[#55657a] lg:min-h-[84px]">
                                            {plan.description}
                                        </p>

                                        <div className={`my-6 rounded-2xl p-5 ${plan.promiseBox}`}>
                                            <p className="font-display text-2xl">
                                                {plan.promise}
                                            </p>
                                            <p className="mt-1 text-xs text-[#55657a]">
                                                {plan.promiseDescription}
                                            </p>
                                        </div>

                                        <div className="border-t border-[#1f2d3d]/10 pt-6">
                                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#55657a]">
                                                What's included
                                            </p>

                                            <ul className="space-y-3.5">
                                                {plan.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex gap-3 text-sm leading-6"
                                                    >
                                                        <Check
                                                            size={17}
                                                            className="mt-0.5 shrink-0 text-[#2b5d94]"
                                                        />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            href={`/promote-property?package=${plan.name.toLowerCase()}`}
                                            className={`mt-auto flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 ${
                                                plan.popular
                                                    ? "bg-[#2b5d94] text-white hover:bg-[#3a70ab]"
                                                    : "border border-[#2b5d94]/40 text-[#1f2d3d] hover:bg-[#2b5d94] hover:text-white"
                                            }`}
                                            style={{ marginTop: "2rem" }}
                                        >
                                            Choose {plan.name}
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <p className="mt-9 text-center text-xs leading-6 text-[#55657a]">
                        Final pricing, campaign scope and terms will be discussed and
                        confirmed by our team before payment.
                    </p>
                </div>
            </section>

            {/* WHY US */}
            <section className="bg-[#fbf9f4] py-20 sm:py-28">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
                    <Reveal>
                        <div className="group relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
                                alt="Contemporary property interior"
                                loading="lazy"
                                className="h-[360px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[480px] lg:h-[560px]"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16283d]/80 to-transparent p-7 pt-24 text-white">
                                <p className="font-display text-2xl sm:text-3xl">
                                    Presented with care.
                                </p>
                                <p className="mt-2 text-sm text-white/90">
                                    Promoted with purpose.
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                            Why Per-Cent Kerala
                        </p>
                        <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                            More than promotion. A team behind your property.
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-[#55657a] sm:text-base">
                            Every property has its own value and story. We combine creative
                            presentation, digital advertising and personal coordination to help
                            property owners move towards their goals.
                        </p>

                        <div className="mt-8 space-y-6">
                            {reasons.map((reason, index) => {
                                const Icon = reason.icon;

                                return (
                                    <motion.div
                                        key={reason.title}
                                        initial={{ opacity: 0, x: 24 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.6,
                                            ease: EASE,
                                        }}
                                        className="flex gap-4"
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${reason.tint} text-[#2b5d94]`}
                                        >
                                            <Icon size={19} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold sm:text-base">
                                                {reason.title}
                                            </h3>
                                            <p className="mt-1.5 text-sm leading-7 text-[#55657a]">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative overflow-hidden bg-[#eef4fb] py-20 sm:py-28">
                <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full border border-[#1f2d3d]/10" />
                <div className="pointer-events-none absolute -right-16 -top-24 h-[300px] w-[300px] rounded-full border border-[#1f2d3d]/10" />

                <Reveal className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6226]">
                        Your next step starts here
                    </p>
                    <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl lg:text-6xl">
                        Let's give your property the attention it deserves.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#55657a] sm:text-base">
                        Tell us about your property. Our team will get in touch to understand
                        your requirements and discuss the right campaign.
                    </p>
                    <Link
                        href="/promote-property"
                        className="group mt-9 inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:px-9"
                    >
                        Start your property campaign
                        <ArrowUpRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </Reveal>
            </section>
        </main>
    );
}
