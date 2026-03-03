import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Briefcase, GraduationCap } from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import { cn } from "@/lib/utils";
import AcademySection from "@/components/academy/AcademySection";
import { HeroSection } from "@/components/academy/HeroSection";
import NotreMissionSection from "@/components/academy/NotreMissionSection";
import MasterclassSection from "@/components/academy/MasterclassSection";

const AcademyPage = () => {
  // Récupérer les données de l'academy
  const academy = subsidiaries.find(s => s.id === 'academy');
  
  const Icon = academy.icon;

  // Équipe DM+ Academy
  const teamMembers = [
    { 
      name: "Sarah Diallo", 
      role: "Directrice Pédagogique", 
      bio: "15 ans d'expérience dans la formation professionnelle et l'ingénierie pédagogique.",
      image: null 
    },
    { 
      name: "Amadou Bâ", 
      role: "Responsable des Partenariats", 
      bio: "Expert en développement des compétences et relations entreprises.",
      image: null 
    },
    { 
      name: "Aïssatou Diop", 
      role: "Formatrice Senior", 
      bio: "Spécialiste en développement des compétences numériques et soft skills.",
      image: null 
    },
  ];

  // Réalisations et programmes phares
  const achievements = [
    { 
      title: "Parcours Data Analyst", 
      client: "Programme certifiant", 
      description: "Formation intensive de 3 mois pour maîtriser l'analyse de données.",
      image: "/assets/trust-in-government.webp"
    },
    { 
      title: "Masterclass Leadership", 
      client: "Session intensive", 
      description: "Développez votre leadership et votre gestion d'équipe sur 2 jours.",
      image: "/assets/vr-headset.webp"
    },
    { 
      title: "Académie Entrepreneuriat", 
      client: "Programme d'accompagnement", 
      description: "6 mois pour lancer et développer votre entreprise avec succès.",
      image: "/assets/dmplus-tech.webp"
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <NotreMissionSection />
      {/* Section spécifique pour DM+ Academy */}
      <AcademySection />

      
      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className={cn("inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r text-white", academy.gradientClass)}>
              Notre Équipe Pédagogique
            </span>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
              Nos experts en formation
            </h2>
            <p className="text-xl text-muted-foreground">
              Des formateurs experts dans leur domaine, à l'écoute de vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group text-center bg-card p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                      <GraduationCap className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                {member.bio && (
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" 
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
              Nous recherchons des talents passionnés pour renforcer nos équipes.
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
