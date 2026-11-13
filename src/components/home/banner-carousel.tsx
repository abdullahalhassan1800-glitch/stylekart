"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HOME_BANNERS } from "@/data/categories";
import { IconChevronRight } from "@/components/ui/icons";

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setIndex((current) => (current + 1) % HOME_BANNERS.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (next: number) =>
    setIndex((next + HOME_BANNERS.length) % HOME_BANNERS.length);

  return (
    <section
      className="relative overflow-hidden bg-gray-100"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {HOME_BANNERS.map((banner, bannerIndex) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative block aspect-[3/1] w-full shrink-0 overflow-hidden bg-gray-100"
          >
            <img
              src={banner.image}
              alt={banner.title}
              loading={bannerIndex === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => goTo(index - 1)}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-gray-900 transition hover:bg-white md:grid"
      >
        <IconChevronRight className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next banner"
        onClick={() => goTo(index + 1)}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-gray-900 transition hover:bg-white md:grid"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {HOME_BANNERS.map((banner, dotIndex) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Go to banner ${dotIndex + 1}`}
            onClick={() => goTo(dotIndex)}
            className={`h-1.5 rounded-full transition-all ${
              dotIndex === index ? "w-6 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
