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
    icon: "🎨",
    title: "Meglévő egyedi darabok bérlése",
    description:
      "Kézzel festett és nyomtatott lycra dekorponyvák bérbeadása — egész évben, előfoglalással. Nem gyártás-orientált műhely vagyunk.",
  },
  {
    icon: "☀️",
    title: "Árnyék és hangulat",
    description:
      "Kültéren árnyékot ad, beltérben karakteres vizuális réteget épít a tér fölé. Esővédelemre nem alkalmas — arra külön elemek vannak.",
  },
  {
    icon: "🔧",
    title: "Telepítés és koordináció",
    description:
      "A felület tervezését, kifeszítését és bontását mi végezzük. Emelőkosár, állvány, helyszíni technika esetén a megrendelő alvállalkozóival dolgozunk együtt.",
  },
];

export function FeatureGrid({
  heading = "Miért minket válassz?",
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridProps) {
  return (
    <section className={cn("bg-background py-16", className)}>
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {heading}
          </h2>
        ) : null}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base text-foreground">
                  <span className="text-2xl leading-none text-brand">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
