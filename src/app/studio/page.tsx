import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Style stories, trend reports and curated edits from StyleKart Studio.",
};

interface Story {
  eyebrow: string;
  title: string;
  excerpt: string;
  productId: string;
}

const STORIES: Story[] = [
  {
    eyebrow: "Trend Report",
    title: "Everyday staples that never go out of style",
    excerpt:
      "From the perfect white tee to lived-in denim, these are the pieces worth repeating.",
    productId: "p1",
  },
  {
    eyebrow: "Style Story",
    title: "Festive dressing, made effortless",
    excerpt:
      "Kurtas, sarees and everything you need to look your best this season.",
    productId: "p33",
  },
  {
    eyebrow: "Beauty Edit",
    title: "The five-minute glow-up routine",
    excerpt:
      "A minimal lineup of makeup and skincare heroes for busy mornings.",
    productId: "p96",
  },
  {
    eyebrow: "Home Edit",
    title: "Small changes, big home refresh",
    excerpt:
      "Bedsheets, cushions and lighting to reset your space for the new season.",
    productId: "p83",
  },
  {
    eyebrow: "Sneaker Files",
    title: "Sneakers that go with everything",
    excerpt:
      "Comfort-first silhouettes that work from morning runs to evening plans.",
    productId: "p22",
  },
  {
    eyebrow: "Celebrity Looks",
    title: "Off-duty looks we are saving right now",
    excerpt:
      "Relaxed tailoring and easy layers inspired by your favourite stars.",
    productId: "p14",
  },
];

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
      <section className="relative overflow-hidden rounded-lg">
        <img
          src="/images/banners/b3.jpg"
          alt="StyleKart Studio"
          className="h-[280px] w-full object-cover md:h-[380px]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white md:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em]">
            StyleKart Studio
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
            Trends, edits &amp; inspiration
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
            Style stories and curated edits, brought to you by the StyleKart
            editorial team.
          </p>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All Stories", "Fashion", "Beauty", "Home", "Celebrity"].map((tab, index) => (
          <Link
            key={tab}
            href="/studio"
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              index === 0
                ? "border-brand bg-brand text-white"
                : "border-gray-300 text-[#535766] hover:border-brand hover:text-brand"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((story) => {
          const product = getProduct(story.productId);
          if (!product) return null;
          return (
            <Link
              key={story.title}
              href={`/product/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#f5f5f6]">
                <img
                  src={product.images[1]}
                  alt={story.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-brand">
                {story.eyebrow}
              </p>
              <h2 className="mt-1 text-lg font-bold leading-snug text-ink group-hover:text-brand">
                {story.title}
              </h2>
              <p className="mt-1 text-[13px] text-[#535766]">{story.excerpt}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
