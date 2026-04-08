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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalPlanSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fonction pour naviguer avec scroll vers le haut
  const handleNavigateWithScroll = (link: string) => {
    window.scrollTo(0, 0);
    navigate(link);
  };

  // Données pour le slider Personal Plan Banner - Piliers de Formation
  const personalPlanSlides = [
    {
      id: 1,
      title: "Finance & Investissement",
      description: "Maîtrisez les concepts financiers et les stratégies d'investissement pour prendre des décisions éclairées et optimiser votre portefeuille.",
      features: [
        {
          icon: "chart-line",
          color: "red",
          text: "Analyse financière"
        },
        {
          icon: "chart-line",
          color: "red",
          text: "Gestion de portefeuille"
        },
        {
          icon: "chart-line",
          color: "red",
          text: "Évaluation d'investissements"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 2,
      title: "Outils digitaux & Automatisation",
      description: "Maîtrisez les outils numériques et techniques d'automatisation pour optimiser vos processus et gagner en productivité.",
      features: [
        {
          icon: "globe",
          color: "red",
          text: "Productivité numérique"
        },
        {
          icon: "globe",
          color: "red",
          text: "Automatisation des tâches"
        },
        {
          icon: "globe",
          color: "red",
          text: "Outils collaboratifs"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 3,
      title: "Data & Analytics",
      description: "Apprenez à analyser et interpréter les données pour la prise de décision stratégique et piloter la performance de votre organisation.",
      features: [
        {
          icon: "bar-chart",
          color: "red",
          text: "Statistiques descriptives"
        },
        {
          icon: "bar-chart",
          color: "red",
          text: "Visualisation de données"
        },
        {
          icon: "bar-chart",
          color: "red",
          text: "Business Intelligence"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 4,
      title: "Entrepreneuriat",
      description: "Développez vos compétences entrepreneuriales pour lancer et gérer votre projet avec succès dans un environnement concurrentiel.",
      features: [
        {
          icon: "rocket",
          color: "red",
          text: "Business plan"
        },
        {
          icon: "rocket",
          color: "red",
          text: "Levée de fonds"
        },
        {
          icon: "rocket",
          color: "red",
          text: "Marketing stratégique"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    },
    {
      id: 5,
      title: "Soft skills & Leadership",
      description: "Développez vos compétences relationnelles et managériales pour devenir un leader inspirant et efficace dans votre organisation.",
      features: [
        {
          icon: "users",
          color: "red",
          text: "Communication efficace"
        },
        {
          icon: "users",
          color: "red",
          text: "Leadership transformationnel"
        },
        {
          icon: "users",
          color: "red",
          text: "Intelligence émotionnelle"
        }
      ],
      image: "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp"
    }
  ];

  // Fonctions pour le slider Personal Plan - navigation fluide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % personalPlanSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + personalPlanSlides.length) % personalPlanSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play pour le slider Personal Plan - animation continue
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % personalPlanSlides.length);
    }, 4000); // Change de slide toutes les 4 secondes

    return () => clearInterval(interval);
  }, []);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation tactile/swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <>
      {/* Personal Plan Banner Slider */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header du slider */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Transformez votre carrière
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Découvrez nos solutions adaptées à vos objectifs professionnels
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Slides */}
            <div 
              className="overflow-hidden rounded-xl border border-gray-200 cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {personalPlanSlides.map((slide, index) => (
                  <div 
                    key={slide.id} 
                    className="w-full flex-shrink-0 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ 
                      opacity: index === currentSlide ? 1 : 0.7,
                      transform: index === currentSlide ? 'scale(1)' : 'scale(0.98)'
                    }}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 md:p-8">
                      {/* Content Section */}
                      <div className="flex-1 space-y-6 text-center lg:text-left">
                        <div className="space-y-4">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {slide.title}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {slide.description}
                          </p>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-1 max-w-md mx-auto lg:mx-0">
                          {slide.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {feature.icon === 'chart-line' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
                                  )}
                                  {feature.icon === 'globe' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                  )}
                                  {feature.icon === 'bar-chart' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  )}
                                  {feature.icon === 'rocket' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  )}
                                  {feature.icon === 'users' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                  )}
                                </svg>
                              </div>
                              <span className="text-xs text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
                          <button
                            onClick={() => handleNavigateWithScroll('/personal-plan/')}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors duration-300"
                          >
                            Explorer ce domaine
                          </button>
                        </div>
                      </div>
                      
                      {/* Image Section */}
                      <div className="flex-1 lg:max-w-md">
                        <div className="relative">
                          <img
                            src={slide.image}
                            srcSet={`${slide.image} 1x, ${slide.image.replace('@1x', '@2x')} 2x`}
                            alt="Interface de jeu de rôle illustrant un exercice de conversation avec l'IA"
                            className="w-full h-auto rounded-lg border border-gray-200"
                            loading="eager"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {personalPlanSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  currentSlide === index 
                    ? 'bg-gray-900 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2 hover:scale-110'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalPlanSlider;
