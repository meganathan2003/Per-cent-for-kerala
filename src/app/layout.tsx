import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  title: {
    default: "Per-Cent Kerala | Property Marketing",
    template: "%s | Per-Cent Kerala",
  },

  description:
    "Sell or rent your property in Kerala with professional photography and targeted marketing campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} min-h-screen bg-[#f8f7f2] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}