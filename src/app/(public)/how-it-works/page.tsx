
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    ClipboardList,
    Megaphone,
    MessageCircle,
    Users,
} from "lucide-react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
} from "framer-motion";
import Navbar from "@/components/layout/navbar";

const EASE = [0.22, 1, 0.36, 1] as const;
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

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
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
        imageAlt: "Property documents and planning",
        tint: "bg-[#e4eef8]",
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
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
        imageAlt: "Business consultation meeting",
        tint: "bg-[#f8ecd9]",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
        imageAlt: "Digital marketing campaign analytics",
        tint: "bg-[#f9e6dc]",
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
        image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200",
        imageAlt: "Real estate agent speaking with a buyer",
        tint: "bg-[#dcebf5]",
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
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : delay,
                ease: EASE,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function SectionHeading({
    label,
    title,
    text,
}: {
    label: string;
    title: string;
    text?: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-[#2b5d94]">
                {label}
            </p>

            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[#1f2d3d] sm:text-4xl lg:text-[2.75rem]">
                {title}
            </h2>

            <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mx-auto mt-4 block h-1 w-16 origin-center rounded-full bg-[#e9a55a]"
            />

            {text && (
                <p className="mt-5 text-base leading-7 text-[#4a5a6e]">
                    {text}
                </p>
            )}
        </div>
    );
}

export default function HowItWorksPage() {
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll();

    const pageProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
    });

    const listRef = useRef<HTMLOListElement>(null);

    const { scrollYProgress: railProgress } = useScroll({
        target: listRef,
        offset: ["start 70%", "end 60%"],
    });

    const railFill = useSpring(railProgress, {
        stiffness: 100,
        damping: 26,
    });

    return (
        <main className="min-h-screen overflow-x-clip bg-[#fbf9f4] text-[#1f2d3d] antialiased">
            {/* PAGE SCROLL PROGRESS */}
            {!reduceMotion && (
                <motion.div
                    aria-hidden
                    style={{ scaleX: pageProgress }}
                    className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[#e9a55a]"
                />
            )}

            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#e4eef8] to-[#fbf9f4]">
                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion
                            ? undefined
                            : { y: [0, 20, 0], x: [0, 10, 0] }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#dcebf5] blur-2xl sm:h-80 sm:w-80"
                />

                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion ? undefined : { y: [0, -20, 0] }
                    }
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#f8ecd9] blur-2xl sm:h-72 sm:w-72"
                />

                <div
                    className={`${container} relative py-24 sm:py-28 lg:py-32`}
                >
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2b5d94] shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-[#e9a55a]" />
                            Simple. Clear. Structured.
                        </div>

                        <h1 className="mt-7 font-display text-4xl leading-tight tracking-tight text-[#1f2d3d] sm:text-5xl lg:text-6xl">
                            How It{" "}
                            <span className="text-[#2b5d94]">
                                Works
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#4a5a6e] sm:text-lg">
                            Promoting your property doesn't have to be
                            complicated. We follow a simple process from
                            your first enquiry to campaign launch and
                            buyer enquiry follow-up.
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/promote-property"
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                            >
                                Promote your property

                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FOUR PROCESS STEPS */}
            <section
                id="steps"
                className="scroll-mt-24 bg-[#eef4fb] py-20 sm:py-24"
            >
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="Our process"
                            title="Four simple steps."
                            text="Here's how we work together to promote your property across Kerala."
                        />
                    </Reveal>

                    <ol
                        ref={listRef}
                        className="relative mx-auto mt-14 max-w-xl space-y-8 sm:space-y-10 lg:max-w-none"
                    >
                        {/* TIMELINE LINE */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute bottom-6 left-6 top-6 hidden w-0.5 bg-[#2b5d94]/15 lg:block"
                        >
                            <motion.div
                                style={{
                                    scaleY: reduceMotion ? 1 : railFill,
                                }}
                                className="h-full w-full origin-top bg-[#2b5d94]"
                            />
                        </div>

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const reverse = index % 2 !== 0;

                            return (
                                <li
                                    key={step.number}
                                    id={`step-${index + 1}`}
                                    className="scroll-mt-28 lg:grid lg:grid-cols-[3rem_1fr] lg:gap-8"
                                >
                                    {/* DESKTOP STEP NUMBER */}
                                    <div className="relative z-10 hidden self-start lg:sticky lg:top-28 lg:block">
                                        <motion.span
                                            initial={
                                                reduceMotion
                                                    ? false
                                                    : { scale: 0 }
                                            }
                                            whileInView={{ scale: 1 }}
                                            viewport={{
                                                once: true,
                                                amount: 0.5,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 320,
                                                damping: 18,
                                            }}
                                            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2b5d94] bg-white font-display text-base font-bold text-[#2b5d94] shadow-sm"
                                        >
                                            {step.number}
                                        </motion.span>
                                    </div>

                                    {/* STEP CARD */}
                                    <motion.article
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { opacity: 0, y: 30 }
                                        }
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.65,
                                            ease: EASE,
                                        }}
                                        className="group grid min-w-0 overflow-hidden rounded-3xl border border-[#1f2d3d]/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg lg:grid-cols-2"
                                    >
                                        {/* STEP IMAGE */}
                                        <div
                                            className={`relative min-h-[230px] overflow-hidden sm:min-h-[300px] lg:min-h-[340px] ${reverse ? "lg:order-2" : ""
                                                }`}
                                        >
                                            <img
                                                src={step.image}
                                                alt={step.imageAlt}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-display text-lg font-semibold text-[#2b5d94] shadow-md sm:left-7 sm:top-7 lg:hidden">
                                                {step.number}
                                            </div>
                                        </div>

                                        {/* STEP CONTENT */}
                                        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-10">
                                            <motion.div
                                                whileHover={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            rotate: -8,
                                                            scale: 1.08,
                                                        }
                                                }
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 15,
                                                }}
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl text-[#2b5d94] ${step.tint}`}
                                            >
                                                <Icon size={23} />
                                            </motion.div>

                                            <p className="mt-5 text-sm font-semibold text-[#9a6226]">
                                                Step {step.number}
                                            </p>

                                            <h3 className="mt-2 font-display text-2xl leading-tight text-[#1f2d3d] sm:text-3xl">
                                                {step.title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-[#4a5a6e] sm:text-base">
                                                {step.description}
                                            </p>

                                            <ul className="mt-6 space-y-3">
                                                {step.points.map(
                                                    (point, pi) => (
                                                        <motion.li
                                                            key={point}
                                                            initial={
                                                                reduceMotion
                                                                    ? false
                                                                    : {
                                                                        opacity: 0,
                                                                        x: -12,
                                                                    }
                                                            }
                                                            whileInView={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                                amount: 0.8,
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                                delay:
                                                                    0.15 +
                                                                    pi * 0.07,
                                                                ease: EASE,
                                                            }}
                                                            className="flex min-w-0 items-start gap-3"
                                                        >
                                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e4eef8] text-[#2b5d94]">
                                                                <Check
                                                                    size={13}
                                                                />
                                                            </span>

                                                            <span className="text-sm leading-6 text-[#1f2d3d]">
                                                                {point}
                                                            </span>
                                                        </motion.li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </motion.article>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
                <Reveal>
                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#e4eef8] via-[#dcebf5] to-[#f8ecd9] px-6 py-12 text-[#1f2d3d] shadow-sm ring-1 ring-[#2b5d94]/15 sm:px-12 sm:py-16">
                        <motion.div
                            aria-hidden
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                        scale: [1, 1.12, 1],
                                        rotate: [0, 8, 0],
                                    }
                            }
                            transition={{
                                duration: 14,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/50"
                        />

                        <motion.div
                            aria-hidden
                            animate={
                                reduceMotion
                                    ? undefined
                                    : { y: [0, -18, 0] }
                            }
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/40"
                        />

                        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                            <div>
                                <p className="text-sm font-semibold text-[#7d4e17]">
                                    Your property journey starts here
                                </p>

                                <h2 className="mt-3 font-display text-3xl leading-tight text-[#1f2d3d] sm:text-4xl lg:text-5xl">
                                    Ready to promote your property?
                                </h2>

                                <p className="mt-4 max-w-xl text-base leading-7 text-[#4a5a6e]">
                                    Share your property details. Our team
                                    will review your requirements and
                                    discuss the next steps with you.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-self-end">
                                <Link
                                    href="/promote-property"
                                    className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:w-auto"
                                >
                                    Promote your property

                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/packages"
                                    className="inline-flex h-14 w-full items-center justify-center rounded-full border border-[#2b5d94]/40 bg-white px-8 text-sm font-semibold text-[#1f2d3d] transition duration-300 hover:-translate-y-0.5 hover:border-[#2b5d94] hover:bg-[#e4eef8] sm:w-auto"
                                >
                                    Explore packages
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
