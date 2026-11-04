"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
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
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/navbar";

/* Palette: Trust Blue + Sand (light, soft, low glare)
   ink #1f2d3d | muted #4a5a6e | page #fbf9f4 | blue #2b5d94 | blue hover #3a70ab
   soft blue #e4eef8 | pale blue #eef4fb | sky #dcebf5 | sand #f8ecd9 | peach #f9e6dc
   accent #e9a55a | accent text #9a6226 | dark gold #7d4e17 */

const EASE = [0.22, 1, 0.36, 1] as const;
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

const contactOptions = [
    {
        icon: MessageCircle,
        title: "Property enquiries",
        description:
            "Have a property to promote? Tell us about it and our team can guide you.",
        action: "Promote your property",
        href: "/promote-property",
        tint: "bg-[#e4eef8]",
    },
    {
        icon: Mail,
        title: "Campaign support",
        description:
            "Need help understanding our packages or marketing process? Send us a message.",
        action: "Explore packages",
        href: "/packages",
        tint: "bg-[#f8ecd9]",
    },
    {
        icon: MapPin,
        title: "Our service area",
        description:
            "We work with property owners across Kerala, helping them promote properties in their local markets.",
        action: "View campaigns",
        href: "/campaigns",
        tint: "bg-[#f9e6dc]",
    },
];

const infoItems = [
    {
        icon: MapPin,
        title: "Serving across Kerala",
        text: "Property marketing support for owners across Kerala.",
        tint: "bg-[#e4eef8]",
    },
    {
        icon: MessageCircle,
        title: "Let’s understand your needs",
        text: "We discuss your property, requirements and suitable campaign options before proceeding.",
        tint: "bg-[#f8ecd9]",
    },
    {
        icon: Phone,
        title: "No upfront payment",
        text: "Sending an enquiry does not require payment. We share package and payment details only after discussion.",
        tint: "bg-[#f9e6dc]",
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
    "w-full min-w-0 rounded-xl border border-[#1f2d3d]/15 bg-white px-4 py-3.5 text-base text-[#1f2d3d] outline-none transition placeholder:text-[#6f7d8f] hover:border-[#2b5d94]/50 focus:border-[#2b5d94] focus:ring-4 focus:ring-[#2b5d94]/15 sm:text-sm";

/* ---------- helpers ---------- */

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
    className = "",
}: {
    text: string;
    baseDelay?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <span className={`block ${className}`}>
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
        <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
            <p className="text-sm font-semibold text-[#2b5d94]">{label}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[#1f2d3d] sm:text-4xl lg:text-[2.75rem]">
                {title}
            </h2>
            <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className={`mt-4 block h-1 w-16 rounded-full bg-[#e9a55a] ${center ? "mx-auto origin-center" : "origin-left"
                    }`}
            />
            {text && (
                <p className="mt-5 text-base leading-7 text-[#4a5a6e]">{text}</p>
            )}
        </div>
    );
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
            className={`absolute z-20 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(31,45,61,0.14)] ${className}`}
        >
            {children}
        </motion.div>
    );
}

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
            <label htmlFor={id} className="block text-sm font-semibold text-[#1f2d3d]">
                {label} <span className="text-[#9a6226]">*</span>
            </label>
            <div className="mt-2">{children}</div>
        </div>
    );
}

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ---------- page ---------- */

export default function ContactPage() {
    const reduceMotion = useReducedMotion();

    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        setForm((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (sending) return;

        setSending(true);

        // TODO: connect this form to your backend API.
        // Frontend demo only: simulates a short sending delay.
        window.setTimeout(() => {
            setSending(false);
            setSubmitted(true);
        }, 900);
    }

    function resetForm() {
        setForm(initialForm);
        setSubmitted(false);
    }

    return (
        <main className="min-h-screen overflow-x-clip bg-[#fbf9f4] text-[#1f2d3d] antialiased">
            <Navbar />

            {/* HERO */}
            <section className="relative bg-gradient-to-b from-[#e4eef8] to-[#fbf9f4]">
                <motion.div
                    aria-hidden
                    animate={reduceMotion ? undefined : { y: [0, 24, 0], x: [0, 12, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#dcebf5] blur-2xl sm:h-80 sm:w-80"
                />
                <motion.div
                    aria-hidden
                    animate={reduceMotion ? undefined : { y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#f8ecd9] blur-2xl sm:h-72 sm:w-72"
                />

                <div
                    className={`${container} relative grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24 lg:pt-36`}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        <motion.p
                            variants={heroItem}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#2b5d94] shadow-sm sm:text-sm"
                        >
                            <Sparkles className="h-4 w-4 text-[#e9a55a]" />
                            Get in touch
                        </motion.p>

                        <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-[#1f2d3d] sm:text-5xl lg:text-6xl">
                            <MaskedLine text="Let’s talk about" baseDelay={0.2} />
                            <MaskedLine
                                text="your property."
                                baseDelay={0.5}
                                className="text-[#2b5d94]"
                            />
                        </h1>

                        <motion.p
                            variants={heroItem}
                            className="mt-5 max-w-xl text-base leading-8 text-[#4a5a6e] sm:text-lg"
                        >
                            Whether you are looking to sell, rent or promote a property,
                            we are here to understand your requirements and help you
                            take the next step.
                        </motion.p>

                        <motion.div
                            variants={heroItem}
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                        >
                            <a
                                href="#message-form"
                                className="group inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                            >
                                Send a message
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>

                            <Link
                                href="/promote-property"
                                className="group inline-flex h-14 items-center justify-center rounded-full border border-[#1f2d3d]/25 bg-white px-8 text-sm font-semibold text-[#1f2d3d] transition duration-300 hover:-translate-y-0.5 hover:border-[#2b5d94] hover:bg-[#e4eef8] hover:text-[#1f2d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                            >
                                Promote your property
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* image + floating chips */}
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
                            transition={{ duration: 1, delay: 0.2, ease: EASE }}
                            className="relative h-[300px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(31,45,61,0.14)] sm:h-[380px] lg:h-[440px]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600"
                                alt="Modern residential property"
                                loading="eager"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </motion.div>

                        <FloatChip className="-top-3 left-3 sm:-left-4 lg:-left-8 lg:top-10">
                            <p className="text-xs font-semibold text-[#4a5a6e]">Service area</p>
                            <p className="text-sm font-bold text-[#1f2d3d]">Across Kerala</p>
                        </FloatChip>

                        <FloatChip
                            className="-bottom-4 right-3 sm:-right-3 lg:-right-6 lg:bottom-12"
                            delay={0.25}
                        >
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#9a6226]">
                                <ShieldCheck size={14} />
                                No upfront payment
                            </p>
                            <p className="text-sm font-bold text-[#1f2d3d]">Enquire freely</p>
                        </FloatChip>
                    </div>
                </div>
            </section>

            {/* CONTACT OPTIONS */}
            <section className="py-20 sm:py-28">
                <div className={container}>
                    <Reveal>
                        <SectionHeading
                            label="We’re here to help"
                            title="Start with a conversation."
                            text="Share what you have in mind. Our team can understand your property and discuss a suitable marketing approach with you."
                        />
                    </Reveal>

                    <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {contactOptions.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Reveal
                                    key={item.title}
                                    delay={index * 0.1}
                                    className={`h-full ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                                >
                                    <motion.div
                                        whileHover={reduceMotion ? undefined : { y: -6 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#1f2d3d]/10 bg-white p-6 shadow-sm hover:shadow-lg sm:p-7"
                                    >
                                        <motion.div
                                            whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[#2b5d94] ${item.tint}`}
                                        >
                                            <Icon size={22} />
                                        </motion.div>

                                        <h3 className="mt-5 font-display text-xl text-[#1f2d3d]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 flex-1 text-sm leading-7 text-[#4a5a6e]">
                                            {item.description}
                                        </p>

                                        <Link
                                            href={item.href}
                                            className="group/link mt-6 inline-flex w-fit max-w-full items-center gap-2 text-sm font-bold text-[#2b5d94] transition-colors hover:text-[#1f4a78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
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

            {/* CONTACT FORM SECTION */}
            <section className="bg-[#eef4fb] py-20 sm:py-28">
                <div
                    className={`${container} grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}
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

                        <ul className="mt-9 space-y-5">
                            {infoItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.li
                                        key={item.title}
                                        initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                        className="flex min-w-0 items-start gap-4"
                                    >
                                        <span
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#2b5d94] ${item.tint}`}
                                        >
                                            <Icon size={20} />
                                        </span>

                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-[#1f2d3d]">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-[#4a5a6e]">
                                                {item.text}
                                            </p>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* FORM CARD */}
                    <Reveal delay={0.1} className="min-w-0">
                        <div
                            id="message-form"
                            className="scroll-mt-28 w-full min-w-0 rounded-3xl border border-[#1f2d3d]/10 bg-white p-6 shadow-[0_16px_40px_rgba(31,45,61,0.08)] sm:p-8 lg:p-10"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    className="flex min-h-[420px] flex-col items-center justify-center px-2 py-10 text-center"
                                >
                                    <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
                                        <motion.circle
                                            cx="26"
                                            cy="26"
                                            r="24"
                                            fill="#e4eef8"
                                            stroke="#2b5d94"
                                            strokeWidth="2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.7, ease: EASE }}
                                        />
                                        <motion.path
                                            d="M15 27 l8 8 l15 -17"
                                            fill="none"
                                            stroke="#2b5d94"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
                                        />
                                    </svg>

                                    <h3 className="mt-6 font-display text-2xl text-[#1f2d3d]">
                                        Form preview completed!
                                    </h3>

                                    <p className="mt-3 max-w-sm text-sm leading-7 text-[#4a5a6e]">
                                        The contact form UI is ready. Actual message submission
                                        will be enabled when the backend API is connected.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#2b5d94] px-7 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                                    >
                                        Back to form
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-7 sm:mb-8">
                                        <h3 className="font-display text-2xl text-[#1f2d3d] sm:text-3xl">
                                            Send an enquiry
                                        </h3>
                                        <p className="mt-2 text-sm text-[#4a5a6e]">
                                            Fields marked with <span className="text-[#9a6226]">*</span> are
                                            required.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <FormField id="name" label="Your name">
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

                                            <FormField id="email" label="Email address">
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
                                            <FormField id="phone" label="Phone number">
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

                                            <FormField id="subject" label="Enquiry type">
                                                <div className="relative">
                                                    <select
                                                        id="subject"
                                                        name="subject"
                                                        value={form.subject}
                                                        onChange={handleChange}
                                                        required
                                                        className={`${inputClass} appearance-none pr-11`}
                                                    >
                                                        <option>Property marketing enquiry</option>
                                                        <option>Package enquiry</option>
                                                        <option>General question</option>
                                                        <option>Partnership enquiry</option>
                                                    </select>
                                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a5a6e]" />
                                                </div>
                                            </FormField>
                                        </div>

                                        <FormField id="message" label="Your message">
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
                                            <p className="mt-2 text-right text-xs text-[#4a5a6e]">
                                                {form.message.length}/{MAX_MESSAGE}
                                            </p>
                                        </FormField>

                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0 sm:w-auto"
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

                                        <p className="text-xs leading-5 text-[#4a5a6e]">
                                            By submitting this form, you are expressing interest in
                                            contacting Per-Cent Kerala about its services.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FINAL CTA (light) */}
            <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
                <Reveal>
                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#e4eef8] via-[#dcebf5] to-[#f8ecd9] px-6 py-12 text-[#1f2d3d] shadow-sm ring-1 ring-[#2b5d94]/15 sm:px-12 sm:py-16">
                        <motion.div
                            aria-hidden
                            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/50"
                        />
                        <motion.div
                            aria-hidden
                            animate={reduceMotion ? undefined : { y: [0, -18, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                            className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/40"
                        />

                        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#7d4e17]">
                                    Ready to get started?
                                </p>
                                <h2 className="mt-3 font-display text-3xl leading-tight text-[#1f2d3d] sm:text-4xl lg:text-5xl">
                                    Have a property to promote?
                                </h2>
                                <p className="mt-4 max-w-xl text-base leading-7 text-[#4a5a6e]">
                                    Share your property details and explore the right
                                    campaign.
                                </p>
                            </div>

                            <div className="lg:justify-self-end">
                                <Link
                                    href="/promote-property"
                                    className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 sm:w-auto"
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