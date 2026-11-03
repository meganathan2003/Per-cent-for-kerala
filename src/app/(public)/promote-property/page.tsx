
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Home,
    MapPin,
    Phone,
    User,
    IndianRupee,
    Sparkles,
} from "lucide-react";

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
    },
];

const campaignReferences: Record<
    string,
    {
        title: string;
        category: string;
        location: string;
    }
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

const inputClass =
    "mt-2 w-full rounded-xl border border-[#e5e5dc] bg-white px-4 py-3.5 text-sm text-[#17392f] outline-none transition-all placeholder:text-[#a4aaa3] focus:border-[#b68a59] focus:ring-2 focus:ring-[#b68a59]/10";

const labelClass = "text-sm font-semibold text-[#34473d]";

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

type CampaignInfo = {
    title: string;
    category: string;
    location: string;
};

export default function PromotePropertyPage() {
    const [selectedPackage, setSelectedPackage] = useState("premium");
    const [submitted, setSubmitted] = useState(false);

    const [campaignId, setCampaignId] = useState("");
    const [campaignInfo, setCampaignInfo] =
        useState<CampaignInfo | null>(null);

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

        if (
            packageId &&
            packages.some((pkg) => pkg.id === packageId)
        ) {
            setSelectedPackage(packageId);
        }
    }, []);

    const updateField = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Demo submission.
        // Later, send form + selectedPackage + campaignId to your backend API.
        const submissionData = {
            ...form,
            selectedPackage,
            campaignId: campaignId || null,
        };

        console.log("Property enquiry:", submissionData);

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (submitted) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f8f7f2] px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg rounded-3xl border border-[#e8e5dc] bg-white p-8 text-center shadow-xl sm:p-10"
                >
                    <CheckCircle2 className="mx-auto h-16 w-16 text-[#3c8064]" />

                    <h1 className="mt-6 font-display text-3xl text-[#17392f]">
                        Thank you!
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-[#68746d]">
                        Your property details have been captured in this demo.
                        Our team will review your enquiry and discuss the next steps.
                    </p>

                    <div className="mt-6 rounded-2xl bg-[#f1f4ef] p-5 text-left">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#3c8064]">
                            Selected package
                        </p>

                        <p className="mt-2 font-semibold text-[#17392f]">
                            {packages.find((pkg) => pkg.id === selectedPackage)?.name}
                        </p>
                    </div>

                    {campaignInfo && (
                        <div className="mt-4 rounded-2xl bg-[#f1f4ef] p-5 text-left">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#3c8064]">
                                Campaign reference
                            </p>

                            <p className="mt-2 font-semibold text-[#17392f]">
                                {campaignInfo.title}
                            </p>

                            <p className="mt-1 text-xs text-[#68746d]">
                                {campaignInfo.category} · {campaignInfo.location}
                            </p>

                            <p className="mt-2 text-xs text-[#89928b]">
                                Reference ID: {campaignId}
                            </p>
                        </div>
                    )}

                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center rounded-full bg-[#17392f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#285647]"
                    >
                        Back to Home
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8f7f2] pt-[82px]">
            {/* HERO */}
            <section className="relative overflow-hidden bg-[#17392f] px-6 py-20 text-white md:py-28">
                <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#b68a59]/20 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-white/70 transition hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mt-12 max-w-3xl"
                    >
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider text-[#e5c49d]">
                            <Sparkles className="mr-2 h-4 w-4" />
                            PROPERTY MARKETING IN KERALA
                        </span>

                        <h1 className="mt-7 font-display text-4xl leading-tight md:text-6xl">
                            Your property deserves
                            <span className="block text-[#d6ad7b]">
                                the right attention.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                            Tell us about your property. Our team will understand
                            your requirements and help you choose the right
                            marketing campaign.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_360px]">

                    {/* FORM */}
                    <div>
                        <div className="mb-10">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b68a59]">
                                Let's get started
                            </p>

                            <h2 className="mt-3 font-display text-3xl text-[#17392f] md:text-4xl">
                                Tell us about your property
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#68746d]">
                                Fill in the details below. Our team will contact you
                                to discuss your property marketing requirements.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* CAMPAIGN REFERENCE */}
                            {campaignInfo && (
                                <div className="rounded-3xl border border-[#d9e4d9] bg-[#f1f4ef] p-5 sm:p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#17392f]">
                                            <CheckCircle2 size={21} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-[#3c8064]">
                                                Selected campaign reference
                                            </p>

                                            <h3 className="mt-2 font-display text-xl text-[#17392f]">
                                                {campaignInfo.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-[#68746d]">
                                                {campaignInfo.category} · {campaignInfo.location}
                                            </p>

                                            <p className="mt-3 text-xs leading-6 text-[#68746d]">
                                                You selected this sample campaign as your inspiration.
                                                Our team will review whether a similar approach is
                                                suitable for your property.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* OWNER DETAILS */}
                            <div className="rounded-3xl border border-[#e8e5dc] bg-white p-6 shadow-sm md:p-8">
                                <div className="mb-7 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1eb] text-[#17392f]">
                                        <User size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-display text-xl text-[#17392f]">
                                            Owner Information
                                        </h3>
                                        <p className="text-xs text-[#89928b]">
                                            Your contact details
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <label className={labelClass}>
                                        Full Name *
                                        <input
                                            required
                                            name="ownerName"
                                            value={form.ownerName}
                                            onChange={updateField}
                                            placeholder="Enter your full name"
                                            className={inputClass}
                                        />
                                    </label>

                                    <label className={labelClass}>
                                        Phone Number *
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={updateField}
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            placeholder="10-digit mobile number"
                                            className={inputClass}
                                        />
                                    </label>

                                    <label className={`${labelClass} md:col-span-2`}>
                                        Email Address
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={updateField}
                                            placeholder="you@example.com"
                                            className={inputClass}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* PROPERTY DETAILS */}
                            <div className="rounded-3xl border border-[#e8e5dc] bg-white p-6 shadow-sm md:p-8">
                                <div className="mb-7 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1eb] text-[#17392f]">
                                        <Building2 size={20} />
                                    </div>

                                    <div>
                                        <h3 className="font-display text-xl text-[#17392f]">
                                            Property Information
                                        </h3>
                                        <p className="text-xs text-[#89928b]">
                                            Tell us what you want to promote
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <label className={labelClass}>
                                        Property Type *
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
                                    </label>

                                    <label className={labelClass}>
                                        Property Title *
                                        <input
                                            required
                                            name="propertyTitle"
                                            value={form.propertyTitle}
                                            onChange={updateField}
                                            placeholder="e.g. 3 BHK Villa in Kochi"
                                            className={inputClass}
                                        />
                                    </label>

                                    <label className={labelClass}>
                                        District *
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
                                    </label>

                                    <label className={labelClass}>
                                        Location / Area *
                                        <input
                                            required
                                            name="location"
                                            value={form.location}
                                            onChange={updateField}
                                            placeholder="e.g. Kakkanad, Kochi"
                                            className={inputClass}
                                        />
                                    </label>

                                    <label className={labelClass}>
                                        Property Size
                                        <input
                                            name="propertySize"
                                            value={form.propertySize}
                                            onChange={updateField}
                                            placeholder="e.g. 1500 sq.ft / 10 cents"
                                            className={inputClass}
                                        />
                                    </label>

                                    <label className={labelClass}>
                                        Expected Price
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#89928b]" />

                                            <input
                                                name="expectedPrice"
                                                value={form.expectedPrice}
                                                onChange={updateField}
                                                placeholder="e.g. 75 Lakhs"
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>
                                    </label>

                                    <label className={`${labelClass} md:col-span-2`}>
                                        Property Description
                                        <textarea
                                            rows={4}
                                            name="description"
                                            value={form.description}
                                            onChange={updateField}
                                            placeholder="Describe your property, its features and any important details..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* PACKAGE SELECTION */}
                            <div className="rounded-3xl border border-[#e8e5dc] bg-white p-6 shadow-sm md:p-8">
                                <div className="mb-7">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b68a59]">
                                        Choose your interest
                                    </p>

                                    <h3 className="mt-2 font-display text-2xl text-[#17392f]">
                                        Select a marketing package
                                    </h3>

                                    <p className="mt-2 text-sm text-[#89928b]">
                                        Our team will discuss the package and pricing with you.
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {packages.map((pkg) => (
                                        <button
                                            key={pkg.id}
                                            type="button"
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`relative rounded-2xl border p-5 text-left transition-all duration-300 ${selectedPackage === pkg.id
                                                    ? "border-[#17392f] bg-[#f1f4ef] ring-1 ring-[#17392f]"
                                                    : "border-[#e8e5dc] bg-white hover:border-[#b68a59]"
                                                }`}
                                        >
                                            {pkg.popular && (
                                                <span className="absolute right-4 top-4 rounded-full bg-[#17392f] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                                    Popular
                                                </span>
                                            )}

                                            <div className="flex items-center justify-between gap-3">
                                                <h4 className="font-display text-xl text-[#17392f]">
                                                    {pkg.name}
                                                </h4>

                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${selectedPackage === pkg.id
                                                            ? "border-[#17392f] bg-[#17392f]"
                                                            : "border-[#c9cec7]"
                                                        }`}
                                                >
                                                    {selectedPackage === pkg.id && (
                                                        <span className="h-2 w-2 rounded-full bg-white" />
                                                    )}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm text-[#68746d]">
                                                {pkg.description}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {pkg.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className="rounded-full bg-white px-3 py-1.5 text-[11px] text-[#53645a]"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SUBMIT */}
                            <div className="rounded-3xl bg-[#17392f] p-7 text-white md:p-9">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d6ad7b]" />

                                    <p className="text-sm leading-7 text-white/75">
                                        Submitting this form does not require immediate payment.
                                        Our team will review your details, discuss your requirements
                                        and share the next steps with you.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-7 flex w-full items-center justify-center rounded-full bg-[#d6ad7b] px-7 py-4 text-sm font-bold text-[#17392f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5c49d] hover:shadow-xl"
                                >
                                    Submit Property Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>

                                <p className="mt-4 text-center text-xs text-white/50">
                                    No payment required at this stage.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* SIDE PANEL */}
                    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <div className="rounded-3xl bg-[#eaece4] p-7">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#17392f]">
                                <Home size={22} />
                            </span>

                            <h3 className="mt-6 font-display text-2xl text-[#17392f]">
                                Your property.
                                <br />
                                Our marketing.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#68746d]">
                                We help property owners across Kerala present their
                                properties to potential buyers through focused
                                marketing campaigns.
                            </p>

                            <div className="mt-7 space-y-5">
                                {[
                                    "Tell us about your property",
                                    "Our team reviews your details",
                                    "Discuss the right package",
                                    "Start your marketing campaign",
                                ].map((step, index) => (
                                    <div key={step} className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17392f] text-xs font-bold text-white">
                                            0{index + 1}
                                        </span>

                                        <p className="text-sm font-medium text-[#34473d]">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#e8e5dc] bg-white p-7">
                            <MapPin className="h-6 w-6 text-[#b68a59]" />

                            <h3 className="mt-4 font-display text-xl text-[#17392f]">
                                Across Kerala
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-[#68746d]">
                                From Thiruvananthapuram to Kasaragod, tell us
                                where your property is located.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#e8e5dc] bg-white p-7">
                            <Phone className="h-6 w-6 text-[#b68a59]" />

                            <h3 className="mt-4 font-display text-xl text-[#17392f]">
                                Have questions?
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-[#68746d]">
                                Submit your details and our team can discuss
                                the available marketing options with you.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
