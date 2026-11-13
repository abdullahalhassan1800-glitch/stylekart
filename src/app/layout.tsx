import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { withBase } from "@/lib/paths";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteDescription =
  "StyleKart is your one-stop destination for fashion and lifestyle. Shop clothing, footwear, accessories, home and beauty products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StyleKart - Online Shopping for Fashion & Lifestyle",
    template: "%s | StyleKart",
  },
  description: siteDescription,
  keywords: [
    "StyleKart",
    "online shopping",
    "fashion",
    "clothing",
    "footwear",
    "beauty",
    "home decor",
    "India",
  ],
  openGraph: {
    title: "StyleKart - Online Shopping for Fashion & Lifestyle",
    description: siteDescription,
    siteName: "StyleKart",
    type: "website",
    url: "/",
    images: [{ url: withBase("/images/banners/b1.jpg"), width: 1600, height: 620 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleKart - Online Shopping for Fashion & Lifestyle",
    description: siteDescription,
    images: [withBase("/images/banners/b1.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#ff3f6c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-gray-900">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
