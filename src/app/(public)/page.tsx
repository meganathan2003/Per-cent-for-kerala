
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

const categories = [
    {
        number: "01",
        title: "Houses & Villas",
        description: "Family homes and luxury villas.",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    },
    {
        number: "02",
        title: "Land & Estates",
        description: "Plots, farms and plantations.",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
    {
        number: "03",
        title: "Apartments",
        description: "Modern flats and residential spaces.",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    },
    {
        number: "04",
        title: "Commercial",
        description: "Shops and business properties.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
    },
];

const campaigns = [
    {
        title: "A Home Above the Ordinary",
        location: "Kochi, Ernakulam",
        type: "Residential",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    },
    {
        title: "A Landscape of Possibilities",
        location: "Munnar, Idukki",
        type: "Land & Estate",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
    {
        title: "Designed for Modern Living",
        location: "Kozhikode, Kerala",
        type: "Residential",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    },
];

const steps = [
    {
        number: "01",
        title: "Tell us about your property",
        description:
            "Share your property details, location, expectations and marketing goals.",
        icon: MapPin,
    },
    {
        number: "02",
        title: "Choose your campaign",
        description:
            "We discuss your requirements and help you select a suitable marketing package.",
        icon: Target,
    },
    {
        number: "03",
        title: "We market your property",
        description:
            "Our team prepares the campaign, creates content and promotes your property.",
        icon: Megaphone,
    },
    {
        number: "04",
        title: "Connect with potential buyers",
        description:
            "Receive enquiries and, depending on your package, get support through the sales process.",
        icon: Handshake,
    },
];

const packages = [
    {
        name: "Basic",
        eyebrow: "Start with enquiries",
        description:
            "A simple property promotion approach focused on generating your first enquiries.",
        promise: "5 enquiries",
        promiseDescription: "Guaranteed enquiries",
        features: [
            "Property promotion",
            "Basic audience reach",
            "5 enquiries guaranteed",
            "Enquiry details shared with owner",
            "Owner manages the sale",
        ],
        popular: false,
        style: "light",
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
        style: "featured",
    },
    {
        name: "Diamond",
        eyebrow: "End-to-end sales support",
        description:
            "A complete property marketing and sales service managed by our team.",
        promise: "Full service",
        promiseDescription: "Marketing to sale handling",
        features: [
            "Everything in Premium",
            "Complete digital marketing",
            "Multi-channel advertising",
            "Buyer enquiry coordination",
            "Follow-up and sales coordination",
            "Our team handles the sale process",
        ],
        popular: false,
        style: "dark",
    },
];

const reasons = [
    {
        icon: Camera,
        title: "Creative presentation",
        description:
            "Professional visual content that presents your property with care.",
    },
    {
        icon: Target,
        title: "Targeted promotion",
        description:
            "Campaigns planned around the audience your property needs to reach.",
    },
    {
        icon: Users,
        title: "Personal communication",
        description:
            "A team that understands your requirements before starting the campaign.",
    },
];

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
            initial={reduceMotion ? false : { opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: reduceMotion ? 0 : 0.9,
                delay: reduceMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Home() {
    return (
        <main className="overflow-hidden bg-[#f8f7f2] text-[#193c32]">
            <Navbar />

            {/* HERO */}
            <section className="relative flex min-h-[740px] items-center overflow-hidden bg-[#102820] text-white lg:min-h-[820px]">
                <div
                    className="absolute inset-0 scale-105 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2200')",
                    }}
                />
                <div className="absolute inset-0 bg-[#102820]/65" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#102820] via-[#102820]/85 to-[#102820]/20" />

                <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.16 },
                            },
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="mb-8 flex items-center gap-3"
                        >
                            <span className="h-px w-10 bg-[#d6ad7b]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e2c69e]">
                                Property marketing · Kerala
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: 35 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
                        >
                            Your property.
                            <br />
                            <span className="italic text-[#d8b88d]">
                                The right audience.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 25 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.9 }}
                            className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg"
                        >
                            We bring property presentation, digital advertising and buyer
                            coordination together to help property owners across Kerala
                            reach their next opportunity.
                        </motion.p>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 25 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="mt-10 flex flex-col gap-4 sm:flex-row"
                        >
                            <Link
                                href="/promote-property"
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#d6ad7b] px-8 text-sm font-bold text-[#193c32] transition-all duration-500 hover:-translate-y-1 hover:bg-[#e8c99e] hover:shadow-xl"
                            >
                                Promote My Property
                                <ArrowUpRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>

                            <Link
                                href="/campaigns"
                                className="group inline-flex h-14 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white/10"
                            >
                                Explore Campaigns
                                <Play className="ml-3 h-4 w-4 transition-transform group-hover:scale-110" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 1 }}
                            className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-7 text-xs text-white/75"
                        >
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={16} /> Owner-focused service
                            </span>
                            <span className="flex items-center gap-2">
                                <Camera size={16} /> Creative presentation
                            </span>
                            <span className="flex items-center gap-2">
                                <Megaphone size={16} /> Digital promotion
                            </span>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.35 }}
                        className="relative hidden lg:block"
                    >
                        <div className="ml-auto max-w-[470px]">
                            <div className="overflow-hidden rounded-t-[230px] rounded-b-2xl border border-white/20 p-3">
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    transition={{ duration: 0.8 }}
                                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000"
                                    alt="Beautiful modern property"
                                    className="h-[510px] w-full rounded-t-[220px] rounded-b-xl object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-8 -left-12 max-w-[260px] rounded-xl bg-[#f8f7f2] p-6 text-[#193c32] shadow-2xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a77b4b]">
                                    Our approach
                                </p>
                                <p className="mt-3 font-display text-2xl leading-snug">
                                    More than a listing. A marketing campaign.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* INTRO STRIP */}
            <section className="border-b border-[#e8e5dc] bg-[#f8f7f2]">
                <div className="container mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3">
                    {[
                        ["01", "You share your property"],
                        ["02", "We build your campaign"],
                        ["03", "You receive enquiries"],
                    ].map(([number, label], index) => (
                        <Reveal key={number} delay={index * 0.12}>
                            <div className="flex items-center gap-5">
                                <span className="font-display text-4xl text-[#b68a59]">
                                    {number}
                                </span>
                                <span className="text-sm font-semibold">{label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* PROPERTY CATEGORIES */}
            <section className="bg-white py-24 sm:py-32">
                <div className="container mx-auto max-w-7xl px-6">
                    <Reveal className="mb-14 max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad8051]">
                            What we promote
                        </p>
                        <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                            Every property has
                            <br />
                            its own character.
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-8 text-[#68746d]">
                            From family homes to expansive land, we help bring out what
                            makes your property worth discovering.
                        </p>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((item, index) => (
                            <Reveal key={item.number} delay={index * 0.12}>
                                <Link href="/promote-property" className="group block">
                                    <motion.div
                                        whileHover={{ y: -9 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="relative h-[360px] overflow-hidden rounded-xl"
                                    >
                                        <motion.img
                                            src={item.image}
                                            alt={item.title}
                                            whileHover={{ scale: 1.12 }}
                                            transition={{ duration: 0.85, ease: "easeOut" }}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#102820]/90 via-black/10 to-transparent" />

                                        <span className="absolute left-5 top-5 text-xs font-semibold text-white/80">
                                            {item.number}
                                        </span>

                                        <motion.span
                                            whileHover={{ rotate: 45 }}
                                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#193c32]"
                                        >
                                            <ArrowUpRight size={19} />
                                        </motion.span>

                                        <div className="absolute bottom-0 p-6 text-white">
                                            <h3 className="font-display text-2xl transition-transform duration-500 group-hover:-translate-y-1">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-xs leading-6 text-white/75">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="bg-[#eeeee6] py-24 sm:py-32">
                <div className="container mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad8051]">
                            How it works
                        </p>
                        <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                            From your property
                            <br />
                            to the right audience.
                        </h2>
                        <p className="mt-6 max-w-md text-sm leading-8 text-[#68746d]">
                            Start with a conversation. Our team will understand your
                            requirements, discuss the right package and plan your campaign.
                        </p>
                        <Link
                            href="/promote-property"
                            className="group mt-9 inline-flex items-center gap-3 text-sm font-bold"
                        >
                            Start a conversation
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={18} />
                        </Link>
                    </Reveal>

                    <div>
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <Reveal key={step.number} delay={index * 0.14}>
                                    <motion.div
                                        whileHover={{ x: 7 }}
                                        transition={{ duration: 0.35 }}
                                        className="group flex gap-6 border-b border-[#d9d9cf] py-7 first:pt-0"
                                    >
                                        <span className="pt-2 font-display text-2xl text-[#b68a59]">
                                            {step.number}
                                        </span>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-4">
                                                <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-[#a77b4b]">
                                                    {step.title}
                                                </h3>
                                                <Icon className="h-5 w-5 shrink-0 text-[#a77b4b]" />
                                            </div>
                                            <p className="mt-3 max-w-lg text-sm leading-7 text-[#68746d]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CAMPAIGN EXAMPLES */}
            <section className="bg-white py-24 sm:py-32">
                <div className="container mx-auto max-w-7xl px-6">
                    <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad8051]">
                                Campaign inspiration
                            </p>
                            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
                                See how your property
                                <br />
                                could be presented.
                            </h2>
                            <p className="mt-5 max-w-xl text-sm leading-8 text-[#68746d]">
                                Explore sample campaigns that show the possibilities of
                                creative property marketing.
                            </p>
                        </div>

                        <Link
                            href="/campaigns"
                            className="group inline-flex items-center gap-2 text-sm font-bold"
                        >
                            View all examples
                            <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                        </Link>
                    </Reveal>

                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((item, index) => (
                            <Reveal key={item.title} delay={index * 0.14}>
                                <Link href="/campaigns" className="group block">
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative h-[360px] overflow-hidden rounded-xl"
                                    >
                                        <motion.img
                                            src={item.image}
                                            alt={item.title}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.85 }}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                                        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#193c32]">
                                            Sample campaign
                                        </span>

                                        <div className="absolute bottom-0 p-6 text-white">
                                            <p className="flex items-center gap-2 text-xs text-white/75">
                                                <MapPin size={13} />
                                                {item.location}
                                            </p>
                                            <h3 className="mt-3 font-display text-2xl transition-transform duration-500 group-hover:-translate-y-1">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-xs text-white/70">{item.type}</p>
                                        </div>

                                        <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#193c32] transition-all duration-300 group-hover:rotate-45">
                                            <ArrowUpRight size={19} />
                                        </span>
                                    </motion.div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    <p className="mt-7 text-center text-xs text-[#68746d]">
                        These are illustrative campaign concepts, not active property listings.
                    </p>
                </div>
            </section>

            {/* CHOOSE YOUR CAMPAIGN */}
            <section id="packages" className="relative overflow-hidden bg-[#142f27] py-24 text-white sm:py-32">
                <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/10" />

                <div className="container relative z-10 mx-auto max-w-7xl px-6">
                    <Reveal className="mx-auto mb-16 max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d6ad7b]">
                            Choose your campaign
                        </p>
                        <h2 className="mt-5 font-display text-4xl sm:text-5xl">
                            Three ways to move
                            <br />
                            your property forward.
                        </h2>
                        <p className="mt-5 text-sm leading-8 text-white/65">
                            Whether you need a few enquiries, a wider advertising campaign
                            or complete sales support, choose the level of service that
                            matches your goal.
                        </p>
                    </Reveal>

                    <div className="grid items-stretch gap-7 lg:grid-cols-3">
                        {packages.map((plan, index) => (
                            <Reveal key={plan.name} delay={index * 0.16} className="h-full">
                                <motion.div
                                    whileHover={{ y: -12, scale: 1.015 }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-shadow duration-500 hover:shadow-2xl sm:p-9 ${plan.style === "featured"
                                        ? "border-2 border-[#d6ad7b] bg-[#f8f7f2] text-[#193c32]"
                                        : plan.style === "dark"
                                            ? "border border-white/20 bg-[#1c4035] text-white"
                                            : "border border-white/15 bg-white/[0.06] text-white"
                                        }`}
                                >
                                    {plan.popular && (
                                        <span className="absolute right-7 top-0 rounded-b-lg bg-[#d6ad7b] px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#193c32]">
                                            Most popular
                                        </span>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-65">
                                            {plan.name}
                                        </span>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20">
                                            {index === 0 ? (
                                                <Users size={18} />
                                            ) : index === 1 ? (
                                                <Megaphone size={18} />
                                            ) : (
                                                <Sparkles size={18} />
                                            )}
                                        </span>
                                    </div>

                                    <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-[#b68a59]">
                                        {plan.eyebrow}
                                    </p>

                                    <h3 className="mt-3 font-display text-4xl">
                                        {plan.name}
                                    </h3>

                                    <p className="mt-4 min-h-[72px] text-sm leading-7 opacity-70">
                                        {plan.description}
                                    </p>

                                    <div className="my-7 rounded-xl bg-black/[0.04] p-5">
                                        <p className="font-display text-2xl">{plan.promise}</p>
                                        <p className="mt-1 text-xs opacity-65">
                                            {plan.promiseDescription}
                                        </p>
                                    </div>

                                    <div className="border-t border-current/15 pt-7">
                                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
                                            What's included
                                        </p>

                                        <ul className="space-y-4">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex gap-3 text-sm leading-6">
                                                    <Check
                                                        size={17}
                                                        className="mt-0.5 shrink-0 text-[#b68a59]"
                                                    />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        href={`/promote-property?package=${plan.name.toLowerCase()}`}
                                        className={`mt-auto flex min-h-13 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 group-hover:-translate-y-1 ${plan.style === "featured"
                                            ? "mt-9 bg-[#17392f] text-white hover:bg-[#285647]"
                                            : "mt-9 border border-white/40 text-white hover:bg-white hover:text-[#17392f]"
                                            }`}
                                    >
                                        Choose {plan.name}
                                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>

                    <p className="mt-9 text-center text-xs leading-6 text-white/55">
                        Final pricing, campaign scope and terms will be discussed and
                        confirmed by our team before payment.
                    </p>
                </div>
            </section>

            {/* WHY US */}
            <section className="bg-[#f8f7f2] py-24 sm:py-32">
                <div className="container mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                    <Reveal>
                        <div className="group relative overflow-hidden rounded-xl">
                            <motion.img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
                                alt="Contemporary property interior"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.8 }}
                                className="h-[430px] w-full object-cover sm:h-[570px]"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 pt-24 text-white">
                                <p className="font-display text-3xl">
                                    Presented with care.
                                </p>
                                <p className="mt-2 text-sm text-white/80">
                                    Promoted with purpose.
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad8051]">
                            Why Per-Cent Kerala
                        </p>
                        <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                            More than promotion. A team behind your property.
                        </h2>
                        <p className="mt-6 text-sm leading-8 text-[#68746d]">
                            Every property has its own value and story. We combine creative
                            presentation, digital advertising and personal coordination to
                            help property owners move towards their goals.
                        </p>

                        <div className="mt-9 space-y-7">
                            {reasons.map((reason, index) => {
                                const Icon = reason.icon;

                                return (
                                    <motion.div
                                        key={reason.title}
                                        initial={{ opacity: 0, x: 25 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 0.7 }}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e5e9df] text-[#193c32]">
                                            <Icon size={19} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold">{reason.title}</h3>
                                            <p className="mt-2 text-sm leading-7 text-[#68746d]">
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
            <section className="relative overflow-hidden bg-[#e9e6dc] py-24 sm:py-32">
                <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full border border-[#193c32]/10" />
                <div className="pointer-events-none absolute -right-16 -top-24 h-[320px] w-[320px] rounded-full border border-[#193c32]/10" />

                <Reveal className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad8051]">
                        Your next step starts here
                    </p>
                    <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
                        Let's give your property the attention it deserves.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#68746d]">
                        Tell us about your property. Our team will get in touch to
                        understand your requirements and discuss the right campaign.
                    </p>
                    <Link
                        href="/promote-property"
                        className="group mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#17392f] px-9 text-sm font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#285647] hover:shadow-xl"
                    >
                        Start your property campaign
                        <ArrowUpRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </Reveal>
            </section>
        </main>
    );
}
