"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Check,
    IndianRupee,
    Layers,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    User,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/navbar";

/* Palette: Trust Blue + Sand (light, soft, low glare)
   ink #1f2d3d | muted #4a5a6e | page #fbf9f4 | blue #2b5d94 | blue hover #3a70ab
   soft blue #e4eef8 | pale blue #eef4fb | sky #dcebf5 | sand #f8ecd9 | peach #f9e6dc
   accent #e9a55a | accent text #9a6226 | dark gold #7d4e17 */

const EASE = [0.22, 1, 0.36, 1] as const;
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

const packages = [
    {
        id: "basic",
        name: "Basic",
        description: "A simple way to start generating property enquiries.",
        features: [
            "5 enquiries guaranteed",
            "Property promotion",
            "Enquiry details shared",
        ],
        popular: false,
    },
    {
        id: "premium",
        name: "Premium",
        description: "Reach more potential buyers through paid campaigns.",
        features: [
            "Facebook & Instagram ads",
            "Targeted audience campaigns",
            "Creative development",
            "Enquiry generation",
        ],
        popular: true,
    },
    {
        id: "diamond",
        name: "Diamond",
        description: "Complete marketing and buyer coordination support.",
        features: [
            "Complete digital marketing",
            "Multi-channel promotion",
            "Buyer enquiry coordination",
            "Follow-up support",
            "Sale process assistance",
        ],
        popular: false,
    },
];

const campaignReferences: Record<
    string,
    { title: string; category: string; location: string }
> = {
    "plot-kakkanad": {
        title: "Residential Plot Campaign",
        category: "Land",
        location: "Kakkanad, Ernakulam",
    },
    "villa-kochi": {
        title: "Luxury Villa Campaign",
        category: "Villas",
        location: "Kochi, Ernakulam",
    },
    "apartment-kochi": {
        title: "Modern Apartment Promotion",
        category: "Apartments",
        location: "Kochi, Ernakulam",
    },
    "villa-kozhikode": {
        title: "Contemporary Villa Promotion",
        category: "Villas",
        location: "Kozhikode, Kerala",
    },
    "commercial-trivandrum": {
        title: "Commercial Space Campaign",
        category: "Commercial",
        location: "Thiruvananthapuram, Kerala",
    },
    "apartment-kottayam": {
        title: "Premium Apartment Campaign",
        category: "Apartments",
        location: "Kottayam, Kerala",
    },
};

const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
];

const formSteps = [
    { title: "Your details", subtitle: "How we can reach you", icon: User },
    { title: "Property", subtitle: "What you want to promote", icon: Building2 },
    { title: "Package", subtitle: "Choose your interest", icon: Layers },
];

const nextSteps = [
    "Our team reviews your details",
    "We discuss the right package",
    "You approve the plan",
    "Your campaign goes live",
];

const inputClass =
    "w-full rounded-xl border border-[#1f2d3d]/15 bg-white px-4 py-3.5 text-base text-[#1f2d3d] outline-none transition placeholder:text-[#6f7d8f] hover:border-[#2b5d94]/50 focus:border-[#2b5d94] focus:ring-4 focus:ring-[#2b5d94]/15 sm:text-sm";

type FormData = {
    ownerName: string;
    email: string;
    phone: string;
    propertyType: string;
    propertyTitle: string;
    location: string;
    district: string;
    propertySize: string;
    expectedPrice: string;
    description: string;
};

type CampaignInfo = { title: string; category: string; location: string };

const slide = {
    enter: (d: number) => ({ opacity: 0, x: d * 36 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -36 }),
};

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ---------- helpers ---------- */

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

function Field({
    label,
    required,
    className = "",
    children,
}: {
    label: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={`block ${className}`}>
            <span className="text-sm font-semibold text-[#1f2d3d]">
                {label}
                {required && <span className="text-[#9a6226]"> *</span>}
            </span>
            <div className="mt-2">{children}</div>
        </label>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    const filled = value.trim().length > 0;

    return (
        <div className="flex items-start justify-between gap-4 border-b border-[#1f2d3d]/10 py-3 last:border-b-0">
            <span className="text-sm text-[#4a5a6e]">{label}</span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={value}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[60%] break-words text-right text-sm font-semibold ${filled ? "text-[#1f2d3d]" : "text-[#6f7d8f]"
                        }`}
                >
                    {filled ? value : "Not added yet"}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

/* ---------- page ---------- */

export default function PromotePropertyPage() {
    const reduceMotion = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState("premium");
    const [submitted, setSubmitted] = useState(false);

    const [campaignId, setCampaignId] = useState("");
    const [campaignInfo, setCampaignInfo] = useState<CampaignInfo | null>(null);

    const [form, setForm] = useState<FormData>({
        ownerName: "",
        email: "",
        phone: "",
        propertyType: "",
        propertyTitle: "",
        location: "",
        district: "",
        propertySize: "",
        expectedPrice: "",
        description: "",
    });

    // Read campaign and package query parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const campaign = params.get("campaign");
        const packageId = params.get("package");

        if (campaign && campaignReferences[campaign]) {
            setCampaignId(campaign);
            setCampaignInfo(campaignReferences[campaign]);
        }

        if (packageId && packages.some((pkg) => pkg.id === packageId)) {
            setSelectedPackage(packageId);
        }
    }, []);

    const updateField = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name } = e.target;
        let { value } = e.target;

        // phone: digits only
        if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);

        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const scrollToCard = () => {
        window.setTimeout(() => {
            cardRef.current?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start",
            });
        }, 50);
    };

    const goTo = (target: number) => {
        setDirection(target > step ? 1 : -1);
        setStep(target);
        scrollToCard();
    };

    // Native browser validation runs before this fires (only the visible step's fields exist)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step < formSteps.length - 1) {
            goTo(step + 1);
            return;
        }

        // TODO: send this to your backend API
        const submissionData = {
            ...form,
            selectedPackage,
            campaignId: campaignId || null,
        };

        console.log("Property enquiry:", submissionData);

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const activePackage = packages.find((pkg) => pkg.id === selectedPackage);
    const placeText = [form.location, form.district].filter(Boolean).join(", ");

    /* ---------- SUCCESS ---------- */
    if (submitted) {
        return (
            <main className="min-h-screen overflow-x-clip bg-[#fbf9f4] text-[#1f2d3d] antialiased">
                <Navbar />

                <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#e4eef8] to-[#fbf9f4] px-5 pb-16 pt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="w-full max-w-lg rounded-3xl border border-[#1f2d3d]/10 bg-white p-8 text-center shadow-[0_20px_50px_rgba(31,45,61,0.12)] sm:p-10"
                    >
                        <svg
                            viewBox="0 0 52 52"
                            className="mx-auto h-20 w-20"
                            aria-hidden
                        >
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

                        <h1 className="mt-6 font-display text-3xl text-[#1f2d3d]">
                            Thank you{form.ownerName ? `, ${form.ownerName.split(" ")[0]}` : ""}!
                        </h1>

                        <p className="mt-4 text-sm leading-7 text-[#4a5a6e]">
                            Your property details have been captured in this demo. Our
                            team will review your enquiry and discuss the next steps.
                        </p>

                        <div className="mt-6 rounded-2xl bg-[#eef4fb] p-5 text-left">
                            <p className="text-xs font-semibold text-[#4a5a6e]">
                                Selected package
                            </p>
                            <p className="mt-1 font-semibold text-[#1f2d3d]">
                                {activePackage?.name}
                            </p>
                        </div>

                        {campaignInfo && (
                            <div className="mt-4 rounded-2xl bg-[#eef4fb] p-5 text-left">
                                <p className="text-xs font-semibold text-[#4a5a6e]">
                                    Campaign reference
                                </p>
                                <p className="mt-1 font-semibold text-[#1f2d3d]">
                                    {campaignInfo.title}
                                </p>
                                <p className="mt-1 text-xs text-[#4a5a6e]">
                                    {campaignInfo.category} · {campaignInfo.location}
                                </p>
                                <p className="mt-2 text-xs text-[#4a5a6e]">
                                    Reference ID: {campaignId}
                                </p>
                            </div>
                        )}

                        <Link
                            href="/"
                            className="group mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                        >
                            Back to Home
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </section>
            </main>
        );
    }

    /* ---------- FORM PAGE ---------- */
    return (
        <main className="overflow-x-clip bg-[#fbf9f4] text-[#1f2d3d] antialiased">
            <Navbar />

            {/* HERO (compact) */}
            <section className="relative bg-gradient-to-b from-[#e4eef8] to-[#fbf9f4]">
                <motion.div
                    aria-hidden
                    animate={reduceMotion ? undefined : { y: [0, 24, 0], x: [0, 12, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#dcebf5] blur-2xl sm:h-80 sm:w-80"
                />
                <motion.div
                    aria-hidden
                    animate={reduceMotion ? undefined : { y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#f8ecd9] blur-2xl sm:h-72 sm:w-72"
                />

                <div className={`${container} relative pb-12 pt-28 sm:pt-32 lg:pb-16`}>
                    <Link
                        href="/"
                        className="group inline-flex items-center text-sm font-semibold text-[#4a5a6e] transition hover:text-[#2b5d94]"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        className="mt-8 max-w-3xl"
                    >
                        <motion.p
                            variants={heroItem}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#2b5d94] shadow-sm sm:text-sm"
                        >
                            <Sparkles className="h-4 w-4 text-[#e9a55a]" />
                            Property marketing in Kerala
                        </motion.p>

                        <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-[#1f2d3d] sm:text-5xl lg:text-6xl">
                            <MaskedLine text="Your property deserves" baseDelay={0.2} />
                            <MaskedLine
                                text="the right attention."
                                baseDelay={0.5}
                                className="text-[#2b5d94]"
                            />
                        </h1>

                        <motion.p
                            variants={heroItem}
                            className="mt-5 max-w-xl text-base leading-8 text-[#4a5a6e] sm:text-lg"
                        >
                            Tell us about your property. Our team will understand your
                            requirements and help you choose the right marketing
                            campaign.
                        </motion.p>

                        <motion.ul
                            variants={heroItem}
                            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#1f2d3d]"
                        >
                            <li className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#2b5d94]" />
                                No payment needed to enquire
                            </li>
                            <li className="flex items-center gap-2">
                                <Check size={18} className="text-[#2b5d94]" />
                                Takes around 2 minutes
                            </li>
                        </motion.ul>
                    </motion.div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section className="px-5 pb-20 pt-4 sm:px-6 sm:pb-28 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
                    {/* FORM CARD */}
                    <motion.div
                        ref={cardRef}
                        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                        className="scroll-mt-24 min-w-0 rounded-3xl border border-[#1f2d3d]/10 bg-white shadow-[0_16px_40px_rgba(31,45,61,0.08)]"
                    >
                        {/* STEPPER */}
                        <div className="border-b border-[#1f2d3d]/10 px-5 py-6 sm:px-8">
                            <ol className="flex items-center" aria-label="Form progress">
                                {formSteps.map((s, i) => {
                                    const done = i < step;
                                    const current = i === step;
                                    const Icon = s.icon;

                                    return (
                                        <li
                                            key={s.title}
                                            className={`flex items-center ${i < formSteps.length - 1 ? "flex-1" : ""
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => done && goTo(i)}
                                                disabled={!done}
                                                aria-current={current ? "step" : undefined}
                                                className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 disabled:cursor-default"
                                            >
                                                <motion.span
                                                    animate={
                                                        reduceMotion
                                                            ? undefined
                                                            : { scale: current ? 1.08 : 1 }
                                                    }
                                                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${done
                                                        ? "border-[#2b5d94] bg-[#2b5d94] text-white"
                                                        : current
                                                            ? "border-[#2b5d94] bg-[#e4eef8] text-[#2b5d94] ring-4 ring-[#2b5d94]/15"
                                                            : "border-[#1f2d3d]/20 bg-white text-[#6f7d8f]"
                                                        }`}
                                                >
                                                    {done ? <Check size={18} /> : <Icon size={18} />}
                                                </motion.span>

                                                <span className="hidden sm:block">
                                                    <span className="block text-xs font-semibold text-[#4a5a6e]">
                                                        Step {i + 1}
                                                    </span>
                                                    <span
                                                        className={`block text-sm font-bold ${current || done
                                                            ? "text-[#1f2d3d]"
                                                            : "text-[#6f7d8f]"
                                                            }`}
                                                    >
                                                        {s.title}
                                                    </span>
                                                </span>
                                            </button>

                                            {i < formSteps.length - 1 && (
                                                <span
                                                    aria-hidden
                                                    className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-[#1f2d3d]/10 sm:mx-5"
                                                >
                                                    <motion.span
                                                        animate={{ scaleX: step > i ? 1 : 0 }}
                                                        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                                                        className="absolute inset-0 origin-left bg-[#2b5d94]"
                                                    />
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>

                            {/* mobile step label */}
                            <p className="mt-4 text-sm font-semibold text-[#1f2d3d] sm:hidden">
                                Step {step + 1} of {formSteps.length} · {formSteps[step].title}
                            </p>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="px-5 py-7 sm:px-8 sm:py-9">
                            {/* campaign reference */}
                            {campaignInfo && (
                                <div className="mb-8 flex items-start gap-3 rounded-2xl border border-[#2b5d94]/20 bg-[#eef4fb] p-4 sm:p-5">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#2b5d94]">
                                        <Check size={20} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-[#4a5a6e]">
                                            Selected campaign reference
                                        </p>
                                        <p className="mt-1 font-display text-lg text-[#1f2d3d]">
                                            {campaignInfo.title}
                                        </p>
                                        <p className="mt-1 text-sm text-[#4a5a6e]">
                                            {campaignInfo.category} · {campaignInfo.location}
                                        </p>
                                        <p className="mt-2 text-xs leading-6 text-[#4a5a6e]">
                                            You selected this sample campaign as your inspiration. Our
                                            team will review whether a similar approach is suitable
                                            for your property.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence mode="wait" custom={reduceMotion ? 0 : direction}>
                                <motion.div
                                    key={step}
                                    custom={reduceMotion ? 0 : direction}
                                    variants={slide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: EASE }}
                                >
                                    <div className="mb-7">
                                        <h2 className="font-display text-2xl text-[#1f2d3d] sm:text-3xl">
                                            {step === 0 && "Tell us how to reach you"}
                                            {step === 1 && "Tell us about your property"}
                                            {step === 2 && "Select a marketing package"}
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-[#4a5a6e]">
                                            {step === 0 && "We will use these details to contact you about your enquiry."}
                                            {step === 1 && "The more we know, the better we can plan your campaign."}
                                            {step === 2 && "Our team will discuss the package and pricing with you."}
                                        </p>
                                    </div>

                                    {/* STEP 1: OWNER */}
                                    {step === 0 && (
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <Field label="Full name" required>
                                                <input
                                                    required
                                                    name="ownerName"
                                                    value={form.ownerName}
                                                    onChange={updateField}
                                                    autoComplete="name"
                                                    placeholder="Enter your full name"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="Phone number" required>
                                                <div className="relative">
                                                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7d8f]" />
                                                    <input
                                                        required
                                                        type="tel"
                                                        inputMode="numeric"
                                                        name="phone"
                                                        value={form.phone}
                                                        onChange={updateField}
                                                        autoComplete="tel-national"
                                                        pattern="[0-9]{10}"
                                                        maxLength={10}
                                                        title="Enter a 10-digit mobile number"
                                                        placeholder="10-digit mobile number"
                                                        className={`${inputClass} pl-11`}
                                                    />
                                                </div>
                                            </Field>

                                            <Field label="Email address" className="md:col-span-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={updateField}
                                                    autoComplete="email"
                                                    placeholder="you@example.com"
                                                    className={inputClass}
                                                />
                                            </Field>
                                        </div>
                                    )}

                                    {/* STEP 2: PROPERTY */}
                                    {step === 1 && (
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <Field label="Property type" required>
                                                <select
                                                    required
                                                    name="propertyType"
                                                    value={form.propertyType}
                                                    onChange={updateField}
                                                    className={inputClass}
                                                >
                                                    <option value="">Select property type</option>
                                                    <option value="house">House / Villa</option>
                                                    <option value="apartment">Apartment / Flat</option>
                                                    <option value="land">Land / Plot</option>
                                                    <option value="commercial">Commercial Property</option>
                                                    <option value="agricultural">Agricultural Land</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </Field>

                                            <Field label="Property title" required>
                                                <input
                                                    required
                                                    name="propertyTitle"
                                                    value={form.propertyTitle}
                                                    onChange={updateField}
                                                    placeholder="e.g. 3 BHK Villa in Kochi"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="District" required>
                                                <select
                                                    required
                                                    name="district"
                                                    value={form.district}
                                                    onChange={updateField}
                                                    className={inputClass}
                                                >
                                                    <option value="">Select district</option>
                                                    {districts.map((district) => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Field>

                                            <Field label="Location / area" required>
                                                <input
                                                    required
                                                    name="location"
                                                    value={form.location}
                                                    onChange={updateField}
                                                    placeholder="e.g. Kakkanad, Kochi"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="Property size">
                                                <input
                                                    name="propertySize"
                                                    value={form.propertySize}
                                                    onChange={updateField}
                                                    placeholder="e.g. 1500 sq.ft / 10 cents"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="Expected price">
                                                <div className="relative">
                                                    <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7d8f]" />
                                                    <input
                                                        name="expectedPrice"
                                                        value={form.expectedPrice}
                                                        onChange={updateField}
                                                        placeholder="e.g. 75 Lakhs"
                                                        className={`${inputClass} pl-11`}
                                                    />
                                                </div>
                                            </Field>

                                            <Field label="Property description" className="md:col-span-2">
                                                <textarea
                                                    rows={4}
                                                    name="description"
                                                    value={form.description}
                                                    onChange={updateField}
                                                    placeholder="Describe your property, its features and any important details..."
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </Field>
                                        </div>
                                    )}

                                    {/* STEP 3: PACKAGE */}
                                    {step === 2 && (
                                        <div
                                            role="radiogroup"
                                            aria-label="Marketing package"
                                            className="grid gap-4"
                                        >
                                            {packages.map((pkg) => {
                                                const selected = selectedPackage === pkg.id;

                                                return (
                                                    <motion.button
                                                        key={pkg.id}
                                                        type="button"
                                                        role="radio"
                                                        aria-checked={selected}
                                                        onClick={() => setSelectedPackage(pkg.id)}
                                                        whileHover={reduceMotion ? undefined : { y: -3 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                                        className={`relative rounded-2xl border-2 p-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2 ${selected
                                                            ? "border-[#2b5d94] bg-[#e4eef8]"
                                                            : "border-[#1f2d3d]/10 bg-white hover:border-[#2b5d94]/50 hover:bg-[#f4f8fc]"
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <h3 className="font-display text-xl text-[#1f2d3d]">
                                                                    {pkg.name}
                                                                </h3>
                                                                {pkg.popular && (
                                                                    <span className="rounded-full bg-[#e9a55a] px-3 py-1 text-xs font-bold text-[#1f2d3d]">
                                                                        Popular
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <span
                                                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${selected
                                                                    ? "border-[#2b5d94] bg-[#2b5d94]"
                                                                    : "border-[#1f2d3d]/25 bg-white"
                                                                    }`}
                                                            >
                                                                <AnimatePresence>
                                                                    {selected && (
                                                                        <motion.span
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            exit={{ scale: 0 }}
                                                                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                                                        >
                                                                            <Check size={14} className="text-white" />
                                                                        </motion.span>
                                                                    )}
                                                                </AnimatePresence>
                                                            </span>
                                                        </div>

                                                        <p className="mt-2 text-sm leading-6 text-[#4a5a6e]">
                                                            {pkg.description}
                                                        </p>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {pkg.features.map((feature) => (
                                                                <span
                                                                    key={feature}
                                                                    className="rounded-full border border-[#1f2d3d]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#1f2d3d]"
                                                                >
                                                                    {feature}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}

                                            <p className="mt-2 flex items-start gap-3 rounded-2xl bg-[#eef4fb] p-4 text-sm leading-6 text-[#4a5a6e]">
                                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#2b5d94]" />
                                                Submitting this form does not require immediate payment.
                                                Our team will review your details and share the next
                                                steps with you.
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* ACTIONS */}
                            <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                {step > 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => goTo(step - 1)}
                                        className="group inline-flex h-14 items-center justify-center rounded-full border border-[#1f2d3d]/25 bg-white px-8 text-sm font-semibold text-[#1f2d3d] transition duration-300 hover:border-[#2b5d94] hover:bg-[#e4eef8] hover:text-[#1f2d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                        Back
                                    </button>
                                ) : (
                                    <span />
                                )}

                                <button
                                    type="submit"
                                    className="group inline-flex h-14 items-center justify-center rounded-full bg-[#2b5d94] px-8 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a70ab] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5d94] focus-visible:ring-offset-2"
                                >
                                    {step < formSteps.length - 1
                                        ? "Continue"
                                        : "Submit property details"}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* SIDE PANEL */}
                    <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                            className="rounded-3xl border border-[#2b5d94]/15 bg-gradient-to-br from-[#e4eef8] to-[#dcebf5] p-6 sm:p-7"
                        >
                            <p className="text-sm font-semibold text-[#2b5d94]">Your enquiry</p>
                            <h3 className="mt-1 font-display text-2xl text-[#1f2d3d]">
                                Summary
                            </h3>

                            <div className="mt-4 rounded-2xl bg-white px-5 py-2">
                                <SummaryRow label="Package" value={activePackage?.name ?? ""} />
                                <SummaryRow label="Property" value={form.propertyTitle} />
                                <SummaryRow label="Location" value={placeText} />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                            className="rounded-3xl border border-[#1f2d3d]/10 bg-white p-6 shadow-sm sm:p-7"
                        >
                            <h3 className="font-display text-xl text-[#1f2d3d]">
                                What happens next
                            </h3>

                            <ol className="mt-5 space-y-4">
                                {nextSteps.map((item, index) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4eef8] text-xs font-bold text-[#2b5d94]">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-medium text-[#1f2d3d]">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                            className="flex items-start gap-4 rounded-3xl border border-[#1f2d3d]/10 bg-white p-6 shadow-sm sm:p-7"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8ecd9] text-[#7d4e17]">
                                <MapPin size={20} />
                            </span>
                            <div>
                                <h3 className="font-display text-lg text-[#1f2d3d]">
                                    Across Kerala
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-[#4a5a6e]">
                                    From Thiruvananthapuram to Kasaragod, tell us where your
                                    property is located.
                                </p>
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </section>
        </main>
    );
}