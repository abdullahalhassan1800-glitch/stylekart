import type { Product } from "@/lib/types";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  size: string;
  verified: boolean;
  helpful: number;
}

const NAMES = [
  "Aarav S.",
  "Priya M.",
  "Rohan K.",
  "Sneha T.",
  "Vikram R.",
  "Ananya P.",
  "Karan J.",
  "Divya N.",
  "Rahul B.",
  "Meera G.",
  "Arjun H.",
  "Ishita V.",
  "Siddharth L.",
  "Neha C.",
  "Aditya W.",
  "Riya D.",
  "Mohit A.",
  "Tanya F.",
  "Harsh U.",
  "Pooja E.",
];

const TITLES = [
  "Loved it!",
  "Great value for money",
  "Perfect fit",
  "Worth every rupee",
  "Better than expected",
  "Nice quality",
  "Decent buy",
  "Good, but sizing runs small",
  "Superb quality",
  "A bit overpriced",
  "Exactly as shown",
  "Looks premium",
];

const BODIES = [
  "Fabric quality is really good and the stitching is neat. Ordered my usual size and it fits perfectly.",
  "Color is exactly like the pictures. Washed it once and there is no fading or shrinkage.",
  "Delivery was quick and packaging was good. The material feels premium for this price.",
  "Fits well and looks stylish. Got quite a few compliments the first time I wore it.",
  "Good product overall. The only downside is that the delivery took longer than expected.",
  "Very comfortable for daily wear. Would definitely recommend it to friends and family.",
  "Bought this during the sale and it was totally worth it. Quality is on par with bigger brands.",
  "The size chart was slightly off for me, so consider going one size up.",
  "Looks classy and feels durable. The color has stayed intact after multiple washes.",
  "Nice pick at this price point. Nothing extraordinary, but does the job well.",
  "The fabric is breathable and perfect for Indian summers. Really happy with this purchase.",
  "Loved the fit and finish. This has quickly become one of my favourite purchases.",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DATE_BASE = Date.UTC(2026, 10, 5);

function hash(input: string): number {
  let result = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    result ^= input.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function seededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function formatReviewDate(offsetDays: number): string {
  const date = new Date(DATE_BASE - offsetDays * 24 * 60 * 60 * 1000);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function getReviews(product: Product): Review[] {
  const random = seededRandom(hash(product.id));
  const count = 4 + Math.floor(random() * 4);
  const sizes = product.sizes.length > 0 ? product.sizes : ["Free Size"];
  const offsets = Array.from({ length: count }, () =>
    2 + Math.floor(random() * 300),
  ).sort((a, b) => a - b);

  return offsets.map((offset, index) => {
    const ratingRoll = random();
    const rating =
      ratingRoll < 0.55 ? 5 : ratingRoll < 0.8 ? 4 : ratingRoll < 0.93 ? 3 : 2;
    return {
      id: `${product.id}-review-${index + 1}`,
      author: NAMES[Math.floor(random() * NAMES.length)],
      rating,
      title: TITLES[Math.floor(random() * TITLES.length)],
      body: BODIES[Math.floor(random() * BODIES.length)],
      date: formatReviewDate(offset),
      size: sizes[Math.floor(random() * sizes.length)],
      verified: random() < 0.85,
      helpful: 3 + Math.floor(random() * 46),
    };
  });
}

export function ratingDistribution(reviews: Review[]): number[] {
  const counts = [0, 0, 0, 0, 0];
  for (const review of reviews) {
    counts[5 - review.rating] += 1;
  }
  return counts;
}
