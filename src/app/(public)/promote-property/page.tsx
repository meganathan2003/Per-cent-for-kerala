
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    IndianRupee,
    Loader2,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import api from "@/lib/api";

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

// IMPORTANT: These values must match your Prisma PropertyCategory enum.
const propertyCategories = [
    { value: "VILLA", label: "Villa" },
    { value: "APARTMENT", label: "Apartment / Flat" },
    { value: "HOUSE", label: "Independent House" },
    { value: "LAND", label: "Land / Plot" },
    { value: "COMMERCIAL", label: "Commercial Property" },
    { value: "AGRICULTURAL", label: "Agricultural Land" },
];

const areaUnits = [
    { value: "sqft", label: "Square feet" },
    { value: "cent", label: "Cent" },
    { value: "acre", label: "Acre" },
    { value: "sqm", label: "Square metre" },
];

type FormData = {
    ownerName: string;
    email: string;
    phone: string;
    title: string;
    description: string;
    category: string;
    address: string;
    city: string;
    district: string;
    pincode: string;
    price: string;
    area: string;
    areaUnit: string;
};

const initialForm: FormData = {
    ownerName: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    category: "",
    address: "",
    city: "",
    district: "",
    pincode: "",
    price: "",
    area: "",
    areaUnit: "sqft",
};

const inputClass =
    "w-full rounded-xl border border-[#1C1C1C]/10 bg-white px-4 py-3.5 text-sm text-[#1C1C1C] outline-none transition-all duration-200 placeholder:text-[#A39B8E] hover:border-[#B8924A]/50 focus:border-[#B8924A] focus:ring-4 focus:ring-[#B8924A]/10";

const steps = [
    {
        title: "Your details",
        description: "Let us know how to reach you",
        icon: User,
    },
    {
        title: "Property details",
        description: "Tell us about your property",
        icon: Building2,
    },
];

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-[#29251F]">
                {label}
                {required && (
                    <span className="ml-1 text-[#B8924A]">*</span>
                )}
            </span>
            <div className="mt-2">{children}</div>
        </label>
    );
}

function SelectField({
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`${inputClass} cursor-pointer appearance-none pr-11`}
            >
                {children}
            </select>
            <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#81796C]"
            />
        </div>
    );
}

export default function PromotePropertyPage() {
    const reduceMotion = useReducedMotion();

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);

    const [form, setForm] = useState<FormData>(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [propertyId, setPropertyId] = useState("");

    const updateField = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name } = event.target;
        let { value } = event.target;

        if (name === "phone") {
            value = value.replace(/\D/g, "").slice(0, 15);
        }

        if (name === "pincode") {
            value = value.replace(/\D/g, "").slice(0, 6);
        }

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const changeStep = (nextStep: number) => {
        setDirection(nextStep > step ? 1 : -1);
        setStep(nextStep);
        setSubmitError("");

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setSubmitError("");

        if (step === 0) {
            changeStep(1);
            return;
        }

        const price = Number(form.price);
        const area = Number(form.area);

        if (!Number.isFinite(price) || price <= 0) {
            setSubmitError("Please enter a valid property price.");
            return;
        }

        if (!Number.isFinite(area) || area <= 0) {
            setSubmitError("Please enter a valid property area.");
            return;
        }

        const payload = {
            owner: {
                name: form.ownerName.trim(),
                ...(form.email.trim() && {
                    email: form.email.trim(),
                }),
                phone: form.phone.trim(),
            },
            property: {
                title: form.title.trim(),
                ...(form.description.trim() && {
                    description: form.description.trim(),
                }),
                category: form.category,
                address: form.address.trim(),
                city: form.city.trim(),
                district: form.district,
                ...(form.pincode && {
                    pincode: form.pincode,
                }),
                price,
                area,
                areaUnit: form.areaUnit,
            },
        };

        try {
            setSubmitting(true);

            const response = await api.post("/properties", payload);

            setPropertyId(response.data.data?.id ?? "");
            setSubmitted(true);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                const axiosError = error as {
                    response?: {
                        data?: {
                            message?: string;
                            errors?: Array<{ message?: string }>;
                        };
                    };
                    message?: string;
                };

                const validationMessage =
                    axiosError.response?.data?.errors
                        ?.map((item) => item.message)
                        .filter(Boolean)
                        .join(", ");

                setSubmitError(
                    validationMessage ||
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Unable to submit your property."
                );
            } else {
                setSubmitError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    // SUCCESS SCREEN

    if (submitted) {
        return (
            <main className="min-h-screen bg-[#F8F6F1] text-[#1C1C1C]">
                <Navbar />

                <section className="flex min-h-screen items-center justify-center px-5 py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 25, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.55 }}
                        className="w-full max-w-lg rounded-3xl border border-black/5 bg-white p-8 text-center shadow-[0_20px_60px_rgba(28,28,28,0.09)] sm:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 12,
                                delay: 0.2,
                            }}
                            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EFE3]"
                        >
                            <CheckCircle2
                                size={43}
                                className="text-[#B8924A]"
                            />
                        </motion.div>

                        <h1 className="mt-7 font-display text-3xl">
                            Property submitted!
                        </h1>

                        <p className="mt-3 text-sm leading-7 text-[#6F685D]">
                            Thank you for trusting Per-Cent Kerala.
                            Our team will review your property details
                            and contact you with the next steps.
                        </p>

                        <div className="mt-7 rounded-2xl bg-[#F8F6F1] p-5 text-left">
                            <p className="text-xs font-semibold text-[#81796C]">
                                CURRENT STATUS
                            </p>
                            <p className="mt-1 font-bold text-[#9F7C3D]">
                                Pending verification
                            </p>

                            {propertyId && (
                                <div className="mt-4 border-t border-black/10 pt-4">
                                    <p className="text-xs text-[#81796C]">
                                        Property reference
                                    </p>
                                    <p className="mt-1 break-all text-sm font-semibold">
                                        {propertyId}
                                    </p>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/"
                            className="mt-8 inline-flex h-13 items-center justify-center rounded-full bg-[#B8924A] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#9F7C3D]"
                        >
                            Back to Home
                            <ArrowRight size={17} className="ml-2" />
                        </Link>
                    </motion.div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-x-clip bg-[#F8F6F1] text-[#1C1C1C] antialiased">
            <Navbar />

            {/* HERO */}

            <section className="relative overflow-hidden bg-gradient-to-b from-[#EFE5D2] to-[#F8F6F1]">
                <motion.div
                    aria-hidden
                    animate={
                        reduceMotion
                            ? undefined
                            : { y: [0, 18, 0], x: [0, 10, 0] }
                    }
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full bg-white/50 blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-sm font-semibold text-[#6F685D] transition hover:text-[#9F7C3D]"
                    >
                        <ArrowLeft
                            size={16}
                            className="mr-2 transition-transform group-hover:-translate-x-1"
                        />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                        className="mt-8 max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#B8924A]/15 bg-white/80 px-4 py-2 text-xs font-semibold text-[#9F7C3D]">
                            <ShieldCheck size={15} />
                            Property submission
                        </span>

                        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Your property.
                            <span className="block text-[#B8924A]">
                                Our priority.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#6F685D] sm:text-base">
                            Share a few details about your property.
                            Our team will take care of the next steps.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FORM AREA */}

            <section className="px-5 pb-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

                    {/* FORM CARD */}

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="min-w-0 rounded-3xl border border-black/5 bg-white shadow-[0_16px_50px_rgba(28,28,28,0.07)]"
                    >
                        {/* PROGRESS */}

                        <div className="border-b border-black/5 px-5 py-6 sm:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9F7C3D]">
                                        Step {step + 1} of 2
                                    </p>
                                    <h2 className="mt-1 font-display text-xl sm:text-2xl">
                                        {steps[step].title}
                                    </h2>
                                    <p className="mt-1 text-xs text-[#81796C]">
                                        {steps[step].description}
                                    </p>
                                </div>

                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5EFE3] text-[#9F7C3D]">
                                    {(() => {
                                        const Icon = steps[step].icon;
                                        return <Icon size={23} />;
                                    })()}
                                </span>
                            </div>

                            <div className="mt-6 flex gap-2">
                                {steps.map((item, index) => (
                                    <div
                                        key={item.title}
                                        className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEEAE2]"
                                    >
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                scaleX: step >= index ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.4 }}
                                            className="h-full origin-left rounded-full bg-[#B8924A]"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex justify-between text-xs text-[#81796C]">
                                <span className={step === 0 ? "font-bold text-[#9F7C3D]" : ""}>
                                    Owner information
                                </span>
                                <span className={step === 1 ? "font-bold text-[#9F7C3D]" : ""}>
                                    Property information
                                </span>
                            </div>
                        </div>

                        {/* FORM CONTENT */}

                        <form
                            onSubmit={handleSubmit}
                            className="px-5 py-7 sm:px-8 sm:py-9"
                        >
                            <AnimatePresence
                                mode="wait"
                                custom={direction}
                            >
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    initial={{
                                        opacity: 0,
                                        x: reduceMotion ? 0 : direction * 25,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{
                                        opacity: 0,
                                        x: reduceMotion ? 0 : direction * -25,
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {step === 0 ? (
                                        <div className="space-y-5">
                                            <div className="mb-7">
                                                <h3 className="font-display text-2xl">
                                                    Let's get to know you
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-[#81796C]">
                                                    Enter your contact details
                                                    so our team can reach you.
                                                </p>
                                            </div>

                                            <Field label="Your full name" required>
                                                <input
                                                    required
                                                    minLength={2}
                                                    name="ownerName"
                                                    value={form.ownerName}
                                                    onChange={updateField}
                                                    autoComplete="name"
                                                    placeholder="e.g. Arun Kumar"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="Mobile number" required>
                                                <div className="relative">
                                                    <Phone
                                                        size={17}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39B8E]"
                                                    />
                                                    <input
                                                        required
                                                        type="tel"
                                                        name="phone"
                                                        value={form.phone}
                                                        onChange={updateField}
                                                        minLength={10}
                                                        maxLength={15}
                                                        placeholder="Enter your mobile number"
                                                        className={`${inputClass} pl-11`}
                                                    />
                                                </div>
                                            </Field>

                                            <Field label="Email address">
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

                                            <div className="rounded-2xl bg-[#F8F6F1] p-4">
                                                <div className="flex items-start gap-3">
                                                    <ShieldCheck
                                                        size={19}
                                                        className="mt-0.5 shrink-0 text-[#B8924A]"
                                                    />
                                                    <p className="text-xs leading-6 text-[#6F685D]">
                                                        Your contact information
                                                        will be used by our team
                                                        to discuss your property.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            <div className="mb-7">
                                                <h3 className="font-display text-2xl">
                                                    Tell us about your property
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-[#81796C]">
                                                    Just a few more details to
                                                    complete your submission.
                                                </p>
                                            </div>

                                            <Field label="Property title" required>
                                                <input
                                                    required
                                                    minLength={3}
                                                    name="title"
                                                    value={form.title}
                                                    onChange={updateField}
                                                    placeholder="e.g. Beautiful Villa in Kochi"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <Field label="What type of property?" required>
                                                <SelectField
                                                    required
                                                    name="category"
                                                    value={form.category}
                                                    onChange={updateField}
                                                >
                                                    <option value="">
                                                        Select property type
                                                    </option>
                                                    {propertyCategories.map((item) => (
                                                        <option
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </SelectField>
                                            </Field>

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <Field label="District" required>
                                                    <SelectField
                                                        required
                                                        name="district"
                                                        value={form.district}
                                                        onChange={updateField}
                                                    >
                                                        <option value="">
                                                            Select district
                                                        </option>
                                                        {districts.map((district) => (
                                                            <option
                                                                key={district}
                                                                value={district}
                                                            >
                                                                {district}
                                                            </option>
                                                        ))}
                                                    </SelectField>
                                                </Field>

                                                <Field label="City / Town" required>
                                                    <input
                                                        required
                                                        minLength={2}
                                                        name="city"
                                                        value={form.city}
                                                        onChange={updateField}
                                                        placeholder="e.g. Kochi"
                                                        className={inputClass}
                                                    />
                                                </Field>
                                            </div>

                                            <Field label="Property address" required>
                                                <textarea
                                                    required
                                                    minLength={5}
                                                    rows={3}
                                                    name="address"
                                                    value={form.address}
                                                    onChange={updateField}
                                                    placeholder="Enter the complete property address"
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </Field>

                                            <Field label="Property description">
                                                <textarea
                                                    rows={3}
                                                    name="description"
                                                    value={form.description}
                                                    onChange={updateField}
                                                    placeholder="Tell us about the property, features and nearby facilities..."
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </Field>

                                            <Field label="Pincode">
                                                <input
                                                    name="pincode"
                                                    value={form.pincode}
                                                    onChange={updateField}
                                                    inputMode="numeric"
                                                    placeholder="Enter 6-digit pincode"
                                                    className={inputClass}
                                                />
                                            </Field>

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <Field label="Expected price (₹)" required>
                                                    <div className="relative">
                                                        <IndianRupee
                                                            size={17}
                                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39B8E]"
                                                        />
                                                        <input
                                                            required
                                                            type="number"
                                                            min="0.01"
                                                            step="any"
                                                            name="price"
                                                            value={form.price}
                                                            onChange={updateField}
                                                            placeholder="e.g. 7500000"
                                                            className={`${inputClass} pl-11`}
                                                        />
                                                    </div>
                                                </Field>

                                                <Field label="Property area" required>
                                                    <input
                                                        required
                                                        type="number"
                                                        min="0.01"
                                                        step="any"
                                                        name="area"
                                                        value={form.area}
                                                        onChange={updateField}
                                                        placeholder="e.g. 1500"
                                                        className={inputClass}
                                                    />
                                                </Field>
                                            </div>

                                            <Field label="Area measurement">
                                                <SelectField
                                                    name="areaUnit"
                                                    value={form.areaUnit}
                                                    onChange={updateField}
                                                >
                                                    {areaUnits.map((unit) => (
                                                        <option
                                                            key={unit.value}
                                                            value={unit.value}
                                                        >
                                                            {unit.label}
                                                        </option>
                                                    ))}
                                                </SelectField>
                                            </Field>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    role="alert"
                                    className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                                >
                                    {submitError}
                                </motion.div>
                            )}

                            {/* ACTION BUTTONS */}

                            <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                                {step === 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => changeStep(0)}
                                        disabled={submitting}
                                        className="inline-flex h-13 items-center justify-center rounded-full border border-black/15 px-7 text-sm font-semibold transition hover:border-[#B8924A] hover:bg-[#F8F6F1] disabled:opacity-50"
                                    >
                                        <ArrowLeft size={17} className="mr-2" />
                                        Back
                                    </button>
                                ) : (
                                    <span />
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex h-13 items-center justify-center rounded-full bg-[#B8924A] px-8 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#9F7C3D] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="mr-2 animate-spin"
                                            />
                                            Submitting...
                                        </>
                                    ) : step === 0 ? (
                                        <>
                                            Continue
                                            <ArrowRight size={17} className="ml-2" />
                                        </>
                                    ) : (
                                        <>
                                            Submit property
                                            <Check size={17} className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* SIDE PANEL */}

                    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl border border-[#B8924A]/15 bg-gradient-to-br from-[#EFE5D2] to-[#F5EFE3] p-7"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#9F7C3D]">
                                <ShieldCheck size={22} />
                            </span>

                            <h3 className="mt-5 font-display text-2xl">
                                Simple. Secure. Easy.
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-[#6F685D]">
                                Submit your property details in just
                                a few simple steps. Our team will
                                guide you from there.
                            </p>

                            <div className="mt-6 space-y-4">
                                {[
                                    "Share your contact details",
                                    "Add your property information",
                                    "Our team reviews your submission",
                                ].map((item, index) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#9F7C3D]">
                                            {index + 1}
                                        </span>
                                        <p className="text-sm font-medium text-[#29251F]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="rounded-3xl border border-black/5 bg-white p-6">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5EFE3] text-[#9F7C3D]">
                                    <MapPin size={19} />
                                </span>
                                <div>
                                    <h3 className="font-semibold">
                                        Across Kerala
                                    </h3>
                                    <p className="mt-1 text-xs text-[#81796C]">
                                        All 14 districts
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
