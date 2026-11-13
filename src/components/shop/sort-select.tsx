"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@/components/ui/icons";

const OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "whats-new", label: "What's New" },
  { value: "popularity", label: "Popularity" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "discount", label: "Better Discount" },
  { value: "rating", label: "Customer Rating" },
];

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative text-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 font-bold text-ink"
      >
        <span className="text-gray-500">Sort by:</span>
        <span>{current.label}</span>
        <IconChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="absolute right-0 z-40 mt-2 w-56 rounded-[2px] border border-gray-100 bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-gray-50 ${
                  option.value === value ? "font-bold text-brand" : "text-[#535766]"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
