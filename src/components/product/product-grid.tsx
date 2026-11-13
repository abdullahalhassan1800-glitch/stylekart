import ProductCard from "@/components/product/product-card";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-[30px] sm:grid-cols-3 xl:grid-cols-[repeat(4,210px)] xl:justify-between xl:gap-x-0">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
