import { redirect } from "next/navigation";

import { getPublicProduct } from "@/lib/catalog-public";

interface Props {
  params: Promise<{ id: string }>;
}

/** Legacy `/product/[id]` → `/termekek/[slug]`. */
export default async function LegacyProductPage({ params }: Props) {
  const { id } = await params;
  const bySlug = getPublicProduct(id);
  if (bySlug) {
    redirect(`/termekek/${bySlug.slug}`);
  }
  redirect("/termekek");
}
