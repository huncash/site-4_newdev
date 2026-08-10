import { redirect } from "next/navigation";

import { getProduct } from "@/data/catalog";

interface Props {
  params: Promise<{ id: string }>;
}

/** Legacy `/product/[id]` → `/termekek/[slug]`. */
export default async function LegacyProductPage({ params }: Props) {
  const { id } = await params;
  const bySlug = getProduct(id);
  if (bySlug) {
    redirect(`/termekek/${bySlug.slug}`);
  }
  redirect("/termekek");
}
