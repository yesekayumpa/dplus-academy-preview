import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AcademySection from "@/components/academy/AcademySection";
import { HeroSection } from "@/components/academy/HeroSection";
import NotreMissionSection from "@/components/academy/NotreMissionSection";
import PersonalPlanSlider from "@/components/academy/PersonalPlanSlider";
import { StatsSection } from "@/components/academy/StatsSection";
import { CTABannerSection } from "@/components/academy/CTABannerSection";


const AcademyPage = () => {
  const navigate = useNavigate();
  
  // Fonction pour naviguer avec scroll vers le haut
  const handleNavigateToTrainers = () => {
    // Détecter si on est sur mobile
    const isMobile = window.innerWidth < 768;
    
    // Forcer le scroll vers le haut immédiatement
    if (isMobile) {
      // Comportement spécifique pour mobile
      document.body.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Double garantie pour mobile
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        navigate("/nos-formateurs");
      }, 100);
    } else {
      // Comportement pour desktop/web - plus robuste
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Triple garantie pour desktop
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        navigate("/nos-formateurs");
      }, 50);
      
      // Garantie supplémentaire après navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 150);
    }
  };

  // Équipe DM+ Academy - Testimonials for ScrollReel
  const teamTestimonials = [
    {
      quote: "Notre mission est de transformer chaque apprenant en expert capable de relever les défis du marché professionnel.",
      author: "Sarah Diallo",
      role: "Directrice Pédagogique",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
      alt: "Portrait de Sarah Diallo",
    },
    {
      quote: "Les partenariats stratégiques sont la clé de notre succès pour offrir des formations de qualité exceptionnelle.",
      author: "Amadou Bâ",
      role: "Responsable des Partenariats",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
      alt: "Portrait de Amadou Bâ",
    },
    {
      quote: "Chaque formation est conçue pour maximiser l'impact pratique et l'employabilité de nos apprenants.",
      author: "Aïssatou Diop",
      role: "Formatrice Senior",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
      alt: "Portrait de Aïssatou Diop",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <NotreMissionSection />

      {/* Stats Banner — inspiré Cegos */}
      <StatsSection />

      {/* Personal Plan Slider */}
      <PersonalPlanSlider />
      
      {/* Section spécifique pour DM+ Academy */}
      <AcademySection />

      {/* CTA Banner pleine largeur — inspiré Cegos */}
      <CTABannerSection />

      {/* Nos experts — Strip horizontal épuré */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#800020] mb-2">Nos formateurs</span>
              <h2 className="text-2xl md:text-3xl tracking-tight font-black text-gray-900">Des experts pour vous guider</h2>
            </div>
            <button
              onClick={handleNavigateToTrainers}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1D0000] text-[#1D0000] text-sm font-bold rounded-full hover:bg-[#1D0000] hover:text-white transition-all duration-200 shrink-0"
            >
              Voir tous les formateurs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {teamTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-4 px-0 md:px-8 py-6 md:py-0 first:pl-0 last:pr-0"
              >
                <p className="text-sm text-gray-600 leading-relaxed italic flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">{t.author}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Bande "Ils nous font confiance" — inspiré Cegos */}
      <section className="py-8 border-t border-gray-100 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 leading-relaxed">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { name: "Orange", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/320px-Orange_logo.svg.png" },
              { name: "Société Générale", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg/320px-Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg.png" },
              { name: "Total Energies", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/TotalEnergies_logo.svg/320px-TotalEnergies_logo.svg.png" },
              { name: "MTN", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/MTN_Logo.svg/240px-MTN_Logo.svg.png" },
              { name: "BCEAO", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxT2h06ZqaI3hPEcqsChZuQKrJO_iX__Hjmg&s" },
            ].map((partner) => (
              <img
                key={partner.name}
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="h-7 md:h-9 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ))}
          </div>
        </div>
      </section>

      </>
  );
};

export default AcademyPage;
