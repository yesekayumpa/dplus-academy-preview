import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export function CTABannerSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#1D0000] py-14 md:py-20 lg:py-28">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        {/* Lignes décoratives Cegos-style */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest text-white bg-white/10 border border-white/20 rounded-full">
            Passez à l'action
          </span>

          {/* Titre */}
          <h2 className="text-2xl md:text-4xl tracking-tight lg:text-5xl tracking-tight font-black text-white leading-tight mb-4">
            Trouvez la formation qui{" "}
            <span className="underline decoration-white/40 underline-offset-4">
              transforme
            </span>{" "}
            votre carrière
          </h2>

          {/* Sous-titre */}
          <p className="text-sm md:text-lg text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed">
            Plus de 50 formations certifiantes, animées par des experts terrain.
            En présentiel, en ligne ou sur mesure — selon vos besoins.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/masterclasses");
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1D0000] font-bold text-sm rounded-full shadow-lg hover:bg-gray-100 transition-all"
            >
              Explorer les formations
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/contact");
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold text-sm rounded-full hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              Parler à un conseiller
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
