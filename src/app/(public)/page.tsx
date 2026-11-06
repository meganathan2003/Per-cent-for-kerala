"use client";

import { useEffect, useRef } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    MessageCircle,
    ShieldCheck,
    Target,
    Check,
    Sparkles,
} from "lucide-react";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

/* =========================================================
   DESIGN SYSTEM
========================================================= */

const C = {
    navy: "#142D35",
    navyDark: "#0D2027",
    teal: "#167D78",
    tealLight: "#E8F4F2",
    background: "#F5F7F7",
    text: "#34464B",
    muted: "#718084",
    border: "#DFE7E7",
    white: "#FFFFFF",
};

/* =========================================================
   PROPERTY CATEGORIES
========================================================= */

const categories = [
    {
        number: "01",
        title: "Houses & Villas",
        description:
            "From independent family homes to premium villas, we create focused campaigns that present your property with care and connect it with relevant audiences.",
        image: "/images/kerala-house-villa.jpg",
        label: "Residential properties",
    },
    {
        number: "02",
        title: "Land & Estates",
        description:
            "Give residential plots, agricultural land and estate properties a thoughtful presentation that highlights their location and potential.",
        image: "/images/kerala-land-estates.png",
        label: "Land and plantations",
    },
    {
        number: "03",
        title: "Apartments",
        description:
            "Position apartments and residential developments through considered visuals and digital campaigns designed around your property.",
        image: "/images/kerala-apartments.png",
        label: "Modern living",
    },
    {
        number: "04",
        title: "Commercial Properties",
        description:
            "Present shops, offices and commercial spaces to relevant audiences with a marketing approach suited to your property.",
        image: "/images/kerala-commercial.png",
        label: "Business spaces",
    },
];

/* =========================================================
   CUSTOMER EXPERIENCE
========================================================= */

const ownerBenefits = [
    {
        icon: ShieldCheck,
        number: "01",
        title: "A clear process",
        description:
            "Know what information is needed, how your property is reviewed and what happens before a campaign begins.",
    },
    {
        icon: Target,
        number: "02",
        title: "Marketing with purpose",
        description:
            "Your property's type, location and goals help shape the presentation and promotional approach.",
    },
    {
        icon: MessageCircle,
        number: "03",
        title: "Communication that matters",
        description:
            "Stay informed about the agreed campaign scope, activity and enquiries through clear communication.",
    },
];

/* =========================================================
   PACKAGES
========================================================= */

const packages = [
    {
        number: "01",
        name: "Basic",
        description:
            "A simple starting point for property owners looking to establish their property's online presence.",
        features: [
            "Essential property presentation",
            "Digital property listing",
            "Campaign coordination",
            "Owner communication",
        ],
        featured: false,
    },
    {
        number: "02",
        name: "Premium",
        description:
            "A more comprehensive promotional approach for owners looking to give their property greater visibility.",
        features: [
            "Enhanced property presentation",
            "Focused digital promotion",
            "Campaign coordination",
            "Enquiry follow-up support",
        ],
        featured: true,
    },
    {
        number: "03",
        name: "Diamond",
        description:
            "A more extensive marketing approach for owners seeking a tailored promotional experience.",
        features: [
            "Premium property presentation",
            "Expanded promotional approach",
            "Dedicated campaign coordination",
            "Enquiry communication support",
        ],
        featured: false,
    },
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#167D78]">
            <span className="h-[2px] w-7 bg-[#167D78]" />
            {children}
        </div>
    );
}

function PrimaryButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#167D78] px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0D2027]"
        >
            {children}

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
    );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
    const mainRef = useRef<HTMLElement>(null);
    const categorySectionRef = useRef<HTMLElement>(null);

    /* =========================================================
       LENIS SMOOTH SCROLL
    ========================================================= */

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", ScrollTrigger.update);

        const ticker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
        };
    }, []);

    /* =========================================================
       GSAP ANIMATIONS
    ========================================================= */

    useGSAP(
        () => {
            const media = gsap.matchMedia();

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            // Hero animation
            gsap.timeline({
                defaults: { ease: "power3.out" },
            })
                .from(".hero-kicker", {
                    y: 18,
                    opacity: 0,
                    duration: 0.55,
                })
                .from(
                    ".hero-title",
                    {
                        y: 38,
                        opacity: 0,
                        duration: 0.85,
                    },
                    "-=0.2"
                )
                .from(
                    ".hero-copy",
                    {
                        y: 22,
                        opacity: 0,
                        duration: 0.65,
                    },
                    "-=0.4"
                )
                .from(
                    ".hero-actions",
                    {
                        y: 18,
                        opacity: 0,
                        duration: 0.55,
                    },
                    "-=0.3"
                );

            // Section reveal
            gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((element) => {
                gsap.fromTo(
                    element,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 86%",
                            once: true,
                        },
                    }
                );
            });

            // Hero image parallax
            gsap.fromTo(
                ".hero-video",
                { scale: 1.08 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                }
            );

            // Desktop category stack
            media.add("(min-width: 768px)", () => {
                const section = categorySectionRef.current;
                const stage = section?.querySelector<HTMLElement>(".category-stage");

                if (!stage) return;

                const cards = gsap.utils.toArray<HTMLElement>(
                    stage.querySelectorAll(".category-card")
                );

                if (!cards.length) return;

                gsap.set(cards, {
                    position: "absolute",
                    inset: 0,
                    yPercent: 110,
                    scale: 0.97,
                    opacity: 1,
                    transformOrigin: "center center",
                    force3D: true,
                });

                gsap.set(cards[0], {
                    yPercent: 0,
                    scale: 1,
                    zIndex: 1,
                });

                cards.forEach((card, index) => {
                    gsap.set(card, { zIndex: index + 1 });
                });

                const timeline = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: stage,
                        start: "top top+=88",
                        end: () => `+=${window.innerHeight * (cards.length - 1)}`,
                        scrub: 1.15,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, index) => {
                    if (index === 0) return;

                    const previous = cards[index - 1];

                    timeline.to(
                        previous,
                        {
                            scale: 0.95,
                            y: -18,
                            opacity: 0.6,
                            duration: 1,
                        },
                        index - 1
                    );

                    timeline.to(
                        card,
                        {
                            yPercent: 0,
                            scale: 1,
                            duration: 1,
                        },
                        index - 1
                    );
                });

                return () => {
                    timeline.scrollTrigger?.kill();
                    timeline.kill();
                };
            });

            // Category image parallax
            gsap.utils
                .toArray<HTMLElement>(".category-image-wrap")
                .forEach((wrapper) => {
                    const image = wrapper.querySelector<HTMLElement>(".category-image");

                    if (!image) return;

                    gsap.fromTo(
                        image,
                        { scale: 1.08 },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: wrapper,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.2,
                            },
                        }
                    );
                });

            const refresh = window.setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

            return () => {
                window.clearTimeout(refresh);
                media.revert();
            };
        },
        {
            scope: mainRef,
            dependencies: [],
            revertOnUpdate: true,
        }
    );

    /* =========================================================
       UI
    ========================================================= */

    return (
        <main
            ref={mainRef}
            className={`${jakarta.variable} overflow-x-clip bg-[#F5F7F7] font-sans text-[#142D35]`}
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        >
            {/* =====================================================
                01 — HERO SECTION
            ===================================================== */}

            <section className="hero-section relative flex min-h-[720px] items-center justify-center overflow-hidden bg-[#0D2027] px-5 py-28 text-center sm:min-h-[780px] lg:min-h-[850px]">
                <div className="absolute inset-0">
                    <video
                        className="hero-video h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/kerala-house-villa.jpg"
                    >
                        <source
                            src="/videos/hero-kerala-villa.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <div className="absolute inset-0 bg-[#0D2027]/55" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D2027]/30 via-[#0D2027]/30 to-[#0D2027]/85" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1100px] py-16">
                    <div className="hero-kicker mx-auto inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-xs">
                        <span className="h-2 w-2 rounded-full bg-[#83D4CA]" />
                        Property marketing across Kerala
                    </div>

                    <h1 className="hero-title mt-9 text-[42px] font-bold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[78px]">
                        Your property deserves
                        <span className="block text-[#83D4CA]">
                            the right attention.
                        </span>
                    </h1>

                    <p className="hero-copy mx-auto mt-8 max-w-[680px] text-[15px] leading-8 text-white/85 sm:text-lg sm:leading-9">
                        We bring property presentation, digital advertising and enquiry
                        coordination together to help property owners reach relevant
                        audiences across Kerala.
                    </p>

                    <div className="hero-actions mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <PrimaryButton href="/promote-property">
                            Sell your property
                        </PrimaryButton>

                        <Link
                            href="/contact"
                            className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-white/50 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                        >
                            Talk to our team
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium text-white/90 sm:text-sm">
                        <span className="inline-flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[#83D4CA]" />
                            Owner details reviewed
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#83D4CA]" />
                            Clear campaign scope
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Target className="h-4 w-4 text-[#83D4CA]" />
                            Purposeful promotion
                        </span>
                    </div>
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F7F7] to-transparent" />

                <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:flex">
                    Scroll to explore
                    <span className="h-8 w-px bg-[#83D4CA]" />
                </div>
            </section>

            {/* =====================================================
                02 — PROPERTY SHOWCASE
            ===================================================== */}

            <section
                ref={categorySectionRef}
                className="relative bg-[#F5F7F7] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
            >
                <div className="mx-auto max-w-[1240px]">
                    <div className="reveal-item mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
                        <div className="max-w-[700px]">
                            <Eyebrow>Explore what we promote</Eyebrow>

                            <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.05em] text-[#142D35] sm:text-5xl lg:text-[60px]">
                                Every property has
                                <span className="block text-[#167D78]">
                                    a story worth telling.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-[380px] text-sm leading-7 text-[#52666B] sm:text-base">
                            From family homes to commercial spaces, we shape the presentation
                            around the property and the people you want to reach.
                        </p>
                    </div>

                    <div className="category-stage relative space-y-6 md:h-[580px] md:space-y-0">
                        {categories.map((category, index) => (
                            <article
                                key={category.number}
                                className="category-card relative grid min-h-[540px] overflow-hidden rounded-[28px] border border-[#DFE7E7] bg-white shadow-[0_16px_50px_rgba(20,45,53,0.08)] md:min-h-0 md:h-full md:grid-cols-2"
                                style={{ zIndex: index + 1 }}
                            >
                                <div className="category-image-wrap relative min-h-[280px] overflow-hidden bg-[#DFE7E7] md:order-2 md:min-h-full">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="category-image object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2027]/55 via-transparent to-transparent" />

                                    <span className="absolute bottom-6 left-6 rounded-full border border-white/40 bg-[#0D2027]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                                        {category.label}
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-12 md:order-1 lg:px-16">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold tracking-[0.2em] text-[#167D78]">
                                            {category.number}
                                        </span>

                                        <span className="h-px w-9 bg-[#167D78]" />

                                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#718084]">
                                            Property category
                                        </span>
                                    </div>

                                    <h3 className="mt-8 text-3xl font-bold leading-[1.12] tracking-[-0.045em] text-[#142D35] sm:text-4xl lg:text-[44px]">
                                        {category.title}
                                    </h3>

                                    <p className="mt-6 max-w-[460px] text-sm leading-8 text-[#52666B] sm:text-[15px]">
                                        {category.description}
                                    </p>

                                    <Link
                                        href="/promote-property"
                                        className="group mt-9 inline-flex min-h-[50px] w-fit items-center gap-3 rounded-full bg-[#142D35] px-6 text-xs font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#167D78]"
                                    >
                                        Promote this property
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718084]">
                        Scroll to move through the property categories
                    </p>
                </div>
            </section>

            {/* =====================================================
                03 — CUSTOMER EXPERIENCE
            ===================================================== */}

            <section className="border-y border-[#DFE7E7] bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
                <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
                    <div className="reveal-item">
                        <Eyebrow>Customer satisfaction</Eyebrow>

                        <h2 className="mt-7 text-4xl font-bold leading-[1.1] tracking-[-0.05em] text-[#142D35] sm:text-5xl lg:text-[56px]">
                            A better experience
                            <span className="block text-[#167D78]">
                                for every property owner.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-[540px] text-sm leading-8 text-[#52666B] sm:text-base">
                            Good property marketing starts with understanding the owner. We
                            focus on a clear process, thoughtful presentation and honest
                            communication, so you know what to expect at every stage.
                        </p>

                        <Link
                            href="/how-it-works"
                            className="group mt-9 inline-flex items-center gap-3 text-sm font-bold text-[#142D35]"
                        >
                            Understand how it works

                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFE7E7] transition duration-300 group-hover:border-[#167D78] group-hover:bg-[#167D78] group-hover:text-white">
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        {ownerBenefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <article
                                    key={benefit.number}
                                    className="reveal-item rounded-2xl border border-[#DFE7E7] bg-[#F8FAFA] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#167D78]/50 hover:bg-white hover:shadow-[0_14px_40px_rgba(20,45,53,0.07)] sm:p-8"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F4F2] text-[#167D78]">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <div className="text-[10px] font-bold tracking-[0.18em] text-[#167D78]">
                                                {benefit.number}
                                            </div>

                                            <h3 className="mt-2 text-lg font-bold text-[#142D35]">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-7 text-[#52666B]">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =====================================================
                04 — PACKAGES SECTION
            ===================================================== */}

            <section className="relative overflow-hidden bg-[#F5F7F7] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
                {/* Decorative background shapes */}
                <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#E8F4F2]/70 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-[#83D4CA]/10 blur-3xl" />

                <div className="relative mx-auto max-w-[1240px]">

                    {/* SECTION HEADING */}
                    <div className="reveal-item mx-auto mb-16 max-w-[760px] text-center">
                        <Eyebrow>Our packages</Eyebrow>

                        <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.05em] text-[#142D35] sm:text-5xl lg:text-[60px]">
                            The right approach
                            <span className="block text-[#167D78]">
                                for your property.
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-[620px] text-sm leading-8 text-[#52666B] sm:text-base">
                            Every property has different marketing needs. Explore our
                            packages to find an approach that matches your property's
                            requirements and promotional goals.
                        </p>
                    </div>

                    {/* PACKAGE CARDS */}
                    <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {packages.map((pkg) => (
                            <article
                                key={pkg.number}
                                className={`reveal-item group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-500 sm:p-8 ${
                                    pkg.featured
                                        ? "border-[#167D78]/50 bg-white shadow-[0_24px_65px_rgba(22,125,120,0.14)] lg:-translate-y-3 lg:scale-[1.025] lg:hover:-translate-y-5"
                                        : "border-[#DFE7E7] bg-white/90 shadow-[0_16px_45px_rgba(20,45,53,0.06)] hover:-translate-y-2 hover:border-[#167D78]/40 hover:shadow-[0_24px_55px_rgba(20,45,53,0.10)]"
                                }`}
                            >
                                {/* Featured top accent */}
                                <div
                                    className={`absolute inset-x-0 top-0 h-1.5 ${
                                        pkg.featured
                                            ? "bg-[#167D78]"
                                            : "bg-[#E8F4F2]"
                                    }`}
                                />

                                {pkg.featured && (
                                    <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#E8F4F2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#167D78]">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Popular choice
                                    </div>
                                )}

                                {/* CARD HEADER */}
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7F7] text-[11px] font-bold tracking-wider text-[#167D78]">
                                        {pkg.number}
                                    </span>

                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                                            pkg.featured
                                                ? "bg-[#167D78] text-white shadow-lg shadow-[#167D78]/20"
                                                : "bg-[#E8F4F2] text-[#167D78]"
                                        }`}
                                    >
                                        {pkg.featured ? (
                                            <Sparkles className="h-6 w-6" />
                                        ) : (
                                            <ShieldCheck className="h-6 w-6" />
                                        )}
                                    </div>
                                </div>

                                {/* PACKAGE TITLE */}
                                <div className="mt-7">
                                    <h3 className="text-3xl font-bold tracking-[-0.045em] text-[#142D35] sm:text-[34px]">
                                        {pkg.name}
                                    </h3>

                                    <p className="mt-3 min-h-[84px] max-w-[340px] text-sm leading-7 text-[#52666B]">
                                        {pkg.description}
                                    </p>
                                </div>

                                {/* DIVIDER */}
                                <div className="my-7 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#167D78]" />
                                    <span className="h-px flex-1 bg-[#DFE7E7]" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#DFE7E7]" />
                                </div>

                                {/* FEATURES */}
                                <div className="flex-1">
                                    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718084]">
                                        Package highlights
                                    </p>

                                    <ul className="space-y-5">
                                        {pkg.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-3 text-sm leading-6 text-[#34464B]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F4F2] text-[#167D78]">
                                                    <Check className="h-3.5 w-3.5" />
                                                </span>

                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* PACKAGE CTA */}
                                <Link
                                    href="/packages"
                                    className={`group/button mt-9 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full px-5 text-sm font-bold transition-all duration-300 ${
                                        pkg.featured
                                            ? "bg-[#167D78] text-white shadow-lg shadow-[#167D78]/15 hover:-translate-y-0.5 hover:bg-[#0D2027]"
                                            : "border border-[#DFE7E7] bg-[#F8FAFA] text-[#142D35] hover:-translate-y-0.5 hover:border-[#167D78] hover:bg-[#E8F4F2] hover:text-[#167D78]"
                                    }`}
                                >
                                    Explore Package

                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                                </Link>
                            </article>
                        ))}
                    </div>

                    {/* EXPLORE ALL PACKAGES */}
                    <div className="reveal-item mt-16 flex flex-col items-center justify-center gap-5 text-center">
                        <p className="max-w-[520px] text-sm leading-7 text-[#718084]">
                            Want to compare all the package details and find the right
                            promotional option for your property?
                        </p>

                        <Link
                            href="/packages"
                            className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#142D35] px-8 text-sm font-bold text-white shadow-[0_10px_25px_rgba(20,45,53,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#167D78]"
                        >
                            Explore All Packages

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                05 — CONTACT CTA
            ===================================================== */}

            <section className="relative overflow-hidden rounded-t-[36px] bg-[#142D35] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" />

                <div className="pointer-events-none absolute -bottom-64 -left-24 h-[520px] w-[520px] rounded-full border border-[#83D4CA]/20" />

                <div className="reveal-item relative mx-auto max-w-[900px] text-center">
                    <Eyebrow>Let's get started</Eyebrow>

                    <h2 className="mt-7 text-4xl font-bold leading-[1.1] tracking-[-0.05em] text-white sm:text-5xl lg:text-[64px]">
                        Ready to give your property
                        <span className="block text-[#83D4CA]">
                            the attention it deserves?
                        </span>
                    </h2>

                    <p className="mx-auto mt-7 max-w-[620px] text-sm leading-8 text-white/75 sm:text-base">
                        Tell us about your property and what you are looking to achieve.
                        Our team will understand your requirements and discuss a suitable
                        marketing approach with you.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <PrimaryButton href="/promote-property">
                            Sell your property
                        </PrimaryButton>

                        <Link
                            href="/contact"
                            className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-white/35 bg-white/5 px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        >
                            Contact us
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <p className="mt-8 text-[11px] leading-6 text-white/50">
                        Clear campaign scope and terms will be discussed before anything
                        begins.
                    </p>
                </div>
            </section>
        </main>
    );
}