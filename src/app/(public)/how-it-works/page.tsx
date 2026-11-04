
"use client";

import { useEffect, useRef } from "react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import Navbar from "@/components/layout/navbar";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

/* ---------- BRAND COLORS ---------- */
/*
   White:       #FFFFFF
   Charcoal:    #1C1C1C
   Gold:        #B8924A
   Warm neutral:#F8F6F1
*/

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
        tint: "bg-[#F5EFE3]",
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
        tint: "bg-[#F3EBDD]",
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
        tint: "bg-[#F6EDE1]",
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
        tint: "bg-[#F5EFE3]",
    },
];

/* ---------- REVEAL ---------- */

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

/* ---------- SECTION HEADING ---------- */

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
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mx-auto mt-4 block h-1 w-16 origin-center rounded-full bg-[#B8924A]"
            />

            {text && (
                <p className="mt-5 text-base leading-7 text-[#66615A]">
                    {text}
                </p>
            )}
        </div>
    );
}

/* ---------- PAGE ---------- */

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

    /* ---------- GSAP + ANIME.JS ---------- */

    useEffect(() => {
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            /* Hero title entrance */
            gsap.fromTo(
                ".how-hero-title",
                {
                    opacity: 0,
                    y: 55,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".how-hero-title",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            /* Step cards stagger entrance */
            gsap.fromTo(
                ".gsap-step-card",
                {
                    opacity: 0,
                    y: 90,
                    scale: 0.96,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-steps-list",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            /* Step images reveal */
            gsap.utils.toArray<HTMLElement>(".gsap-step-image").forEach(
                (image) => {
                    gsap.fromTo(
                        image,
                        {
                            scale: 1.2,
                            clipPath: "inset(8% 8% 8% 8%)",
                        },
                        {
                            scale: 1,
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 1.3,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: image,
                                start: "top 90%",
                                once: true,
                            },
                        }
                    );
                }
            );

            /* Step number entrance */
            gsap.fromTo(
                ".gsap-step-number",
                {
                    scale: 0,
                    rotate: -30,
                },
                {
                    scale: 1,
                    rotate: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".gsap-steps-list",
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            /* Final CTA entrance */
            gsap.fromTo(
                ".gsap-how-cta",
                {
                    opacity: 0,
                    y: 70,
                    scale: 0.96,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-how-cta",
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            /* CTA decorative movement */
            gsap.to(".gsap-cta-decoration", {
                rotate: 360,
                duration: 35,
                repeat: -1,
                ease: "none",
            });
        });

        /* Anime.js: step icons */
        const iconObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animate(entry.target, {
                        scale: [0.5, 1.18, 1],
                        rotate: ["-20deg", "8deg", "0deg"],
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
            .querySelectorAll("[data-anime-icon]")
            .forEach((icon) => iconObserver.observe(icon));

        /* Anime.js: checklist stagger */
        const pointObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const points = entry.target.querySelectorAll(
                        "[data-anime-point]"
                    );

                    animate(points, {
                        opacity: [0, 1],
                        translateX: [-18, 0],
                        delay: stagger(100),
                        duration: 650,
                        ease: "outQuad",
                    });

                    pointObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.3 }
        );

        document
            .querySelectorAll("[data-anime-points]")
            .forEach((list) => pointObserver.observe(list));

        /* Anime.js: button hover */
        const buttons = document.querySelectorAll("[data-anime-button]");
        const buttonCleanups: (() => void)[] = [];

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

            buttonCleanups.push(() => {
                button.removeEventListener("mouseenter", enter);
                button.removeEventListener("mouseleave", leave);
            });
        });

        return () => {
            ctx.revert();
            iconObserver.disconnect();
            pointObserver.disconnect();
            buttonCleanups.forEach((cleanup) => cleanup());
        };
    }, [reduceMotion]);

    return (
        <main className="min-h-screen overflow-x-clip bg-[#F8F6F1] text-[#1C1C1C] antialiased">
            {/* PAGE SCROLL PROGRESS */}

            {!reduceMotion && (
                <motion.div
                    aria-hidden
                    style={{ scaleX: pageProgress }}
                    className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[#B8924A]"
                />
            )}

            <Navbar />

            {/* HERO */}

            <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE3] to-[#F8F6F1]">
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
                    className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#E9DFC9] blur-2xl sm:h-80 sm:w-80"
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

                <div className={`${container} relative py-24 sm:py-28 lg:py-32`}>
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#B8924A]/20 bg-white px-4 py-2 text-sm font-semibold text-[#8B6B35] shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-[#B8924A]" />
                            Simple. Clear. Structured.
                        </div>

                        <h1 className="how-hero-title mt-7 font-display text-4xl leading-tight tracking-tight text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                            How It{" "}
                            <span className="text-[#B8924A]">
                                Works
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#66615A] sm:text-lg">
                            Promoting your property doesn't have to be
                            complicated. We follow a simple process from
                            your first enquiry to campaign launch and
                            buyer enquiry follow-up.
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/promote-property"
                                data-anime-button
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
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
                className="scroll-mt-24 bg-[#F3F0E9] py-20 sm:py-24"
            >
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="OUR PROCESS"
                            title="Four simple steps."
                            text="Here's how we work together to promote your property across Kerala."
                        />
                    </Reveal>

                    <ol
                        ref={listRef}
                        className="gsap-steps-list relative mx-auto mt-14 max-w-xl space-y-8 sm:space-y-10 lg:max-w-none"
                    >
                        {/* TIMELINE LINE */}

                        <div
                            aria-hidden
                            className="pointer-events-none absolute bottom-6 left-6 top-6 hidden w-0.5 bg-[#B8924A]/20 lg:block"
                        >
                            <motion.div
                                style={{
                                    scaleY: reduceMotion ? 1 : railFill,
                                }}
                                className="h-full w-full origin-top bg-[#B8924A]"
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
                                            className="gsap-step-number flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#B8924A] bg-white font-display text-base font-bold text-[#8B6B35] shadow-sm"
                                        >
                                            {step.number}
                                        </motion.span>
                                    </div>

                                    {/* STEP CARD */}

                                    <motion.article className="gsap-step-card group grid min-w-0 overflow-hidden rounded-3xl border border-[#1C1C1C]/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_55px_rgba(28,28,28,0.10)] lg:grid-cols-2">
                                        {/* STEP IMAGE */}

                                        <div
                                            className={`relative min-h-[230px] overflow-hidden sm:min-h-[300px] lg:min-h-[340px] ${reverse ? "lg:order-2" : ""
                                                }`}
                                        >
                                            <img
                                                src={step.image}
                                                alt={step.imageAlt}
                                                loading="lazy"
                                                className="gsap-step-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B8924A]/20 bg-white font-display text-lg font-semibold text-[#8B6B35] shadow-md sm:left-7 sm:top-7 lg:hidden">
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
                                                data-anime-icon
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl text-[#8B6B35] ${step.tint}`}
                                            >
                                                <Icon size={23} />
                                            </motion.div>

                                            <p className="mt-5 text-sm font-semibold tracking-wide text-[#B8924A]">
                                                STEP {step.number}
                                            </p>

                                            <h3 className="mt-2 font-display text-2xl leading-tight text-[#1C1C1C] sm:text-3xl">
                                                {step.title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-[#66615A] sm:text-base">
                                                {step.description}
                                            </p>

                                            <ul
                                                data-anime-points
                                                className="mt-6 space-y-3"
                                            >
                                                {step.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        data-anime-point
                                                        className="flex min-w-0 items-start gap-3"
                                                    >
                                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5EFE3] text-[#9F7C3D]">
                                                            <Check size={13} />
                                                        </span>

                                                        <span className="text-sm leading-6 text-[#1C1C1C]">
                                                            {point}
                                                        </span>
                                                    </li>
                                                ))}
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
                    <div className="gsap-how-cta relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#B8924A]/20 bg-gradient-to-br from-[#F5EFE3] via-[#EFE5D2] to-[#E8D9BC] px-6 py-12 text-[#1C1C1C] shadow-sm sm:px-12 sm:py-16">
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
                            className="gsap-cta-decoration pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#B8924A]/20 bg-white/30"
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
                                    Ready to promote your property?
                                </h2>

                                <p className="mt-4 max-w-xl text-base leading-7 text-[#66615A]">
                                    Share your property details. Our team
                                    will review your requirements and
                                    discuss the next steps with you.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-self-end">
                                <Link
                                    href="/promote-property"
                                    data-anime-button
                                    className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 sm:w-auto"
                                >
                                    Promote your property

                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/packages"
                                    data-anime-button
                                    className="inline-flex h-14 w-full items-center justify-center rounded-full border border-[#B8924A]/50 bg-white px-8 text-sm font-semibold text-[#1C1C1C] transition duration-300 hover:border-[#B8924A] hover:bg-[#F5EFE3] sm:w-auto"
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
