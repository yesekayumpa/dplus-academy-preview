import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import { cn } from "@/lib/utils";
import AcademySection from "@/components/academy/AcademySection";
import { HeroSection } from "@/components/academy/HeroSection";
import NotreMissionSection from "@/components/academy/NotreMissionSection";
import MasterclassSection from "@/components/academy/MasterclassSection";

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

  // Équipe DM+ Academy
  const teamMembers = [
    {
      name: "Sarah Diallo",
      role: "Directrice Pédagogique",
      bio: "",
      image: null,
    },
    {
      name: "Amadou Bâ",
      role: "Responsable des Partenariats",
      bio: "",
      image: null,
    },
    {
      name: "Aïssatou Diop",
      role: "Formatrice Senior",
      bio: "",
      image: null,
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
      {/* Section spécifique pour DM+ Academy */}
      <AcademySection />

      {/* Notre Équipe Pédagogique - Ancienne version */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="font-montserrat font-bold text-xl md:text-2xl text-foreground mb-3">
              Nos experts en formation
            </h2>
            <p className="text-sm text-muted-foreground">
              Des formateurs experts dans leur domaine, à l'écoute de vos besoins
            </p>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-card p-3 rounded-xl border border-border text-center hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-r from-academy to-academy-light flex items-center justify-center text-white mb-2">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-xs mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-xs mb-1">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Bouton Voir plus */}
          <div className="text-center mt-8 mb-8">
            <button
              onClick={handleNavigateToTrainers}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-academy to-academy-light text-white font-semibold hover:from-academy/90 hover:to-academy-light/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Voir plus de formateurs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

     

      {/* Careers CTA */}
      <section className="py-6 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/study-group-african-people_23-2149156428.jpg')",
          }}
        />

        {/* Red Bordeaux Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/80 via-[#800020]/60 to-[#800020]/40" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Briefcase className="w-16 h-16 text-white/60 mx-auto mb-6" />
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-6">
              Rejoignez notre équipe
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Nous recherchons des talents passionnés pour renforcer nos
              équipes.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-foreground font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Voir les offres
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AcademyPage;
