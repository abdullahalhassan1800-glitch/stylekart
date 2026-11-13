"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { useWishlist } from "@/context/wishlist-context";
import EmptyState from "@/components/ui/empty-state";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { IconHeart, IconX } from "@/components/ui/icons";

export default function WishlistPage() {
  const { ids, hydrated, remove } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const items = ids
    .map((id) => getProduct(id))
    .filter((product): product is NonNullable<typeof product> => product !== undefined);

  if (!hydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        message="Save items you love by tapping the heart on any product."
        actionLabel="SHOP NOW"
        actionHref="/shop/all"
      />
    );
  }

  const selectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const onMoveToBag = (productId: string) => {
    const product = getProduct(productId);
    if (!product) return;
    const size = selectedSizes[productId];
    if (!size) {
      showToast("Please select a size first");
      return;
    }
    addItem(productId, size);
    remove(productId);
    showToast("Moved to bag");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
      <h1 className="mb-6 flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide text-gray-900">
        <IconHeart className="h-5 w-5 text-brand" filled /> My Wishlist (
        {items.length})
      </h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((product) => (
          <div key={product.id} className="group/card relative">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={`${product.brand} ${product.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
              </div>
              <div className="px-1 pt-2">
                <p className="truncate text-sm font-bold text-gray-900">{product.brand}</p>
                <p className="truncate text-sm text-gray-500">{product.name}</p>
                <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 text-sm">
                  <span className="font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-xs font-bold text-green-700">
                    ({product.discount}% OFF)
                  </span>
                </p>
              </div>
            </Link>
            <button
              type="button"
              aria-label="Remove from wishlist"
              onClick={() => {
                remove(product.id);
                showToast("Removed from wishlist");
              }}
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white text-brand shadow"
            >
              <IconX className="h-4 w-4" />
            </button>
            <div className="mt-2 space-y-2">
              {product.sizes.length > 1 ? (
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => selectSize(product.id, size)}
                      className={`grid h-8 min-w-8 place-items-center border px-1.5 text-xs font-semibold transition ${
                        selectedSizes[product.id] === size
                          ? "border-brand bg-pink-50 font-bold text-brand"
                          : "border-gray-300 text-gray-700 hover:border-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">One size</p>
              )}
              <button
                type="button"
                onClick={() => onMoveToBag(product.id)}
                className="w-full rounded border border-brand py-2 text-xs font-bold uppercase tracking-wide text-brand transition hover:bg-pink-50"
              >
                Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
