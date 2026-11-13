"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { useWishlist } from "@/context/wishlist-context";
import ProductCard from "@/components/product/product-card";
import ProductReviews from "@/components/product/product-reviews";
import { formatCount, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import {
  IconBag,
  IconChevronRight,
  IconHeart,
  IconPin,
  IconReturn,
  IconShield,
  IconStar,
  IconTruck,
} from "@/components/ui/icons";

interface ProductDetailProps {
  product: Product;
  similar: Product[];
}

const TRUST = [
  {
    title: "100% Original",
    text: "All products are original and quality checked.",
    icon: IconShield,
  },
  {
    title: "14 days return",
    text: "Easy returns within 14 days of delivery.",
    icon: IconReturn,
  },
  {
    title: "Free delivery",
    text: "On all orders above ₹999.",
    icon: IconTruck,
  },
];

export default function ProductDetail({ product, similar }: ProductDetailProps) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  const wishlisted = has(product.id);

  const onAddToBag = () => {
    if (!size) {
      showToast("Please select a size");
      return;
    }
    addItem(product.id, size);
    showToast("Item added to your bag");
  };

  const onWishlist = () => {
    toggle(product.id);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const onCheckPincode = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeMessage({ text: "Please enter a valid 6-digit pincode", ok: false });
      return;
    }
    setPincodeMessage({
      text: `Delivery available to ${pincode} in 3-5 days`,
      ok: true,
    });
  };

  return (
    <div className="px-4 pb-4 pt-7 lg:px-[25px] lg:pt-[43px]">
      <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#535766]">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <Link href={`/shop/${product.group}`} className="capitalize hover:text-brand">
          {product.group}
        </Link>
        <span>/</span>
        <Link
          href={`/shop/${product.group}?cat=${encodeURIComponent(product.categoryName)}`}
          className="hover:text-brand"
        >
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="truncate font-semibold text-ink">{product.name}</span>
      </nav>

      <div className="mt-3 flex flex-col gap-10 lg:flex-row">
        <div className="lg:flex-1">
          <div className="sticky top-[104px] lg:max-w-[545px]">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#f5f5f6]">
              <img
                src={product.images[activeImage]}
                alt={`${product.brand} ${product.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-24 w-20 shrink-0 overflow-hidden rounded-[2px] border-2 transition ${
                    index === activeImage
                      ? "border-brand"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:w-[545px] lg:shrink-0">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold leading-[24px] text-ink">{product.brand}</h1>
            <p className="mt-1 text-xl leading-[26px] text-[#535766]">{product.name}</p>
            <a
              href="#reviews"
              className="mt-3 inline-flex items-center gap-1.5 rounded-[2px] border border-gray-300 px-2 py-1 text-sm font-bold text-ink transition hover:border-gray-400"
            >
              {product.rating}
              <IconStar className="h-3.5 w-3.5 text-success" />
              <span className="text-gray-300">|</span>
              <span className="font-normal text-[#535766]">
                {formatCount(product.ratingCount)} Ratings
              </span>
            </a>
          </div>

          <div className="border-b border-gray-200 py-3">
            <p className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="text-base text-[#94969f] line-through">
                {formatPrice(product.mrp)}
              </span>
              <span className="text-base font-bold text-sale">
                ({product.discount}% OFF)
              </span>
            </p>
            <p className="mt-1 text-[14px] font-bold text-success">
              inclusive of all taxes
            </p>
            <p className="mt-2 text-[12px] text-[#535766]">
              Best price with coupon{" "}
              <span className="font-bold text-ink">SAVE200</span> at checkout
            </p>
          </div>

          <div className="border-b border-gray-200 py-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[16px] font-bold uppercase text-ink">
                Select Size
              </p>
              <button
                type="button"
                onClick={() => showToast("Size guide is coming soon")}
                className="flex items-center gap-0.5 text-xs font-bold uppercase text-brand"
              >
                Size Guide <IconChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`grid size-[50px] place-items-center rounded-full border text-[13px] font-normal transition ${
                    size === s
                      ? "border-brand bg-white text-brand"
                      : "border-gray-300 text-[#535766] hover:border-brand hover:text-brand"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-4 pt-[26px]">
            <div className="flex gap-[14px]">
              <button
                type="button"
                onClick={onAddToBag}
                className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-[4px] bg-brand text-base font-bold tracking-wide text-white transition hover:bg-brand-dark lg:w-[266px] lg:flex-none"
              >
                <IconBag className="h-4 w-4" />
                ADD TO BAG
              </button>
              <button
                type="button"
                onClick={onWishlist}
                className={`flex h-[54px] flex-1 items-center justify-center gap-2 rounded-[4px] border text-base font-bold tracking-wide transition lg:w-[178px] lg:flex-none ${
                  wishlisted
                    ? "border-brand bg-pink-50 text-brand"
                    : "border-gray-300 text-ink hover:border-brand hover:text-brand"
                }`}
              >
                <IconHeart className="h-4 w-4" filled={wishlisted} />
                {wishlisted ? "WISHLISTED" : "WISHLIST"}
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink">
              <IconTruck className="h-4 w-4" /> Delivery Options
            </p>
            <form
              onSubmit={onCheckPincode}
              className="flex max-w-sm items-center gap-2 rounded-[2px] border border-gray-300 px-3 focus-within:border-brand"
            >
              <IconPin className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                value={pincode}
                onChange={(event) =>
                  setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter pincode"
                inputMode="numeric"
                className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-[#94969f]"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-bold uppercase text-brand"
              >
                Check
              </button>
            </form>
            {pincodeMessage && (
              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
                  pincodeMessage.ok ? "text-success" : "text-red-600"
                }`}
              >
                <IconPin className="h-3.5 w-3.5" />
                {pincodeMessage.text}
              </p>
            )}
          </div>

          <div className="py-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
              Product Details
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-[#535766]">
              {product.description.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-5 space-y-5 border-t border-gray-100 pt-5">
              <div>
                <p className="text-[16px] font-bold text-ink">Size &amp; Fit</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#535766]">
                  Regular fit. The model (height 6&apos;) is wearing a size{" "}
                  {product.sizes[Math.min(1, product.sizes.length - 1)]}.
                </p>
              </div>
              <div>
                <p className="text-[16px] font-bold text-ink">Material &amp; Care</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#535766]">
                  Machine wash cold with like colours. Do not bleach. Tumble dry
                  low. Warm iron on reverse.
                </p>
              </div>
              <div>
                <p className="text-[16px] font-bold text-ink">Specifications</p>
                <dl className="mt-2 space-y-1.5 text-[14px]">
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-[#94969f]">Brand</dt>
                    <dd className="font-semibold text-ink">{product.brand}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-[#94969f]">Colour</dt>
                    <dd className="font-semibold text-ink">{product.color}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-[#94969f]">Fit</dt>
                    <dd className="font-semibold text-ink">Regular fit</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-[#94969f]">Country of Origin</dt>
                    <dd className="font-semibold text-ink">India</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="rounded-[2px] border border-gray-200 p-4">
            <p className="text-sm font-bold text-ink">Why shop from StyleKart?</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {TRUST.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <Icon className="h-7 w-7 text-brand" />
                    <p className="mt-2 text-[13px] font-bold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#94969f]">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div id="reviews" className="mt-12 scroll-mt-24">
        <ProductReviews product={product} />
      </div>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-[16px] font-bold uppercase tracking-[0.4px] text-ink">
            Similar Products
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-gray-200 bg-white p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="min-w-0">
          <p className="text-base font-bold text-ink">{formatPrice(product.price)}</p>
          <p className="truncate text-[11px] text-[#94969f]">
            {formatPrice(product.mrp)} ({product.discount}% OFF)
          </p>
        </div>
        <button
          type="button"
          onClick={onAddToBag}
          className="ml-auto rounded-[2px] bg-brand px-6 py-3 text-sm font-bold text-white"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}
