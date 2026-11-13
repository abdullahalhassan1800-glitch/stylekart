"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/context/toast-context";
import { getReviews, ratingDistribution } from "@/data/reviews";
import { formatCount } from "@/lib/format";
import type { Product } from "@/lib/types";
import { IconStar } from "@/components/ui/icons";

interface ProductReviewsProps {
  product: Product;
}

const INITIAL_VISIBLE = 3;

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { showToast } = useToast();
  const reviews = useMemo(() => getReviews(product), [product]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);

  const rows = useMemo(() => {
    const distribution = ratingDistribution(reviews);
    const sampleTotal = reviews.length || 1;
    return distribution.map((count, index) => ({
      stars: 5 - index,
      percent: Math.round((count / sampleTotal) * 100),
      count: Math.round((count / sampleTotal) * product.ratingCount),
    }));
  }, [reviews, product.ratingCount]);

  const visibleReviews = reviews.slice(0, visibleCount);

  const markHelpful = (id: string) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((prev) => [...prev, id]);
  };

  return (
    <section>
      <h2 className="mb-4 text-base font-extrabold uppercase tracking-wide text-gray-900 md:text-lg">
        Ratings &amp; Reviews
      </h2>

      <div className="grid gap-8 rounded-lg border border-gray-200 p-5 md:grid-cols-[260px_1fr] md:p-6">
        <div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold leading-none text-gray-900">
              {product.rating}
            </span>
            <IconStar className="mb-1 h-5 w-5 text-green-600" />
            <span className="mb-0.5 text-sm text-gray-500">/ 5</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {formatCount(product.ratingCount)} Verified Buyers
          </p>

          <div className="mt-5 space-y-2">
            {rows.map((row) => (
              <div key={row.stars} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex w-8 shrink-0 items-center gap-0.5 font-semibold text-gray-700">
                  {row.stars}
                  <IconStar className="h-2.5 w-2.5 text-gray-400" />
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <span
                    className="block h-full rounded-full bg-green-600"
                    style={{ width: `${row.percent}%` }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right">{formatCount(row.count)}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <p className="text-sm font-bold text-gray-900">
              Customer Reviews ({reviews.length})
            </p>
            <button
              type="button"
              onClick={() => showToast("Review submission is coming soon")}
              className="rounded border border-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand transition hover:bg-pink-50"
            >
              Write a Review
            </button>
          </div>

          <ul className="divide-y divide-gray-100">
            {visibleReviews.map((review) => {
              const marked = helpfulIds.includes(review.id);
              return (
                <li key={review.id} className="py-4 first:pt-4 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pink-50 text-xs font-bold text-brand">
                      {review.author.charAt(0)}
                    </span>
                    <p className="flex min-w-0 flex-1 items-center gap-2 text-sm font-bold text-gray-900">
                      <span className="truncate">{review.author}</span>
                      {review.verified && (
                        <span className="shrink-0 rounded-sm bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                          Verified
                        </span>
                      )}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded bg-green-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                      {review.rating}
                      <IconStar className="h-2.5 w-2.5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-gray-900">{review.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {review.body}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                    <span>Size: {review.size}</span>
                    <span>{review.date}</span>
                    <button
                      type="button"
                      onClick={() => markHelpful(review.id)}
                      className={`font-semibold transition ${
                        marked ? "text-brand" : "text-gray-500 hover:text-brand"
                      }`}
                    >
                      Helpful ({review.helpful + (marked ? 1 : 0)})
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {visibleCount < reviews.length && (
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => Math.min(count + 3, reviews.length))
              }
              className="mt-4 text-sm font-bold uppercase tracking-wide text-brand"
            >
              View More Reviews
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
