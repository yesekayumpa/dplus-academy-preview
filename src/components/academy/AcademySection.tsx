import { motion } from "framer-motion";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MasterclassSection from "./MasterclassSection";
import InteractiveCards from "./InteractiveCards";

const AcademySection = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    containScroll: false,
    dragFree: false
  });

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

  // Données des 4 cartes du carrousel
  const carouselItems = [
    {
      id: 1,
      title: "Masterclass",
      description: "Sessions intensives de 2h à 2 jours <br />sur des thématiques précises <br />avec des experts du domaine",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
      link: "/masterclasses"
    },
    {
      id: 2,
      title: "E-learning",
      description: "Formations en ligne accessibles <br />à tout moment <br />pour apprendre à votre rythme",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&crop=center",
      link: "/e-learning"
    },
    {
      id: 3,
      title: "Corporate Programs",
      description: "Programmes de formation conçus <br />spécifiquement pour les entreprises, <br />adaptés à leurs objectifs et secteur",
      image: "/assets/E-learning2.jpg",
      link: "/corporate-programs"
    },
    {
      id: 4,
      title: "Mentored Courses",
      description: "Formations sur mesure conçues <br />pour répondre aux objectifs stratégiques <br />et aux défis spécifiques de votre organisation",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center",
      link: "/sur-mesure"
    }
  ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const CarouselCard = ({ item, isDesktop = false }: { item: any; isDesktop?: boolean }) => {
    return (
      <div className={isDesktop ? "px-2" : "flex-[0_0_100%] md:flex-[0_0_33.333%] px-2 min-w-0"}>
        <section
          style={{
            padding: isDesktop ? "4px 4px 12px 4px" : "12px 4px",
            backgroundColor: "#fff",
            color: "#1a1a1a",
            fontFamily: "Inter, sans-serif",
            minHeight: isDesktop ? "28vh" : "30vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            boxShadow: isDesktop ? "0 8px 32px rgba(0,0,0,0.12)" : "none",
            border: isDesktop ? "none" : "1px solid #e5e7eb",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {isDesktop ? (
            // Version Desktop: image en haut, texte au milieu, bouton en bas (taille réduite)
            <div
              style={{
                maxWidth: "320px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                alignSelf: "flex-start"
              }}
            >
              {/* Image en haut */}
              <div style={{ width: "100%", marginTop: "0" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    width: "100%", 
                    height: "160px", 
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>
              
              {/* Contenu au milieu */}
              <div style={{ width: "100%", textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    lineHeight: "1.2",
                    color: "#1a1a1a",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: isDesktop ? "0.8rem" : "0.8rem",
                    fontWeight: "400",
                    marginBottom: isDesktop ? "16px" : "15px",
                    lineHeight: "1.4",
                    color: "#1a1a1a",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                
                {/* Bouton en bas */}
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      background: "linear-gradient(135deg, hsl(346, 100%, 25%) 0%, hsl(346, 100%, 35%) 100%)",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 24px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      borderRadius: "8px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate(item.link)}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Version Mobile: image à gauche, texte à droite avec bouton aligné en bas
            <div
              style={{
                maxWidth: "500px",
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              {/* Image à gauche */}
              <div style={{ flex: 1, minWidth: "180px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    maxWidth: "100%", 
                    height: "180px", 
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>
              
              {/* Contenu à droite */}
              <div style={{ flex: 1, minWidth: "150px", textAlign: "left" }}>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    lineHeight: "1.2",
                    color: "#1a1a1a",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    marginBottom: "15px",
                    lineHeight: "1.3",
                    color: "#1a1a1a",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                
                {/* Bouton aligné à gauche */}
                <div style={{ textAlign: "left" }}>
                  <button
                    style={{
                      background: "linear-gradient(135deg, hsl(346, 100%, 25%) 0%, hsl(346, 100%, 35%) 100%)",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 24px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      borderRadius: "8px",
                      fontWeight: "600",
                      letterSpacing: "0.5px"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate(item.link)}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
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
        "",
      type: "entrepreneurship",
    },
    {
      title: "Soft skills & Leadership",
      icon: <Users className="w-6 h-6" />,
      description:
        "",
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
      {/* Piliers de formation – Version Premium */}
      <section className="relative py-12 bg-white">
        {/* Fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Nos Piliers de Formation
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Une approche structurée pour un apprentissage durable et impactant
            </p>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-academy to-academy-light mx-auto" />
          </div>

          <InteractiveCards />
        </div>
      </section>

      {/* Header pour le carousel */}
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Nos formats pédagogiques
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          Des approches variées pour répondre à vos besoins spécifiques
        </p>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-academy to-academy-light mx-auto" />
      </div>

     {/* Carrousel de 4 cartes - 4 visibles sur web, 1 sur mobile avec auto-scroll */}
      <div style={{ 
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 20px'
      }}>
        {/* Desktop: 4 cartes sur une ligne */}
        <div className="hidden md:block">
          <div className="flex gap-0 justify-center">
            {carouselItems.map((item) => (
              <div key={item.id} className="flex-1 max-w-xs">
                <CarouselCard item={item} isDesktop={true} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: carrousel avec auto-scroll */}
        <div className="block md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div style={{ 
              display: 'flex',
              gap: '0'
            }}>
              {carouselItems.map((item) => (
                <CarouselCard key={item.id} item={item} isDesktop={false} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vidéo d'introduction */}
      <section className="py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Découvrez notre formation en vidéo
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Plongez dans l'univers de notre formation à travers cette vidéo de
            présentation qui vous donnera un aperçu de notre approche
            pédagogique et de nos valeurs.
          </p>
          <div className="relative max-w-3xl mx-auto">
            {/* Ordinateur portable avec vidéo intégrée */}
            <div className="relative scale-75">
              {/* Écran de l'ordinateur */}
              <div className="relative bg-gray-900 rounded-t-2xl p-1.5 shadow-2xl">
                {/* Barre supérieure de l'écran */}
                <div className="flex items-center justify-between mb-1.5 px-1.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">DM+ Academy</div>
                  <div className="w-10"></div>
                </div>
                
                {/* Conteneur de la vidéo */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner">
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
              <div className="relative bg-gray-800 h-12 rounded-b-2xl shadow-2xl">
                {/* Trackpad */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-700 rounded-lg shadow-inner"></div>
                
                {/* Indicateurs lumineux */}
                <div className="absolute bottom-1 left-2 flex gap-0.5">
                  <div className="w-0.5 h-0.5 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Base du laptop */}
              <div className="relative h-2 bg-gray-900 rounded-b-3xl shadow-2xl transform scale-105"></div>
            </div>
            
            {/* Effet de reflet sur l'écran */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats pédagogiques */}
      
      <MasterclassSection />

      {/* Publics cibles */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
            Nos publics cibles
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-academy to-academy-light mx-auto mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card p-3 md:p-4 rounded-lg border border-border text-center hover:transition-all min-h-[140px] md:min-h-[160px]"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 mx-auto rounded-full bg-gradient-to-r from-academy to-academy-light flex items-center justify-center text-white mb-1 md:mb-2">
                  <div className="flex items-center justify-center w-4 h-4 md:w-6 md:h-6">
                    {audience.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-xs md:text-sm mb-1 leading-tight">{audience.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-tight">{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademySection;