import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/ProductDetail";
import { getCategory, getProduct, products } from "@/data/catalog";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  const category = getCategory(product.categorySlug);
  return {
    title: `${product.name} — ${category?.shortName ?? "Katalógus"} | rendezvenyarnyekolas.hu`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
