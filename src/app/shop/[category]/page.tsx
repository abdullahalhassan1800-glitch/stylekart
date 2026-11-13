import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingClient from "@/components/shop/listing-client";
import { GROUP_LABELS } from "@/data/categories";

const VALID_GROUPS = ["all", "men", "women", "kids", "home", "beauty"] as const;
type CategorySlug = (typeof VALID_GROUPS)[number];

interface ShopPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return VALID_GROUPS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { category } = await params;
  const label = GROUP_LABELS[category as CategorySlug] ?? "Products";
  return { title: `Shop ${label}` };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { category } = await params;
  if (!(VALID_GROUPS as readonly string[]).includes(category)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <ListingClient category={category as CategorySlug} />
    </Suspense>
  );
}
