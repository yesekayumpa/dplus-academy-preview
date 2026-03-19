import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart, Globe, Rocket, Users } from "lucide-react";
import outils from "@/assets/woman-sitting-library-with-her-laptop.jpg";
import softSkills from "@/assets/soft-skills.jpeg";
import statistiques from "@/assets/statistiques.jpg";
import finance from "@/assets/finance.webp";

interface CardData {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  type: string;
  topics: number;
  details: string[];
  backgroundImage: string;
}

const cardsData: CardData[] = [
  {
    id: 1,
    title: "Finance & Investissement",
    icon: <BarChart className="w-6 h-6" />,
    description: "Maîtrise des concepts financiers et des stratégies d'investissement",
    type: "finance",
    topics: 12,
    backgroundImage: finance,
    details: [
      "Analyse financière",
      "Gestion de portefeuille",
      "Évaluation d'investissements",
      "Marchés financiers",
      "Risk management"
    ]
  },
  {
    id: 2,
    title: "Outils digitaux & Automatisation",
    icon: <Globe className="w-6 h-6" />,
    description: "Maîtrise des outils numériques et techniques d'automatisation",
    type: "informatique",
    topics: 15,
    backgroundImage: outils,
    details: [
      "Productivité numérique",
      "Automatisation des tâches",
      "Outils collaboratifs",
      "Gestion de projet",
      "Cloud computing"
    ]
  },
  {
    id: 3,
    title: "Data & Analytics",
    icon: <BarChart className="w-6 h-6" />,
    description: "Analyse et interprétation des données pour la prise de décision",
    type: "data",
    topics: 18,
    backgroundImage: statistiques,
    details: [
      "Statistiques descriptives",
      "Visualisation de données",
      "Business Intelligence",
      "Machine Learning basics",
      "Data storytelling"
    ]
  },
  {
    id: 4,
    title: "Entrepreneuriat",
    icon: <Rocket className="w-6 h-6" />,
    description: "Développement de projets entrepreneuriaux et gestion d'entreprise",
    type: "entrepreneurship",
    topics: 10,
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    details: [
      "Business plan",
      "Levée de fonds",
      "Marketing stratégique",
      "Gestion d'équipe",
      "Scaling stratégique"
    ]
  },
  {
    id: 5,
    title: "Soft skills & Leadership",
    icon: <Users className="w-6 h-6" />,
    description: "Développement des compétences relationnelles et managériales",
    type: "soft-skills",
    topics: 20,
    backgroundImage: softSkills,
    details: [
      "Communication efficace",
      "Leadership transformationnel",
      "Intelligence émotionnelle",
      "Gestion de conflits",
      "Coaching d'équipe"
    ]
  }
];

const InteractiveCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fonction pour naviguer vers la page appropriée selon le type de carte
  const handleNavigate = (type: string) => {
    switch (type) {
      case "finance":
        navigate("/finance-investment");
        break;
      case "informatique":
        navigate("/outils-digitaux-automatisation");
        break;
      case "data":
        navigate("/data-analytics");
        break;
      case "entrepreneurship":
        navigate("/entrepreneuriat");
        break;
      case "soft-skills":
        navigate("/soft-skills-leadership");
        break;
      default:
        // Par défaut, rester sur la page actuelle
        break;
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll position for mobile animation
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && isMobile) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const containerWidth = scrollRef.current.clientWidth;
        
        // Calculate which card should be active based on scroll position
        const cardWidth = 240; // 200px card + 40px gap
        const expandedCardWidth = 280; // Width when card is expanded
        
        // Find the card that should be active based on screen center
        const screenCenter = scrollLeft + containerWidth / 2;
        const currentIndex = Math.floor(screenCenter / cardWidth);
        const currentCardId = Math.min(Math.max(currentIndex + 1, 1), 5);
        
        // Just set the active card without auto-scrolling
        setHoveredCard(currentCardId);
        setScrollPosition(scrollLeft);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement && isMobile) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      // Set initial state and center first card in middle
      setHoveredCard(1);
      // Center first card in the middle of the screen
      setTimeout(() => {
        if (scrollRef.current) {
          const containerWidth = scrollRef.current.clientWidth;
          const expandedCardWidth = 280;
          const initialScroll = -(containerWidth - expandedCardWidth) / 2;
          scrollRef.current.scrollTo({
            left: initialScroll,
            behavior: 'smooth'
          });
        }
      }, 100);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Horizontal scroll with scroll-triggered animation */}
        {isMobile ? (
          <div>
            <div 
              ref={scrollRef}
              className="overflow-x-auto"
            >
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {cardsData.map((card, index) => {
                  const isHovered = hoveredCard === card.id;
                  const shouldShowHoveredState = isHovered;
                  
                  return (
                    <motion.div
                      key={card.id}
                      className="relative cursor-pointer"
                      initial={{ width: "200px", height: "300px" }}
                      animate={{
                        width: shouldShowHoveredState ? "280px" : "200px",
                        height: "300px",
                        borderRadius: shouldShowHoveredState ? "18px" : "16px",
                        scale: 1
                      }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut"
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 overflow-hidden rounded-[inherit]"
                        layout
                      >
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${card.backgroundImage})` }}
                        />
                        
                        {/* Color overlay */}
                        <div 
                          className={cn(
                            "absolute inset-0 bg-gradient-to-t transition-all duration-400",
                            shouldShowHoveredState 
                              ? "from-[#800020]/80 via-[#800020]/60 to-[#800020]/40" 
                              : "from-black/60 via-black/40 to-black/20"
                          )} 
                        />
                        
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                              backgroundSize: '60px 60px'
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-4 text-white"
                          layout
                        >
                          {/* Icon */}
                          <motion.div
                            className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3"
                            animate={{
                              scale: shouldShowHoveredState ? 1.1 : 1
                            }}
                            transition={{ duration: 0.1 }}
                          >
                            <div className="w-4 h-4">
                              {card.icon}
                            </div>
                          </motion.div>
                          
                          {/* Title */}
                          <motion.h3
                            className="font-bold text-lg mb-2"
                            animate={{
                              fontSize: shouldShowHoveredState ? "1.25rem" : "1rem",
                              marginBottom: shouldShowHoveredState ? "0.5rem" : "0.25rem"
                            }}
                            transition={{ duration: 0.1 }}
                          >
                            {card.title}
                          </motion.h3>
                          
                          {/* Description */}
                          <motion.p
                            className="text-white text-sm leading-relaxed"
                            animate={{
                              fontSize: shouldShowHoveredState ? "0.875rem" : "0.75rem",
                              opacity: shouldShowHoveredState ? 0.9 : 0.7,
                              display: shouldShowHoveredState ? "block" : "-webkit-box"
                            }}
                            transition={{ duration: 0.1 }}
                            style={{
                              WebkitLineClamp: shouldShowHoveredState ? "none" : 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {card.description}
                          </motion.p>
                          
                          {/* Topics count - only show when not hovered */}
                          {!shouldShowHoveredState && (
                            <div className="mt-2">
                              <span className="text-white/90 text-xs">
                                {card.topics} modules
                              </span>
                            </div>
                          )}
                          
                          {/* Expanded content - only show when hovered */}
                          {shouldShowHoveredState && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.08 }}
                            >
                              <div className="mt-4 space-y-2">
                                {card.details.slice(0, 3).map((detail, index) => (
                                  <div
                                    key={detail}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                    <span className="text-white/80 text-xs">
                                      {detail}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              <motion.button
                                className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigate(card.type)}
                              >
                                Explorer ce domaine
                              </motion.button>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              {/* Extra space to ensure last card is fully accessible */}
              <div className="w-16 flex-shrink-0" />
            </div>
            
            {/* Scroll dots indicator for mobile */}
            <div className="flex justify-center gap-2 mt-4">
              {cardsData.map((_, index) => {
                const isActive = hoveredCard === (index + 1);
                
                return (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#800020] w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                      if (scrollRef.current) {
                        const containerWidth = scrollRef.current.clientWidth;
                        const cardWidth = 240;
                        const expandedCardWidth = 280;
                        const maxScroll = scrollRef.current.scrollWidth - containerWidth;
                        
                        // ALWAYS center the selected card in the middle of the screen
                        const targetScroll = (index * cardWidth) - (containerWidth - expandedCardWidth) / 2;
                        
                        // Ensure we don't scroll beyond bounds
                        const boundedTargetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
                        
                        scrollRef.current.scrollTo({
                          left: boundedTargetScroll,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    aria-label={`Aller à la carte ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          // Desktop: Horizontal layout with all 5 cards visible
          <motion.div
            className="flex gap-4 items-center justify-center relative z-0"
            layout
          >
            <AnimatePresence>
            {cardsData.map((card) => {
              const isHovered = hoveredCard === card.id;
              const isAnyHovered = hoveredCard !== null;
              const isFirstCardDefaultHovered = card.id === 1 && hoveredCard === null;
              const shouldShowHoveredState = isHovered || isFirstCardDefaultHovered;
              
              return (
                <motion.div
                  key={card.id}
                  className="relative cursor-pointer"
                  layout
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  initial={{ width: "200px", height: "400px" }}
                  animate={{
                    width: shouldShowHoveredState ? "400px" : "200px",
                    height: "400px",
                    borderRadius: shouldShowHoveredState ? "24px" : "16px",
                    scale: 1
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    zIndex: 1
                  }}
                >
                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-[inherit]"
                    layout
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${card.backgroundImage})` }}
                    />
                    
                    {/* Color overlay with reduced opacity */}
                    <div 
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t transition-all duration-400",
                        shouldShowHoveredState 
                          ? "from-[#800020]/80 via-[#800020]/60 to-[#800020]/40" 
                          : "from-black/60 via-black/40 to-black/20"
                      )} 
                    />
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                          backgroundSize: '60px 60px'
                        }}
                      />
                    </div>
                    
                    {/* Content */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-white"
                      layout
                    >
                      {/* Icon */}
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3"
                        animate={{
                          scale: shouldShowHoveredState ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.icon}
                      </motion.div>
                      
                      {/* Title */}
                      <motion.h3
                        className="font-bold text-lg mb-2"
                        animate={{
                          fontSize: shouldShowHoveredState ? "1.25rem" : "1rem",
                          marginBottom: shouldShowHoveredState ? "0.5rem" : "0.25rem"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.title}
                      </motion.h3>
                      
                      {/* Description */}
                      <motion.p
                        className="text-white text-sm leading-relaxed"
                        animate={{
                          fontSize: shouldShowHoveredState ? "0.875rem" : "0.75rem",
                          opacity: shouldShowHoveredState ? 0.9 : 0.7,
                          display: shouldShowHoveredState ? "block" : "-webkit-box"
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          WebkitLineClamp: shouldShowHoveredState ? "none" : 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {card.description}
                      </motion.p>
                      
                      {/* Topics count - only show when not hovered */}
                      {!shouldShowHoveredState && (
                        <div className="mt-2">
                          <span className="text-white/90 text-xs">
                            {card.topics} modules
                          </span>
                        </div>
                      )}
                      
                      {/* Expanded content - only show when hovered */}
                      {shouldShowHoveredState && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mt-4 space-y-2">
                            {card.details.slice(0, 3).map((detail, index) => (
                              <div
                                key={detail}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                <span className="text-white/80 text-xs">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <motion.button
                            className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigate(card.type)}
                          >
                            Explorer ce domaine
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCards;
