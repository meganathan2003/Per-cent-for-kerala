
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";

const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

const contactOptions = [
    {
        icon: MessageCircle,
        title: "Property enquiries",
        description:
            "Have a property to promote? Tell us about it and our team can guide you.",
        action: "Promote your property",
        href: "/promote-property",
    },
    {
        icon: Mail,
        title: "Campaign support",
        description:
            "Need help understanding our packages or marketing process? Send us a message.",
        action: "Explore packages",
        href: "/packages",
    },
    {
        icon: MapPin,
        title: "Our service area",
        description:
            "We work with property owners across Kerala, helping them promote properties in their local markets.",
        action: "View campaigns",
        href: "/campaigns",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "Property marketing enquiry",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setForm((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Frontend demo only. Connect this form to the backend API later.
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const inputClass =
        "h-12 w-full min-w-0 rounded-xl border border-[#E3E2DA] bg-[#FAF9F6] px-4 text-sm text-[#303B35] outline-none transition placeholder:text-[#9A9F98] focus:border-[#A47758] focus:ring-2 focus:ring-[#E8D7C1]/50";

    const labelClass =
        "mb-2 block text-sm font-semibold text-[#35443B]";

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#FAF9F6]">
            <Navbar />

            {/* NAVBAR SPACING + HERO */}
            <section className="pt-20">
                <div className="relative flex min-h-[360px] items-center overflow-hidden sm:min-h-[400px] lg:min-h-[430px]">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800"
                        alt="Modern residential property"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#202923]/85 via-[#202923]/65 to-[#202923]/25" />

                    <div className="container-main relative z-10 w-full px-5 py-14 sm:px-8 lg:px-0">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={reveal}
                            className="max-w-2xl"
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EAD3B8] sm:text-sm">
                                Get in touch
                            </p>

                            <h1 className="mt-4 font-display text-4xl leading-[1.15] text-white sm:text-5xl lg:text-6xl">
                                Let's talk about
                                <br className="hidden sm:block" />
                                <span className="text-[#EAD3B8]">
                                    {" "}your property.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/95 sm:text-base">
                                Whether you are looking to sell, rent or
                                promote a property, we are here to understand
                                your requirements and help you take the next
                                step.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CONTACT INTRO */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="container-main px-5 sm:px-8 lg:px-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                            We're here to help
                        </p>

                        <h2 className="mt-4 font-display text-3xl leading-tight text-[#303B35] sm:text-4xl">
                            Start with a conversation.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#626D66] sm:text-base">
                            Share what you have in mind. Our team can
                            understand your property and discuss a suitable
                            marketing approach with you.
                        </p>
                    </motion.div>

                    <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                        {contactOptions.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={reveal}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex min-w-0 flex-col rounded-2xl border border-[#EAE7DF] bg-[#FAF9F6] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E9ECE4] text-[#526A58]">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-5 font-display text-xl text-[#35443B]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 flex-1 text-sm leading-6 text-[#626D66]">
                                        {item.description}
                                    </p>

                                    <Link
                                        href={item.href}
                                        className="mt-5 inline-flex w-fit max-w-full items-center gap-2 text-sm font-semibold text-[#526A58] transition hover:text-[#A47758]"
                                    >
                                        {item.action}
                                        <ArrowUpRight
                                            size={16}
                                            className="shrink-0"
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CONTACT FORM SECTION */}
            <section className="bg-[#F3F2EC] py-12 sm:py-16 lg:py-20">
                <div className="container-main grid grid-cols-1 items-start gap-9 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-0">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="min-w-0"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                            Send us a message
                        </p>

                        <h2 className="mt-4 max-w-md font-display text-3xl leading-tight text-[#303B35] sm:text-4xl">
                            Tell us what you are looking for.
                        </h2>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-[#626D66] sm:text-base">
                            Fill in the form with a few details. Whether you
                            have a question about our services or want to
                            discuss a property campaign, we would be happy to
                            hear from you.
                        </p>

                        <div className="mt-8 space-y-6 sm:mt-10">
                            <div className="flex min-w-0 items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#526A58]">
                                    <MapPin size={20} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-[#35443B]">
                                        Serving across Kerala
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#747D75]">
                                        Property marketing support for owners
                                        across Kerala.
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#526A58]">
                                    <MessageCircle size={20} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-[#35443B]">
                                        Let's understand your needs
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#747D75]">
                                        We discuss your property, requirements
                                        and suitable campaign options before
                                        proceeding.
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#526A58]">
                                    <Phone size={20} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-[#35443B]">
                                        No upfront payment
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#747D75]">
                                        Sending an enquiry does not require
                                        payment. We share package and payment
                                        details only after discussion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* FORM CARD */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={reveal}
                        className="w-full min-w-0 rounded-2xl border border-[#E7E4DC] bg-white p-5 shadow-sm sm:p-8 lg:p-9"
                    >
                        {submitted ? (
                            <div className="flex min-h-[400px] flex-col items-center justify-center px-2 py-10 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F0E9] text-[#54866A]">
                                    <CheckCircle2 size={32} />
                                </div>

                                <h3 className="mt-6 font-display text-2xl text-[#303B35]">
                                    Form preview completed!
                                </h3>

                                <p className="mt-3 max-w-sm text-sm leading-7 text-[#626D66]">
                                    The contact form UI is ready. Actual
                                    message submission will be enabled when
                                    the backend API is connected.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-7 rounded-full bg-[#E8D7C1] px-6 py-3 text-sm font-semibold text-[#303B35] transition hover:bg-[#DCC4A5]"
                                >
                                    Back to form
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-7 sm:mb-8">
                                    <h3 className="font-display text-2xl text-[#35443B]">
                                        Send an enquiry
                                    </h3>

                                    <p className="mt-2 text-sm text-[#747D75]">
                                        Fields marked with * are required.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    {/* NAME + EMAIL */}
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="min-w-0">
                                            <label
                                                htmlFor="name"
                                                className={labelClass}
                                            >
                                                Your name *
                                            </label>

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
                                        </div>

                                        <div className="min-w-0">
                                            <label
                                                htmlFor="email"
                                                className={labelClass}
                                            >
                                                Email address *
                                            </label>

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
                                        </div>
                                    </div>

                                    {/* PHONE + SUBJECT */}
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="min-w-0">
                                            <label
                                                htmlFor="phone"
                                                className={labelClass}
                                            >
                                                Phone number *
                                            </label>

                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                autoComplete="tel"
                                                placeholder="Enter your phone number"
                                                className={inputClass}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <label
                                                htmlFor="subject"
                                                className={labelClass}
                                            >
                                                Enquiry type *
                                            </label>

                                            <select
                                                id="subject"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                required
                                                className={inputClass}
                                            >
                                                <option>
                                                    Property marketing enquiry
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
                                        </div>
                                    </div>

                                    {/* MESSAGE */}
                                    <div className="min-w-0">
                                        <label
                                            htmlFor="message"
                                            className={labelClass}
                                        >
                                            Your message *
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us a little about your enquiry..."
                                            className="min-h-[130px] w-full min-w-0 resize-y rounded-xl border border-[#E3E2DA] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition placeholder:text-[#9A9F98] focus:border-[#A47758] focus:ring-2 focus:ring-[#E8D7C1]/50"
                                        />
                                    </div>

                                    {/* SUBMIT */}
                                    <button
                                        type="submit"
                                        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#E8D7C1] px-6 text-sm font-semibold text-[#303B35] transition hover:-translate-y-0.5 hover:bg-[#DCC4A5] sm:w-auto"
                                    >
                                        Send enquiry
                                        <Send className="ml-2 h-4 w-4" />
                                    </button>

                                    <p className="text-xs leading-5 text-[#858B84]">
                                        By submitting this form, you are
                                        expressing interest in contacting
                                        Per-Cent Kerala about its services.
                                    </p>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-white px-5 py-12 sm:px-8 sm:py-16">
                <div className="container-main">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#EAE5DA] bg-[#F3F2EC] p-6 sm:p-8 md:p-10 lg:flex-row lg:items-center">
                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A47758]">
                                Ready to get started?
                            </p>

                            <h2 className="mt-3 font-display text-2xl leading-tight text-[#303B35] sm:text-3xl">
                                Have a property to promote?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#626D66]">
                                Share your property details and explore the
                                right campaign.
                            </p>
                        </div>

                        <Link
                            href="/promote-property"
                            className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#E8D7C1] px-6 text-sm font-semibold text-[#303B35] transition hover:bg-[#DCC4A5] sm:w-auto"
                        >
                            Promote your property
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
