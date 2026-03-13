import { Button } from "@/components/ui/button";
import { HeroFloatingCards } from "@/components/academy/HeroFloatingCards";
import AnimatedTyping from "@/components/ui/AnimatedTyping";

const stats = [
  { value: "+30", label: "Masterclasses" },
  { value: "+350", label: "Manuscrits écrits" },
  { value: "+2000", label: "Heures de cours" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-12">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-8 order-first lg:order-first pt-8 lg:pt-4">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                <AnimatedTyping 
                  text="Développez vos compétences "
                  coloredText="Dès aujourd'hui"
                  speed={50}
                />
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
                Maîtrisez les compétences très demandées auprès d'experts du secteur. Apprenez à votre rythme, suivez votre évolution et gardez une longueur d'avance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-nowrap items-center gap-2 md:gap-4 overflow-x-auto">
              <Button
                size="sm"
                className="rounded-full bg-primary px-4 md:px-8 text-primary-foreground hover:bg-primary/90 text-sm md:text-base"
              >
                <span className="hidden md:inline">Découvrir nos formations</span>
                <span className="md:hidden">Découvrir</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="transition-colors duration-200 rounded-full border-border 
                px-4 md:px-8 hover:text-primary hover:bg-gray-400/10 bg-transparent text-sm md:text-base"
              >
                <span className="hidden md:inline">Formation sur mesure</span>
                <span className="md:hidden">Sur mesure</span>
              </Button>
            </div>
          </div>

          {/* Right Side — Image + Floating Cards */}
          <div className="relative order-last lg:order-last flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <HeroFloatingCards />
          </div>
        </div>
      </div>
    </section>
  );
}
