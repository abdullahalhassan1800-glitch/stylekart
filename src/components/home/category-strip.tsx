import Link from "next/link";
import { SHOP_CATEGORIES, type ShopCategory } from "@/data/categories";

function CategoryCard({ category }: { category: ShopCategory }) {
  return (
    <Link
      href={category.href}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[3px] border-4 border-[#FFC58F] bg-gradient-to-b from-[#FFF2E5] to-[#FFEAD8] transition-shadow duration-300 hover:shadow-[0_8px_22px_rgba(62,65,82,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e4152]"
    >
      <div className="aspect-[10/9] w-full overflow-hidden bg-[#F6E2D0]">
        <img
          src={category.image}
          alt={category.label}
          width={720}
          height={960}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-2 pb-3 text-center">
        <h3 className="mb-[3px] mt-[5px] text-[16px] font-bold leading-tight text-[#111111]">
          {category.label}
        </h3>
        <p className="text-[21px] font-extrabold leading-none text-black lg:text-[22px]">
          {category.discount}
        </p>
        <span className="mt-[5px] text-[16px] font-bold leading-tight text-[#111111] lg:text-[17px]">
          Shop Now
        </span>
      </div>
    </Link>
  );
}

export default function CategoryStrip() {
  return (
    <section aria-labelledby="shop-by-category" className="pb-10 pt-[38px] lg:pb-12">
      <h2
        id="shop-by-category"
        className="px-4 pb-5 text-[13px] font-bold uppercase leading-none tracking-[0.28em] text-[#3e4152] md:px-[30px] lg:px-[60px] lg:pb-6"
      >
        Shop By Category
      </h2>
      <div className="grid auto-rows-fr grid-cols-2 gap-x-3 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-4 md:px-[30px] lg:grid-cols-6 lg:gap-x-5 lg:gap-y-8 lg:px-[60px]">
        {SHOP_CATEGORIES.map((category) => (
          <CategoryCard key={category.label} category={category} />
        ))}
      </div>
    </section>
  );
}
