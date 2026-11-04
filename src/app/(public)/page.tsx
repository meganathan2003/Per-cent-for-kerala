
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    CheckCircle2,
    ChevronRight,
    Eye,
    MapPin,
    ShieldCheck,
    Target,
    TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================
   PER-CENT KERALA — V2 DESIGN SYSTEM

   Gold:             #B8924A
   Gold Hover:       #9F7C3D
   Charcoal:         #1C1C1C
   Warm Background:  #F8F6F1
   Light Neutral:    #F5EFE3
   White:            #FFFFFF
========================================================= */

const categories = [
    {
        number: "01",
        title: "Houses & Villas",
        description:
            "From independent homes to premium villas, we create focused campaigns that connect your property with the right audience.",
        image: "/images/kerala-house-villa.jpg",
    },
    {
        number: "02",
        title: "Land & Estates",
        description:
            "Give residential plots, agricultural land and estate properties the visibility they deserve.",
        image: "/images/kerala-land-estates.png",
    },
    {
        number: "03",
        title: "Apartments",
        description:
            "Position apartments and residential developments in front of buyers exploring the right location and lifestyle.",
        image: "/images/kerala-apartments.png",
    },
    {
        number: "04",
        title: "Commercial Properties",
        description:
            "Connect commercial spaces with businesses, investors and potential buyers through targeted marketing.",
        image: "/images/kerala-commercial.png",
    },
];

const packages = [
    {
        name: "Basic",
        description: "A focused starting point for property promotion.",
        features: [
            "Property presentation",
            "Marketing campaign planning",
            "Digital promotion",
            "Lead enquiry coordination",
        ],
    },
    {
        name: "Premium",
        description: "More visibility with a broader marketing approach.",
        features: [
            "Everything in Basic",
            "Enhanced property creatives",
            "Expanded campaign approach",
            "Campaign performance reporting",
        ],
        featured: true,
    },
    {
        name: "Diamond",
        description:
            "A more involved marketing and sales coordination experience.",
        features: [
            "Everything in Premium",
            "Dedicated sales coordination",
            "Buyer follow-up support",
            "Enhanced campaign monitoring",
        ],
    },
];

const steps = [
    {
        number: "01",
        title: "Submit Your Property",
        description:
            "Share your property details, location, asking price and contact information.",
        icon: Eye,
    },
    {
        number: "02",
        title: "Property Verification",
        description:
            "Our team reviews ownership details, property information and supporting documents.",
        icon: ShieldCheck,
    },
    {
        number: "03",
        title: "Get Your Recommendation",
        description:
            "We assess your property and recommend a suitable marketing package and campaign approach.",
        icon: Target,
    },
    {
        number: "04",
        title: "Launch Your Campaign",
        description:
            "Once the scope and payment are agreed, your campaign moves into execution.",
        icon: TrendingUp,
    },
];

const campaigns = [
    {
        title: "Premium Home in Kochi",
        location: "Kochi, Kerala",
        category: "Residential",
        image: "/images/sample-kochi-home.png",
        description:
            "An illustrative campaign showcasing how a premium home can be presented to a targeted audience.",
    },
    {
        title: "Residential Property in Kozhikode",
        location: "Kozhikode, Kerala",
        category: "Apartment",
        image: "/images/sample-kozhikode-apartment.png",
        description:
            "An illustrative campaign concept focused on property presentation and audience reach.",
    },
    {
        title: "Estate Property in Munnar",
        location: "Munnar, Kerala",
        category: "Land & Estate",
        image: "/images/sample-munnar-estate.png",
        description:
            "An illustrative marketing concept for estate and land properties.",
    },
];

const commitments = [
    {
        icon: BadgeCheck,
        title: "Verified Owners",
        description: "Property verification before campaign activation.",
    },
    {
        icon: BarChart3,
        title: "Campaign Reporting",
        description: "Clear updates on campaign activity and enquiries.",
    },
    {
        icon: CheckCircle2,
        title: "Zero Brokerage",
        description: "A marketing service model, not a brokerage listing.",
    },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7C3D]">
            <span className="h-px w-7 bg-[#B8924A]" />
            {children}
        </span>
    );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
    const mainRef = useRef<HTMLElement>(null);
    const categorySectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reducedMotion) {
                return () => mm.revert();
            }

            /* ---------------------------------------------
               FAST HERO TEXT ANIMATION

               Starts immediately.
               Short duration, no long stagger.
            --------------------------------------------- */

            const heroTimeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            heroTimeline
                .from(".hero-label", {
                    y: 14,
                    opacity: 0,
                    duration: 0.4,
                })
                .from(
                    ".hero-heading",
                    {
                        y: 22,
                        opacity: 0,
                        duration: 0.55,
                    },
                    "-=0.25"
                )
                .from(
                    ".hero-description",
                    {
                        y: 14,
                        opacity: 0,
                        duration: 0.45,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-buttons",
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.4,
                    },
                    "-=0.25"
                )
                .from(
                    ".hero-proof",
                    {
                        y: 10,
                        opacity: 0,
                        duration: 0.35,
                    },
                    "-=0.2"
                );

            /* ---------------------------------------------
               QUICK SECTION TEXT REVEALS

               Trigger early.
               Small movement.
               Short duration.
               No noticeable waiting.
            --------------------------------------------- */

            gsap.utils
                .toArray<HTMLElement>(".text-reveal")
                .forEach((element) => {
                    gsap.fromTo(
                        element,
                        {
                            y: 18,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 96%",
                                once: true,
                            },
                        }
                    );
                });

            /* ---------------------------------------------
               QUICK STAGGER FOR CARD GROUPS

               Maximum 0.08s between cards.
            --------------------------------------------- */

            gsap.utils
                .toArray<HTMLElement>(".text-stagger")
                .forEach((group) => {
                    const items = group.querySelectorAll(
                        ".text-stagger-item"
                    );

                    gsap.fromTo(
                        items,
                        {
                            y: 16,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.08,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: group,
                                start: "top 96%",
                                once: true,
                            },
                        }
                    );
                });

            /* ---------------------------------------------
               HERO VIDEO PARALLAX
            --------------------------------------------- */

            gsap.fromTo(
                ".hero-video",
                {
                    scale: 1.12,
                },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                }
            );

            gsap.to(".hero-background-content", {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            /* ---------------------------------------------
               STICKY CATEGORY STACK

               One pinned stage.
               One scroll-linked timeline.
               No individual card pins.
            --------------------------------------------- */

            mm.add("(min-width: 768px)", () => {
                const section = categorySectionRef.current;

                const stage = section?.querySelector<HTMLElement>(
                    ".category-stack-stage"
                );

                if (!section || !stage) return;

                const cards = gsap.utils.toArray<HTMLElement>(
                    stage.querySelectorAll(".category-stack-card")
                );

                if (!cards.length) return;

                gsap.set(cards, {
                    position: "absolute",
                    inset: 0,
                    yPercent: 105,
                    scale: 0.96,
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
                    gsap.set(card, {
                        zIndex: index + 1,
                    });
                });

                const stackTimeline = gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: stage,
                        start: "top top+=100",
                        end: () =>
                            `+=${window.innerHeight * (cards.length - 1)}`,
                        scrub: 1.4,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, index) => {
                    if (index === 0) return;

                    const previousCard = cards[index - 1];

                    stackTimeline.to(
                        previousCard,
                        {
                            scale: 0.93,
                            y: -30,
                            opacity: 0.5,
                            duration: 1,
                        },
                        index - 1
                    );

                    stackTimeline.to(
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
                    stackTimeline.scrollTrigger?.kill();
                    stackTimeline.kill();
                };
            });

            /* ---------------------------------------------
               MOBILE CATEGORY CARDS

               Natural document flow.
               No sticky pinning.
            --------------------------------------------- */

            mm.add("(max-width: 767px)", () => {
                const cards = gsap.utils.toArray<HTMLElement>(
                    ".category-stack-card"
                );

                cards.forEach((card) => {
                    gsap.set(card, {
                        clearProps: "all",
                    });
                });
            });

            /* ---------------------------------------------
               CAMPAIGN IMAGE PARALLAX
            --------------------------------------------- */

            gsap.utils
                .toArray<HTMLElement>(".campaign-image-wrap")
                .forEach((image) => {
                    const imageElement =
                        image.querySelector<HTMLElement>(".campaign-image");

                    if (!imageElement) return;

                    gsap.fromTo(
                        imageElement,
                        {
                            scale: 1.12,
                        },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: image,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.5,
                            },
                        }
                    );
                });

            /* ---------------------------------------------
               IMAGE REVEAL
            --------------------------------------------- */

            gsap.utils
                .toArray<HTMLElement>(".gsap-image-reveal")
                .forEach((element) => {
                    gsap.fromTo(
                        element,
                        {
                            clipPath: "inset(0 0 100% 0)",
                        },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 0.9,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 94%",
                                once: true,
                            },
                        }
                    );
                });

            /* ---------------------------------------------
               REFRESH SCROLL TRIGGERS
            --------------------------------------------- */

            const refreshTimer = window.setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

            return () => {
                window.clearTimeout(refreshTimer);
                mm.revert();
            };
        },
        {
            scope: mainRef,
            dependencies: [],
            revertOnUpdate: true,
        }
    );

    return (
        <main
            ref={mainRef}
            className="overflow-x-clip bg-[#F8F6F1] text-[#1C1C1C]"
        >
            {/* =================================================
                HERO
            ================================================= */}

            <section className="hero-section relative flex min-h-[760px] items-center overflow-hidden bg-[#1C1C1C] pt-28 sm:min-h-[820px]">
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

                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/90 via-[#1C1C1C]/65 to-[#1C1C1C]/20" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/65 via-transparent to-[#1C1C1C]/15" />

                    <div className="pointer-events-none absolute right-[12%] top-[25%] h-40 w-40 rounded-full border border-white/20" />

                    <div className="pointer-events-none absolute bottom-[18%] right-[30%] h-24 w-24 rounded-full bg-[#B8924A]/15 blur-2xl" />

                    <div className="pointer-events-none absolute bottom-[30%] right-[8%] h-3 w-3 rounded-full bg-[#B8924A]" />
                </div>

                <div className="hero-background-content relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <div className="hero-label mb-7 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-[#B8924A]" />
                            Premium Property Marketing · Kerala
                        </div>

                        <h1 className="hero-heading font-display text-5xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
                            We don't list your property.
                            <span className="mt-3 block text-[#D8BB82]">
                                We market it to the right buyers.
                            </span>
                        </h1>

                        <p className="hero-description mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                            Your property deserves more than a listing.
                            We build focused marketing campaigns that
                            connect verified properties with the right audience.
                        </p>

                        <div className="hero-buttons mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/promote-property"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#9F7C3D]"
                            >
                                Promote My Property
                                <ArrowUpRight className="ml-2 h-5 w-5" />
                            </Link>

                            <Link
                                href="/campaigns"
                                className="inline-flex h-14 items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
                            >
                                See Campaign Examples
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="hero-proof mt-14 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-white/85">
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-[#B8924A]" />
                                Verified Owners
                            </span>

                            <span className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-[#B8924A]" />
                                Campaign Reporting
                            </span>

                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#B8924A]" />
                                Zero Brokerage
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                COMMITMENTS
            ================================================= */}

            <section className="border-b border-[#1C1C1C]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
                <div className="text-stagger mx-auto grid max-w-7xl gap-9 md:grid-cols-3">
                    {commitments.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="text-stagger-item flex items-start gap-4"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5EFE3] text-[#9F7C3D]">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <h3 className="font-display text-xl text-[#1C1C1C]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[#5F5A50]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* =================================================
                WHY DIFFERENT
            ================================================= */}

            <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
                    <div className="text-reveal">
                        <SectionLabel>Why Per-Cent Kerala</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            More than a listing.
                            <span className="block text-[#B8924A]">
                                A planned marketing approach.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-xl text-base leading-8 text-[#5F5A50]">
                            Traditional property listings give your property
                            a place to appear. We take a service-led approach:
                            verify the property, plan the campaign, reach
                            relevant audiences and report enquiries.
                        </p>

                        <Link
                            href="/how-it-works"
                            className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#9F7C3D] transition-all duration-300 hover:gap-4"
                        >
                            Discover how it works
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="text-stagger space-y-4">
                        {[
                            {
                                title: "Property verification",
                                description:
                                    "Ownership and property details are reviewed before campaign activation.",
                            },
                            {
                                title: "A suitable marketing plan",
                                description:
                                    "Recommendations consider property type, location and asking price.",
                            },
                            {
                                title: "Campaign visibility",
                                description:
                                    "Understand campaign activity and enquiries through reporting.",
                            },
                        ].map((item, index) => (
                            <div
                                key={item.title}
                                className="text-stagger-item rounded-2xl border border-[#1C1C1C]/10 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#B8924A]/40 hover:shadow-lg"
                            >
                                <span className="text-xs font-bold tracking-widest text-[#B8924A]">
                                    0{index + 1}
                                </span>

                                <h3 className="mt-3 font-display text-2xl text-[#1C1C1C]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-[#5F5A50]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
                HOW IT WORKS
            ================================================= */}

            <section className="bg-[#F5EFE3] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="text-reveal mx-auto mb-16 max-w-2xl text-center">
                        <SectionLabel>Our Process</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            From property enquiry
                            <span className="block text-[#B8924A]">
                                to campaign launch.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-[#5F5A50]">
                            A clear process designed to keep property owners
                            informed at every stage.
                        </p>
                    </div>

                    <div className="text-stagger grid gap-7 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="text-stagger-item rounded-3xl border border-white bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-display text-3xl text-[#B8924A]">
                                            {step.number}
                                        </span>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFE3] text-[#9F7C3D]">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>

                                    <h3 className="mt-8 font-display text-xl text-[#1C1C1C]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[#5F5A50]">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =================================================
                PROPERTY CATEGORIES — STICKY STACK
            ================================================= */}

            <section
                ref={categorySectionRef}
                className="relative bg-[#F8F6F1] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="text-reveal mb-16 max-w-2xl">
                        <SectionLabel>Property Categories</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            Every property has
                            <span className="block text-[#B8924A]">
                                a story to tell.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-[#5F5A50]">
                            Different properties need different marketing
                            approaches. Explore the categories we work with.
                        </p>
                    </div>

                    <div className="category-stack-stage relative h-auto space-y-6 md:h-[520px] md:space-y-0">
                        {categories.map((category, index) => (
                            <article
                                key={category.number}
                                className="category-stack-card relative grid min-h-[480px] overflow-hidden rounded-3xl border border-[#1C1C1C]/10 bg-white shadow-[0_20px_60px_rgba(28,28,28,0.12)] md:absolute md:inset-0 md:min-h-0 md:grid-cols-2"
                                style={{ zIndex: index + 1 }}
                            >
                                <div className="relative min-h-[260px] overflow-hidden md:order-2 md:min-h-full">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="flex flex-col justify-center p-8 sm:p-12 md:order-1 lg:p-16">
                                    <span className="text-sm font-semibold tracking-widest text-[#B8924A]">
                                        {category.number} / 04
                                    </span>

                                    <h3 className="mt-6 font-display text-4xl leading-tight text-[#1C1C1C] sm:text-5xl">
                                        {category.title}
                                    </h3>

                                    <p className="mt-6 max-w-md text-base leading-8 text-[#5F5A50]">
                                        {category.description}
                                    </p>

                                    <Link
                                        href="/promote-property"
                                        className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#B8924A] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#9F7C3D]"
                                    >
                                        Promote Your Property
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
                PACKAGES
            ================================================= */}

            <section className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="text-reveal mx-auto mb-16 max-w-2xl text-center">
                        <SectionLabel>Marketing Packages</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            The right plan for
                            <span className="block text-[#B8924A]">
                                your property.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-[#5F5A50]">
                            Choose a service level based on your property
                            and marketing requirements. Final scope and
                            pricing are discussed with our team.
                        </p>
                    </div>

                    <div className="text-stagger grid gap-7 lg:grid-cols-3">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`text-stagger-item relative isolate flex flex-col rounded-3xl border p-8 transition duration-500 hover:-translate-y-2 hover:shadow-xl ${
                                    pkg.featured
                                        ? "border-[#B8924A] bg-[#F5EFE3] shadow-lg"
                                        : "border-[#1C1C1C]/10 bg-[#F8F6F1]"
                                }`}
                            >
                                <div className="relative z-10 flex flex-1 flex-col">
                                    {pkg.featured && (
                                        <span className="mb-5 inline-flex w-fit rounded-full bg-[#B8924A] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                                            Popular choice
                                        </span>
                                    )}

                                    <h3 className="font-display text-3xl text-[#1C1C1C]">
                                        {pkg.name}
                                    </h3>

                                    <p className="mt-4 min-h-14 text-sm leading-7 text-[#5F5A50]">
                                        {pkg.description}
                                    </p>

                                    <div className="my-7 h-px bg-[#1C1C1C]/10" />

                                    <ul className="flex-1 space-y-4">
                                        {pkg.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-[#5F5A50]"
                                            >
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B8924A]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/packages"
                                        className="mt-9 inline-flex h-12 items-center justify-center rounded-full border border-[#B8924A] px-6 text-sm font-bold text-[#9F7C3D] transition duration-300 hover:bg-[#B8924A] hover:text-white"
                                    >
                                        Explore Package
                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
                CAMPAIGN EXAMPLES
            ================================================= */}

            <section className="bg-[#F8F6F1] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="text-reveal mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <SectionLabel>Campaign Examples</SectionLabel>

                            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                                See how property
                                <span className="block text-[#B8924A]">
                                    marketing comes together.
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-8 text-[#5F5A50]">
                                Explore illustrative campaign concepts
                                created for different property types.
                            </p>
                        </div>

                        <Link
                            href="/campaigns"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#9F7C3D] transition-all duration-300 hover:gap-4"
                        >
                            View all examples
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="campaign-grid text-stagger grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((campaign) => (
                            <article
                                key={campaign.title}
                                className="text-stagger-item campaign-card group overflow-hidden rounded-3xl border border-[#1C1C1C]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="campaign-image-wrap relative h-64 overflow-hidden">
                                    <Image
                                        src={campaign.image}
                                        alt={campaign.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="campaign-image object-cover"
                                    />

                                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#9F7C3D] backdrop-blur">
                                        Illustrative concept
                                    </span>
                                </div>

                                <div className="p-7">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9F7C3D]">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {campaign.location}
                                    </div>

                                    <h3 className="mt-4 font-display text-2xl text-[#1C1C1C]">
                                        {campaign.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[#5F5A50]">
                                        {campaign.description}
                                    </p>

                                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#9F7C3D]">
                                        {campaign.category}
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================================================
                CAMPAIGN REPORT
            ================================================= */}

            <section className="bg-[#1C1C1C] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
                    <div className="text-reveal">
                        <SectionLabel>Campaign Transparency</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            Understand where
                            <span className="block text-[#D8BB82]">
                                your campaign stands.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-xl text-base leading-8 text-white/65">
                            Campaign reporting helps property owners
                            understand activity, enquiries and marketing
                            performance without relying on guesswork.
                        </p>

                        <div className="mt-9 flex items-center gap-3 text-sm text-white/80">
                            <ShieldCheck className="h-5 w-5 text-[#B8924A]" />
                            Clear campaign updates
                        </div>
                    </div>

                    <div className="text-reveal rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl sm:p-10">
                        <div className="flex items-center justify-between border-b border-white/15 pb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#D8BB82]">
                                    Sample Campaign Report
                                </p>

                                <h3 className="mt-2 font-display text-2xl">
                                    Campaign Overview
                                </h3>
                            </div>

                            <BarChart3 className="h-8 w-8 text-[#D8BB82]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-7">
                            {[
                                {
                                    label: "Ad Spend",
                                    value: "₹15,000",
                                },
                                {
                                    label: "Enquiries",
                                    value: "42",
                                },
                                {
                                    label: "Campaign Reach",
                                    value: "18,500",
                                },
                                {
                                    label: "Best Creative",
                                    value: "Villa Tour",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                                >
                                    <p className="text-xs text-white/55">
                                        {item.label}
                                    </p>

                                    <p className="mt-3 font-display text-xl text-[#D8BB82]">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs leading-6 text-white/45">
                            Illustrative sample figures only. These are
                            not actual Per-Cent Kerala campaign results.
                            Replace them with verified campaign data later.
                        </p>
                    </div>
                </div>
            </section>

            {/* =================================================
                TRUST SECTION
            ================================================= */}

            <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
                    <div className="gsap-image-reveal relative min-h-[430px] overflow-hidden rounded-3xl">
                        <Image
                            src="/images/kerala-luxury-interior.png"
                            alt="Premium Kerala property interior"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="text-reveal">
                        <SectionLabel>Built Around Trust</SectionLabel>

                        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                            Your property.
                            <span className="block text-[#B8924A]">
                                Our focused attention.
                            </span>
                        </h2>

                        <p className="mt-7 text-base leading-8 text-[#5F5A50]">
                            We believe property marketing should be
                            transparent, structured and accountable.
                            Every campaign starts with understanding
                            the property and agreeing on the right approach.
                        </p>

                        <ul className="mt-8 space-y-5">
                            {[
                                "Property details reviewed before promotion",
                                "Marketing scope discussed before activation",
                                "Campaign activity and enquiries reported",
                                "No brokerage-based listing model",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm leading-7 text-[#5F5A50]"
                                >
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#B8924A]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="relative overflow-hidden bg-[#F5EFE3] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-[#B8924A]/25" />

                <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-[#B8924A]/20" />

                <div className="text-reveal relative mx-auto max-w-4xl text-center">
                    <SectionLabel>Start Your Campaign</SectionLabel>

                    <h2 className="mt-7 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        Ready to give your property
                        <span className="block text-[#B8924A]">
                            the attention it deserves?
                        </span>
                    </h2>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#5F5A50]">
                        Tell us about your property. Our team will review
                        the details and help identify a suitable marketing approach.
                    </p>

                    <Link
                        href="/promote-property"
                        className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#B8924A] px-9 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#9F7C3D]"
                    >
                        Promote My Property
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
