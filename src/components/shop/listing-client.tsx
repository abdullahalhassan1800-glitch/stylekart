"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products as ALL } from "@/data/products";
import { GROUP_LABELS } from "@/data/categories";
import FilterSidebar, { PRICE_MIN, PRICE_MAX } from "@/components/shop/filter-sidebar";
import SortSelect from "@/components/shop/sort-select";
import ProductGrid from "@/components/product/product-grid";
import EmptyState from "@/components/ui/empty-state";
import { IconX } from "@/components/ui/icons";

type CategorySlug = "all" | "men" | "women" | "kids" | "home" | "beauty";

interface ListingClientProps {
  category: CategorySlug;
  initialCategory?: string | null;
  initialQuery?: string | null;
}

const SIZE_COLLATOR = new Intl.Collator(undefined, { numeric: true });

export default function ListingClient({
  category,
  initialCategory,
  initialQuery,
}: ListingClientProps) {
  const searchParams = useSearchParams();
  const cat = initialCategory ?? searchParams.get("cat");
  const query = initialQuery ?? searchParams.get("q") ?? "";

  return (
    <ListingContent
      key={`${category}|${cat ?? ""}|${query}`}
      category={category}
      initialCategory={cat}
      initialQuery={query}
    />
  );
}

function ListingContent({
  category,
  initialCategory,
  initialQuery,
}: ListingClientProps) {
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(PRICE_MIN);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [discount, setDiscount] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const query = initialQuery ?? "";
  const [sort, setSort] = useState("recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const groupProducts = useMemo(
    () => (category === "all" ? ALL : ALL.filter((p) => p.group === category)),
    [category],
  );

  const facets = useMemo(() => {
    const cats = new Set<string>();
    const brands = new Set<string>();
    const colors = new Set<string>();
    const sizes = new Set<string>();
    groupProducts.forEach((product) => {
      cats.add(product.categoryName);
      brands.add(product.brand);
      colors.add(product.color);
      product.sizes.forEach((size) => sizes.add(size));
    });
    return {
      cats: Array.from(cats).sort(),
      brands: Array.from(brands).sort(),
      colors: Array.from(colors).sort(),
      sizes: Array.from(sizes).sort(SIZE_COLLATOR.compare),
    };
  }, [groupProducts]);

  const filtered = useMemo(() => {
    let list = groupProducts;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((product) =>
        `${product.brand} ${product.name} ${product.categoryName}`
          .toLowerCase()
          .includes(q),
      );
    }
    if (selectedCats.length) {
      list = list.filter((product) => selectedCats.includes(product.categoryName));
    }
    if (selectedBrands.length) {
      list = list.filter((product) => selectedBrands.includes(product.brand));
    }
    if (selectedColors.length) {
      list = list.filter((product) => selectedColors.includes(product.color));
    }
    if (selectedSizes.length) {
      list = list.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size)),
      );
    }
    if (priceMin > PRICE_MIN || priceMax < PRICE_MAX) {
      list = list.filter(
        (product) => product.price >= priceMin && product.price <= priceMax,
      );
    }
    if (discount) {
      const minDiscount = parseInt(discount, 10);
      list = list.filter((product) => product.discount >= minDiscount);
    }
    if (gender) {
      list = list.filter((product) => product.gender === gender);
    }

    const sorted = [...list];
    switch (sort) {
      case "whats-new":
        sorted.sort(
          (a, b) => Number(b.isNewArrival) - Number(a.isNewArrival),
        );
        break;
      case "popularity":
        sorted.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        sorted.sort((a, b) => b.discount - a.discount);
        break;
      default:
        sorted.sort((a, b) => a.id.localeCompare(b.id));
    }
    return sorted;
  }, [groupProducts, query, selectedCats, selectedBrands, selectedColors, selectedSizes, priceMin, priceMax, discount, gender, sort]);

  const toggleValue = (
    list: string[],
    setter: (next: string[]) => void,
    value: string,
  ) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceMin(PRICE_MIN);
    setPriceMax(PRICE_MAX);
    setDiscount(null);
    setGender(null);
  };

  const activeCount =
    selectedCats.length +
    selectedBrands.length +
    selectedColors.length +
    selectedSizes.length +
    (priceMin > PRICE_MIN || priceMax < PRICE_MAX ? 1 : 0) +
    (discount ? 1 : 0) +
    (gender ? 1 : 0);

  const title =
    selectedCats.length === 1 ? selectedCats[0] : GROUP_LABELS[category];

  const sidebarProps = {
    showGender: category === "all",
    categories: facets.cats,
    brands: facets.brands,
    colors: facets.colors,
    sizes: facets.sizes,
    selectedCats,
    onToggleCat: (cat: string) => toggleValue(selectedCats, setSelectedCats, cat),
    selectedBrands,
    onToggleBrand: (brand: string) =>
      toggleValue(selectedBrands, setSelectedBrands, brand),
    selectedColors,
    onToggleColor: (color: string) =>
      toggleValue(selectedColors, setSelectedColors, color),
    selectedSizes,
    onToggleSize: (size: string) =>
      toggleValue(selectedSizes, setSelectedSizes, size),
    priceMin,
    priceMax,
    onPriceMin: setPriceMin,
    onPriceMax: setPriceMax,
    discount,
    onDiscount: setDiscount,
    gender,
    onGender: setGender,
    activeCount,
    onClearAll: clearAll,
  };

  return (
    <div className="px-4 pb-10 pt-4 lg:px-[25px]">
      <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#94969f]">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <Link href={`/shop/${category}`} className="hover:text-brand">
          {GROUP_LABELS[category]}
        </Link>
        {selectedCats.length === 1 && (
          <>
            <span>/</span>
            <span className="font-semibold text-gray-800">{selectedCats[0]}</span>
          </>
        )}
      </nav>

      <div className="mt-2 flex items-center justify-between bg-white pb-2 lg:sticky lg:top-20 lg:z-30 lg:pt-1">
        <div className="flex items-baseline gap-1.5">
          <h1 className="text-base font-bold text-ink">{title}</h1>
          <span className="text-[16px] font-normal text-[#878b94]">
            - {filtered.length} items
          </span>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1 text-sm font-bold uppercase text-ink"
          >
            Filters
            {activeCount > 0 && (
              <span className="grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="flex gap-[3px]">
        <aside className="hidden w-[252px] shrink-0 lg:block">
          <div className="sticky top-[104px] max-h-[calc(100vh-124px)] overflow-y-auto pb-8 pt-6">
            <FilterSidebar {...sidebarProps} />
          </div>
        </aside>
        <div className="min-w-0 flex-1 pb-6 pt-6">
          <div className="mb-2 hidden items-center justify-end pb-1 lg:flex">
            <SortSelect value={sort} onChange={setSort} />
          </div>
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <EmptyState
              title="No items found"
              message="Try changing the filters or search for something else."
              actionLabel="CLEAR ALL FILTERS"
              onAction={clearAll}
            />
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto bg-white p-4 pb-6">
            <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-3">
              <p className="text-sm font-extrabold uppercase tracking-wide text-gray-900">
                Filters
              </p>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="grid size-7 place-items-center text-gray-600"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <FilterSidebar {...sidebarProps} />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-4 w-full rounded bg-brand py-3 text-sm font-bold text-white"
            >
              APPLY ({filtered.length} ITEMS)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
