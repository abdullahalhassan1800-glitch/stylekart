"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/context/toast-context";
import { formatCount } from "@/lib/format";
import type { Product } from "@/lib/types";
import { IconHeart, IconStar } from "@/components/ui/icons";

const inr = new Intl.NumberFormat("en-IN");

export default function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();
  const active = has(product.id);

  const onWishlist = () => {
    toggle(product.id);
    showToast(active ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="group/card relative w-full">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f6]">
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-300 group-hover/card:opacity-0"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            />
          )}
          <span className="absolute bottom-3 left-2 inline-flex items-center gap-1 rounded-[2px] bg-white/95 px-1.5 py-0.5 text-[12px] font-bold text-ink shadow-sm">
            {product.rating}
            <IconStar className="h-2.5 w-2.5 text-success" />
            <span className="text-[10px] font-normal text-[#94969f]">
              | {formatCount(product.ratingCount)}
            </span>
          </span>
        </div>
        <div className="pt-3">
          <p className="mb-[6px] truncate text-[16px] font-bold leading-[16px] text-ink">
            {product.brand}
          </p>
          <p className="truncate text-[14px] leading-[14px] text-[#535766]">
            {product.name}
          </p>
          <p className="mt-[6px] truncate text-[14px] leading-[14px] text-[#535766]">
            Sizes: {product.sizes.join(", ")}
          </p>
          <p className="mt-[6px] text-[14px] font-bold leading-[17px] text-ink">
            Rs. {inr.format(product.price)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label="Toggle wishlist"
        onClick={onWishlist}
        className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 lg:opacity-0 lg:group-hover/card:opacity-100 ${
          active ? "text-brand lg:opacity-100" : "text-gray-500"
        }`}
      >
        <IconHeart className="h-4 w-4" filled={active} />
      </button>
    </div>
  );
}
