"use client";

import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import Navbar from "@/components/layout/navbar";

gsap.registerPlugin(ScrollTrigger);

/* ---------- DESIGN SYSTEM ---------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const container =
    "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

const contactOptions = [
    {
        icon: MessageCircle,
        title: "Property enquiries",
        description:
            "Have a property to promote? Tell us about it and our team can guide you.",
        action: "Promote your property",
        href: "/promote-property",
        tint: "bg-[#F5EFE3]",
    },
    {
        icon: Mail,
        title: "Campaign support",
        description:
            "Need help understanding our packages or marketing process? Send us a message.",
        action: "Explore packages",
        href: "/packages",
        tint: "bg-[#EFE5D2]",
    },
    {
        icon: MapPin,
        title: "Our service area",
        description:
            "We work with property owners across Kerala, helping them promote properties in their local markets.",
        action: "View campaigns",
        href: "/campaigns",
        tint: "bg-[#E8D9BC]",
    },
];

const infoItems = [
    {
        icon: MapPin,
        title: "Serving across Kerala",
        text: "Property marketing support for owners across Kerala.",
        tint: "bg-[#F5EFE3]",
    },
    {
        icon: MessageCircle,
        title: "Let's understand your needs",
        text: "We discuss your property, requirements and suitable campaign options before proceeding.",
        tint: "bg-[#EFE5D2]",
    },
    {
        icon: Phone,
        title: "No upfront payment",
        text: "Sending an enquiry does not require payment. We share package and payment details only after discussion.",
        tint: "bg-[#E8D9BC]",
    },
];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    subject: "Property marketing enquiry",
    message: "",
};

const MAX_MESSAGE = 1000;

const inputClass =
    "w-full min-w-0 rounded-xl border border-[#1C1C1C]/15 bg-white px-4 py-3.5 text-base text-[#1C1C1C] outline-none transition-all duration-300 placeholder:text-[#8A857B] hover:border-[#B8924A]/60 focus:border-[#B8924A] focus:ring-4 focus:ring-[#B8924A]/15 sm:text-sm";

/* ---------- REVEAL COMPONENT ---------- */

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
            initial={
                reduceMotion ? false : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : delay,
                ease: EASE,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ---------- ANIMATED HEADING ---------- */

function MaskedLine({
    text,
    baseDelay = 0,
    className = "",
}: {
    text: string;
    baseDelay?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <span className={`block ${className}`}>
            {text.split(" ").map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    className="inline-block overflow-hidden pb-1 align-bottom"
                >
                    <motion.span
                        className="inline-block"
                        initial={
                            reduceMotion ? false : { y: "110%" }
                        }
                        animate={{ y: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.55,
                            delay: reduceMotion
                                ? 0
                                : baseDelay + index * 0.045,
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

/* ---------- SECTION HEADING ---------- */

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
    const reduceMotion = useReducedMotion();

    return (
        <div
            className={
                center
                    ? "mx-auto max-w-2xl text-center"
                    : "max-w-xl"
            }
        >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9F7C3D]">
                {label}
            </p>

            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[#1C1C1C] sm:text-4xl lg:text-[2.75rem]">
                {title}
            </h2>

            <motion.span
                aria-hidden
                initial={
                    reduceMotion ? false : { scaleX: 0 }
                }
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.65,
                    ease: EASE,
                }}
                className={`mt-4 block h-[3px] w-16 bg-[#B8924A] ${center ? "mx-auto origin-center" : "origin-left"
                    }`}
            />

            {text && (
                <p className="mt-5 text-base leading-7 text-[#625D53]">
                    {text}
                </p>
            )}
        </div>
    );
}

/* ---------- FLOATING CHIPS ---------- */

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
            initial={
                reduceMotion
                    ? false
                    : { opacity: 0, scale: 0.9 }
            }
            animate={
                reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                    }
            }
            transition={{
                opacity: {
                    duration: 0.4,
                    delay: 0.3 + delay,
                },
                scale: {
                    duration: 0.4,
                    delay: 0.3 + delay,
                    ease: EASE,
                },
                y: {
                    duration: 4.5,
                    delay: 0.8 + delay,
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

/* ---------- FORM FIELD ---------- */

function FormField({
    id,
    label,
    className = "",
    children,
}: {
    id: string;
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`min-w-0 ${className}`}>
            <label
                htmlFor={id}
                className="block text-sm font-semibold text-[#1C1C1C]"
            >
                {label}{" "}
                <span className="text-[#B8924A]">*</span>
            </label>

            <div className="mt-2">{children}</div>
        </div>
    );
}

/* ---------- PAGE ---------- */

export default function ContactPage() {
    const reduceMotion = useReducedMotion();

    const pageRef = useRef<HTMLElement>(null);

    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    /* ---------- GSAP ANIMATIONS ---------- */

    useEffect(() => {
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".gsap-contact-card",
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-contact-grid",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".gsap-info-item",
                {
                    opacity: 0,
                    x: -20,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.55,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-info-list",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".gsap-form-card",
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-form-card",
                        start: "top 92%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".gsap-final-cta",
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".gsap-final-cta",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            gsap.to(".gsap-contact-image", {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                    trigger: ".gsap-image-wrapper",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(".gsap-contact-decoration", {
                rotate: 25,
                scale: 1.08,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, pageRef);

        /* Anime.js icon animation */

        const iconObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animate(entry.target, {
                        scale: [0.75, 1.12, 1],
                        rotate: ["-12deg", "6deg", "0deg"],
                        opacity: [0, 1],
                        duration: 650,
                        ease: "outElastic(1, .65)",
                    });

                    iconObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.4 }
        );

        document
            .querySelectorAll("[data-anime-icon]")
            .forEach((icon) => iconObserver.observe(icon));

        /* Anime.js button hover */

        const hoverElements = document.querySelectorAll(
            "[data-anime-button]"
        );

        const hoverCleanups: (() => void)[] = [];

        hoverElements.forEach((element) => {
            const handleEnter = () => {
                animate(element, {
                    scale: 1.025,
                    duration: 200,
                    ease: "outQuad",
                });
            };

            const handleLeave = () => {
                animate(element, {
                    scale: 1,
                    duration: 250,
                    ease: "outQuad",
                });
            };

            element.addEventListener("mouseenter", handleEnter);
            element.addEventListener("mouseleave", handleLeave);

            hoverCleanups.push(() => {
                element.removeEventListener(
                    "mouseenter",
                    handleEnter
                );
                element.removeEventListener(
                    "mouseleave",
                    handleLeave
                );
            });
        });

        return () => {
            ctx.revert();
            iconObserver.disconnect();
            hoverCleanups.forEach((cleanup) => cleanup());
        };
    }, [reduceMotion]);

    /* ---------- FORM HANDLERS ---------- */

    function handleChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (sending) return;

        setSending(true);

        // Demo submission until backend API integration.
        window.setTimeout(() => {
            setSending(false);
            setSubmitted(true);
        }, 900);
    }

    function resetForm() {
        setForm(initialForm);
        setSubmitted(false);
    }

    /* ---------- JSX ---------- */

    return (
        <main
            ref={pageRef}
            className="min-h-screen overflow-x-clip bg-[#F8F6F1] text-[#1C1C1C] antialiased"
        >
            <Navbar />

            {/* ================= HERO ================= */}

            <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE3] via-[#F8F6F1] to-[#F8F6F1]">
                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion
                            ? undefined
                            : {
                                y: [0, 20, 0],
                                x: [0, 10, 0],
                            }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="gsap-contact-decoration pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#B8924A]/10 blur-3xl sm:h-80 sm:w-80"
                />

                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion
                            ? undefined
                            : { y: [0, -18, 0] }
                    }
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#E8D9BC]/60 blur-3xl sm:h-72 sm:w-72"
                />

                <div
                    className={`${container} relative grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24 lg:pt-36`}
                >
                    {/* HERO CONTENT */}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.07,
                                },
                            },
                        }}
                    >
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: EASE,
                                    },
                                },
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#B8924A]/20 bg-white px-4 py-2 text-xs font-semibold text-[#9F7C3D] shadow-sm sm:text-sm"
                        >
                            <Sparkles
                                className="h-4 w-4 text-[#B8924A]"
                                data-anime-icon
                            />
                            Get in touch
                        </motion.p>

                        <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                            <MaskedLine text="Let's talk about" />
                            <MaskedLine
                                text="your property."
                                baseDelay={0.12}
                                className="text-[#B8924A]"
                            />
                        </h1>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: EASE,
                                    },
                                },
                            }}
                            className="mt-5 max-w-xl text-base leading-8 text-[#625D53] sm:text-lg"
                        >
                            Whether you are looking to sell, rent or
                            promote a property, we are here to understand
                            your requirements and help you take the next
                            step.
                        </motion.p>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: EASE,
                                    },
                                },
                            }}
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                        >
                            <a
                                href="#message-form"
                                data-anime-button
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-[0_12px_30px_rgba(184,146,74,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                            >
                                Send a message
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>

                            <Link
                                href="/promote-property"
                                data-anime-button
                                className="group inline-flex h-14 items-center justify-center rounded-full border border-[#1C1C1C]/20 bg-white px-8 text-sm font-semibold text-[#1C1C1C] transition duration-300 hover:border-[#B8924A] hover:bg-[#F5EFE3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                            >
                                Promote your property
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* HERO IMAGE */}

                    <div className="gsap-image-wrapper relative mx-auto w-full max-w-xl lg:max-w-none">
                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        y: 22,
                                        clipPath:
                                            "inset(6% 6% 6% 6% round 28px)",
                                    }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                clipPath:
                                    "inset(0% 0% 0% 0% round 24px)",
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1,
                                ease: EASE,
                            }}
                            className="relative h-[300px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(28,28,28,0.14)] sm:h-[380px] lg:h-[440px]"
                        >
                            <motion.img
                                src="/images/sample-kochi-home.png"
                                alt="Kerala residential property"
                                loading="eager"
                                initial={false}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { scale: 1.04 }
                                }
                                transition={{
                                    duration: 0.8,
                                    ease: EASE,
                                }}
                                className="gsap-contact-image absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/20 via-transparent to-transparent" />
                        </motion.div>

                        <FloatChip className="-top-3 left-3 sm:-left-4 lg:-left-8 lg:top-10">
                            <p className="text-xs font-semibold text-[#625D53]">
                                Service area
                            </p>
                            <p className="text-sm font-bold text-[#1C1C1C]">
                                Across Kerala
                            </p>
                        </FloatChip>

                        <FloatChip
                            className="-bottom-4 right-3 sm:-right-3 lg:-right-6 lg:bottom-12"
                            delay={0.2}
                        >
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#9F7C3D]">
                                <ShieldCheck size={14} />
                                No upfront payment
                            </p>
                            <p className="text-sm font-bold text-[#1C1C1C]">
                                Enquire freely
                            </p>
                        </FloatChip>
                    </div>
                </div>
            </section>

            {/* ================= CONTACT OPTIONS ================= */}

            <section className="py-20 sm:py-28">
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="We're here to help"
                            title="Start with a conversation."
                            text="Share what you have in mind. Our team can understand your property and discuss a suitable marketing approach with you."
                        />
                    </Reveal>

                    <div className="gsap-contact-grid mx-auto mt-12 grid max-w-xl grid-cols-1 gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {contactOptions.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Reveal
                                    key={item.title}
                                    delay={index * 0.04}
                                    className={`gsap-contact-card h-full ${index === 2
                                            ? "sm:col-span-2 lg:col-span-1"
                                            : ""
                                        }`}
                                >
                                    <motion.div
                                        whileHover={
                                            reduceMotion
                                                ? undefined
                                                : { y: -6 }
                                        }
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                        }}
                                        className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#1C1C1C]/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(28,28,28,0.08)] sm:p-7"
                                    >
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
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[#9F7C3D] ${item.tint}`}
                                        >
                                            <Icon size={22} />
                                        </motion.div>

                                        <h3 className="mt-5 font-display text-xl text-[#1C1C1C]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 flex-1 text-sm leading-7 text-[#625D53]">
                                            {item.description}
                                        </p>

                                        <Link
                                            href={item.href}
                                            className="group/link mt-6 inline-flex w-fit max-w-full items-center gap-2 text-sm font-bold text-[#9F7C3D] transition-colors hover:text-[#1C1C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                                        >
                                            {item.action}

                                            <ArrowUpRight
                                                size={16}
                                                className="shrink-0 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                            />
                                        </Link>
                                    </motion.div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= CONTACT FORM ================= */}

            <section className="relative overflow-hidden bg-[#F5EFE3] py-20 sm:py-28">
                <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full border border-[#B8924A]/15" />
                <div className="pointer-events-none absolute -right-20 top-20 h-56 w-56 rounded-full border border-[#B8924A]/15" />

                <div
                    className={`${container} relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}
                >
                    {/* LEFT CONTENT */}

                    <div className="min-w-0 lg:sticky lg:top-28">
                        <Reveal>
                            <SectionHeading
                                center={false}
                                label="Send us a message"
                                title="Tell us what you are looking for."
                                text="Fill in the form with a few details. Whether you have a question about our services or want to discuss a property campaign, we would be happy to hear from you."
                            />
                        </Reveal>

                        <ul className="gsap-info-list mt-9 space-y-6">
                            {infoItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <motion.li
                                        key={item.title}
                                        className="gsap-info-item flex min-w-0 items-start gap-4"
                                    >
                                        <span
                                            data-anime-icon
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#9F7C3D] ${item.tint}`}
                                        >
                                            <Icon size={20} />
                                        </span>

                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-[#1C1C1C]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-[#625D53]">
                                                {item.text}
                                            </p>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* FORM CARD */}

                    <Reveal delay={0.06} className="min-w-0">
                        <div
                            id="message-form"
                            className="gsap-form-card scroll-mt-28 w-full min-w-0 rounded-3xl border border-[#B8924A]/15 bg-white p-6 shadow-[0_16px_40px_rgba(28,28,28,0.07)] sm:p-8 lg:p-10"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, scale: 0.97 }
                                    }
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: EASE,
                                    }}
                                    className="flex min-h-[420px] flex-col items-center justify-center px-2 py-10 text-center"
                                >
                                    <motion.div
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { scale: 0.7 }
                                        }
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 0.55,
                                            ease: "backOut",
                                        }}
                                        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EFE3] text-[#9F7C3D]"
                                    >
                                        <CheckCircle2 size={44} />
                                    </motion.div>

                                    <h3 className="mt-6 font-display text-2xl text-[#1C1C1C]">
                                        Form preview completed!
                                    </h3>

                                    <p className="mt-3 max-w-sm text-sm leading-7 text-[#625D53]">
                                        The contact form UI is ready.
                                        Actual message submission will be
                                        enabled when the backend API is
                                        connected.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        data-anime-button
                                        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#B8924A] px-7 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2"
                                    >
                                        Back to form
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-7 sm:mb-8">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7C3D]">
                                            Contact form
                                        </p>

                                        <h3 className="mt-2 font-display text-2xl text-[#1C1C1C] sm:text-3xl">
                                            Send an enquiry
                                        </h3>

                                        <p className="mt-2 text-sm text-[#625D53]">
                                            Fields marked with{" "}
                                            <span className="text-[#B8924A]">
                                                *
                                            </span>{" "}
                                            are required.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <FormField
                                                id="name"
                                                label="Your name"
                                            >
                                                <input
                                                    id="name"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Enter your name"
                                                    className={inputClass}
                                                />
                                            </FormField>

                                            <FormField
                                                id="email"
                                                label="Email address"
                                            >
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    autoComplete="email"
                                                    placeholder="you@example.com"
                                                    className={inputClass}
                                                />
                                            </FormField>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <FormField
                                                id="phone"
                                                label="Phone number"
                                            >
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    inputMode="tel"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    required
                                                    autoComplete="tel"
                                                    placeholder="Enter your phone number"
                                                    className={inputClass}
                                                />
                                            </FormField>

                                            <FormField
                                                id="subject"
                                                label="Enquiry type"
                                            >
                                                <div className="relative">
                                                    <select
                                                        id="subject"
                                                        name="subject"
                                                        value={form.subject}
                                                        onChange={handleChange}
                                                        required
                                                        className={`${inputClass} appearance-none pr-11`}
                                                    >
                                                        <option>
                                                            Property marketing
                                                            enquiry
                                                        </option>
                                                        <option>
                                                            Package enquiry
                                                        </option>
                                                        <option>
                                                            General question
                                                        </option>
                                                        <option>
                                                            Partnership enquiry
                                                        </option>
                                                    </select>

                                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#625D53]" />
                                                </div>
                                            </FormField>
                                        </div>

                                        <FormField
                                            id="message"
                                            label="Your message"
                                        >
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                maxLength={MAX_MESSAGE}
                                                placeholder="Tell us a little about your enquiry..."
                                                className={`${inputClass} min-h-[140px] resize-y`}
                                            />

                                            <p className="mt-2 text-right text-xs text-[#625D53]">
                                                {form.message.length}/
                                                {MAX_MESSAGE}
                                            </p>
                                        </FormField>

                                        <button
                                            type="submit"
                                            disabled={sending}
                                            data-anime-button
                                            className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition duration-300 hover:bg-[#9F7C3D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
                                        >
                                            {sending ? (
                                                <>
                                                    <span
                                                        aria-hidden
                                                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send enquiry
                                                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs leading-5 text-[#625D53]">
                                            By submitting this form, you
                                            are expressing interest in
                                            contacting Per-Cent Kerala
                                            about its services.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}

            <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
                <Reveal>
                    <div className="gsap-final-cta relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#B8924A]/20 bg-gradient-to-br from-[#EFE5D2] via-[#F5EFE3] to-[#E8D9BC] px-6 py-12 text-[#1C1C1C] shadow-sm sm:px-12 sm:py-16">
                        <motion.div
                            aria-hidden
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 8, 0],
                                    }
                            }
                            transition={{
                                duration: 14,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#B8924A]/20 bg-white/20"
                        />

                        <motion.div
                            aria-hidden
                            animate={
                                reduceMotion
                                    ? undefined
                                    : { y: [0, -15, 0] }
                            }
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/30"
                        />

                        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                            <div className="min-w-0">
                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9F7C3D]">
                                    Ready to get started?
                                </p>

                                <h2 className="mt-3 font-display text-3xl leading-tight text-[#1C1C1C] sm:text-4xl lg:text-5xl">
                                    Have a property to promote?
                                </h2>

                                <p className="mt-4 max-w-xl text-base leading-7 text-[#625D53]">
                                    Share your property details and
                                    explore the right campaign.
                                </p>
                            </div>

                            <div className="lg:justify-self-end">
                                <Link
                                    href="/promote-property"
                                    data-anime-button
                                    className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#1C1C1C] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#B8924A] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8924A] focus-visible:ring-offset-2 sm:w-auto"
                                >
                                    Promote your property
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}