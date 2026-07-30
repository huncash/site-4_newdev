import { getProductById, getProducts } from "@/lib/data-provider";
import { ProductDetail } from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetail product={product} relatedProducts={related} />;
}
