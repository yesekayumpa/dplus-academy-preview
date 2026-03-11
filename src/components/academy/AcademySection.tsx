import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Globe,
  Rocket,
  Users,
  Target,
  BarChart,
  Briefcase,
  UserPlus,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import MasterclassSection from "./MasterclassSection";
import InteractiveCards from "./InteractiveCards";

const AcademySection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    containScroll: false
  });
  const [selectedAudience, setSelectedAudience] = useState(0);

  // Auto-play pour mobile uniquement
  useEffect(() => {
    if (!emblaApi) return;

    // Détecter si on est sur mobile
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) return; // Pas d'auto-play sur desktop

    let autoplayTimer: NodeJS.Timeout;

    const playNext = () => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
      autoplayTimer = setTimeout(playNext, 4000);
    };

    autoplayTimer = setTimeout(playNext, 4000);

    return () => {
      if (autoplayTimer) clearTimeout(autoplayTimer);
    };
  }, [emblaApi]);

  // Données des 3 cartes du carrousel
  const carouselItems = [
    {
      id: 1,
      title: "Masterclass",
      description: "Sessions intensives avec des experts sur des thématiques précises.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "/masterclasses"
    },
    {
      id: 2,
      title: "E-learning",
      description: "Formations en ligne accessibles à tout moment à votre rythme.",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      link: "/e-learning"
    },
    {
      id: 3,
      title: "Sur mesure",
      description: "Formations personnalisées adaptées à votre entreprise.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80",
      link: "/sur-mesure"
    }
  ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const CarouselCard = ({ item }: { item: any }) => {
    const [localHover, setLocalHover] = useState(false);

    return (
      <div className="flex-[0_0_100%] md:flex-[0_0_33.333%] px-2 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="min-h-[20vh] md:min-h-[45vh] lg:min-h-[50vh]"
          style={{
            padding: "10px 6px",
            background: "#ffffff",
            color: "#1a1a1a",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            border: "1px solid rgba(128, 0, 32, 0.1)",
            transition: "border-color 0.3s ease",
            ...(localHover && { borderColor: "#800020" })
          }}
        >
          <div
            style={{
              maxWidth: "450px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* Image à gauche */}
            <motion.div 
              className="flex-1 md:flex-[1.5] min-w-[160px] md:min-w-[220px] lg:min-w-[260px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto rounded-md md:max-h-[140px] lg:max-h-[180px] max-h-[120px] object-cover"
                />
              </div>
            </motion.div>
            
            {/* Contenu à droite */}
            <div className="flex-1 md:flex-[1] min-w-[100px] md:min-w-[100px] lg:min-w-[160px] text-left">
              <h2
                className="text-base md:text-base lg:text-lg font-bold mb-1 text-gray-900 pl-2"
                style={{
                  borderLeft: "2px solid #800020",
                  paddingLeft: "6px"
                }}
              >
                {item.title}
              </h2>
              <p
                className="text-xs md:text-xs lg:text-sm text-gray-600 mb-2 leading-snug"
              >
                {item.description}
              </p>
              
              {/* Bouton */}
              <div className="text-left">
                <Link
                  to={item.link}
                  className="inline-block px-3 md:px-3 lg:px-4 py-1 text-xs md:text-xs lg:text-sm font-medium text-white rounded-full transition-all"
                  style={{
                    background: "#800020",
                  }}
                  onMouseEnter={() => setLocalHover(true)}
                  onMouseLeave={() => setLocalHover(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  const pillars = [
    {
      title: "Finance & Investissement",
      icon: <BarChart className="w-6 h-6" />,
      description:
        "Maîtrise des concepts financiers et des stratégies d'investissement",
      type: "finance"
    },
    {
      title: "Outils digitaux & Automatisation",
      icon: <Globe className="w-6 h-6" />,
      description:
        "Maîtrise des outils numériques et techniques d'automatisation",
      type: "informatique",
    },
    {
      title: "Data & Analytics",
      icon: <BarChart className="w-6 h-6" />,
      description:
        "Analyse et interprétation des données pour la prise de décision",
      type: "data",
    },
    {
      title: "Entrepreneuriat",
      icon: <Rocket className="w-6 h-6" />,
      description:
        "Développement de projets entrepreneuriaux et gestion d'entreprise",
      type: "entrepreneurship",
    },
    {
      title: "Soft skills & Leadership",
      icon: <Users className="w-6 h-6" />,
      description:
        "Développement des compétences relationnelles et managériales",
      type: "soft-skills",
    },
  ];

  const targetAudiences = [
    {
      title: "Étudiants & Jeunes diplômés",
      icon: <GraduationCap className="w-6 h-6" />,
      description:
        "Acquérez des compétences pratiques pour votre insertion professionnelle",
    },
    {
      title: "Professionnels",
      icon: <Briefcase className="w-6 h-6" />,
      description:
        "Développez vos compétences pour évoluer dans votre carrière",
    },
    {
      title: "Entrepreneurs",
      icon: <UserPlus className="w-6 h-6" />,
      description:
        "Bénéficiez d'un accompagnement sur mesure pour votre projet",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Carrousel de 3 cartes */}
      <div style={{ 
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '10px 20px',
        paddingTop: '30px'
      }}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div style={{ 
            display: 'flex',
            gap: '0'
          }}>
            {carouselItems.map((item) => (
              <CarouselCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Boutons de navigation - cachés */}
        <motion.button
          className="hidden"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </motion.button>
        
        <motion.button
          className="hidden"
          onClick={scrollNext}
        >
          <ChevronRight />
        </motion.button>
      </div>

      {/* Piliers de formation */}
      <section className="relative py-1">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Nos Piliers de Formation
            </h2>
            <p className="text-muted-foreground text-sm mb-3">
              Une approche structurée pour un apprentissage durable
            </p>
            <div className="w-16 h-0.5 rounded-full bg-burgundy-600 mx-auto" />
          </motion.div>

          <InteractiveCards />
        </div>
      </section>

      {/* Vidéo d'introduction */}
      <section className="py-2">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            className="text-2xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Découvrez notre formation en vidéo
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-center text-sm max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Plongez dans l'univers de notre formation à travers cette vidéo de
            présentation.
          </motion.p>
          <motion.div 
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Ordinateur portable avec vidéo intégrée */}
            <div className="relative scale-70">
              {/* Écran de l'ordinateur */}
              <div className="relative bg-gray-900 rounded-t-2xl p-1">
                {/* Barre supérieure de l'écran */}
                <div className="flex items-center justify-between mb-1 px-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">DM+ Academy</div>
                  <div className="w-10"></div>
                </div>
                
                {/* Conteneur de la vidéo */}
                <div className="aspect-video bg-black rounded overflow-hidden">
                  <video
                    className="w-full h-full"
                    controls
                    poster="/placeholder.svg"
                    title="Présentation de la formation DM+ Academy"
                  >
                    <source src="/videos/your-video.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </div>
              
              {/* Clavier du laptop */}
              <div className="relative bg-gray-800 h-10 rounded-b-2xl">
                {/* Trackpad */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formats pédagogiques */}
      <MasterclassSection />

      {/* Publics cibles - Design épuré rouge bordeaux avec meilleure visibilité */}
      <section className="py-8 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div className="text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Pour qui ?
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Nos formations s'adressent à différents profils
            </p>
          </motion.div>
          
          {/* Modèle horizontal avec onglets interactifs - Version améliorée */}
          <div className="max-w-4xl mx-auto">
            {/* Onglets avec meilleure visibilité */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {targetAudiences.map((audience, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAudience(index)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedAudience === index
                      ? 'bg-burgundy-600 text-white border-2 border-burgundy-600' 
                      : 'bg-burgundy-50 text-burgundy-700 border-2 border-burgundy-300 hover:bg-burgundy-100 hover:border-burgundy-400'
                    }
                  `}
                >
                  {audience.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Contenu sélectionné */}
            <motion.div
              key={selectedAudience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-burgundy-50 p-6 rounded-xl border-2 border-burgundy-200"
            >
              {/* Contenu textuel */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {targetAudiences[selectedAudience].title}
                </h3>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">
                  {targetAudiences[selectedAudience].description}
                </p>
                
                {/* Points forts */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-burgundy-700 border border-burgundy-300">
                    Formation personnalisée
                  </span>
                  <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-burgundy-700 border border-burgundy-300">
                    Accompagnement continu
                  </span>
                  <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-burgundy-700 border border-burgundy-300">
                    Certification reconnue
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-5">
                <button className="inline-flex items-center px-6 py-2.5 bg-burgundy-600 hover:bg-burgundy-700 text-white font-medium rounded-full text-sm transition-all duration-300 border border-burgundy-600 hover:border-burgundy-700">
                  Commencer ma formation
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Indicateurs de progression */}
            <div className="flex justify-center gap-2 mt-4">
              {targetAudiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAudience(index)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${selectedAudience === index
                      ? 'w-6 bg-burgundy-600' 
                      : 'w-2 bg-burgundy-300 hover:bg-burgundy-400'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AcademySection;