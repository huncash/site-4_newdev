import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat — rendezvenyarnyekolas.hu",
  description:
    "Kérjen ajánlatot egyedi festésű dekor ponyva bérlésére: helyszín, dátum, tematika — 1 munkanapon belül visszajelzünk.",
};

export default function KapcsolatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
