"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  features?: readonly Feature[];
  className?: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "⛺",
    title: "Professzionális Rendezvénysátrak",
    description:
      "Nagy teherbírású, időjárásálló alumínium vázas partysátrak és rendezvénysátrak bármilyen eseményre.",
  },
  {
    icon: "☂️",
    title: "Napernyők és Árnyékolók",
    description:
      "Óriás napernyők, egyedi formájú stretch sátrak és moduláris árnyékoló rendszerek teraszokra és kertekbe.",
  },
  {
    icon: "🔧",
    title: "Helyszíni Telepítés",
    description:
      "Szakképzett csapatunk vállalja a teljes körű szállítást, építést és bontást az ország egész területén.",
  },
];

export function FeatureGrid({
  heading = "Miért minket válassz?",
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridProps) {
  return (
    <section className={cn("bg-slate-950 py-16", className)}>
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
            {heading}
          </h2>
        ) : null}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-800 bg-slate-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base text-sky-400">
                  <span className="text-2xl leading-none">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
