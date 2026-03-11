import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  // Récupérer les données de l'academy
  const academy = subsidiaries.find((s) => s.id === "academy");

  const Icon = academy.icon;

  // Équipe DM+ Academy
  const teamMembers = [
    {
      name: "Sarah Diallo",
      role: "Directrice Pédagogique",
      bio: "15 ans d'expérience dans la formation professionnelle et l'ingénierie pédagogique.",
      image: null,
    },
    {
      name: "Amadou Bâ",
      role: "Responsable des Partenariats",
      bio: "Expert en développement des compétences et relations entreprises.",
      image: null,
    },
    {
      name: "Aïssatou Diop",
      role: "Formatrice Senior",
      bio: "Spécialiste en développement des compétences numériques et soft skills.",
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

      {/* Notre Équipe Pédagogique - Style Grid Compact avec Badges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-burgundy-100 text-burgundy-700">
              Équipe Pédagogique
            </span>
            <h2 className="font-bold text-4xl text-gray-900 mb-4">
              Nos formateurs experts
            </h2>
            <p className="text-lg text-gray-600">
              Une équipe dédiée à votre réussite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Diallo",
                role: "Directrice Pédagogique",
                experience: "15 ans",
                description:
                  "Formation professionnelle et ingénierie pédagogique",
              },
              {
                name: "Amadou Bâ",
                role: "Responsable des Partenariats",
                experience: "12 ans",
                description:
                  "Développement des compétences et relations entreprises",
              },
              {
                name: "Aïssatou Diop",
                role: "Formatrice Senior",
                experience: "10 ans",
                description: "Compétences numériques et soft skills",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl border border-gray-200 hover:border-burgundy-400 transition-all duration-300 bg-white hover:shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-burgundy-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-burgundy-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-burgundy-600 font-medium">
                        {member.experience}
                      </div>
                      <div className="text-xs text-gray-500">d'expérience</div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {member.name}
                  </h3>

                  <p className="text-burgundy-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bouton Voir plus */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/nos-formateurs"
              className="inline-flex items-center px-8 py-3 bg-[#800020] hover:bg-[#600018] text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Voir plus
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-6 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
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
