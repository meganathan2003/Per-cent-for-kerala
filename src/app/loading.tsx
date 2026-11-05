
import Image from "next/image";

export default function Loading() {
    return (
        <main
            aria-label="Loading Per-Cent Kerala"
            aria-busy="true"
            className="fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg-[#F7F5EF]"
        >
            <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
                <div className="relative flex h-40 w-64 items-center justify-center sm:h-48 sm:w-80">
                    <div className="absolute h-36 w-36 animate-ping rounded-full bg-[#173D32]/5" />

                    <Image
                        src="/images/logo.png"
                        alt="Per-Cent Kerala"
                        width={420}
                        height={320}
                        priority
                        className="relative z-10 h-auto w-full object-contain animate-[logoReveal_1s_ease-out]"
                    />
                </div>

                <h1 className="mt-7 font-display text-xl font-semibold tracking-wide text-[#173D32]">
                    PER-CENT KERALA
                </h1>

                <p className="mt-2 text-sm font-medium text-[#59665D]">
                    Land & Properties Real Estate
                </p>

                <div className="mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-[#DCE4D9]">
                    <div className="h-full w-1/3 animate-[loadingBar_1.5s_ease-in-out_infinite] rounded-full bg-[#C59B42]" />
                </div>

                <p className="mt-4 text-xs font-medium tracking-wide text-[#59665D]">
                    Preparing your experience...
                </p>
            </div>
        </main>
    );
}
