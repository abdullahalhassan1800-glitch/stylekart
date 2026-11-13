"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_MENU } from "@/data/categories";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import {
  IconBag,
  IconChevronRight,
  IconHeart,
  IconMenu,
  IconSearch,
  IconStar,
  IconUser,
  IconX,
} from "@/components/ui/icons";

const OPEN_DELAY = 80;
const CLOSE_DELAY = 150;

const STUDIO_EDITORIAL = [
  "/images/products/p1-1.jpg",
  "/images/products/p13-1.jpg",
  "/images/products/p36-1.jpg",
  "/images/products/p42-1.jpg",
];

function SearchForm({ className }: { className?: string }) {
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = String(
      new FormData(event.currentTarget).get("q") ?? "",
    ).trim();
    router.push(q ? `/shop/all?q=${encodeURIComponent(q)}` : "/shop/all");
  };

  return (
    <form onSubmit={onSubmit} action="/shop/all" className={className}>
      <div className="flex h-10 items-center gap-2 rounded-[4px] border border-transparent bg-[#f5f5f6] px-3 transition-colors focus-within:border-gray-300 focus-within:bg-white">
        <IconSearch className="h-4 w-4 shrink-0 text-gray-500" />
        <input
          name="q"
          defaultValue=""
          placeholder="Search for products, brands and more"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-[#696e79]"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="StyleKart home" className="flex shrink-0 items-center">
      <img
        src="/images/logo.png"
        alt="StyleKart"
        className="h-9 w-auto object-contain lg:h-10"
      />
    </Link>
  );
}

function StudioPopup({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-x-0 top-full hidden h-[calc(100vh-100%)] bg-black/35 md:block"
      />
      <div
        className={`absolute left-1/2 top-full z-[1001] hidden w-[90%] max-w-[545px] -translate-x-1/2 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.28)] transition-all duration-200 ease-out md:block ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="px-8 pt-7">
          <div className="flex items-center gap-3">
            <span className="text-[26px] font-black uppercase leading-none tracking-[2px] text-ink">
              Studio
            </span>
            <IconStar className="h-5 w-5 text-[#FF3F6C]" />
          </div>
          <p className="pt-2 text-[13px] text-[#535766]">
            Your daily inspiration for everything fashion
          </p>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2.5 px-8">
          {STUDIO_EDITORIAL.map((src, index) => (
            <div
              key={src}
              className={`overflow-hidden rounded-sm shadow-[0_6px_18px_rgba(0,0,0,0.18)] ${
                index % 2 === 0 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
              }`}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center px-8 pb-7 pt-6">
          <Link
            href="/studio"
            onClick={onClose}
            className="flex items-center gap-2 rounded border border-[#d4d5d9] bg-white px-8 py-2.5 text-[12px] font-bold uppercase tracking-[1px] text-ink transition hover:border-ink"
          >
            Explore Studio
            <IconChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const { count: bagCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const active = NAV_MENU.find((item) => item.label === activeNav) ?? null;

  const openMenu = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
    }
    openTimer.current = window.setTimeout(() => setActiveNav(label), OPEN_DELAY);
  };

  const closeMenu = () => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => setActiveNav(null), CLOSE_DELAY);
  };

  const keepOpen = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNav(null);
        setMobileOpen(false);
      }
    };
    const onMouseDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveNav(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[1000] bg-white shadow-[0_1px_0_0_#eaeaec]"
      onMouseLeave={closeMenu}
    >
      <div className="relative flex h-16 items-center gap-4 px-4 md:h-20 md:gap-6 lg:px-14">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="grid size-9 place-items-center text-ink md:hidden"
        >
          <IconMenu className="h-6 w-6" />
        </button>

        <div onMouseEnter={closeMenu} className="flex shrink-0">
          <Logo />
        </div>

        <nav className="hidden h-full items-stretch md:ml-[24px] md:flex">
          {NAV_MENU.map((item) => (
            <div
              key={item.label}
              className="flex h-full items-stretch"
              onMouseEnter={() => openMenu(item.label)}
            >
              <Link
                href={item.href}
                aria-expanded={activeNav === item.label}
                aria-controls={activeNav === item.label ? `nav-panel-${item.id}` : undefined}
                onFocus={() => openMenu(item.label)}
                className={`relative flex h-full items-center whitespace-nowrap px-[14px] text-[14px] font-semibold uppercase tracking-[0.3px] transition-colors min-[1200px]:px-[17px] ${
                  activeNav === item.label ? "" : "text-ink"
                }`}
                style={activeNav === item.label ? { color: item.accent } : undefined}
              >
                {item.label}
                {item.label === "Studio" && (
                  <sup
                    aria-hidden="true"
                    className="absolute left-full top-[22px] rounded-sm bg-[#FF3F6C] px-1 py-px text-[8px] font-bold normal-case text-white"
                  >
                    NEW
                  </sup>
                )}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 hidden h-[3px] transition-opacity md:block ${
                    activeNav === item.label ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: item.accent }}
                />
              </Link>
            </div>
          ))}
        </nav>

        <div
          onMouseEnter={closeMenu}
          className="hidden min-w-0 flex-1 md:block md:ml-[28px] md:max-w-[350px]"
        >
          <SearchForm />
        </div>

        <div
          onMouseEnter={closeMenu}
          className="ml-auto flex items-center gap-1 lg:gap-[19px]"
        >
          <div className="group/profile relative">
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-[12px] font-bold text-ink transition-colors hover:text-brand lg:px-[2px]"
            >
              <IconUser className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <div className="invisible absolute right-0 top-full w-60 translate-y-1 bg-white p-4 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 group-hover/profile:visible group-hover/profile:translate-y-0 group-hover/profile:opacity-100">
              {user ? (
                <>
                  <p className="text-sm font-bold text-ink">Hello, {user.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">+91 {user.phone}</p>
                  <button
                    type="button"
                    onClick={logout}
                    className="mt-3 w-full rounded border border-brand py-2 text-xs font-bold text-brand transition hover:bg-pink-50"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-ink">Welcome</p>
                  <p className="mb-3 text-xs text-gray-500">
                    To access account and manage orders
                  </p>
                  <Link
                    href="/login"
                    className="block w-full rounded bg-brand py-2 text-center text-xs font-bold text-white transition hover:bg-brand-dark"
                  >
                    LOGIN / SIGNUP
                  </Link>
                </>
              )}
              <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                <Link
                  href="/orders"
                  className="flex items-center justify-between text-xs font-medium text-gray-700 hover:text-brand"
                >
                  Orders <IconChevronRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between text-xs font-medium text-gray-700 hover:text-brand"
                >
                  Wishlist <IconChevronRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-between text-xs font-medium text-gray-700 hover:text-brand"
                >
                  Bag <IconChevronRight className="h-3 w-3" />
                </Link>
                <button
                  type="button"
                  onClick={() => showToast("Customer support is available 24x7")}
                  className="flex items-center justify-between text-xs font-medium text-gray-700 hover:text-brand"
                >
                  Contact Us <IconChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <Link
            href="/wishlist"
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-[12px] font-bold text-ink transition-colors hover:text-brand lg:px-[2px]"
          >
            <span className="relative">
              <IconHeart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                  {wishCount}
                </span>
              )}
            </span>
            <span>Wishlist</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-[12px] font-bold text-ink transition-colors hover:text-brand lg:px-[2px]"
          >
            <span className="relative">
              <IconBag className="h-5 w-5" />
              {bagCount > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                  {bagCount}
                </span>
              )}
            </span>
            <span>Bag</span>
          </Link>
        </div>
      </div>

      {active?.label === "Studio" ? (
        <StudioPopup onClose={() => setActiveNav(null)} />
      ) : null}

      {active && active.columns.length > 0 && (
        <div
          id={`nav-panel-${active.id}`}
          role="region"
          aria-label={`${active.label} menu`}
          className="absolute inset-x-0 top-full hidden md:block"
          onMouseEnter={keepOpen}
          onMouseLeave={closeMenu}
        >
          <div
            className="mx-auto grid w-[90%] max-w-[1200px] grid-cols-3 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] min-[1200px]:grid-cols-5"
            style={{ ["--accent" as string]: active.accent }}
          >
            {active.columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`space-y-[18px] px-6 py-5 min-[1200px]:px-[35px] ${
                  columnIndex % 2 === 1 ? "bg-[#fcfcfc]" : "bg-white"
                }`}
              >
                {column.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.items.length > 0 ? (
                      <p className="nav-accent-heading mb-[7px] text-[14px] font-semibold uppercase leading-[22px]">
                        {group.heading}
                      </p>
                    ) : (
                      <Link
                        href={group.headingHref ?? active.href}
                        onClick={() => setActiveNav(null)}
                        className="nav-accent-heading mb-[7px] block text-[14px] font-semibold uppercase leading-[22px]"
                      >
                        {group.heading}
                      </Link>
                    )}
                    {group.items.length > 0 ? (
                      <ul>
                        {group.items.map((link, itemIndex) => (
                          <li key={itemIndex} className="leading-[23px]">
                            <Link
                              href={link.href ?? active.href}
                              onClick={() => setActiveNav(null)}
                              className="nav-accent-link block text-[14px] leading-[23px] text-[#282C3F]"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {group.separator ? (
                      <hr className="mt-[18px] border-t border-[#e5e5e5]" />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-[#f0f0f0] px-4 py-2 md:hidden">
        <SearchForm />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 overflow-y-auto bg-white pb-6">
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="grid size-8 place-items-center text-gray-700"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
            {NAV_MENU.map((item) => {
              const expanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="border-b border-gray-100">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded(expanded ? null : item.label)}
                    className="flex w-full items-center justify-between px-4 py-4"
                  >
                    <span
                      className="text-sm font-bold uppercase text-ink"
                      style={expanded ? { color: item.accent } : undefined}
                    >
                      {item.label}
                    </span>
                    <IconChevronRight
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        expanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {expanded && (
                    <div className="space-y-4 px-4 pb-4">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[12px] font-bold uppercase tracking-wide"
                        style={{ color: item.accent }}
                      >
                        View all {item.label}
                      </Link>
                      {item.label === "Studio" ? (
                        <div className="space-y-3">
                          <p className="text-[13px] text-[#535766]">
                            Your daily inspiration for everything fashion
                          </p>
                          <Link
                            href="/studio"
                            onClick={() => setMobileOpen(false)}
                            className="inline-block rounded border border-ink px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-ink"
                          >
                            Explore Studio
                          </Link>
                        </div>
                      ) : (
                        item.columns.flat().map((group, groupIndex) => (
                          <div key={groupIndex}>
                            {group.items.length > 0 ? (
                              <>
                                <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                  {group.heading}
                                </p>
                                <ul className="space-y-1.5">
                                  {group.items.map((link, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link
                                        href={link.href ?? item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-[13px] text-[#535766]"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <Link
                                href={group.headingHref ?? item.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-[13px] font-semibold text-ink"
                              >
                                {group.heading}
                              </Link>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
