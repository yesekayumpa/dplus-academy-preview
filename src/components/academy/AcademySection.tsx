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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fonction pour naviguer avec scroll vers le haut
  const handleNavigateWithScroll = (link: string) => {
    window.scrollTo(0, 0);
    navigate(link);
  };

  // Auto-play pour mobile uniquement
  useEffect(() => {
    if (!emblaApi) return;

    // Détecter si on est sur mobile
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    if (!mobile) return; // Pas d'auto-play sur desktop

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

  // Track selected slide for dots
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // Set initial selected index

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Données pour le slider Personal Plan Banner
  const personalPlanSlides = [
    {
      id: 1,
      title: "Réinventez votre carrière à l'ère de l'IA",
      description: "Pérennisez vos compétences avec l'Abonnement individuel. Accédez à une variété de nouveaux contenus créés par des formateurs confirmés.",
      features: [
        {
          icon: "sparkles",
          color: "purple",
          text: "<strong>Apprenez</strong> à maîtriser l'IA et bien plus"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 2,
      title: "Maîtrisez les compétences essentielles",
      description: "Développez votre expertise avec des formations pratiques et interactives adaptées au marché actuel.",
      features: [
        {
          icon: "trophy",
          color: "green",
          text: "<strong>Préparez</strong> une certification"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 3,
      title: "Coaching personnalisé avec l'IA",
      description: "Bénéficiez d'un accompagnement sur mesure grâce à notre technologie de coaching par intelligence artificielle.",
      features: [
        {
          icon: "question-answer-outline",
          color: "orange",
          text: "<strong>Entraînez-vous</strong> grâce au coaching IA"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 4,
      title: "Évoluez professionnellement",
      description: "Accélérez votre carrière avec des formations reconnues et un réseau de professionnels engagés.",
      features: [
        {
          icon: "lightbulb",
          color: "teal",
          text: "<strong>Évoluez</strong> dans votre carrière"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 5,
      title: "Commencez votre transformation aujourd'hui",
      description: "Rejoignez des milliers de professionnels qui ont déjà transformé leur carrière avec nos formations.",
      features: [
        {
          icon: "rocket",
          color: "blue",
          text: "<strong>Lancez-vous</strong> dans l'aventure"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    }
  ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // Fonctions pour le slider Personal Plan
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % personalPlanSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + personalPlanSlides.length) % personalPlanSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play pour le slider Personal Plan
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change de slide toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

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
                    onClick={() => handleNavigateWithScroll(item.link)}
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
                    onClick={() => handleNavigateWithScroll(item.link)}
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
       {/* Piliers de formation – Version Premium */}
      <section className="relative py-24">
        {/* Fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Piliers de Formation
            </h2>
            <p className="text-muted-foreground mb-6">
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
          {/* Scroll dots indicator for mobile */}
          <div className="flex justify-center gap-2 mt-4">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index 
                    ? 'bg-[#800020] w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Aller à la carte ${index + 1}`}
              />
            ))}
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

      {/* Personal Plan Banner Slider */}
      <section className="relative py-20 bg-gradient-to-r from-red-50 to-rose-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header du slider */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transformez votre carrière
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos solutions adaptées à vos objectifs professionnels
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Slides */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {personalPlanSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 p-8 md:p-12">
                      {/* Content Section */}
                      <div className="flex-1 space-y-8 text-center lg:text-left">
                        <div className="space-y-6">
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {slide.title}
                          </h3>
                          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {slide.description}
                          </p>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                          {slide.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center`}>
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {feature.icon === 'sparkles' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                  )}
                                  {feature.icon === 'trophy' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  )}
                                  {feature.icon === 'question-answer-outline' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  )}
                                  {feature.icon === 'lightbulb' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  )}
                                  {feature.icon === 'rocket' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  )}
                                </svg>
                              </div>
                              <span className="text-base md:text-lg text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: feature.text }} />
                            </div>
                          ))}
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
                          <button
                            onClick={() => handleNavigateWithScroll('/personal-plan/')}
                            className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl font-semibold text-base hover:from-red-700 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            En savoir plus
                          </button>
                          <div className="text-center sm:text-left">
                            <div className="text-lg font-semibold text-gray-900">À partir de $10.00/mois</div>
                            <div className="text-sm text-gray-500">Annulez à tout moment</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Section */}
                      <div className="flex-1 lg:max-w-lg">
                        <div className="relative">
                          <img
                            src={slide.image}
                            srcSet={`${slide.image} 1x, ${slide.image.replace('@1x', '@2x')} 2x`}
                            alt="Interface de jeu de rôle illustrant un exercice de conversation avec l'IA"
                            className="w-full h-auto rounded-2xl shadow-2xl"
                            loading="eager"
                          />
                          {/* Overlay subtil sur l'image */}
                          <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent rounded-2xl pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 z-20 border border-red-200 hover:border-red-300"
              aria-label="Slide précédent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 z-20 border border-red-200 hover:border-red-300"
              aria-label="Slide suivant"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {personalPlanSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 w-10' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
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