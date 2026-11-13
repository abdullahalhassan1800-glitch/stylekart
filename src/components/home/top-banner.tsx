import Link from "next/link";
import { withBase } from "@/lib/paths";

export default function TopBanner() {
  return (
    <div className="px-4 pb-6 pt-[23px] lg:px-[60px]">
      <Link
        href="/shop/all"
        aria-label="Get 60% off on the Myntra sale"
        className="block transition-transform duration-300 hover:scale-[1.005]"
      >
        <img
          src={withBase("/images/banners/myntra-sale-60-off.png")}
          alt="Get 60% Off Myntra Sale"
          className="h-auto w-full"
        />
      </Link>
    </div>
  );
}
