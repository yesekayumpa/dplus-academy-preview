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

// Données des formateurs enrichies
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

  // Refs pour animations Framer Motion
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Composant carte formateur amélioré - VERSION PLUS PETITE
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group cursor-pointer ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}
      onClick={() => onClick()}
    >
      <Card
        className={`overflow-hidden border-0 shadow-md hover:shadow-md transition-all duration-500 bg-white relative ${featured ? "h-full" : ""}`}
      >
        {/* Badge Featured avec rouge-bordeaux - PLUS PETIT */}
        {featured && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-gradient-to-r from-red-800 to-bordeaux-700 text-white border-0 px-2 py-0.5 text-[10px] shadow-lg">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Vedette
            </Badge>
          </div>
        )}

        <CardContent className="p-0">
          {/* Image avec effets avancés - PLUS PETITE */}
          <div className="relative overflow-hidden">
            <img
              src={trainer.image}
              alt={trainer.name}
              className={`w-full object-cover transition-transform duration-700 ${featured ? "h-36" : "h-32"}`}
            />

            {/* Overlay dégradé élégant avec bordeaux - SUPPRIMÉ */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-900/60 via-transparent to-transparent opacity-100" /> */}

            {/* Actions rapides - PLUS PETITES */}
            <div className="absolute top-2 right-2 flex gap-1.5 opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-bordeaux-700 hover:bg-white hover:scale-110 transition-all shadow-md"
              >
                <Eye className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-bordeaux-700 hover:bg-white hover:scale-110 transition-all shadow-md"
              >
                <MessageSquare className="w-3 h-3" />
              </button>
            </div>

            {/* Badge statut - PLUS PETIT */}
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 px-2 py-0.5 text-[10px] shadow-md">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                Disponible
              </Badge>
            </div>
          </div>

          {/* Contenu compact et élégant - ESPACEMENTS RÉDUITS */}
          <div className="p-3 space-y-2">
            {/* En-tête avec rating - PLUS COMPACT */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                  {trainer.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1 truncate">
                  {trainer.title}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 bg-bordeaux-50 px-1.5 py-0.5 rounded-sm">
                    <Star className="w-2.5 h-2.5 fill-bordeaux-500 text-bordeaux-500" />
                    <span className="text-xs font-medium text-bordeaux-700">
                      {trainer.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({trainer.reviews})
                  </span>
                </div>
              </div>

              {/* Avatar miniature - PLUS PETIT */}
              <Avatar className="w-8 h-8 border-2 border-white shadow-md flex-shrink-0">
                <AvatarImage src={trainer.image} />
                <AvatarFallback className="bg-bordeaux-100 text-bordeaux-700 text-xs">
                  {trainer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Bio compacte - 1 LIGNE SEULEMENT */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-1">
              {trainer.bio}
            </p>

            {/* Spécialités en badges - PLUS PETITS */}
            <div className="flex flex-wrap gap-1">
              {trainer.specialties.slice(0, 2).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-50 text-gray-600 border-gray-200 font-normal text-sm px-2 py-0.5 hover:bg-bordeaux-50 hover:text-bordeaux-600 hover:border-bordeaux-200 transition-colors"
                >
                  {specialty}
                </Badge>
              ))}
              {trainer.specialties.length > 2 && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-500 text-sm px-2 py-0.5"
                >
                  +{trainer.specialties.length - 2}
                </Badge>
              )}
            </div>

            {/* Métadonnées compactes - PLUS PETITES */}
            <div className="grid grid-cols-3 gap-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5 text-gray-400" />
                <span className="truncate">{trainer.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-gray-400" />
                <span className="truncate">
                  {trainer.location.split(",")[0]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-2.5 h-2.5 text-gray-400" />
                <span>{(trainer.students / 1000).toFixed(1)}k</span>
              </div>
            </div>

            <Separator className="my-1.5" />

            {/* Actions - PLUS PETITES */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {trainer.social.linkedin && (
                  <a
                    href={trainer.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-bordeaux-100 hover:text-bordeaux-600 transition-all hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-2.5 h-2.5" />
                  </a>
                )}
                {trainer.social.twitter && (
                  <a
                    href={trainer.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-bordeaux-100 hover:text-bordeaux-600 transition-all hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Twitter className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                className="text-bordeaux-600 hover:text-bordeaux-700 hover:bg-bordeaux-50 p-0 h-auto font-medium text-sm group"
              >
                Voir
                <ChevronRight className="w-2 h-2 ml-0.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-bordeaux-50/30">
        {/* Hero Section avec fond NOIR */}
        <section
          ref={heroRef}
          className="relative overflow-hidden min-h-[60vh] flex items-center bg-black"
        >
          {/* Background avec image et effets premium sur fond noir */}
          <div className="absolute inset-0">
            <div className="absolute inset-0">
              <img
                src="/assets/Masterclass.jpg"
                alt="Formateurs experts"
                className="w-full h-full object-cover scale-105 opacity-60"
              />
              {/* Overlay noir moins opaque */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
            </div>
            {/* Effets visuels premium avec bordeaux sur fond noir */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-72 h-72 bg-bordeaux-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" />
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-25 animate-pulse animation-delay-2000" />
              <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-bordeaux-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
            </div>
            {/* Particules flottantes - PLUS VISIBLES sur fond noir */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/90 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative container mx-auto px-4 pt-16 pb-8 md:pt-20 md:pb-10">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge premium animé avec bordeaux sur fond noir */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20 shadow-2xl"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-bordeaux-300 rounded-full animate-pulse" />
                <span className="font-bold text-white text-sm tracking-wide drop-shadow-lg">
                  Excellence Académique
                </span>
                <Sparkles className="w-3 h-3 text-red-300 animate-pulse drop-shadow-lg" />
              </motion.div>

              {/* Titre principal premium avec bordeaux sur fond noir */}
              <motion.h1
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight tracking-tight drop-shadow-2xl"
              >
                NOS
                <span className="block text-3xl md:text-5xl font-light mt-2 text-white drop-shadow-2xl">
                  FORMATEURS
                </span>
                <span className="block text-2xl md:text-4xl font-bold mt-2 text-red-300 drop-shadow-2xl">
                  D'EXCEPTION
                </span>
              </motion.h1>

              {/* Sous-titre premium sur fond noir */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-6 leading-relaxed font-medium drop-shadow-lg"
              >
                Une sélection exclusive des{" "}
                <span className="font-bold text-red-200 drop-shadow-lg">
                  meilleurs experts internationaux
                </span>
                , passionnés par la transmission de leur savoir et dédiés à
                votre{" "}
                <span className="font-bold text-red-200 drop-shadow-lg">
                  réussite professionnelle
                </span>
                .
              </motion.p>

              {/* CTA premium avec bordeaux sur fond noir - PLUS COMPACT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-2 justify-center mt-5"
              >
                <Button className="px-5 py-1.5 bg-gradient-to-r from-red-600 to-bordeaux-700 text-white text-sm font-bold rounded-full hover:from-red-700 hover:to-bordeaux-800 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-red-400/40">
                  <Award className="w-3 h-3 mr-2" />
                  Découvrir nos experts
                  <ChevronRight className="w-3 h-3 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="px-5 py-1.5 bg-white/20 backdrop-blur-xl text-white text-sm font-bold rounded-full hover:bg-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 transform hover:scale-105"
                >
                  <Play className="w-3 h-3 mr-2" />
                  Voir la présentation
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Ondes décoratives premium - AJUSTÉES pour fond noir */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none">
              <path
                d="M0,64 C320,96 480,32 720,64 C960,96 1120,32 1440,64 L1440,120 L0,120 Z"
                fill="white"
                opacity="0.1"
              />
              <path
                d="M0,80 C320,112 480,48 720,80 C960,112 1120,48 1440,80 L1440,120 L0,120 Z"
                fill="white"
                opacity="0.15"
              />
              <path
                d="M0,96 C320,128 480,64 720,96 C960,128 1120,64 1440,96 L1440,120 L0,120 Z"
                fill="white"
                opacity="0.2"
              />
              <path
                d="M0,112 C320,144 480,80 720,112 C960,144 1120,80 1440,112 L1440,120 L0,120 Z"
                fill="white"
                opacity="0.25"
              />
            </svg>
          </div>
        </section>

        {/* Section formateurs vedettes premium */}
        {activeFilter === "all" && (
          <section ref={featuredRef} className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-0.5">
                    <div className="w-5 h-5 bg-gradient-to-br from-red-600 to-bordeaux-700 rounded-lg flex items-center justify-center shadow-md">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    Formateurs Vedettes
                  </h2>
                  <p className="text-xs text-gray-600">
                    Nos experts les plus recherchés et recommandés
                  </p>
                </div>
                <Badge className="px-2 py-0.5 border-red-200 text-red-700 bg-gradient-to-r from-red-50 to-bordeaux-50 text-[10px] font-semibold shadow-sm">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-1 animate-pulse" />
                  {featuredTrainers.length} experts d'élite
                </Badge>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
              {featuredTrainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="trainer-card"
                >
                  <TrainerCard
                    trainer={trainer}
                    onClick={() => setSelectedTrainer(trainer)}
                    featured={true}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Filtres sophistiqués premium */}
        <section
          ref={filtersRef}
          className="container mx-auto px-4 py-6 border-b border-gray-100"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-3">
              <div className="mb-3 md:mb-0">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-600 to-bordeaux-700 rounded-full animate-pulse" />
                  Explorer par Domaine d'Expertise
                </h2>
                <p className="text-gray-600 mt-0.5 text-[10px]">
                  Trouvez le formateur parfait pour vos objectifs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                  {filteredTrainers.length} experts disponibles
                </span>
                <Badge className="bg-bordeaux-100 text-bordeaux-700 border-0 px-2 py-1 text-[10px]">
                  <TrendingUp className="w-2.5 h-2.5 mr-1" />
                  Hautement qualifiés
                </Badge>
              </div>
            </div>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveFilter}
            >
              <TabsList className="w-full justify-start h-auto p-1 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg overflow-x-auto shadow-inner border border-gray-200">
                <TabsTrigger
                  value="all"
                  className="px-3 py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-bordeaux-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md font-bold text-[10px] transition-all duration-500 hover:shadow-sm"
                >
                  <Users className="w-2.5 h-2.5 mr-1" />
                  Tous
                </TabsTrigger>
                {specialties.slice(0, 8).map((specialty) => (
                  <TabsTrigger
                    key={specialty}
                    value={specialty}
                    className="px-3 py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-bordeaux-700 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md font-bold text-[10px] transition-all duration-500 whitespace-nowrap hover:shadow-sm"
                  >
                    {specialty}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </section>

        {/* Grille de formateurs premium - ESPACEMENT RÉDUIT */}
        <section className="container mx-auto px-4 py-6 pb-16">
          <motion.div
            layout
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
          >
            <AnimatePresence>
              {filteredTrainers.map((trainer, index) => (
                <motion.div
                  key={`${activeFilter}-${trainer.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -40 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="trainer-card"
                >
                  <TrainerCard
                    trainer={trainer}
                    onClick={() => setSelectedTrainer(trainer)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Modal avec charte graphique rouge-bordeaux */}
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
                  className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-bordeaux-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header fixe avec bordeaux */}
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-bordeaux-100 bg-gradient-to-r from-bordeaux-50 to-white flex-shrink-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={selectedTrainer.image}
                        alt={selectedTrainer.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-4 border-white shadow-xl"
                      />
                      {selectedTrainer.featured && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-gradient-to-r from-red-600 to-bordeaux-700 text-white border-0 px-2 py-1 text-xs shadow-lg">
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
                            <div className="flex items-center gap-1 bg-bordeaux-50 px-2 py-1 rounded-lg">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-bordeaux-500 text-bordeaux-500" />
                              <span className="font-bold text-bordeaux-700 text-xs sm:text-sm">
                                {selectedTrainer.rating}
                              </span>
                              <span className="text-bordeaux-600 text-xs">
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
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-bordeaux-100 rounded-full flex items-center justify-center text-bordeaux-600 hover:bg-bordeaux-200 transition-colors hover:scale-110 flex-shrink-0"
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
                      scrollbarColor: "#b91c1c #fee2e2",
                    }}
                  >
                    {/* Style pour la scrollbar Webkit */}
                    <style>{`
                      .overflow-y-auto::-webkit-scrollbar {
                        width: 8px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-track {
                        background: #fee2e2;
                        border-radius: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb {
                        background: #b91c1c;
                        border-radius: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                        background: #991b1b;
                      }
                    `}</style>

                    {/* Bio avec bordeaux */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-bordeaux-50 via-red-50 to-amber-50 rounded-xl border-l-4 border-bordeaux-500">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-bordeaux-500 mb-2" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {selectedTrainer.bio}
                      </p>
                    </div>

                    {/* Stats principales */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-bordeaux-100">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-bordeaux-500 mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {(selectedTrainer.students / 1000).toFixed(1)}k
                        </div>
                        <div className="text-xs text-gray-500">Étudiants</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-bordeaux-100">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-bordeaux-500 mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.experience}
                        </div>
                        <div className="text-xs text-gray-500">Expérience</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-bordeaux-100">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-bordeaux-500 mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.courses.length}
                        </div>
                        <div className="text-xs text-gray-500">Cours</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-bordeaux-100">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-bordeaux-500 mx-auto mb-1" />
                        <div className="text-sm sm:text-lg font-bold text-gray-900">
                          {selectedTrainer.languages.length}
                        </div>
                        <div className="text-xs text-gray-500">Langues</div>
                      </div>
                    </div>

                    {/* Statistiques avancées avec bordeaux */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-bordeaux-50 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-bordeaux-700">
                            Taux de complétion
                          </span>
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-bordeaux-700">
                          {selectedTrainer.stats?.completion || 95}%
                        </div>
                        <div className="w-full bg-bordeaux-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-bordeaux-500 h-1.5 rounded-full"
                            style={{
                              width: `${selectedTrainer.stats?.completion || 95}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 bg-red-50 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-red-700">
                            Satisfaction
                          </span>
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-red-700">
                          {selectedTrainer.stats?.satisfaction || 4.8}/5
                        </div>
                        <div className="w-full bg-red-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{
                              width: `${(selectedTrainer.stats?.satisfaction || 4.8) * 20}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 bg-amber-50 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-amber-700">
                            Employabilité
                          </span>
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-amber-700">
                          {selectedTrainer.stats?.employment || 92}%
                        </div>
                        <div className="w-full bg-amber-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-amber-500 h-1.5 rounded-full"
                            style={{
                              width: `${selectedTrainer.stats?.employment || 92}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expertises en badges avec bordeaux */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                        Expertises
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedTrainer.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            className="bg-bordeaux-100 text-bordeaux-700 border-0 px-2 py-1 text-xs font-medium hover:bg-bordeaux-200 transition-colors"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Informations de contact et disponibilité */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                          Contact
                        </h3>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-400" />
                            <span className="truncate text-xs">
                              {selectedTrainer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-400" />
                            <span className="text-xs">{selectedTrainer.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                          Disponibilité
                        </h3>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-400" />
                            <span className="text-xs">{selectedTrainer.availability}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-400" />
                            <span className="text-xs">
                              Prochaine session: {selectedTrainer.nextSession}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications avec bordeaux */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                        Certifications
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedTrainer.certificates?.map((cert, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-bordeaux-200 text-bordeaux-700 bg-bordeaux-50 px-2 py-1 text-xs"
                          >
                            <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Réalisations avec bordeaux */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                        Réalisations
                      </h3>
                      <div className="space-y-1 sm:space-y-2">
                        {selectedTrainer.achievements.map(
                          (achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-bordeaux-50 rounded-lg border border-bordeaux-100"
                            >
                              <CheckCircle2 className="w-4 h-4 text-bordeaux-600 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-700">
                                {achievement}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Cours populaires avec bordeaux */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-500" />
                        Cours populaires
                      </h3>
                      <div className="grid grid-cols-1 gap-1 sm:gap-2">
                        {selectedTrainer.courses.map((course, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 sm:p-3 bg-bordeaux-50 rounded-lg border border-bordeaux-100 hover:bg-bordeaux-100 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-bordeaux-200 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-700" />
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700">
                                {course}
                              </span>
                            </div>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-bordeaux-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer fixe avec bordeaux */}
                  <div className="p-3 sm:p-4 border-t border-bordeaux-100 bg-bordeaux-50 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex gap-2">
                        {selectedTrainer.social.linkedin && (
                          <a
                            href={selectedTrainer.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center text-bordeaux-500 hover:bg-bordeaux-100 hover:text-bordeaux-600 transition-all border border-bordeaux-200 hover:scale-110"
                          >
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {selectedTrainer.social.twitter && (
                          <a
                            href={selectedTrainer.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center text-bordeaux-500 hover:bg-bordeaux-100 hover:text-bordeaux-600 transition-all border border-bordeaux-200 hover:scale-110"
                          >
                            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button className="h-8 sm:h-10 px-3 sm:px-6 bg-gradient-to-r from-red-600 to-bordeaux-700 hover:from-red-700 hover:to-bordeaux-800 text-white text-xs sm:text-sm">
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