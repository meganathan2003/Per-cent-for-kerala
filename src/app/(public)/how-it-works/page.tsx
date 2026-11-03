
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    ClipboardList,
    MessageCircle,
    Megaphone,
    Users,
    ShieldCheck,
    Target,
    FileText,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";

const steps = [
    {
        number: "01",
        icon: ClipboardList,
        title: "Submit Your Property",
        description:
            "Tell us about your property. Share its location, property type, size, expected price and other important details through our enquiry form.",
        points: [
            "Submit your property details",
            "Share location and expected price",
            "Provide available property photos",
        ],
        image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
        imageAlt: "Property documents and planning",
    },
    {
        number: "02",
        icon: MessageCircle,
        title: "Consultation & Planning",
        description:
            "Our team reviews your property details and discusses your requirements. Together, we identify a suitable marketing package and campaign approach.",
        points: [
            "Property requirement review",
            "Discuss suitable packages",
            "Understand campaign expectations",
        ],
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
        imageAlt: "Business consultation meeting",
    },
    {
        number: "03",
        icon: Megaphone,
        title: "Campaign Launch",
        description:
            "Once the package, campaign plan and payment are agreed upon, our team prepares the required marketing assets and launches your campaign.",
        points: [
            "Prepare marketing creatives",
            "Set up the agreed advertising campaign",
            "Launch and monitor campaign activity",
        ],
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
        imageAlt: "Digital marketing campaign analytics",
    },
    {
        number: "04",
        icon: Users,
        title: "Enquiries & Follow-up",
        description:
            "As enquiries come in, they are handled according to your selected package. Our team shares relevant enquiry information and provides the agreed level of follow-up support.",
        points: [
            "Receive property enquiries",
            "Review and share enquiry details",
            "Buyer coordination based on package",
        ],
        image:
            "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200",
        imageAlt: "Real estate agent speaking with a buyer",
    },
];

const principles = [
    {
        icon: ShieldCheck,
        title: "Clear Communication",
        description:
            "We discuss the campaign, package and expectations before moving forward.",
    },
    {
        icon: Target,
        title: "Planned Marketing",
        description:
            "Campaigns are planned around the property, location and agreed objectives.",
    },
    {
        icon: FileText,
        title: "Campaign Transparency",
        description:
            "Understand the agreed campaign scope and the updates shared with you.",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" as const },
    },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#FAF9F6]">
            <Navbar />

            {/* HERO */}
            <section className="pt-20">
                <div className="relative isolate flex min-h-[380px] items-center overflow-hidden bg-[#26342C] sm:min-h-[430px] lg:min-h-[480px]">

                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800"
                        alt="Modern residential property"
                        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 -z-10 bg-[#18251F]/65" />

                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#18251F]/85 via-[#18251F]/55 to-[#18251F]/20" />

                    <div className="container-main w-full px-5 py-16 sm:px-8 lg:px-0">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="max-w-3xl"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-9 bg-[#D6AD7B]" />
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C9A5] sm:text-sm">
                                    Simple. Clear. Structured.
                                </p>
                            </div>

                            <h1 className="font-display text-[42px] font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-7xl">
                                Your property.
                                <br />
                                <span className="italic text-[#E8C9A5]">
                                    Our process.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
                                From your first enquiry to campaign launch and
                                buyer coordination, discover how we help you
                                promote your property across Kerala.
                            </p>

                            <Link
                                href="/promote-property"
                                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E8D7C1] px-7 py-3 text-sm font-semibold text-[#303B35] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#DCC4A5]"
                            >
                                Start your campaign
                                <ArrowUpRight size={17} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="bg-white py-14 sm:py-16 lg:py-20">
                <div className="container-main px-5 sm:px-8 lg:px-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                            Our Process
                        </p>

                        <h2 className="mt-4 font-display text-3xl leading-tight text-[#303B35] sm:text-4xl">
                            Four steps to get your property promoted.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#626D66] sm:text-base">
                            We keep the process straightforward. First,
                            understand your property. Then plan, launch and
                            manage the agreed marketing campaign.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* PROCESS STEPS */}
            <section className="bg-[#F3F2EC] py-14 sm:py-16 lg:py-20">
                <div className="container-main space-y-8 px-5 sm:space-y-12 sm:px-8 lg:px-0">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const reverse = index % 2 !== 0;

                        return (
                            <motion.article
                                key={step.number}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={reveal}
                                className={`grid min-w-0 overflow-hidden rounded-3xl border border-[#E7E4DC] bg-white shadow-sm lg:grid-cols-2 ${reverse
                                        ? "lg:[&>*:first-child]:order-2"
                                        : ""
                                    }`}
                            >
                                {/* IMAGE */}
                                <div className="relative min-h-[230px] overflow-hidden sm:min-h-[300px] lg:min-h-[380px]">
                                    <img
                                        src={step.image}
                                        alt={step.imageAlt}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#202923]/45 to-transparent" />

                                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 font-display text-lg font-semibold text-[#526A58] shadow-sm sm:left-7 sm:top-7">
                                        {step.number}
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9ECE4] text-[#526A58]">
                                        <Icon size={23} />
                                    </div>

                                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                                        Step {step.number}
                                    </p>

                                    <h3 className="mt-3 font-display text-2xl leading-tight text-[#303B35] sm:text-3xl">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[#626D66] sm:text-base">
                                        {step.description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {step.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex min-w-0 items-start gap-3"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-[#A47758]"
                                                />
                                                <p className="text-sm leading-6 text-[#4D5B52]">
                                                    {point}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* WHAT TO EXPECT */}
            <section className="bg-white py-14 sm:py-16 lg:py-20">
                <div className="container-main px-5 sm:px-8 lg:px-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                            Our Approach
                        </p>

                        <h2 className="mt-4 font-display text-3xl text-[#303B35] sm:text-4xl">
                            What you can expect from us.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#626D66] sm:text-base">
                            A structured approach to property marketing,
                            with clear discussions and an agreed campaign plan.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {principles.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={reveal}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-2xl border border-[#EAE7DF] bg-[#FAF9F6] p-6 sm:p-7"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9ECE4] text-[#526A58]">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-5 font-display text-xl text-[#35443B]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#626D66]">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-[#F3F2EC] px-5 py-14 sm:px-8 sm:py-16">
                <div className="container-main">
                    <div className="flex flex-col items-start justify-between gap-7 rounded-3xl border border-[#EAE5DA] bg-white p-6 sm:p-9 lg:flex-row lg:items-center lg:p-12">
                        <div className="max-w-xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                                Your property journey starts here
                            </p>

                            <h2 className="mt-3 font-display text-2xl leading-tight text-[#303B35] sm:text-3xl">
                                Ready to promote your property?
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-[#626D66]">
                                Share your property details. Our team will
                                review your requirements and discuss the
                                next steps with you.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Link
                                href="/promote-property"
                                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#E8D7C1] px-6 text-sm font-semibold text-[#303B35] transition hover:bg-[#DCC4A5] sm:w-auto"
                            >
                                Promote your property
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>

                            <Link
                                href="/packages"
                                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#DED9CF] px-6 text-sm font-semibold text-[#35443B] transition hover:bg-[#F3F2EC] sm:w-auto"
                            >
                                Explore packages
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
