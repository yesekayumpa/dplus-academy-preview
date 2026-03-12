import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BarChart, Globe, Rocket, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll for mobile - DISABLED
  useEffect(() => {
    // Auto-scroll functionality removed
    return () => {};
  }, [isMobile, isPaused]);

  
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Vertical stack instead of horizontal scroll */}
        {isMobile ? (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {cardsData.map((card) => {
              const isHovered = hoveredCard === card.id;
              const shouldShowHoveredState = isHovered;
              
              return (
                <motion.div
                  key={card.id}
                  className="relative mx-auto"
                  layout
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  initial={{ 
                    width: "280px", 
                    height: "300px" 
                  }}
                  animate={{
                    width: shouldShowHoveredState ? "320px" : "280px",
                    height: "300px",
                    borderRadius: shouldShowHoveredState ? "24px" : "16px",
                    scale: 1
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    zIndex: 50
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
                      
                      {/* Color overlay - always use visible gradient on mobile */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-[#800020]/80 via-[#800020]/60 to-[#800020]/40 transition-all duration-400"
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
                        style={{ padding: "16px" }}
                      >
                        {/* Icon */}
                        <motion.div
                          className={cn(
                            "rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3",
                            isMobile ? "w-8 h-8" : "w-12 h-12"
                          )}
                          animate={{
                            scale: shouldShowHoveredState ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={cn(isMobile ? "w-4 h-4" : "w-6 h-6")}>
                            {card.icon}
                          </div>
                        </motion.div>
                        
                        {/* Title */}
                        <motion.h3
                          className="font-bold text-lg mb-2"
                          animate={{
                            fontSize: shouldShowHoveredState ? "1.125rem" : "1rem",
                            marginBottom: shouldShowHoveredState ? "0.5rem" : "0.25rem"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.title}
                        </motion.h3>
                        
                        {/* Description - always visible on mobile */}
                        <motion.p
                          className="text-white text-sm leading-relaxed"
                          animate={{
                            fontSize: "0.8rem",
                            opacity: 0.9,
                            display: "block"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.description}
                        </motion.p>
                        
                        {/* Always show expanded content on mobile */}
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
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
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explorer ce domaine
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          // Desktop: Original layout
          <motion.div 
            className="flex gap-4 items-center justify-center"
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
                    className="relative"
                    layout
                    onHoverStart={() => setHoveredCard(card.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                                        initial={{ 
                      width: "200px", 
                      height: "400px" 
                    }}
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
                      zIndex: 50
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
                      
                      {/* Color overlay - different behavior for desktop and mobile */}
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
                        style={{ padding: "16px" }}
                      >
                        {/* Icon */}
                        <motion.div
                          className={cn(
                            "rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3",
                            isMobile ? "w-8 h-8" : "w-12 h-12"
                          )}
                          animate={{
                            scale: shouldShowHoveredState ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={cn(isMobile ? "w-4 h-4" : "w-6 h-6")}>
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
                          transition={{ duration: 0.3 }}
                        >
                          {card.title}
                        </motion.h3>
                        
                        {/* Description - different behavior for desktop and mobile */}
                        <motion.p
                          className="text-white text-sm leading-relaxed"
                          animate={{
                            fontSize: shouldShowHoveredState ? "0.875rem" : "0.8rem",
                            opacity: shouldShowHoveredState ? 0.9 : 0.7,
                            display: shouldShowHoveredState ? "block" : "-webkit-box"
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            WebkitLineClamp: !shouldShowHoveredState ? 2 : "none",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {card.description}
                        </motion.p>
                        
                        {/* Content - different behavior for desktop and mobile */}
                        <>
                          {!shouldShowHoveredState && (
                            <div className="mt-2">
                              <span className="text-white/90 text-xs">
                                {card.topics} modules
                              </span>
                            </div>
                          )}
                          
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
                              >
                                Explorer ce domaine
                              </motion.button>
                            </motion.div>
                          )}
                        </>
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
