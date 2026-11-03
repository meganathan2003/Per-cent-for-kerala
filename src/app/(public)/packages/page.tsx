
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronDown,
    CircleHelp,
    Megaphone,
    Target,
    Users,
    FileCheck,
    Minus,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/navbar";

const packages = [
    {
        name: "Basic",
        subtitle: "A simple start for local property promotion.",
        description:
            "A practical campaign option for property owners looking to reach nearby potential buyers or tenants.",
        price: "[TBD]",
        image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
        imageAlt: "Beautiful residential home",
        features: [
            "Properties in the same area can share ad sets",
            "Local audience targeting",
            "Property campaign setup",
            "Minimum 5 enquiries guaranteed*",
        ],
        suitable: "Local property owners",
    },
    {
        name: "Premium",
        subtitle: "More reach. More focused promotion.",
        description:
            "A stronger marketing campaign with creative assets and advertising scaled to your budget.",
        price: "[TBD]",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        imageAlt: "Premium modern villa",
        popular: true,
        features: [
            "Dedicated campaign strategy",
            "Facebook and Instagram advertising",
            "Creative assets for promotion",
            "Advertising spend scaled to your budget",
            "Campaign performance updates",
        ],
        suitable: "Owners seeking wider reach",
    },
    {
        name: "Diamond",
        subtitle: "A complete property marketing experience.",
        description:
            "Our fullest campaign option, combining promotion, enquiry coordination and sales assistance.",
        price: "[TBD]",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
        imageAlt: "Luxury property interior",
        features: [
            "Dedicated marketing campaign",
            "Premium creative presentation",
            "Targeted digital advertising",
            "Buyer enquiry coordination",
            "Sales Assist — coming soon",
        ],
        suitable: "Owners seeking end-to-end support",
    },
];

const comparison = [
    { feature: "Photo assets", values: ["[TBD]", "[TBD]", "[TBD]"] },
    { feature: "Video", values: ["[TBD]", "[TBD]", "[TBD]"] },
    {
        feature: "Ad platforms",
        values: ["[TBD]", "Facebook & Instagram", "[TBD]"],
    },
    {
        feature: "Ad set structure",
        values: ["Shared", "Dedicated [TBD]", "Dedicated"],
    },
    { feature: "Lead dashboard", values: ["yes", "yes", "yes"] },
    { feature: "Campaign receipt", values: ["yes", "yes", "yes"] },
    {
        feature: "Sales Assist",
        values: ["no", "no", "Coming soon"],
    },
];

const faqs = [
    {
        question: "What is included in a campaign package?",
        answer:
            "Each package has a different level of campaign support. Basic focuses on local promotion, Premium offers a stronger advertising campaign, and Diamond is designed for fuller marketing and enquiry coordination. The exact creative deliverables and campaign scope will be confirmed with you before starting.",
    },
    {
        question: "How long does a campaign run?",
        answer:
            "Campaign duration will depend on the selected package, property, audience and agreed advertising plan. Our team will explain the proposed duration before the campaign begins.",
    },
    {
        question: "What if I do not receive enquiries?",
        answer:
            "The Basic package is planned with a minimum five-enquiry guarantee, subject to the final campaign terms. Premium and Diamond campaign outcomes depend on the agreed advertising budget, property and audience. We will explain the applicable terms before you proceed.",
    },
    {
        question: "Do I need to pay when I submit my property details?",
        answer:
            "No. Submitting your property details is only an enquiry. Our team will review your information, discuss the suitable package and share the payment details after you agree to proceed.",
    },
    {
        question: "Are there any refunds?",
        answer:
            "Refund eligibility and cancellation terms will be shared in the package agreement before payment. Please contact our team if you need clarification.",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: "easeOut" as const },
    },
};

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description?: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="mx-auto mb-12 max-w-2xl text-center"
        >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a47758]">
                {eyebrow}
            </p>

            <h2 className="mt-4 font-display text-3xl leading-tight text-[#303B35] sm:text-4xl lg:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-sm leading-7 text-[#626D66] sm:text-base">
                    {description}
                </p>
            )}
        </motion.div>
    );
}

function ComparisonValue({ value }: { value: string }) {
    if (value === "yes") {
        return <Check className="mx-auto h-5 w-5 text-[#54866A]" />;
    }

    if (value === "no") {
        return <Minus className="mx-auto h-5 w-5 text-[#A1A7A1]" />;
    }

    return <span>{value}</span>;
}

export default function PackagesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const shouldReduceMotion = useReducedMotion();

    return (
        <main className="overflow-hidden bg-[#FAF9F6]">
            <Navbar />

            {/* HERO */}
            <section className="relative">
                <div className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[470px]">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000"
                        alt="Beautiful modern property in Kerala"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#17231F]/75 via-[#17231F]/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    <div className="container-main relative z-10 flex h-full items-center py-12">
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl text-white"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-9 bg-[#E5C29E]" />
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F0D8BE]">
                                    Campaign packages
                                </span>
                            </div>

                            <h1 className="font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
                                The right campaign.
                                <br />
                                <span className="italic text-[#EAD3B8]">
                                    The right reach.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/95 sm:text-base">
                                Every property has different marketing needs. Choose the level
                                of support that suits your property, goals and budget.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/promote-property"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#E8D7C1] px-6 text-sm font-semibold text-[#303B35] transition hover:-translate-y-1 hover:bg-[#DCC4A5]"
                                >
                                    Promote your property
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>

                                <Link
                                    href="#compare"
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/75 bg-white/15 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
                                >
                                    Compare packages
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* IMAGE BANNER */}
            <section className="bg-[#FAF9F6] px-4 py-12 sm:px-6 md:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={reveal}
                    className="relative mx-auto h-[250px] max-w-7xl overflow-hidden rounded-2xl sm:h-[300px] lg:h-[330px]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1800"
                        alt="Elegant property designed for modern living"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#202923]/75 via-[#202923]/40 to-transparent" />

                    <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-6 text-white sm:px-12 lg:px-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EAD3B8] sm:text-xs">
                            More than a listing
                        </p>

                        <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                            Your property deserves
                            <br />
                            a proper campaign.
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-6 text-white/95">
                            We bring creative presentation and digital advertising together
                            to help your property reach potential buyers and tenants.
                        </p>

                        <Link
                            href="/promote-property"
                            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-[#EAD3B8]"
                        >
                            Get started <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* PACKAGES */}
            <section className="bg-white py-16 sm:py-20">
                <div className="container-main">
                    <SectionHeading
                        eyebrow="Find your campaign"
                        title="Choose the support you need."
                        description="Explore the three levels of property marketing support. Our team will help you understand the right option before you make a decision."
                    />

                    <div className="grid items-stretch gap-7 lg:grid-cols-3">
                        {packages.map((plan, index) => (
                            <motion.article
                                key={plan.name}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ delay: index * 0.12, duration: 0.6 }}
                                whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow duration-500 hover:shadow-xl ${plan.popular
                                        ? "border-[#D4B18B] shadow-lg shadow-[#B68A59]/10"
                                        : "border-[#EAE7DF] shadow-sm"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute left-5 top-5 z-10 rounded-full bg-[#E8D7C1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#514332] shadow-sm">
                                        Popular choice
                                    </div>
                                )}

                                <div className="relative h-[210px] overflow-hidden">
                                    <img
                                        src={plan.image}
                                        alt={plan.imageAlt}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    <div className="absolute bottom-5 left-6 text-white">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                                            Property promotion
                                        </p>
                                        <h3 className="mt-1 font-display text-3xl">
                                            {plan.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <p className="text-sm font-semibold text-[#35483C]">
                                        {plan.subtitle}
                                    </p>

                                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#626D66]">
                                        {plan.description}
                                    </p>

                                    <div className="my-6 border-t border-[#EAE7DF]" />

                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A47758]">
                                        Package highlights
                                    </p>

                                    <ul className="mt-5 flex-1 space-y-4">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm leading-6 text-[#4D5B52]"
                                            >
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDF2EB] text-[#54866A]">
                                                    <Check size={13} />
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-7 rounded-xl bg-[#F5F3ED] p-4">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#858B84]">
                                            Best suited for
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-[#35483C]">
                                            {plan.suitable}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/promote-property?package=${plan.name.toLowerCase()}`}
                                        className={`mt-6 flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${plan.popular
                                                ? "bg-[#E8D7C1] text-[#303B35] hover:bg-[#DCC4A5]"
                                                : "border border-[#D7D9D2] bg-white text-[#35483C] hover:border-[#C8B08E] hover:bg-[#F8F5EF]"
                                            }`}
                                    >
                                        Enquire about {plan.name}
                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <p className="mt-7 text-center text-xs leading-6 text-[#747D75]">
                        * Basic package enquiry guarantee is subject to the final campaign
                        terms. Package pricing and deliverables will be confirmed after
                        discussion.
                    </p>
                </div>
            </section>

            {/* COMPARISON */}
            <section
                id="compare"
                className="scroll-mt-24 bg-[#F3F2EC] py-16 sm:py-20"
            >
                <div className="container-main">
                    <SectionHeading
                        eyebrow="Compare your options"
                        title="Know what each package offers."
                        description="A side-by-side overview to help you understand the available campaign support."
                    />

                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-2xl border border-[#E4E2D9] bg-white shadow-sm md:block">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[#E8E9E1] text-[#35483C]">
                                    <th className="w-[34%] px-7 py-6 text-sm font-semibold">
                                        Features
                                    </th>
                                    <th className="px-5 py-6 text-center text-sm font-semibold">
                                        Basic
                                    </th>
                                    <th className="bg-[#E6E9DF] px-5 py-6 text-center text-sm font-semibold">
                                        Premium
                                    </th>
                                    <th className="px-5 py-6 text-center text-sm font-semibold">
                                        Diamond
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {comparison.map((row, index) => (
                                    <tr
                                        key={row.feature}
                                        className={
                                            index % 2 === 0 ? "bg-white" : "bg-[#FAF9F6]"
                                        }
                                    >
                                        <td className="px-7 py-5 text-sm font-medium text-[#35443B]">
                                            {row.feature}
                                        </td>

                                        {row.values.map((value, valueIndex) => (
                                            <td
                                                key={`${row.feature}-${valueIndex}`}
                                                className={`px-5 py-5 text-center text-sm text-[#59665D] ${valueIndex === 1 ? "bg-[#F5F6F1]" : ""
                                                    }`}
                                            >
                                                <ComparisonValue value={value} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile comparison */}
                    <div className="space-y-4 md:hidden">
                        {packages.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`overflow-hidden rounded-xl border bg-white ${plan.popular ? "border-[#D4B18B]" : "border-[#E4E2D9]"
                                    }`}
                            >
                                <div className="flex items-center justify-between bg-[#E8E9E1] px-5 py-4 text-[#35483C]">
                                    <h3 className="font-display text-2xl">{plan.name}</h3>
                                    {plan.popular && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B704C]">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <div className="divide-y divide-[#EEEEE8] px-5">
                                    {comparison.map((row) => (
                                        <div
                                            key={row.feature}
                                            className="flex items-center justify-between gap-4 py-4"
                                        >
                                            <span className="text-sm text-[#59665D]">
                                                {row.feature}
                                            </span>
                                            <span className="text-right text-sm font-medium text-[#35483C]">
                                                <ComparisonValue value={row.values[index]} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recommendation CTA */}
                    <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#E7E2D8] bg-[#EAE9E1] p-7 text-[#35443B] sm:flex-row sm:p-9">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                                Need some guidance?
                            </p>
                            <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                                Not sure which package fits?
                            </h3>
                            <p className="mt-2 text-sm text-[#626D66]">
                                Tell us about your property. We will help you choose.
                            </p>
                        </div>

                        <Link
                            href="/promote-property"
                            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#E8D7C1] px-6 text-sm font-semibold text-[#303B35] transition hover:bg-[#DCC4A5]"
                        >
                            Get a recommendation
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-white py-16 sm:py-20">
                <div className="container-main">
                    <SectionHeading
                        eyebrow="Getting started"
                        title="Your campaign starts with a conversation."
                        description="No payment is required when you first submit your property details. We discuss the plan with you before moving forward."
                    />

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Users,
                                number: "01",
                                title: "Share details",
                                text: "Tell us about your property and marketing goals.",
                            },
                            {
                                icon: FileCheck,
                                number: "02",
                                title: "We review",
                                text: "Our team reviews the information and understands your needs.",
                            },
                            {
                                icon: Target,
                                number: "03",
                                title: "Choose a plan",
                                text: "We discuss the suitable package, scope and quotation.",
                            },
                            {
                                icon: Megaphone,
                                number: "04",
                                title: "Start promoting",
                                text: "After your approval, we prepare and launch the campaign.",
                            },
                        ].map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative rounded-xl border border-[#EAE7DF] bg-[#FAF9F6] p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E9E1] text-[#526A58]">
                                            <Icon size={21} />
                                        </span>
                                        <span className="font-display text-3xl text-[#C9BBAA]">
                                            {step.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 font-display text-2xl text-[#35443B]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-[#626D66]">
                                        {step.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-[#F3F2EC] py-16 sm:py-20">
                <div className="container-main grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E9E1] text-[#526A58]">
                            <CircleHelp size={23} />
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#A47758]">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 font-display text-4xl leading-tight text-[#303B35] sm:text-5xl">
                            A few things you may want to know.
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#626D66]">
                            Still have questions about packages or the campaign process?
                            Talk to our team.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#526A58] transition hover:text-[#A47758]"
                        >
                            Contact our team <ArrowUpRight size={17} />
                        </Link>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <motion.div
                                    key={faq.question}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="overflow-hidden rounded-xl border border-[#E5E3DB] bg-white"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                    >
                                        <span className="text-sm font-semibold text-[#35443B] sm:text-base">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 text-[#A47758] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 pb-5 text-sm leading-7 text-[#626D66] sm:px-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative overflow-hidden border-y border-[#EAE6DC] bg-[#EDEBE2] py-16 text-[#303B35] sm:py-20">
                <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#C9BBAA]/40" />
                <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border border-[#C9BBAA]/40" />

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container-main relative z-10 text-center"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A47758]">
                        Take the next step
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
                        Ready to give your property more reach?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#626D66]">
                        Share your property details. Let us understand your goals and
                        discuss a campaign that works for you.
                    </p>

                    <Link
                        href="/promote-property"
                        className="mt-8 inline-flex h-13 items-center justify-center rounded-full bg-[#E8D7C1] px-8 text-sm font-semibold text-[#303B35] transition hover:-translate-y-1 hover:bg-[#DCC4A5]"
                    >
                        Promote your property
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
