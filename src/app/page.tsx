import BannerCarousel from "@/components/home/banner-carousel";
import CategoryStrip from "@/components/home/category-strip";
import OfferSidebar from "@/components/home/offer-sidebar";
import PromoStrip from "@/components/home/promo-strip";
import TopBanner from "@/components/home/top-banner";

export default function Home() {
  return (
    <>
      <TopBanner />
      <BannerCarousel />
      <PromoStrip />
      <CategoryStrip />
      <OfferSidebar />
    </>
  );
}
