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
import { TrainingCarousel, TrainingFormat } from "@/components/ui/VideoCarousel";
import { TrainingModal } from "@/components/ui/TrainingModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import MasterclassSection from "./MasterclassSection";
import InteractiveCards from "./InteractiveCards";

const AcademySection = () => {
  const [selectedTraining, setSelectedTraining] = useState<TrainingFormat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrainingClick = (training: TrainingFormat) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Petit délai avant de réinitialiser pour permettre l'animation de fermeture
    setTimeout(() => setSelectedTraining(null), 300);
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

  const formats = [
    {
      title: "Masterclass",
      icon: <GraduationCap className="w-6 h-6" />,
      description:
        "Sessions intensives de 2h à 2 jours sur des thématiques précises",
    },
    {
      title: "E-learning",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Formations en ligne accessibles à tout moment",
    },
    {
      title: "Parcours certifiants",
      icon: <Award className="w-6 h-6" />,
      description: "Programmes complets avec certification à la clé",
    },
    {
      title: "Sur mesure",
      icon: <Briefcase className="w-6 h-6" />,
      description:
        "Formations adaptées aux besoins spécifiques des entreprises",
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
    <div className="space-y-24">
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

      
<section className="bg-muted/30 py-16 rounded-2xl">
        <div className="container mx-auto px-4 max-w-8xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos formats pédagogiques
          </h2>
          <div className="max-w-6xl mx-auto">
            <TrainingCarousel
              items={[
                {
                  id: 1,
                  title: "Masterclass",
                  description:
                    "Sessions intensives de 2h à 2 jours sur des thématiques précises avec des experts du domaine.",
                  imageUrl:
                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  buttonText: "Découvrir les masterclasses",
                  duration: "2h - 2 jours",
                  level: "Tous niveaux",
                  price: "À partir de 199 FCFA",
                  details: [
                    "Interventions d'experts reconnus",
                    "Ateliers pratiques et études de cas",
                    "Échanges privilégiés avec les formateurs",
                    "Support de formation fourni",
                    "Attestation de participation",
                  ],
                } as TrainingFormat,
                {
                  id: 2,
                  title: "E-learning",
                  description:
                    "Formations en ligne accessibles à tout moment, pour apprendre à votre rythme.",
                  imageUrl:
                    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
                  buttonText: "Accéder aux formations",
                  duration: "Accès illimité",
                  level: "Tous niveaux",
                  price: "À partir de 99 FCFA",
                  details: [
                    "Accès 24/7 à la plateforme",
                    "Contenu mis à jour régulièrement",
                    "Exercices pratiques et quiz",
                    "Support technique dédié",
                    "Certificat de réussite",
                  ],
                },
                {
                  id: 3,
                  title: "Sur mesure",
                  description:
                    "Formations personnalisées adaptées aux besoins spécifiques de votre entreprise.",
                  imageUrl:
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80",
                  buttonText: "Demander un devis",
                  duration: "Sur mesure",
                  level: "Personnalisé",
                  price: "Devis personnalisé",
                  details: [
                    "Audit préalable de vos besoins",
                    "Contenu 100% personnalisé",
                    "Formation en intra ou inter-entreprise",
                    "Formateurs experts dans votre secteur",
                    "Suivi post-formation inclus",
                  ],
                },
              ]}
              autoPlay={true}
              interval={5000}
              onItemClick={handleTrainingClick}
            />
            
            {selectedTraining && (
              <TrainingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedTraining.title}
                description={selectedTraining.description}
                duration={selectedTraining.duration}
                level={selectedTraining.level}
                price={selectedTraining.price}
              >
                {selectedTraining.details && selectedTraining.details.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-lg">Ce que vous allez découvrir :</h4>
                    <ul className="space-y-3">
                      {selectedTraining.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-2 w-2 rounded-full bg-academy" />
                          </div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      window.open('https://academy.dmplus-group.com/', '_blank');
                      closeModal();
                    }}
                    className="flex-1 bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Tunnel de vente 
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </TrainingModal>
            )}
          </div>
        </div>
      </section>

      {/* Vidéo d'introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            Découvrez notre formation en vidéo
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Plongez dans l'univers de notre formation à travers cette vidéo de
            présentation qui vous donnera un aperçu de notre approche
            pédagogique et de nos valeurs.
          </p>
          <div className="aspect-video max-w-5xl mx-auto bg-black rounded-xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&showinfo=0&controls=1"
              title="Présentation de la formation DM+ Academy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Formats pédagogiques */}
      
      <MasterclassSection />

      {/* Publics cibles */}
      <section>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Nos publics cibles
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-academy to-academy-light mx-auto mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border text-center hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-academy to-academy-light flex items-center justify-center text-white mb-4">
                  {audience.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3">{audience.title}</h3>
                <p className="text-muted-foreground">{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademySection;
