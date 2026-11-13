import Link from "next/link";
import { STYLE_EDITS } from "@/data/categories";

export default function StyleEdits() {
  return (
    <section>
      <h2 className="px-4 pb-5 pt-[38px] text-[24px] font-bold uppercase leading-none tracking-[3px] text-[#3e4152] md:px-[30px] lg:text-[28.8px] lg:tracking-[4.32px]">
        Shop By Occasion
      </h2>
      <div className="grid grid-cols-2 gap-2.5 px-4 lg:grid-cols-4 lg:px-[60px]">
        {STYLE_EDITS.map((edit) => (
          <Link
            key={edit.label}
            href={edit.href}
            className="group/edit relative aspect-[4/5] overflow-hidden bg-gray-100"
          >
            <img
              src={edit.image}
              alt={edit.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/edit:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 block p-4 text-white">
              <span className="block text-[15px] font-bold uppercase leading-tight tracking-[0.2px]">
                {edit.label}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium text-white/85">
                {edit.subtitle}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
