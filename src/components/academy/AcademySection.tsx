import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  UserPlus,
  ArrowRight,
  Play,
  Monitor,
  Layers,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MasterclassSection from "./MasterclassSection";
import { useFormatsPedagogiques } from "@/hooks/useFormatsPedagogiques";

const AcademySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeAudience, setActiveAudience] = useState(0);

  const handleNavigateWithScroll = (link: string) => {
    window.scrollTo(0, 0);
    navigate(link);
  };

  // Fetch dynamic data from API
  const { data: formats, isLoading, isError } = useFormatsPedagogiques();

  const carouselItems = formats?.map((format) => {
    let link = `/${format.slug}`;
    if (format.slug === "formation-live") link = "/masterclasses";
    else if (format.slug === "formation-replay") link = "/e-learning";
    else if (format.slug === "formation-hybride") link = "/corporate-programs";
    else if (format.slug === "bootcamp-intensif") link = "/sur-mesure";

    return {
      id: format.id,
      title: format.titre,
      description: format.description,
      image: format.imageUrl,
      link,
    };
  }) || [];

  useEffect(() => {
    if (carouselItems.length === 0) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab, carouselItems.length]);

  // Tab icons mapping
  const tabIcons = [
    <Play className="w-4 h-4" />,
    <Monitor className="w-4 h-4" />,
    <Layers className="w-4 h-4" />,
    <Zap className="w-4 h-4" />,
  ];

  const targetAudiences = [
    {
      title: "Étudiants & Jeunes diplômés",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Acquérez des compétences pratiques pour votre insertion professionnelle et démarquez-vous sur le marché du travail.",
      number: "01",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=600&fit=crop&crop=center",
      badgeTitle: "Taux d'insertion",
      badgeValue: "89%"
    },
    {
      title: "Professionnels",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Développez vos compétences pour évoluer dans votre carrière et accéder à de nouvelles opportunités.",
      number: "02",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&h=600&fit=crop&crop=center",
      badgeTitle: "Évolution de carrière",
      badgeValue: "75%"
    },
    {
      title: "Entrepreneurs",
      icon: <UserPlus className="w-5 h-5" />,
      description: "Bénéficiez d'un accompagnement sur mesure pour lancer, structurer et faire croître votre projet.",
      number: "03",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&h=600&fit=crop&crop=center",
      badgeTitle: "Projets lancés",
      badgeValue: "+200"
    },
  ];

  const whyUs = [
    { num: "01", title: "Formations orientées terrain", desc: "Programmes conçus avec des experts actifs pour une application immédiate en entreprise." },
    { num: "02", title: "Suivi personnalisé", desc: "Un accompagnement individuel tout au long de votre parcours d'apprentissage." },
    { num: "03", title: "Certification reconnue", desc: "Des certifications valorisées par les entreprises partenaires de DM+ Academy." },
    { num: "04", title: "Flexibilité totale", desc: "Présentiel, en ligne ou hybride — choisissez le format qui vous convient." },
  ];

  return (
    <div className="space-y-0">

      {/* ── FORMATS PÉDAGOGIQUES : Tabs interactifs ────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl tracking-tight lg:text-4xl tracking-tight font-bold text-gray-900 mb-3">
              Nos formats pédagogiques
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Des approches variées pour répondre à vos besoins spécifiques
            </p>
            <div className="w-12 h-1 rounded-full bg-[#800020] mx-auto mt-4" />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16 lg:py-20 lg:py-28">
              <div className="w-10 h-10 rounded-full border-3 border-[#800020] border-t-transparent animate-spin" />
            </div>
          ) : isError ? (
            <p className="text-center text-red-400 py-8 leading-relaxed">Erreur de chargement des formats.</p>
          ) : (
            <>
              {/* Tabs pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {carouselItems.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      activeTab === i
                        ? "bg-[#1D0000] text-white border-[#1D0000] shadow-xl"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#1D0000]/40 hover:text-[#1D0000]"
                    }`}
                  >
                    {tabIcons[i % tabIcons.length]}
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Tab content — large 2-col preview */}
              <AnimatePresence mode="wait">
                {carouselItems[activeTab] && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)", transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden p-6 lg:p-0 shadow-2xl"
                  >
                    {/* Image */}
                    <div className="h-64 lg:h-80 overflow-hidden rounded-2xl lg:rounded-none lg:rounded-l-3xl">
                      <motion.img
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src={carouselItems[activeTab].image}
                        alt={carouselItems[activeTab].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop";
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div className="lg:pr-10 lg:py-10 flex flex-col gap-5">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#800020]">
                        {tabIcons[activeTab % tabIcons.length]}
                        Format {activeTab + 1} / {carouselItems.length}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                        {carouselItems[activeTab].title}
                      </h3>
                      <p
                        className="text-sm md:text-base text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: carouselItems[activeTab].description }}
                      />
                      <button
                        onClick={() => handleNavigateWithScroll(carouselItems[activeTab].link)}
                        className="inline-flex items-center gap-2 self-start px-6 py-3 bg-[#1D0000] text-white text-sm font-bold rounded-full hover:bg-[#800020] transition-all duration-200 group"
                      >
                        Explorer ce format
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* ── MASTERCLASS SECTION ─────────────────────────────────────── */}
      <MasterclassSection />

      {/* ── NOS PUBLICS CIBLES : Liste stylisée ─────────────────────── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Texte gauche */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-[#800020] bg-[#800020]/10 rounded-full">
                Qui sommes-nous pour ?
              </span>
              <h2 className="text-2xl md:text-3xl tracking-tight lg:text-4xl tracking-tight font-black text-gray-900 mb-4 leading-tight">
                Nos publics<br />
                <span className="text-[#800020]">cibles</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                DM+ Academy accompagne tous les profils dans leur montée en compétences, quelle que soit leur situation.
              </p>

              {/* Liste avec grands numéros */}
              <div className="space-y-2">
                {targetAudiences.map((audience, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    onMouseEnter={() => setActiveAudience(i)}
                    onClick={() => setActiveAudience(i)}
                    className={`flex gap-3 group cursor-pointer p-3 rounded-2xl transition-colors ${activeAudience === i ? 'bg-gray-50 shadow-sm' : 'hover:bg-gray-50/50'}`}
                  >
                    <span className={`text-3xl tracking-tight font-black transition-colors leading-none select-none shrink-0 ${activeAudience === i ? 'text-[#800020]' : 'text-gray-100 group-hover:text-[#800020]/20'}`}>
                      {audience.number}
                    </span>
                    <div className="pt-1">
                      <div className={`flex items-center gap-2 mb-1 ${activeAudience === i ? 'text-[#800020]' : 'text-[#1D0000]'}`}>
                        {audience.icon}
                        <h3 className="font-bold text-sm md:text-base text-gray-900">{audience.title}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{audience.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visuel droite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-full min-h-[320px] rounded-3xl overflow-hidden shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeAudience}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={targetAudiences[activeAudience].image}
                  alt={targetAudiences[activeAudience].title}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-3 transform transition-transform hover:scale-105 z-10">
                <p className="text-xs text-gray-400 mb-0.5 leading-relaxed">{targetAudiences[activeAudience].badgeTitle}</p>
                <p className="text-2xl font-black text-[#1D0000] leading-relaxed">{targetAudiences[activeAudience].badgeValue}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS CHOISIR : Design asymétrique élégant ──────────────────── */}
      <section className="py-20 lg:py-32 bg-[#1D0000] text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Colonne gauche (Titre fixe) */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-[#1D0000] bg-white rounded-full shadow-lg">
                  Nos engagements
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">
                  Pourquoi choisir <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                    DM+ Academy ?
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Une approche pédagogique d'excellence, pensée pour votre réussite professionnelle et votre évolution continue.
                </p>
              </div>
            </div>

            {/* Colonne droite (Liste élégante) */}
            <div className="lg:col-span-7">
              <div className="flex flex-col">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="group border-b border-gray-800 last:border-0 py-8 lg:py-12 flex gap-6 md:gap-10 items-start"
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 group-hover:text-red-500 transition-colors duration-500 font-serif">
                      {item.num}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-red-100 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed md:leading-loose">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AcademySection;