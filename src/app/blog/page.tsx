import type { Metadata } from "next";
import { getAllPostMeta } from "@/lib/blog";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog | Rendezvényárnyékolás",
  description: "Cikkek, hírek és érdekességek a rendezvénydekorációról és árnyékolástechnikáról.",
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  return <BlogIndex posts={posts} title="Rendezvényárnyékolás Blog" subtitle="Tippek, útmutatók és hírek rendezvénydekorációs megoldásainkról." />;
}
