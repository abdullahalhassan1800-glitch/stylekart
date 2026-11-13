"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import {
  IconChevronRight,
  IconReturn,
  IconShield,
  IconTag,
} from "@/components/ui/icons";

const COUPON_CODE = "MYNTRA300";

const TRUST_ITEMS = [
  { label: "Genuine Products", icon: IconShield },
  { label: "Try & Buy", icon: IconTag },
  { label: "Easy Returns", icon: IconReturn },
];

export default function OfferSidebar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      showToast("Coupon code copied");
    } catch {
      showToast(COUPON_CODE);
    }
  };

  return (
    <div ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="offer-sidebar-panel"
        aria-label="UPTO 300 OFF offer"
        className="fixed right-0 top-1/2 z-40 flex h-72 w-11 -translate-y-1/2 select-none flex-col items-center justify-center gap-3 rounded-l-md bg-gradient-to-b from-brand to-brand-dark text-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-colors hover:from-brand-dark hover:to-brand-dark"
      >
        <IconChevronRight
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
        <span className="rotate-180 text-[11px] font-bold uppercase tracking-[0.12em] [writing-mode:vertical-rl]">
          UPTO ₹300 OFF
        </span>
      </button>

      {open && (
        <div
          id="offer-sidebar-panel"
          role="dialog"
          aria-label="MYNTRA300 offer"
          className="fixed right-11 top-1/2 z-40 max-h-[calc(100vh-2rem)] w-[calc(100vw-2.75rem)] max-w-[576px] -translate-y-1/2 animate-[toast-in_0.2s_ease-out] overflow-y-auto border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.18)] md:rounded-l-lg"
        >
          <div className="flex items-stretch gap-4 p-4 sm:p-6">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                Avail Upto
              </p>
              <p className="mt-1.5 text-4xl font-black leading-none text-ink sm:text-5xl">
                300 <span className="text-3xl sm:text-4xl">OFF</span>
              </p>
              <p className="mt-2 text-xs font-medium text-gray-500">
                On your first StyleKart order
              </p>
            </div>
            <div className="relative hidden w-36 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-brand/20 via-brand/10 to-[#ffe3ea] sm:block">
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-5xl font-black text-brand">%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Coupon Code:
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="rounded border border-dashed border-brand/50 bg-brand/5 px-3 py-1.5 text-sm font-extrabold tracking-[0.08em] text-brand">
                    {COUPON_CODE}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="rounded border border-gray-300 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-gray-500">
                  Applicable on your first order
                </p>
              </div>
              <Link
                href={user ? "/shop/all" : "/login"}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded bg-brand px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
              >
                {user ? "Shop Now" : "Sign Up Now"}
                <IconChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-200 pt-4">
              {TRUST_ITEMS.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <Icon className="h-5 w-5 text-success" />
                  <span className="text-[10px] font-semibold leading-tight text-gray-600 sm:text-[11px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
