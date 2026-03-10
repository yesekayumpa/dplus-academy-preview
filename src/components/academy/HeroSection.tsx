import { Button } from "@/components/ui/button";
import { HeroFloatingCards } from "@/components/academy/HeroFloatingCards";

const stats = [
  { value: "+30", label: "Masterclasses" },
  { value: "+350", label: "Manuscrits écrits" },
  { value: "+2000", label: "Heures de cours" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-20">
      <div className="w-full grid items-center gap-12 px-6 pb-4 pt-8 lg:grid-cols-2 lg:gap-8 lg:pb-6 lg:pt-12">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
              Développez vos compétences{" "}
              <span className="italic text-primary">Dès aujourd'hui</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
              Maîtrisez les compétences très demandées auprès d’experts du secteur. Apprenez à votre rythme, suivez votre évolution et gardez une longueur d’avance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Découvrir nos formations
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="transition-colors duration-200 rounded-full border-border 
              px-8 hover:text-primary hover:bg-gray-400/10 bg-transparent"
            >
              Formation sur mesure
            </Button>
          </div>

        </div>

        {/* Right Side — Image + Floating Cards */}
        <div className="relative order-1 lg:order-1 min-h-[320px] lg:min-h-[480px] lg:block">
          <HeroFloatingCards />
        </div>
      </div>
    </section>
  );
}
