import Link from "next/link";
import { BANNERS } from "@/data/categories";

const PICKS = [BANNERS[1], BANNERS[3]];

export default function PromoBanners() {
  return (
    <section className="px-4 pt-10 lg:px-[60px]">
      <div className="grid gap-2.5 md:grid-cols-2">
        {PICKS.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="group/banner relative flex aspect-[16/7] overflow-hidden bg-gray-100"
          >
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/banner:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="relative flex max-w-[64%] flex-col justify-center p-6 text-white md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                {banner.eyebrow}
              </p>
              <p className="mt-1.5 text-2xl font-black uppercase leading-[1.05] tracking-tight md:text-[32px]">
                {banner.title}
              </p>
              <p className="mt-1.5 hidden text-[12px] font-medium text-white/85 sm:block md:text-sm">
                {banner.subtitle}
              </p>
              <span className="mt-3 inline-flex w-fit items-center gap-1 border-b border-white/80 pb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors group-hover/banner:border-white">
                {banner.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
