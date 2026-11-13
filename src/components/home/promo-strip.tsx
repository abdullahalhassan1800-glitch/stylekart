import Link from "next/link";
import { withBase } from "@/lib/paths";

export default function PromoStrip() {
  return (
    <div className="mt-10 px-4 lg:mt-[45px] lg:px-[60px]">
      <Link
        href="/shop/all"
        aria-label="Flipkart credit card discount offer"
        className="block transition-opacity duration-300 hover:opacity-95"
      >
        <img
          src={withBase("/images/banners/flipkart-credit-card-offer.png")}
          alt="Flipkart Credit Card Discount Banner"
          loading="lazy"
          className="h-auto w-full"
        />
      </Link>
    </div>
  );
}
