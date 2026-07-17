import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import { cn } from "@/lib/utils";
import AcademySection from "@/components/academy/AcademySection";
import { HeroSection } from "@/components/academy/HeroSection";
import NotreMissionSection from "@/components/academy/NotreMissionSection";
import PersonalPlanSlider from "@/components/academy/PersonalPlanSlider";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const AcademyPage = () => {
  const navigate = useNavigate();
  
  // Récupérer les données de l'academy
  const academy = subsidiaries.find((s) => s.id === "academy");

  const Icon = academy.icon;

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

  // Réalisations et programmes phares
  const achievements = [
    {
      title: "Parcours Data Analyst",
      client: "Programme certifiant",
      description:
        "Formation intensive de 3 mois pour maîtriser l'analyse de données.",
      image: "/assets/trust-in-government.webp",
    },
    {
      title: "Masterclass Leadership",
      client: "Session intensive",
      description:
        "Développez votre leadership et votre gestion d'équipe sur 2 jours.",
      image: "/assets/vr-headset.webp",
    },
    {
      title: "Académie Entrepreneuriat",
      client: "Programme d'accompagnement",
      description:
        "6 mois pour lancer et développer votre entreprise avec succès.",
      image: "/assets/dmplus-tech.webp",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <NotreMissionSection />

      {/* Section vidéo de présentation */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-4"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Découvrir nos formations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8"
          >
            Plongez dans l'univers de notre formation à travers cette vidéo de présentation qui vous donnera un aperçu de notre approche pédagogique et de nos valeurs.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative scale-75">
              <div className="relative bg-gray-900 rounded-t-2xl p-1.5 shadow-2xl">
                <div className="flex items-center justify-between mb-1.5 px-1.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">DM+ Academy</div>
                  <div className="w-10"></div>
                </div>
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner">
                  <video className="w-full h-full" controls loop poster="/placeholder.svg" title="Présentation de la formation DM+ Academy">
                    <source src="https://tre9zd4etmxyc.pika.art/results/pika2p5_final/b299609631894ab2acdf9467a2d9b636.mp4?download" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </div>
              <div className="relative bg-gray-800 h-12 rounded-b-2xl shadow-2xl">
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-700 rounded-lg shadow-inner"></div>
                <div className="absolute bottom-1 left-2 flex gap-0.5">
                  <div className="w-0.5 h-0.5 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              <div className="relative h-2 bg-gray-900 rounded-b-3xl shadow-2xl transform scale-105"></div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Personal Plan Slider */}
      <PersonalPlanSlider />
      
      {/* Section spécifique pour DM+ Academy */}
      <AcademySection />

      {/* Notre Équipe Pédagogique */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={cn('py-12', 'bg-background')}
      >
        <div className={cn('container', 'mx-auto', 'px-4', 'lg:px-8')}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn('text-center', 'max-w-5xl', 'mx-auto', 'mb-10')}
          >
            <h2 className={cn('font-montserrat', 'font-bold', 'text-2xl', 'md:text-3xl', 'text-foreground', 'mb-3')}>
              Nos experts en formation
            </h2>
            <p className={cn('text-sm', 'md:text-base', 'text-muted-foreground')}>
              Des formateurs experts dans leur domaine, à l'écoute de vos besoins
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <ScrollReelTestimonials testimonials={teamTestimonials} />
            
            {/* Bouton Voir plus */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigateToTrainers}
              className={cn(
                'inline-flex', 'items-center', 'gap-2', 'px-8', 'py-4', 'rounded-xl',
                'bg-academy',
                'text-white', 'font-semibold', 'hover:bg-academy/90',
                'transition-all', 'duration-300', 'shadow-lg'
              )}
            >
              Voir plus de formateurs
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight className={cn('w-5', 'h-5')} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

     

      </>
  );
};

export default AcademyPage;
