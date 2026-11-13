import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/product-detail";
import { getProduct, products, similarProducts } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product" };
  return { title: `${product.brand} ${product.name}` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }
  const similar = similarProducts(product, 10);
  return <ProductDetail product={product} similar={similar} />;
}
