import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  GraduationCap,
  Briefcase,
  Star,
  Award,
  ChevronRight,
  Play,
  Sparkles,
  TrendingUp,
  X,
  MessageSquare,
  MapPin,
  Globe,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Building2,
  Quote,
  Linkedin,
  Twitter,
  Eye,
  Heart,
  Mail,
  Phone,
  Calendar,
  Target,
  Trophy,
  Zap,
  Layers,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Données des formateurs (inchangées)
const trainers = [
  {
    id: 1,
    name: "Dr. Marie Dubois",
    title: "PhD Computer Science, ex-Google",
    bio: "Expert en intelligence artificielle et machine learning avec plus de 15 ans d'expérience dans la tech. J'ai formé plus de 15 000 étudiants et développé des programmes innovants pour les plus grandes écoles.",
    image: "/assets/Formateur Afrique.jpg",
    specialties: [
      "Machine Learning",
      "Deep Learning",
      "Python",
      "Data Science",
      "IA Générative",
      "TensorFlow",
    ],
    courses: ["Python Bootcamp", "Data Science Pro", "IA pour les managers"],
    rating: 4.9,
    reviews: 1243,
    students: 15420,
    experience: "15+ ans",
    location: "Paris, France",
    languages: ["Français", "Anglais", "Espagnol"],
    social: {
      linkedin: "https://linkedin.com/in/marie-dubois",
      twitter: "https://twitter.com/marie_dubois",
    },
    company: "Google",
    achievements: [
      "Prix de l'innovation 2023",
      "50+ publications scientifiques",
      "Keynote à NeurIPS 2023",
      "Membre du comité scientifique de l'ENS",
    ],
    featured: true,
    email: "marie.dubois@dmplus.com",
    phone: "+33 6 12 34 56 78",
    availability: "Lundi, Mercredi, Vendredi",
    nextSession: "15 Mars 2024",
    certificates: [
      "Google AI Certified",
      "AWS Machine Learning",
      "DeepLearning.AI",
    ],
    stats: {
      completion: 98,
      satisfaction: 4.9,
      employment: 92,
    },
  },
  {
    id: 2,
    name: "Prof. Jean Martin",
    title: "Data Scientist, ex-IBM",
    bio: "Spécialiste en analyse de données et visualisation, passionné par la transformation digitale des entreprises. J'accompagne les organisations dans leur transition data-driven.",
    image: "/assets/E-learning2.jpg",
    specialties: ["Data Analysis", "Tableau", "Power BI", "SQL", "Python", "R"],
    courses: [
      "Data Visualization avec Tableau",
      "Business Intelligence",
      "SQL Avancé",
    ],
    rating: 4.8,
    reviews: 892,
    students: 8750,
    experience: "12+ ans",
    location: "Lyon, France",
    languages: ["Français", "Anglais"],
    social: {
      linkedin: "https://linkedin.com/in/jean-martin",
      twitter: "https://twitter.com/jean_martin",
    },
    company: "IBM",
    achievements: [
      "Data Scientist de l'année 2022",
      "Auteur de 3 livres",
      "Conférencier TEDx",
    ],
    featured: false,
    email: "jean.martin@dmplus.com",
    phone: "+33 6 23 45 67 89",
    availability: "Mardi, Jeudi, Samedi",
    nextSession: "20 Mars 2024",
    certificates: [
      "IBM Data Science",
      "Microsoft Certified",
      "Tableau Desktop Specialist",
    ],
    stats: {
      completion: 95,
      satisfaction: 4.8,
      employment: 89,
    },
  },
  {
    id: 3,
    name: "Sarah Laurent",
    title: "Lead Designer, Freelance",
    bio: "Designer UI/UX créative, spécialisée dans la création d'expériences digitales mémorables et intuitives. J'ai travaillé avec plus de 50 startups et grandes entreprises.",
    image: "/assets/Masterclass.jpg",
    specialties: [
      "UI Design",
      "UX Design",
      "Figma",
      "Adobe Creative Suite",
      "Design System",
      "Prototypage",
    ],
    courses: ["Web Design Créatif", "UI/UX Design", "Design System Avancé"],
    rating: 4.7,
    reviews: 756,
    students: 9800,
    experience: "8+ ans",
    location: "Marseille, France",
    languages: ["Français", "Anglais", "Italien"],
    social: {
      linkedin: "https://linkedin.com/in/sarah-laurent",
      twitter: "https://twitter.com/sarah_laurent",
    },
    company: "Freelance",
    achievements: ["Design Award 2023", "Présentatrice à SXSW", "Mentor Figma"],
    featured: true,
    email: "sarah.laurent@dmplus.com",
    phone: "+33 6 34 56 78 90",
    availability: "Lundi au Jeudi",
    nextSession: "18 Mars 2024",
    certificates: ["Google UX Design", "Figma Certificate", "Adobe Certified"],
    stats: {
      completion: 97,
      satisfaction: 4.7,
      employment: 94,
    },
  },
  {
    id: 4,
    name: "Marc Dubois",
    title: "Strategy Consultant, McKinsey",
    bio: "Consultant en stratégie d'entreprise, expert en transformation organisationnelle et innovation business. J'ai accompagné plus de 30 entreprises du CAC 40.",
    image: "/assets/Formateur Afrique.jpg",
    specialties: [
      "Business Strategy",
      "Management",
      "Innovation",
      "Digital Transformation",
      "Change Management",
      "Leadership",
    ],
    courses: [
      "Business Strategy",
      "Leadership & Management",
      "Innovation Management",
    ],
    rating: 4.8,
    reviews: 534,
    students: 6200,
    experience: "10+ ans",
    location: "Paris, France",
    languages: ["Français", "Anglais", "Allemand"],
    social: {
      linkedin: "https://linkedin.com/in/marc-dubois",
      twitter: "https://twitter.com/marc_dubois",
    },
    company: "McKinsey",
    achievements: [
      "Consultant de l'année 2023",
      "20+ missions internationales",
      "Auteur de 'Stratégie Digitale'",
    ],
    featured: false,
    email: "marc.dubois@dmplus.com",
    phone: "+33 6 45 67 89 01",
    availability: "Mardi, Mercredi, Jeudi",
    nextSession: "22 Mars 2024",
    certificates: ["MBA HEC", "PMP Certification", "Lean Six Sigma"],
    stats: {
      completion: 96,
      satisfaction: 4.8,
      employment: 91,
    },
  },
  {
    id: 5,
    name: "Julie Bernard",
    title: "Growth Marketing Lead",
    bio: "Experte en marketing digital et croissance, spécialisée dans les stratégies d'acquisition et de rétention. J'ai généré +200% de croissance pour 3 startups.",
    image: "/assets/E-learning2.jpg",
    specialties: [
      "Marketing Digital",
      "SEO/SEA",
      "Social Media",
      "Analytics",
      "Growth Hacking",
      "CRM",
    ],
    courses: ["Marketing Digital", "Growth Hacking", "Stratégie Social Media"],
    rating: 4.6,
    reviews: 982,
    students: 11200,
    experience: "7+ ans",
    location: "Lille, France",
    languages: ["Français", "Anglais"],
    social: {
      linkedin: "https://linkedin.com/in/julie-bernard",
      twitter: "https://twitter.com/julie_bernard",
    },
    company: "GrowthMakers",
    achievements: [
      "Campagne de l'année 2023",
      "+200% de croissance pour 3 startups",
      "Top Voice Marketing 2024",
    ],
    featured: false,
    email: "julie.bernard@dmplus.com",
    phone: "+33 6 56 78 90 12",
    availability: "Lundi, Mardi, Vendredi",
    nextSession: "25 Mars 2024",
    certificates: ["Google Analytics", "HubSpot Certified", "Meta Certified"],
    stats: {
      completion: 94,
      satisfaction: 4.6,
      employment: 88,
    },
  },
  {
    id: 6,
    name: "Antoine Bernard",
    title: "Data Engineer, Datadog",
    bio: "Architecte de données spécialisé dans les systèmes distribués et le traitement en temps réel. Je forme les équipes aux technologies big data modernes.",
    image: "/assets/Masterclass.jpg",
    specialties: [
      "Big Data",
      "Apache Spark",
      "Cloud Architecture",
      "Data Engineering",
      "Kafka",
      "AWS",
    ],
    courses: [
      "Big Data avec Apache Spark",
      "Cloud & Data Engineering",
      "Kafka pour les pros",
    ],
    rating: 4.9,
    reviews: 445,
    students: 3200,
    experience: "11+ ans",
    location: "Grenoble, France",
    languages: ["Français", "Anglais"],
    social: {
      linkedin: "https://linkedin.com/in/antoine-bernard",
      twitter: "https://twitter.com/antoine_bernard",
    },
    company: "Datadog",
    achievements: [
      "Contributeur Apache Spark",
      "Speaker à Data+AI Summit",
      "AWS Hero",
    ],
    featured: true,
    email: "antoine.bernard@dmplus.com",
    phone: "+33 6 67 89 01 23",
    availability: "Lundi au Vendredi",
    nextSession: "28 Mars 2024",
    certificates: [
      "AWS Certified",
      "Databricks Certified",
      "Confluent Certified",
    ],
    stats: {
      completion: 99,
      satisfaction: 4.9,
      employment: 96,
    },
  },
];

const TrainersPage = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<
    (typeof trainers)[0] | null
  >(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const specialties = [
    ...new Set(trainers.flatMap((trainer) => trainer.specialties)),
  ];

  const filteredTrainers = trainers.filter((trainer) => {
    if (activeFilter === "all") return true;
    return trainer.specialties.includes(activeFilter);
  });

  const featuredTrainers = trainers.filter((trainer) => trainer.featured);

  // Carte formateur SIMPLIFIÉE avec charte bordeaux
  const TrainerCard = ({
    trainer,
    onClick,
    featured = false,
  }: {
    trainer: (typeof trainers)[0];
    onClick: () => void;
    featured?: boolean;
  }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        {/* Image avec overlay bordeaux */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#46181e] to-transparent opacity-60" />
          
          {featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-400 text-gray-900 border-0 text-xs px-2 py-0.5">
              <Sparkles className="w-3 h-3 mr-1" />
              Vedette
            </Badge>
          )}
        </div>

        <CardContent className="p-3">
          {/* Nom et titre */}
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{trainer.name}</h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{trainer.title}</p>

          {/* Note et localisation */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#b23a4a] text-[#b23a4a]" />
              <span className="text-xs font-medium">{trainer.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-3 h-3" />
              <span className="text-xs truncate max-w-[70px]">{trainer.location.split(",")[0]}</span>
            </div>
          </div>

          {/* Spécialités - 2 maximum */}
          <div className="flex flex-wrap gap-1 mb-2">
            {trainer.specialties.slice(0, 2).map((specialty, idx) => (
              <Badge
                key={idx}
                className="bg-[#fbe7ea] text-[#b23a4a] border-0 text-[10px] px-1.5 py-0 hover:bg-[#b23a4a] hover:text-white transition-colors"
              >
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Stats minimales */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{(trainer.students / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span className="truncate max-w-[60px]">{trainer.company}</span>
            </div>
          </div>

          {/* Bouton bordeaux */}
          <Button className="w-full bg-[#b23a4a] hover:bg-[#8e2e3b] text-white text-xs h-7">
            Voir le profil
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#fbe7ea]/30">
        {/* Hero Section avec fond bordeaux et image de fond */}
        <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-[#46181e] to-[#8e2e3b]">
          {/* Image de fond avec overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/office-workers-using-finance-graphs.jpg')" }}
          />
          <div className="absolute " />
          <div className="relative container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-white/20 text-white border-0 mb-4 text-xs md:text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Experts de renom
              </Badge>
              
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Nos Formateurs
              </h1>
              
              <p className="text-sm md:text-lg text-white/90 max-w-2xl mx-auto">
                Une sélection des meilleurs experts pour vous accompagner dans votre réussite
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtres */}
        <section className="container mx-auto px-4 py-6">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveFilter}
          >
            <TabsList className="w-full justify-start h-auto p-1 bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <TabsTrigger
                value="all"
                className="px-4 py-2 data-[state=active]:bg-[#b23a4a] data-[state=active]:text-white rounded-md text-sm"
              >
                Tous
              </TabsTrigger>
              {specialties.slice(0, 6).map((specialty) => (
                <TabsTrigger
                  key={specialty}
                  value={specialty}
                  className="px-4 py-2 data-[state=active]:bg-[#b23a4a] data-[state=active]:text-white rounded-md text-sm whitespace-nowrap"
                >
                  {specialty}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        {/* Grille de formateurs */}
        <section className="container mx-auto px-4 py-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredTrainers.map((trainer, index) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onClick={() => setSelectedTrainer(trainer)}
                featured={trainer.featured}
              />
            ))}
          </div>
        </section>

        {/* Modal - GARDÉ IDENTIQUE À VOTRE ORIGINAL */}
        <AnimatePresence>
          {selectedTrainer && (
            <>
              {/* Bloquer le scroll de la page */}
              <style>{`
                body {
                  overflow: hidden !important;
                  position: fixed !important;
                  width: 100% !important;
                }
              `}</style>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
                onClick={() => setSelectedTrainer(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col shadow-2xl border border-[#f5cbd1]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header fixe avec bordeaux */}
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5cbd1] bg-gradient-to-r from-[#fbe7ea] to-white flex-shrink-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={selectedTrainer.image}
                        alt={selectedTrainer.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-4 border-white shadow-xl"
                      />
                      {selectedTrainer.featured && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white border-0 px-2 py-1 text-xs shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Vedette
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                            {selectedTrainer.name}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            {selectedTrainer.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1 bg-[#fbe7ea] px-2 py-1 rounded-lg">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#b23a4a] text-[#b23a4a]" />
                              <span className="font-bold text-[#b23a4a] text-xs sm:text-sm">
                                {selectedTrainer.rating}
                              </span>
                              <span className="text-[#b23a4a] text-xs">
                                ({selectedTrainer.reviews})
                              </span>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-0 px-2 py-1 text-xs">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                              Disponible
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedTrainer(null)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fbe7ea] rounded-full flex items-center justify-center text-[#b23a4a] hover:bg-[#f5cbd1] transition-colors hover:scale-110 flex-shrink-0"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Corps scrollable */}
                  <div
                    className="flex-1 overflow-y-auto p-4 sm:p-6"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#b23a4a #fbe7ea",
                    }}
                  >
                    {/* Style pour la scrollbar Webkit */}
                    <style>{`
                      .overflow-y-auto::-webkit-scrollbar {
                        width: 8px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-track {
                        background: #fbe7ea;
                        border-radius: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb {
                        background: #b23a4a;
                        border-radius: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                        background: #8e2e3b;
                      }
                    `}</style>

                    {/* Bio avec bordeaux */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-[#fbe7ea] via-white to-[#fdf2f4] rounded-xl border-l-4 border-[#b23a4a]">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-[#b23a4a] mb-2" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {selectedTrainer.bio}
                      </p>
                    </div>

                    {/* Stats principales */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#f5cbd1]">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b23a4a] mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {(selectedTrainer.students / 1000).toFixed(1)}k
                        </div>
                        <div className="text-xs text-gray-500">Étudiants</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#f5cbd1]">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#b23a4a] mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.experience}
                        </div>
                        <div className="text-xs text-gray-500">Expérience</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#f5cbd1]">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#b23a4a] mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.courses.length}
                        </div>
                        <div className="text-xs text-gray-500">Cours</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#f5cbd1]">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#b23a4a] mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.languages.length}
                        </div>
                        <div className="text-xs text-gray-500">Langues</div>
                      </div>
                    </div>
                    {/* Expertises en badges avec bordeaux */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#b23a4a]" />
                        Expertises
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedTrainer.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#fbe7ea] text-[#b23a4a] border-0 px-2 py-1 text-xs font-medium hover:bg-[#b23a4a] hover:text-white transition-colors"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications avec bordeaux */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#b23a4a]" />
                        Certifications
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedTrainer.certificates?.map((cert, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-[#f5cbd1] text-[#b23a4a] bg-[#fbe7ea] px-2 py-1 text-xs"
                          >
                            <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer fixe avec bordeaux */}
                  <div className="p-3 sm:p-4 border-t border-[#f5cbd1] bg-[#fbe7ea] flex-shrink-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex gap-2">
                        {selectedTrainer.social.linkedin && (
                          <a
                            href={selectedTrainer.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center text-[#b23a4a] hover:bg-[#f5cbd1] hover:text-[#8e2e3b] transition-all border border-[#f5cbd1] hover:scale-110"
                          >
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {selectedTrainer.social.twitter && (
                          <a
                            href={selectedTrainer.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center text-[#b23a4a] hover:bg-[#f5cbd1] hover:text-[#8e2e3b] transition-all border border-[#f5cbd1] hover:scale-110"
                          >
                            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button className="h-8 sm:h-10 px-3 sm:px-6 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] hover:from-[#8e2e3b] hover:to-[#6a232d] text-white text-xs sm:text-sm">
                          Voir les cours
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default TrainersPage;