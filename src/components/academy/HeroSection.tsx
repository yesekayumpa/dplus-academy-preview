import { Button } from "@/components/ui/button";
import { HeroFloatingCards } from "@/components/academy/HeroFloatingCards";
import AnimatedTyping from "@/components/ui/AnimatedTyping";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 30, label: "Masterclasses", suffix: "+" },
  { value: 350, label: "Manuscrits écrits", suffix: "+" },
  { value: 2000, label: "Heures de cours", suffix: "+" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {suffix}{count.toLocaleString()}
    </span>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative overflow-hidden bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 order-first lg:order-first pt-8 lg:pt-4"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl tracking-tight lg:text-6xl tracking-tight">
                <AnimatedTyping 
                  text="Développez vos compétences "
                  coloredText="Dès aujourd'hui"
                  speed={50}
                />
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                Maîtrisez les compétences très demandées auprès d'experts du secteur. Apprenez à votre rythme, suivez votre évolution et gardez une longueur d'avance.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-nowrap items-center gap-2 md:gap-4 overflow-x-auto"
            >
              <Button
                size="sm"
                className="rounded-full bg-primary px-4 md:px-8 text-primary-foreground hover:bg-primary/90 text-sm md:text-base hover:_scale-105 transition-transform"
              >
                <span className="hidden md:inline">Découvrir nos formations</span>
                <span className="md:hidden">Découvrir</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="transition-colors duration-200 rounded-full border-border 
                px-4 md:px-8 hover:text-primary hover:bg-gray-400/10 bg-transparent text-sm md:text-base hover:scale-105 transition-transform"
              >
                <span className="hidden md:inline">Formation sur mesure</span>
                <span className="md:hidden">Sur mesure</span>
              </Button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl tracking-tight font-bold text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side — Image + Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-last lg:order-last flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
          >
            <HeroFloatingCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
