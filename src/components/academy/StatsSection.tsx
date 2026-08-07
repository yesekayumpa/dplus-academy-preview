import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users, Star, BookOpen } from "lucide-react";

const stats = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: 50,
    suffix: "+",
    label: "Formations disponibles",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 2000,
    suffix: "+",
    label: "Apprenants formés",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: 97,
    suffix: "%",
    label: "Taux de satisfaction",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: 30,
    suffix: "+",
    label: "Formateurs experts",
  },
];

function AnimatedCounter({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, value]);

  return (
    <span>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-10 bg-[#1D0000]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col items-center text-center gap-2"
            >
              {/* Icône */}
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-1">
                {stat.icon}
              </div>

              {/* Valeur */}
              <p className="text-3xl tracking-tight md:text-4xl tracking-tight font-black text-white leading-none">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  start={isInView}
                />
              </p>

              {/* Label */}
              <p className="text-sm md:text-base text-white/70 font-medium leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
