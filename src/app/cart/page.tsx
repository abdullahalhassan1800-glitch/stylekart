"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { useWishlist } from "@/context/wishlist-context";
import EmptyState from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/format";
import { IconMinus, IconPlus } from "@/components/ui/icons";

const COUPONS = {
  SAVE200: { min: 999, amount: 200 },
  MYNTRA300: { min: 1499, amount: 300 },
} as const;

type CouponCode = keyof typeof COUPONS;

export default function CartPage() {
  const { lines, hydrated, updateQty, removeItem } = useCart();
  const { add: addToWishlist } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);

  const mrpTotal = lines.reduce((sum, line) => sum + line.product.mrp * line.qty, 0);
  const priceTotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const discountOnMrp = mrpTotal - priceTotal;
  const couponDiscount = appliedCoupon
    ? Math.min(COUPONS[appliedCoupon].amount, priceTotal)
    : 0;
  const delivery = lines.length === 0 || priceTotal - couponDiscount >= 999 ? 0 : 79;
  const total = priceTotal - couponDiscount + delivery;

  if (!hydrated) {
    return null;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your bag is empty"
        message="Looks like you have not added anything to your bag yet."
        actionLabel="SHOP NOW"
        actionHref="/shop/all"
      />
    );
  }

  const onApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code !== "SAVE200" && code !== "MYNTRA300") {
      showToast("Invalid coupon code. Try SAVE200 or MYNTRA300");
      return;
    }
    const selected = COUPONS[code];
    if (priceTotal < selected.min) {
      showToast(`Coupon ${code} is valid on orders above ₹${selected.min}`);
      return;
    }
    setAppliedCoupon(code);
    showToast(`Coupon ${code} applied successfully`);
  };

  const onMoveToWishlist = (productId: string, size: string) => {
    addToWishlist(productId);
    removeItem(productId, size);
    showToast("Moved to wishlist");
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 lg:px-8">
      <h1 className="mb-6 text-lg font-extrabold uppercase tracking-wide text-gray-900">
        My Bag ({lines.length} {lines.length === 1 ? "item" : "items"})
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          {lines.map((line) => (
            <div key={line.key} className="flex gap-4 border-b border-gray-200 py-4">
              <Link
                href={`/product/${line.product.id}`}
                className="h-36 w-28 shrink-0 overflow-hidden bg-gray-100"
              >
                <img
                  src={line.product.images[0]}
                  alt={`${line.product.brand} ${line.product.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900">{line.product.brand}</p>
                <p className="truncate text-sm text-gray-500">{line.product.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Size: <span className="font-semibold text-gray-700">{line.size}</span>
                </p>
                <p className="mt-1 flex items-baseline gap-2 text-sm">
                  <span className="font-bold text-gray-900">
                    {formatPrice(line.product.price * line.qty)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(line.product.mrp * line.qty)}
                  </span>
                  <span className="text-xs font-bold text-green-700">
                    ({line.product.discount}% OFF)
                  </span>
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-gray-300">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(line.productId, line.size, line.qty - 1)}
                      disabled={line.qty <= 1}
                      className="grid size-8 place-items-center text-gray-600 disabled:opacity-40"
                    >
                      <IconMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQty(line.productId, line.size, line.qty + 1)}
                      className="grid size-8 place-items-center text-gray-600"
                    >
                      <IconPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(line.productId, line.size);
                      showToast("Removed from bag");
                    }}
                    className="text-gray-600 hover:text-brand"
                  >
                    REMOVE
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveToWishlist(line.productId, line.size)}
                    className="text-gray-600 hover:text-brand"
                  >
                    MOVE TO WISHLIST
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/shop/all"
            className="mt-6 block w-full rounded border border-gray-300 py-3 text-center text-sm font-bold text-gray-800 transition hover:border-gray-900"
          >
            Add more items
          </Link>
        </div>

        <aside className="w-full shrink-0 lg:w-[350px]">
          <div className="sticky top-[76px] overflow-hidden rounded-lg border border-gray-200">
            <p className="border-b border-gray-200 bg-gray-50 p-4 text-xs font-extrabold uppercase tracking-wide text-gray-500">
              Order Summary
            </p>
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Coupon code (try SAVE200 or MYNTRA300)"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:border-brand"
                />
                <button
                  type="button"
                  onClick={onApplyCoupon}
                  disabled={appliedCoupon !== null}
                  className="shrink-0 rounded border border-brand px-4 text-sm font-bold text-brand disabled:opacity-50"
                >
                  {appliedCoupon ? "APPLIED" : "APPLY"}
                </button>
              </div>
            </div>
            <div className="space-y-2.5 p-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>MRP Total</span>
                <span>{formatPrice(mrpTotal)}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Discount on MRP</span>
                <span>-{formatPrice(discountOnMrp)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-700">
                  <span>Coupon ({appliedCoupon})</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className={delivery === 0 ? "font-bold text-green-700" : ""}>
                  {delivery === 0 ? "FREE" : formatPrice(delivery)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="m-4 mt-0 block w-full rounded bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
            >
              Place Order
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
