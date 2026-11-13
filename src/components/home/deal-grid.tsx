import Link from "next/link";
import { DEALS } from "@/data/categories";

export default function DealGrid() {
  return (
    <section>
      <h2 className="px-4 pb-5 pt-[38px] text-[24px] font-bold uppercase leading-none tracking-[3px] text-[#3e4152] md:px-[30px] lg:text-[28.8px] lg:tracking-[4.32px]">
        Deals Of The Day
      </h2>
      <div className="grid grid-cols-2 gap-2.5 px-4 md:grid-cols-4 lg:px-[60px]">
        {DEALS.map((deal) => (
          <Link
            key={deal.title + deal.subtitle}
            href={deal.href}
            className="group/deal relative aspect-[3/4] overflow-hidden bg-gray-100"
          >
            <img
              src={deal.image}
              alt={deal.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/deal:scale-[1.05]"
            />
            <span
              className={`absolute inset-0 bg-gradient-to-t ${deal.gradient} opacity-25 mix-blend-multiply`}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 block p-3.5 text-white">
              <span className="block text-[15px] font-bold uppercase leading-tight tracking-[0.2px]">
                {deal.title}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium text-white/85">
                {deal.subtitle}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
