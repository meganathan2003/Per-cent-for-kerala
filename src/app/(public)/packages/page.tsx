
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronDown,
    FileCheck,
    Megaphone,
    Minus,
    ShieldCheck,
    Target,
    Users,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import Navbar from "@/components/layout/navbar";

gsap.registerPlugin(ScrollTrigger);

/* ---------- DESIGN SYSTEM ---------- */

const EASE = [0.22, 1, 0.36, 1] as const;
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

/*
  PER-CENT KERALA V2
  White:       #FFFFFF
  Charcoal:    #1C1C1C
  Gold:        #B8924A
  Gold Hover:  #9F7C3D
  Warm BG:     #F8F6F1
*/

/* ---------- PACKAGE DATA ---------- */

const packages = [
    {
        name: "Basic",
        subtitle: "A practical starting point for local visibility.",
        description:
            "Designed for owners who want to introduce their property to a relevant local audience.",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop",
        imageAlt: "Green residential land in Kerala",
        features: [
            "Properties in the same area can share ad sets",
            "Local audience targeting",
            "Property campaign planning",
        ],
        suitable: "Local property owners",
        popular: false,
    },
    {
        name: "Premium",
        subtitle: "More reach. More focused promotion.",
        description:
            "A stronger marketing campaign with creative assets and advertising scaled to your budget.",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
        imageAlt: "Premium modern villa",
        features: [
            "Dedicated campaign strategy",
            "Facebook and Instagram advertising",
            "Creative assets as agreed",
            "Advertising budget planned with you",
            "Performance updates as agreed",
        ],
        suitable: "Owners seeking wider reach",
        popular: true,
    },
    {
        name: "Diamond",
        subtitle: "A more complete property marketing experience.",
        description:
            "A fuller campaign option with promotion and buyer enquiry coordination. Final deliverables are agreed before launch.",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop",
        imageAlt: "Luxury property interior",
        features: [
            "Dedicated marketing campaign",
            "Premium creative presentation",
            "Targeted digital advertising",
            "Buyer enquiry coordination",
            "Sales assistance details shared during consultation",
        ],
        suitable: "Owners seeking end-to-end support",
        popular: false,
    },
];

const comparison = [
    {
        feature: "Photo assets",
        values: ["To be confirmed", "To be confirmed", "To be confirmed"],
    },
    {
        feature: "Video",
        values: ["To be confirmed", "To be confirmed", "To be confirmed"],
    },
    {
        feature: "Ad platforms",
        values: [
            "To be confirmed",
            "Facebook & Instagram",
            "To be confirmed",
        ],
    },
    {
        feature: "Ad set structure",
        values: ["Shared where suitable", "Dedicated plan", "Dedicated plan"],
    },
    {
        feature: "Lead reporting",
        values: [
            "To be confirmed",
            "To be confirmed",
            "To be confirmed",
        ],
    },
    {
        feature: "Campaign summary",
        values: [
            "To be confirmed",
            "To be confirmed",
            "To be confirmed",
        ],
    },
    {
        feature: "Buyer enquiry coordination",
        values: [
            "To be discussed",
            "To be discussed",
            "To be discussed",
        ],
    },
];

const steps = [
    {
        icon: Users,
        number: "1",
        title: "Share details",
        text: "Tell us about your property and marketing goals.",
        tint: "bg-[#F5EFE3]",
    },
    {
        icon: FileCheck,
        number: "2",
        title: "We review",
        text: "Our team reviews the information and understands your needs.",
        tint: "bg-[#F3EBDD]",
    },
    {
        icon: Target,
        number: "3",
        title: "Choose a plan",
        text: "We discuss the suitable package, scope and quotation.",
        tint: "bg-[#F6EDE1]",
    },
    {
        icon: Megaphone,
        number: "4",
        title: "Start promoting",
        text: "After your approval, we prepare and launch the campaign.",
        tint: "bg-[#EFE5D2]",
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
            "Enquiry volume can vary based on the property, location, audience, creative and advertising budget. We will explain the proposed campaign scope and any applicable commitments before you proceed.",
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

const marqueeItems = [
    "Discuss your campaign before payment",
    "Local audience targeting",
    "Facebook & Instagram promotion",
    "Property-focused creative planning",
    "Clear package consultation",
    "Enquiry follow-up process",
];

/* ---------- ANIMATION HELPERS ---------- */

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

function MaskedLine({
    text,
    baseDelay = 0,
}: {
    text: string;
    baseDelay?: number;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <span className="block">
            {text.split(" ").map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden pb-1 align-bottom"
                >
                    <motion.span
                        className="inline-block"
                        initial={reduceMotion ? false : { y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.8,
                            delay: reduceMotion ? 0 : baseDelay + i * 0.08,
                            ease: EASE,
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

function SectionHeading({
    label,
    title,
    text,
    center = true,
}: {
    label: string;
    title: string;
    text?: string;
    center?: boolean;
}) {
    return (
        <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            <p className="text-sm font-semibold tracking-wide text-[#B8924A]">
                {label}
            </p>

            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[#1C1C1C] sm:text-4xl lg:text-[2.75rem]">
                {title}
            </h2>

            <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className={`mt-4 block h-1 w-16 rounded-full bg-[#B8924A] ${
                    center ? "mx-auto origin-center" : "origin-left"
                }`}
            />

            {text && (
                <p className="mt-5 text-base leading-7 text-[#66615A]">
                    {text}
                </p>
            )}
        </div>
    );
}

function CellValue({ value }: { value: string }) {
    if (value === "yes") {
        return (
            <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 18,
                }}
                className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#B8924A]"
            >
                <Check className="h-4 w-4 text-white" aria-label="Included" />
            </motion.span>
        );
    }

    if (value === "no") {
        return (
            <Minus
                className="mx-auto h-5 w-5 text-[#99938A]"
                aria-label="Not included"
            />
        );
    }

    if (
        value.toLowerCase().includes("to be confirmed") ||
        value.toLowerCase().includes("to be discussed")
    ) {
        return <span className="text-[#81796D]">{value}</span>;
    }

    return <span className="text-[#1C1C1C]">{value}</span>;
}

function FloatChip({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={
                reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, y: [0, -8, 0] }
            }
            transition={{
                opacity: { duration: 0.5, delay: 0.9 + delay },
                scale: { duration: 0.5, delay: 0.9 + delay, ease: EASE },
                y: {
                    duration: 4.5,
                    delay: 1.4 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            className={`absolute z-20 rounded-2xl border border-[#B8924A]/10 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(28,28,28,0.12)] ${className}`}
        >
            {children}
        </motion.div>
    );
}

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

/* ---------- PACKAGES PAGE ---------- */

export default function PackagesPage() {
    const reduceMotion = useReducedMotion();

    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [activePlan, setActivePlan] = useState(1);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
    });

    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(heroProgress, [0, 1], ["0%", "12%"]);

    /* ---------- GSAP + ANIME.JS ---------- */

    useEffect(() => {
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            /* Hero content reveal */
            gsap.fromTo(
                ".packages-gsap-heading",
                { opacity: 0, y: 45, filter: "blur(8px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".packages-gsap-heading",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            /* Package cards entrance */
            gsap.fromTo(
                ".gsap-package-card",
                { opacity: 0, y: 75, rotateX: 8 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.9,
                    stagger: 0.18,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-package-grid",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            /* Package image reveal */
            gsap.utils
                .toArray<HTMLElement>(".gsap-package-image")
                .forEach((image) => {
                    gsap.fromTo(
                        image,
                        { scale: 1.2, clipPath: "inset(8% 8% 8% 8%)" },
                        {
                            scale: 1,
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: image,
                                start: "top 90%",
                                once: true,
                            },
                        }
                    );
                });

            /* Comparison rows */
            gsap.fromTo(
                ".gsap-comparison-row",
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".gsap-comparison-table",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            /* Process steps */
            gsap.fromTo(
                ".gsap-process-step",
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-process-grid",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            /* FAQ items */
            gsap.fromTo(
                ".gsap-faq-item",
                { opacity: 0, x: 25 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".gsap-faq-list",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            /* Final CTA */
            gsap.fromTo(
                ".gsap-package-cta",
                { opacity: 0, y: 55, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-package-cta",
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            gsap.to(".gsap-cta-ring", {
                rotate: 360,
                duration: 35,
                repeat: -1,
                ease: "none",
            });
        });

        /* Anime.js: package icons and badges */
        const iconObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animate(entry.target, {
                        scale: [0.5, 1.18, 1],
                        rotate: ["-15deg", "8deg", "0deg"],
                        opacity: [0, 1],
                        duration: 900,
                        ease: "outElastic(1, .65)",
                    });

                    iconObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.5 }
        );

        document
            .querySelectorAll("[data-anime-package-icon]")
            .forEach((element) => iconObserver.observe(element));

        /* Anime.js: feature list stagger */
        const featureObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const items = entry.target.querySelectorAll(
                        "[data-anime-feature]"
                    );

                    animate(items, {
                        opacity: [0, 1],
                        translateX: [-15, 0],
                        delay: stagger(90),
                        duration: 600,
                        ease: "outQuad",
                    });

                    featureObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.25 }
        );

        document
            .querySelectorAll("[data-anime-features]")
            .forEach((element) => featureObserver.observe(element));

        /* Anime.js: CTA button hover */
        const buttons = document.querySelectorAll("[data-anime-button]");
        const cleanups: (() => void)[] = [];

        buttons.forEach((button) => {
            const enter = () => {
                animate(button, {
                    scale: 1.04,
                    duration: 220,
                    ease: "outQuad",
                });
            };

            const leave = () => {
                animate(button, {
                    scale: 1,
                    duration: 350,
                    ease: "outElastic(1, .7)",
                });
            };

            button.addEventListener("mouseenter", enter);
            button.addEventListener("mouseleave", leave);

            cleanups.push(() => {
                button.removeEventListener("mouseenter", enter);
                button.removeEventListener("mouseleave", leave);
            });
        });

        return () => {
            ctx.revert();
            iconObserver.disconnect();
            featureObserver.disconnect();
            cleanups.forEach((cleanup) => cleanup());
        };
    }, [reduceMotion]);

    return (
        <main className="overflow-x-clip bg-[#F8F6F1] text-[#1C1C1C] antialiased">
            {/* PAGE PROGRESS */}

            {!reduceMotion && (
                <motion.div
                    aria-hidden
                    style={{ scaleX: progress }}
                    className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[#B8924A]"
                />
            )}

            <Navbar />

            {/* HERO SECTION */}

            <section
                ref={heroRef}
                className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE3] to-[#F8F6F1]"
            >
                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion
                            ? undefined
                            : { y: [0, 24, 0], x: [0, 12, 0] }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#E9DFC9] blur-2xl sm:h-80 sm:w-80"
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
                    className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#E8D9BC] blur-2xl sm:h-72 sm:w-72"
                />

                <div
                    className={`${container} relative grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24 lg:pt-36`}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        <motion.p
                            variants={heroItem}
                            className="inline-flex items-center gap-2 rounded-full border border-[#B8924A]/15 bg-white px-4 py-2 text-xs font-semibold text-[#8B6B35] shadow-sm sm:text-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8924A] opacity-70 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8924A]" />
                            </span>
                            Property marketing packages
                        </motion.p>

                        <h1 className="packages-gsap-heading mt-6 font-display text-4xl leading-[1.1] tracking-tight text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                            <MaskedLine
                                text="Find the right plan."
                                baseDelay={0.2}
                            />
                            <MaskedLine
                                text="For your property."
                                baseDelay={0.55}
                            />
                        </h1>

                        <motion.p
                            variants={heroItem}
                            className="mt-5 max-w-xl text-base leading-8 text-[#66615A] sm:text-lg"
                        >
                            Every property is different. Compare our campaign
                            options and choose the level of marketing support
                            that fits your goals.
                        </motion.p>

                        <motion.div
                            variants={heroItem}
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                        >
                            <Link
                                href="#packages"
                                data-anime-button
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                            >
                                View packages
                                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>

                            <Link
                                href="#how-it-works"
                                data-anime-button
                                className="group inline-flex h-14 items-center justify-center rounded-full border border-[#1C1C1C]/20 bg-white px-8 text-sm font-semibold text-[#1C1C1C] transition duration-300 hover:-translate-y-0.5 hover:border-[#B8924A] hover:bg-[#F5EFE3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                            >
                                How it works
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        <motion.p
                            variants={heroItem}
                            className="mt-8 flex items-center gap-2 text-sm text-[#66615A]"
                        >
                            <ShieldCheck
                                size={18}
                                className="shrink-0 text-[#B8924A]"
                            />
                            Share your property details first. Discuss the plan
                            before payment.
                        </motion.p>
                    </motion.div>

                    {/* HERO IMAGE */}

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 28,
                                clipPath: "inset(8% 8% 8% 8% round 32px)",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                clipPath: "inset(0% 0% 0% 0% round 24px)",
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: EASE,
                            }}
                            className="relative h-[320px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(28,28,28,0.14)] sm:h-[400px] lg:h-[480px]"
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop"
                                alt="Modern residential property"
                                loading="eager"
                                style={
                                    reduceMotion ? undefined : { y: imageY }
                                }
                                className="absolute inset-0 h-[115%] w-full object-cover"
                            />
                        </motion.div>

                        <FloatChip className="-top-3 left-3 sm:-left-4 lg:-left-8 lg:top-10">
                            <p className="text-xs font-semibold text-[#81796D]">
                                Campaign options
                            </p>
                            <p className="text-sm font-bold text-[#1C1C1C]">
                                Choose your level of support
                            </p>
                        </FloatChip>

                        <FloatChip
                            className="-bottom-4 right-3 sm:-right-3 lg:-right-6 lg:bottom-12"
                            delay={0.25}
                        >
                            <p className="text-xs font-semibold text-[#9F7C3D]">
                                Personalised plan
                            </p>
                            <p className="text-sm font-bold text-[#1C1C1C]">
                                Discuss before you start
                            </p>
                        </FloatChip>
                    </div>
                </div>
            </section>

            {/* ANIMATED HIGHLIGHTS */}

            <div className="overflow-hidden border-y border-[#B8924A]/20 bg-[#F0E7D7] py-4">
                {reduceMotion ? (
                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-5">
                        {marqueeItems.map((item) => (
                            <li
                                key={item}
                                className="text-sm font-semibold text-[#1C1C1C]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <motion.ul
                        aria-label="Highlights"
                        className="flex w-max gap-10 pr-10"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...marqueeItems, ...marqueeItems].map(
                            (item, i) => (
                                <li
                                    key={`${item}-${i}`}
                                    aria-hidden={i >= marqueeItems.length}
                                    className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold text-[#1C1C1C]"
                                >
                                    {item}
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8924A]" />
                                </li>
                            )
                        )}
                    </motion.ul>
                )}
            </div>

            {/* PACKAGES SECTION */}

            <section
                id="packages"
                className="scroll-mt-24 py-20 sm:py-28"
            >
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="FIND YOUR CAMPAIGN"
                            title="Compare our campaign packages."
                            text="See what each package is designed for. We will confirm the exact deliverables, pricing and campaign plan with you before you proceed."
                        />
                    </Reveal>

                    <div className="gsap-package-grid mx-auto mt-14 grid max-w-xl gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-7">
                        {packages.map((plan, index) => {
                            const featured = plan.popular;

                            return (
                                <Reveal
                                    key={plan.name}
                                    delay={index * 0.1}
                                    className={`gsap-package-card h-full ${
                                        featured ? "" : "lg:mt-8"
                                    }`}
                                >
                                    <motion.article
                                        whileHover={
                                            reduceMotion
                                                ? undefined
                                                : { y: -8 }
                                        }
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                        }}
                                        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl text-[#1C1C1C] ${
                                            featured
                                                ? "border-2 border-[#B8924A]/60 bg-gradient-to-b from-[#F5EFE3] to-[#EFE5D2] shadow-[0_18px_40px_rgba(184,146,74,0.16)]"
                                                : "border border-[#1C1C1C]/10 bg-white shadow-sm"
                                        }`}
                                    >
                                        {featured && (
                                            <motion.span
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                              scale: [
                                                                  1,
                                                                  1.06,
                                                                  1,
                                                              ],
                                                          }
                                                }
                                                transition={{
                                                    duration: 2.4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute right-4 top-4 z-10 rounded-full bg-[#B8924A] px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                                            >
                                                Popular choice
                                            </motion.span>
                                        )}

                                        <div className="relative h-44 overflow-hidden sm:h-52">
                                            <img
                                                src={plan.image}
                                                alt={plan.imageAlt}
                                                loading="lazy"
                                                className="gsap-package-image h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>

                                        <div className="flex flex-1 flex-col p-6 sm:p-7">
                                            <h3 className="font-display text-3xl text-[#1C1C1C]">
                                                {plan.name}
                                            </h3>

                                            <p className="mt-1 text-sm font-semibold text-[#9F7C3D]">
                                                {plan.subtitle}
                                            </p>

                                            <p className="mt-4 text-sm leading-7 text-[#66615A] lg:min-h-[84px]">
                                                {plan.description}
                                            </p>

                                            <ul
                                                data-anime-features
                                                className="mt-6 flex-1 space-y-3.5"
                                            >
                                                {plan.features.map(
                                                    (feature) => (
                                                        <li
                                                            key={feature}
                                                            data-anime-feature
                                                            className="flex gap-3 text-sm leading-6 text-[#1C1C1C]"
                                                        >
                                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0E7D7] text-[#9F7C3D]">
                                                                <Check size={13} />
                                                            </span>

                                                            <span>{feature}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <div
                                                className={`mt-7 rounded-2xl p-4 ${
                                                    featured
                                                        ? "bg-white/80"
                                                        : "bg-[#F8F6F1]"
                                                }`}
                                            >
                                                <p className="text-xs font-semibold text-[#81796D]">
                                                    Best suited for
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-[#1C1C1C]">
                                                    {plan.suitable}
                                                </p>
                                            </div>

                                            <Link
                                                href={`/promote-property?package=${plan.name.toLowerCase()}`}
                                                data-anime-button
                                                className={`group/btn mt-6 flex h-12 items-center justify-center rounded-full px-5 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 ${
                                                    featured
                                                        ? "bg-[#B8924A] text-white hover:bg-[#9F7C3D]"
                                                        : "border border-[#B8924A]/60 bg-white text-[#1C1C1C] hover:border-[#B8924A] hover:bg-[#F5EFE3]"
                                                }`}
                                            >
                                                Enquire about {plan.name}
                                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </motion.article>
                                </Reveal>
                            );
                        })}
                    </div>

                    <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-6 text-[#81796D]">
                        Package pricing, deliverables, advertising budget and
                        campaign duration are confirmed with you before
                        payment. Enquiry outcomes depend on campaign
                        conditions.
                    </p>
                </div>
            </section>

            {/* COMPARISON SECTION */}

            <section
                id="compare"
                className="scroll-mt-24 bg-[#F0EDE6] py-20 sm:py-28"
            >
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="COMPARE YOUR OPTIONS"
                            title="Understand the differences."
                            text="Some deliverables depend on your property and agreed campaign scope. We confirm these details before you make a payment."
                        />
                    </Reveal>

                    {/* DESKTOP COMPARISON TABLE */}

                    <Reveal className="mt-12 hidden md:block">
                        <div className="gsap-comparison-table overflow-hidden rounded-3xl border border-[#1C1C1C]/10 bg-white shadow-sm">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr>
                                        <th className="w-[32%] px-6 py-5 text-sm font-semibold text-[#66615A] lg:px-8">
                                            Features
                                        </th>

                                        {packages.map((plan) => (
                                            <th
                                                key={plan.name}
                                                className={`px-4 py-5 text-center font-display text-xl text-[#1C1C1C] ${
                                                    plan.popular
                                                        ? "border-b-4 border-[#B8924A] bg-[#F5EFE3]"
                                                        : ""
                                                }`}
                                            >
                                                {plan.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {comparison.map((row) => (
                                        <tr
                                            key={row.feature}
                                            className="gsap-comparison-row border-t border-[#1C1C1C]/10 transition-colors hover:bg-[#FAF8F3]"
                                        >
                                            <td className="px-6 py-4 text-sm font-semibold text-[#1C1C1C] lg:px-8">
                                                {row.feature}
                                            </td>

                                            {row.values.map(
                                                (value, valueIndex) => (
                                                    <td
                                                        key={`${row.feature}-${valueIndex}`}
                                                        className={`px-4 py-4 text-center text-sm ${
                                                            valueIndex === 1
                                                                ? "bg-[#F8F3E9]"
                                                                : ""
                                                        }`}
                                                    >
                                                        <CellValue value={value} />
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>

                    {/* MOBILE COMPARISON */}

                    <div className="mt-10 md:hidden">
                        <div
                            role="tablist"
                            aria-label="Choose a package to view"
                            className="relative mx-auto flex max-w-sm rounded-full bg-white p-1 shadow-sm ring-1 ring-[#1C1C1C]/10"
                        >
                            {packages.map((plan, i) => (
                                <button
                                    key={plan.name}
                                    type="button"
                                    role="tab"
                                    aria-selected={activePlan === i}
                                    onClick={() => setActivePlan(i)}
                                    className="relative z-10 flex-1 rounded-full px-3 py-2.5 text-sm font-bold text-[#1C1C1C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A]"
                                >
                                    {activePlan === i && (
                                        <motion.span
                                            layoutId="plan-tab"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            className="absolute inset-0 -z-10 rounded-full bg-[#F0E7D7] ring-2 ring-[#B8924A]/50"
                                        />
                                    )}

                                    {plan.name}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePlan}
                                role="tabpanel"
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, y: 14 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={
                                    reduceMotion
                                        ? undefined
                                        : { opacity: 0, y: -10 }
                                }
                                transition={{
                                    duration: 0.3,
                                    ease: EASE,
                                }}
                                className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border border-[#1C1C1C]/10 bg-white"
                            >
                                <div
                                    className={`flex items-center justify-between px-5 py-4 text-[#1C1C1C] ${
                                        packages[activePlan].popular
                                            ? "bg-[#F0E7D7]"
                                            : "bg-[#F8F6F1]"
                                    }`}
                                >
                                    <h3 className="font-display text-2xl">
                                        {packages[activePlan].name}
                                    </h3>

                                    {packages[activePlan].popular && (
                                        <span className="rounded-full bg-[#B8924A] px-3 py-1 text-xs font-bold text-white">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <div className="divide-y divide-[#1C1C1C]/10 px-5">
                                    {comparison.map((row) => (
                                        <div
                                            key={row.feature}
                                            className="flex items-center justify-between gap-4 py-3.5"
                                        >
                                            <span className="text-sm text-[#66615A]">
                                                {row.feature}
                                            </span>

                                            <span className="text-right text-sm font-semibold">
                                                <CellValue
                                                    value={row.values[activePlan]}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* PACKAGE RECOMMENDATION CTA */}

                    <Reveal className="mt-10">
                        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#B8924A]/15 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
                            <div>
                                <p className="text-sm font-semibold text-[#9F7C3D]">
                                    NEED SOME GUIDANCE?
                                </p>

                                <h3 className="mt-1 font-display text-2xl text-[#1C1C1C] sm:text-3xl">
                                    Not sure which package fits?
                                </h3>

                                <p className="mt-2 text-sm text-[#66615A]">
                                    Tell us about your property. We will help
                                    you choose.
                                </p>
                            </div>

                            <Link
                                href="/promote-property"
                                data-anime-button
                                className="group inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#B8924A] px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9F7C3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 sm:w-auto"
                            >
                                Get a recommendation
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* HOW IT WORKS */}

            <section
                id="how-it-works"
                className="scroll-mt-24 py-20 sm:py-28"
            >
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="GETTING STARTED"
                            title="A clear process, from enquiry to launch."
                            text="Share your property details first. We review your enquiry, discuss the right plan and share payment details only after you agree."
                        />
                    </Reveal>

                    <ol className="gsap-process-grid relative mx-auto mt-14 grid max-w-xl gap-10 lg:max-w-none lg:grid-cols-4 lg:gap-6">
                        {/* DESKTOP CONNECTING LINE */}

                        <motion.div
                            aria-hidden
                            initial={reduceMotion ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{
                                duration: 1.2,
                                ease: EASE,
                            }}
                            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 origin-left bg-[#B8924A]/40 lg:block"
                        />

                        {/* MOBILE CONNECTING LINE */}

                        <motion.div
                            aria-hidden
                            initial={reduceMotion ? false : { scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 1.2,
                                ease: EASE,
                            }}
                            className="pointer-events-none absolute bottom-6 left-6 top-6 w-0.5 origin-top bg-[#B8924A]/40 lg:hidden"
                        />

                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <motion.li
                                    key={step.number}
                                    className="gsap-process-step relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
                                >
                                    <motion.span
                                        whileHover={
                                            reduceMotion
                                                ? undefined
                                                : {
                                                      scale: 1.12,
                                                      rotate: -6,
                                                  }
                                        }
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15,
                                        }}
                                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B8924A]/40 text-[#8B6B35] ${step.tint}`}
                                    >
                                        <Icon size={20} />

                                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#B8924A] text-[11px] font-bold text-white">
                                            {step.number}
                                        </span>
                                    </motion.span>

                                    <div className="lg:mt-5">
                                        <h3 className="font-display text-xl text-[#1C1C1C]">
                                            {step.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-[#66615A]">
                                            {step.text}
                                        </p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* FAQ SECTION */}

            <section className="bg-[#F0EDE6] py-20 sm:py-28">
                <div
                    className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}
                >
                    <Reveal className="lg:sticky lg:top-28 lg:self-start">
                        <SectionHeading
                            center={false}
                            label="FREQUENTLY ASKED QUESTIONS"
                            title="A few things you may want to know."
                            text="Still have questions about packages or the campaign process? Talk to our team."
                        />

                        <Link
                            href="/contact"
                            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#9F7C3D] transition-colors hover:text-[#7D602F]"
                        >
                            Contact our team
                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="gsap-faq-list space-y-3">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className={`gsap-faq-item overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                                            isOpen
                                                ? "border-[#B8924A]/50"
                                                : "border-[#1C1C1C]/10"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenFaq(
                                                    isOpen ? null : index
                                                )
                                            }
                                            aria-expanded={isOpen}
                                            className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-[#1C1C1C] transition-colors duration-300 hover:bg-[#FAF8F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B8924A] sm:px-6"
                                        >
                                            <span className="text-sm font-semibold sm:text-base">
                                                {faq.question}
                                            </span>

                                            <motion.span
                                                animate={{
                                                    rotate: isOpen ? 180 : 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: EASE,
                                                }}
                                                className="shrink-0 text-[#B8924A]"
                                            >
                                                <ChevronDown size={19} />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="content"
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: reduceMotion
                                                            ? 0
                                                            : 0.35,
                                                        ease: EASE,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 pb-5 text-sm leading-7 text-[#66615A] sm:px-6">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FINAL CTA */}

            <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
                <Reveal>
                    <div className="gsap-package-cta relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#B8924A]/20 bg-gradient-to-br from-[#F5EFE3] via-[#EFE5D2] to-[#E8D9BC] px-6 py-12 text-[#1C1C1C] shadow-sm sm:px-12 sm:py-16">
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
                            className="gsap-cta-ring pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#B8924A]/30 bg-white/20"
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
                            className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/30"
                        />

                        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                            <div>
                                <p className="text-sm font-semibold tracking-wide text-[#8B6B35]">
                                    YOUR PROPERTY JOURNEY STARTS HERE
                                </p>

                                <h2 className="mt-3 font-display text-3xl leading-tight text-[#1C1C1C] sm:text-4xl lg:text-5xl">
                                    Ready to give your property more reach?
                                </h2>

                                <p className="mt-4 max-w-xl text-base leading-7 text-[#66615A]">
                                    Share your property details. Let us
                                    understand your goals and discuss a
                                    campaign that works for you.
                                </p>
                            </div>

                            <div className="lg:justify-self-end">
                                <motion.div
                                    whileHover={
                                        reduceMotion
                                            ? undefined
                                            : { scale: 1.04 }
                                    }
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Link
                                        href="/promote-property"
                                        data-anime-button
                                        className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 sm:w-auto"
                                    >
                                        Promote your property
                                        <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
