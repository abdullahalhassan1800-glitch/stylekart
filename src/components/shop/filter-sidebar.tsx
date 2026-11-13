"use client";

import { useState, type ReactNode } from "react";
import { IconChevronDown, IconSearch, IconX } from "@/components/ui/icons";

export const PRICE_MIN = 100;
export const PRICE_MAX = 10100;

export const DISCOUNT_OPTIONS = [
  "30% and more",
  "40% and more",
  "50% and more",
  "60% and more",
];

export const GENDERS = ["Men", "Women", "Kids", "Unisex"];

export const COLOR_HEX: Record<string, string> = {
  Black: "#282c3f",
  White: "#ffffff",
  "Navy Blue": "#1c2a4a",
  Blue: "#3b6fb6",
  "Olive Green": "#556b2f",
  Maroon: "#800000",
  Beige: "#d9c7a7",
  Pink: "#ff3f6c",
  Grey: "#94969f",
  Purple: "#7b2d8b",
  "Mustard Yellow": "#d4a017",
  Cream: "#f4ead5",
};

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group/sec border-b border-gray-200 py-3 last:border-b-0"
    >
      <summary className="mb-2 flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <IconChevronDown className="h-3.5 w-3.5 text-gray-500 transition-transform group-open/sec:rotate-180" />
      </summary>
      {children}
    </details>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center py-1.5 text-sm text-[#535766]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2.5 size-3.5 accent-brand"
      />
      {swatch && (
        <span
          aria-hidden="true"
          className="mr-2 size-3.5 rounded-full border border-gray-300"
          style={{ backgroundColor: swatch }}
        />
      )}
      {label}
    </label>
  );
}

function RadioRow({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center py-1.5 text-sm text-[#535766]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2.5 size-3.5 accent-brand"
      />
      {label}
    </label>
  );
}

export interface FilterSidebarProps {
  showGender: boolean;
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  selectedCats: string[];
  onToggleCat: (cat: string) => void;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  priceMin: number;
  priceMax: number;
  onPriceMin: (value: number) => void;
  onPriceMax: (value: number) => void;
  discount: string | null;
  onDiscount: (value: string | null) => void;
  gender: string | null;
  onGender: (value: string | null) => void;
  activeCount: number;
  onClearAll: () => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const [brandQuery, setBrandQuery] = useState("");
  const visibleBrands = props.brands.filter((brand) =>
    brand.toLowerCase().includes(brandQuery.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-3">
        <p className="text-[16px] font-bold uppercase tracking-wide text-ink">Filters</p>
        {props.activeCount > 0 && (
          <button
            type="button"
            onClick={props.onClearAll}
            className="text-xs font-bold uppercase text-brand hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {props.showGender && (
        <Section title="Gender">
          {GENDERS.map((g) => (
            <RadioRow
              key={g}
              label={g}
              name="gender"
              checked={props.gender === g}
              onChange={() => props.onGender(props.gender === g ? null : g)}
            />
          ))}
        </Section>
      )}

      <Section title="Categories">
        {props.categories.map((cat) => (
          <CheckRow
            key={cat}
            label={cat}
            checked={props.selectedCats.includes(cat)}
            onChange={() => props.onToggleCat(cat)}
          />
        ))}
      </Section>

      <Section title="Brand">
        <div className="mb-2 flex items-center gap-2 rounded-[2px] border border-gray-300 px-2">
          <IconSearch className="h-3.5 w-3.5 text-gray-400" />
          <input
            value={brandQuery}
            onChange={(event) => setBrandQuery(event.target.value)}
            placeholder="Search brand"
            className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="max-h-56 overflow-y-auto pr-1">
          {visibleBrands.length > 0 ? (
            visibleBrands.map((brand) => (
              <CheckRow
                key={brand}
                label={brand}
                checked={props.selectedBrands.includes(brand)}
                onChange={() => props.onToggleBrand(brand)}
              />
            ))
          ) : (
            <p className="py-2 text-xs text-gray-400">No brands found</p>
          )}
        </div>
      </Section>

      <Section title="Price">
        <p className="mb-2.5 text-[12px] font-semibold text-ink">
          ₹{props.priceMin} - ₹
          {props.priceMax >= PRICE_MAX ? "10,100+" : props.priceMax}
        </p>
        <div className="space-y-2 pr-1">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            value={props.priceMin}
            onChange={(event) =>
              props.onPriceMin(
                Math.min(Number(event.target.value), props.priceMax - 100),
              )
            }
            aria-label="Minimum price"
            className="w-full accent-brand"
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            value={props.priceMax}
            onChange={(event) =>
              props.onPriceMax(
                Math.max(Number(event.target.value), props.priceMin + 100),
              )
            }
            aria-label="Maximum price"
            className="w-full accent-brand"
          />
        </div>
      </Section>

      <Section title="Color">
        {props.colors.map((color) => (
          <CheckRow
            key={color}
            label={color}
            swatch={COLOR_HEX[color] ?? "#d4d5d9"}
            checked={props.selectedColors.includes(color)}
            onChange={() => props.onToggleColor(color)}
          />
        ))}
      </Section>

      <Section title="Discount Range">
        {DISCOUNT_OPTIONS.map((option) => (
          <RadioRow
            key={option}
            label={option}
            name="discount"
            checked={props.discount === option}
            onChange={() =>
              props.onDiscount(props.discount === option ? null : option)
            }
          />
        ))}
      </Section>

      <Section title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {props.sizes.map((size) => {
            const selected = props.selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => props.onToggleSize(size)}
                className={`grid h-9 min-w-9 place-items-center border px-2 text-xs font-semibold transition ${
                  selected
                    ? "border-brand bg-pink-50 font-bold text-brand"
                    : "border-gray-300 text-gray-700 hover:border-gray-900"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function FilterDrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-3">
      <p className="text-[16px] font-bold uppercase tracking-wide text-ink">Filters</p>
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="grid size-7 place-items-center text-gray-600"
      >
        <IconX className="h-4 w-4" />
      </button>
    </div>
  );
}
