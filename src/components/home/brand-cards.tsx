import Link from "next/link";
import { BRAND_CARDS } from "@/data/categories";

export default function BrandCards() {
  return (
    <section>
      <h2 className="px-4 pb-5 pt-[38px] text-[24px] font-bold uppercase leading-none tracking-[3px] text-[#3e4152] md:px-[30px] lg:text-[28.8px] lg:tracking-[4.32px]">
        Top Brands
      </h2>
      <div className="grid grid-cols-2 gap-2.5 px-4 sm:grid-cols-3 md:grid-cols-6 lg:px-[60px]">
        {BRAND_CARDS.map((brand) => (
          <Link
            key={brand.brand}
            href={`/shop/all?q=${encodeURIComponent(brand.brand)}`}
            className={`group/brand relative flex aspect-[4/5] flex-col items-center justify-center gap-1.5 overflow-hidden bg-gradient-to-br ${brand.gradient} px-3 text-center text-white`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl"
            />
            <span className="relative text-lg font-black uppercase leading-none tracking-[0.04em]">
              {brand.brand}
            </span>
            <span className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
              {brand.tagline}
            </span>
            <span className="relative mt-2 h-px w-8 bg-white/50 transition-all duration-300 group-hover/brand:w-14" />
          </Link>
        ))}
      </div>
    </section>
  );
}
