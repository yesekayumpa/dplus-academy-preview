import { useState, useMemo, useEffect } from "react";
import { 
  Search, Calendar, Clock, Users, Play, BookOpen, ArrowRight, 
  Award, TrendingUp, Star, Filter, X, ChevronRight, Sparkles,
  GraduationCap, Briefcase, LineChart, Globe, Zap, Shield,
  CheckCircle2, Target, Eye, Download, Heart, Share2, Server,
  Database, Cloud, Cpu, Network, BarChart, PieChart, Brain,
  Code, Layers, GitBranch, Box, FileText, Trophy, Medal, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";
import { RegistrationForm } from "@/components/ui/RegistrationForm";
import { useNavigate, useSearchParams } from "react-router-dom";

// Données enrichies des masterclass avec structure détaillée
const masterclassData = [
  {
    id: 1,
    title: "Big Data avec Apache Spark",
    subtitle: "Big Data & Apache Spark – Niveau Professionnel",
    tagline: " Une formation stratégique orientée carrière",
    description: "La DM+ Academy lance un programme intensif dédié aux technologies Big Data modernes, centré sur Apache Spark, outil incontournable utilisé par les grandes entreprises technologiques.",
    instructor: "Antoine Bernard",
    instructorTitle: "Data Engineer, Datadog",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "2024-04-12",
    time: "10:00",
    duration: "4h",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "online",
    status: "upcoming",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 156,
    category: "Data",
    level: "Avancé",
    rating: 4.7,
    highlights: ["Spark", "Big Data", "Scala"],
    color: "blue",
    price: 599,
    
    // Nouvelle structure enrichie
    positioning: {
      title: " Positionnement Premium",
      points: [
        "Former des profils immédiatement opérationnels",
        "Répondre aux besoins du marché africain et international",
        "Préparer aux environnements Cloud & Data Engineering",
        "Développer des compétences à forte valeur salariale"
      ]
    },
    
    program: {
      title: " Programme structuré en 6 modules",
      modules: [
        { number: "1", name: "Fondamentaux Big Data" },
        { number: "2", name: "Architecture distribuée & Spark Core" },
        { number: "3", name: "Spark SQL & DataFrames avancés" },
        { number: "4", name: "Streaming & temps réel" },
        { number: "5", name: "Machine Learning distribué" },
        { number: "6", name: "Projet Professionnel complet" }
      ]
    },
    
    finalProject: {
      title: " Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un pipeline Big Data complet",
        "Nettoyage et transformation de données massives",
        "Analyse avancée",
        "Dashboard décisionnel",
        "Optimisation des performances"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: "🎓", text: "Certificat Professionnel" },
        { icon: "💼", text: "Portfolio projet" },
        { icon: "📈", text: "Compétence valorisable sur CV et LinkedIn" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation orientée résultats",
        "Coaching personnalisé",
        "Sessions Live + Replay",
        "Support technique continu",
        "Communauté privée"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des Data Engineers capables de :",
      skills: [
        "Concevoir une architecture Big Data",
        "Optimiser les performances",
        "Déployer des solutions évolutives",
        "Générer de la valeur à partir des données"
      ]
    }
  },
  
  {
    id: 99,
    title: "Formation Sur Mesure - Entreprise",
    subtitle: "Personnalisée selon vos besoins",
    tagline: "La solution parfaite pour votre équipe",
    description: "Formation entièrement personnalisée selon les besoins spécifiques de votre entreprise. Notre équipe d'experts conçoit un programme adapté à vos objectifs métier.",
    instructor: "Équipe DM+ Academy",
    instructorTitle: "Experts Formateurs",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "Sur demande",
    time: "Flexible",
    duration: "Sur mesure",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "hybrid",
    status: "upcoming",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 0,
    category: "Sur Mesure",
    level: "Tous niveaux",
    rating: 5.0,
    highlights: ["Personnalisé", "Entreprise", "Flexibilité"],
    color: "purple",
    price: 0,
    
    positioning: {
      title: "🎯 Approche Sur Mesure",
      points: [
        "Analyse des besoins personnalisée",
        "Programme adapté à votre secteur",
        "Formateurs experts dans votre domaine",
        "Suivi post-formation inclus",
        "Modularité et flexibilité"
      ]
    },
    
    program: {
      title: "📋 Programme Personnalisé",
      modules: [
        { number: "1", name: "Audit et analyse des besoins" },
        { number: "2", name: "Conception pédagogique" },
        { number: "3", name: "Déploiement sur mesure" },
        { number: "4", name: "Accompagnement pratique" },
        { number: "5", name: "Évaluation et ajustement" },
        { number: "6", name: "Suivi post-formation" }
      ]
    },
    
    finalProject: {
      title: "🚀 Projet Entreprise",
      description: "Application concrète dans votre contexte :",
      deliverables: [
        "Solution métier personnalisée",
        "Documentation technique",
        "Formation des équipes internes",
        "Plan de déploiement",
        "Métriques de succès"
      ]
    },
    
    certification: {
      title: "🏅 Certification Entreprise",
      description: "Validation des compétences acquises :",
      benefits: [
        { icon: "🎯", text: "Certificat personnalisé" },
        { icon: "📊", text: "Rapport de progression" },
        { icon: "🤝", text: "Accompagnement 6 mois" }
      ]
    },
    
    differentiation: {
      title: "💎 Excellence Sur Mesure",
      points: [
        "Expertise sectorielle reconnue",
        "Méthodologie éprouvée",
        "Flexibilité totale",
        "ROI garanti",
        "Support prioritaire 24/7"
      ]
    },
    
    objective: {
      title: "🎯 Objectif Entreprise",
      description: "Transformer votre organisation :",
      skills: [
        "Automatiser vos processus",
        "Optimiser vos performances",
        "Développer les compétences internes",
        "Créer de la valeur business"
      ]
    }
  },
  
  {
    id: 7,
    title: "Analyse Technique pour Traders",
    subtitle: "Trading Pro – Maîtrise des Marchés Financiers",
    tagline: " Une formation intensive pour devenir trader professionnel",
    description: "La DM+ Academy propose un programme complet d'analyse technique, enseigné par un ancien trader de la Société Générale, pour maîtriser les marchés financiers.",
    instructor: "Philippe Moreau",
    instructorTitle: "Trader Professionnel, ex-Société Générale",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "2024-03-28",
    time: "18:00",
    duration: "3h",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "in-person",
    status: "upcoming",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 178,
    category: "Finance",
    level: "Avancé",
    rating: 4.9,
    highlights: ["Trading", "Analyse technique", "Indicateurs"],
    color: "blue",
    price: 399,
    
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des traders capables d'analyser les marchés en temps réel",
        "Maîtriser les indicateurs techniques professionnels",
        "Développer une stratégie de trading rentable",
        "Gérer les risques comme un institutionnel"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Fondamentaux de l'analyse technique", icon: <LineChart className="w-3.5 h-3.5" /> },
        { number: 2, name: "Figures chartistes et patterns", icon: <GitBranch className="w-3.5 h-3.5" /> },
        { number: 3, name: "Indicateurs techniques avancés", icon: <BarChart className="w-3.5 h-3.5" /> },
        { number: 4, name: "Money management & psychologie", icon: <Shield className="w-3.5 h-3.5" /> },
        { number: 5, name: "Stratégies de trading système", icon: <Code className="w-3.5 h-3.5" /> },
        { number: 6, name: "Trading en conditions réelles", icon: <Target className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: " Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un journal de trading professionnel",
        "Backtest d'une stratégie sur 5 ans",
        "Analyse technique complète d'un actif",
        "Plan de trading personnalisé",
        "Gestion de portefeuille simulée"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Trader Professionnel" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Stratégies backtestées" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence recherchée par les fonds" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation par un trader institutionnel",
        "Accès à des données de marché professionnelles",
        "Sessions live de trading",
        "Support communauté de traders",
        "Mises à jour mensuelles des stratégies"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des traders capables de :",
      skills: [
        "Analyser n'importe quel graphique en quelques secondes",
        "Identifier des opportunités de trading à haute probabilité",
        "Gérer le risque comme un professionnel",
        "Générer des rendements constants"
      ]
    }
  },
  
  {
    id: 2,
    title: "Automatisation des Tâches avec Python",
    subtitle: "Python Automation – Niveau Expert",
    tagline: " Une formation pratique pour automatiser votre travail",
    description: "La DM+ Academy lance un programme intensif pour maîtriser l'automatisation avec Python, compétence clé pour gagner en productivité.",
    instructor: "Thomas Martin",
    instructorTitle: "Lead Developer, Google",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "2024-03-20",
    time: "10:00",
    duration: "3h",
    location: "Présentiel (DM+ Academy ) ou En ligne",
    mode: "online",
    status: "upcoming",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 189,
    category: "Outils Digitaux",
    level: "Débutant",
    rating: 4.7,
    highlights: ["Python", "Scripting", "Productivité"],
    color: "purple",
    price: 249,
    
    positioning: {
      title: " Positionnement Premium",
      points: [
        "Former des profils capables d'automatiser les tâches répétitives",
        "Maîtriser les bibliothèques Python professionnelles",
        "Gagner 10+ heures par semaine",
        "Développer des compétences recherchées en entreprise"
      ]
    },
    
    program: {
      title: " Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Fondamentaux Python pour l'automatisation", icon: <Code className="w-3.5 h-3.5" /> },
        { number: 2, name: "Manipulation de fichiers et dossiers", icon: <FileText className="w-3.5 h-3.5" /> },
        { number: 3, name: "Web scraping avancé", icon: <Globe className="w-3.5 h-3.5" /> },
        { number: 4, name: "Automatisation Excel & PDF", icon: <BarChart className="w-3.5 h-3.5" /> },
        { number: 5, name: "APIs et intégrations", icon: <Network className="w-3.5 h-3.5" /> },
        { number: 6, name: "Projet d'automatisation complet", icon: <Target className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: " Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un script d'automatisation complet",
        "Bot de traitement de données",
        "Système de reporting automatisé",
        "Dashboard de suivi",
        "Documentation technique"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Python Automation" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Bibliothèque de scripts réutilisables" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence très recherchée" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation 100% pratique",
        "Cas réels d'entreprise",
        "Support technique illimité",
        "Mises à jour à vie",
        "Communauté d'automation"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des experts en automation capables de :",
      skills: [
        "Automatiser n'importe quelle tâche répétitive",
        "Créer des pipelines de données efficaces",
        "Intégrer des systèmes entre eux",
        "Optimiser les processus métier"
      ]
    }
  },
  
  {
    id: 3,
    title: "Data Visualization avec Tableau",
    subtitle: "Tableau Expert – Data Storytelling",
    tagline: " Une formation pour transformer les données en décisions",
    description: "La DM+ Academy propose un programme complet de data visualization avec Tableau, outil leader du marché.",
    instructor: "Sophie Laurent",
    instructorTitle: "Data Visualization Expert, Microsoft",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "2024-02-28",
    time: "15:00",
    duration: "2h30",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "online",
    status: "past",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 312,
    category: "Data",
    level: "Intermédiaire",
    rating: 4.8,
    highlights: ["Tableau", "Dashboards", "Data storytelling"],
    color: "orange",
    price: 379,
    
    positioning: {
      title: " Positionnement Premium",
      points: [
        "Former des experts en visualisation de données",
        "Maîtriser Tableau comme un professionnel",
        "Créer des dashboards impactants",
        "Communiquer efficacement avec les données"
      ]
    },
    
    program: {
      title: " Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Fondamentaux Tableau", icon: <PieChart className="w-3.5 h-3.5" /> },
        { number: 2, name: "Préparation et nettoyage des données", icon: <Database className="w-3.5 h-3.5" /> },
        { number: 3, name: "Visualisations avancées", icon: <BarChart className="w-3.5 h-3.5" /> },
        { number: 4, name: "Dashboards interactifs", icon: <Layers className="w-3.5 h-3.5" /> },
        { number: 5, name: "Data storytelling", icon: <BookOpen className="w-3.5 h-3.5" /> },
        { number: 6, name: "Projet dashboard complet", icon: <Target className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: " Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un dashboard interactif complet",
        "Analyse de données exploratoire",
        "Présentation storytelling",
        "Documentation utilisateur",
        "Recommandations data-driven"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Tableau Expert" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Portfolio de dashboards" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence certifiante" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation certifiante Tableau",
        "Projets réels d'entreprise",
        "Coaching personnalisé",
        "Accès aux dernières fonctionnalités",
        "Communauté de data analysts"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des data storytellers capables de :",
      skills: [
        "Créer des visualisations percutantes",
        "Raconter des histoires avec les données",
        "Influencer les décisions stratégiques",
        "Communiquer clairement des insights complexes"
      ]
    }
  },
  
  {
    id: 4,
    title: "Business Plan pour Startups",
    subtitle: "Startup Finance – Levée de Fonds",
    tagline: " Une formation pour transformer votre idée en entreprise",
    description: "La DM+ Academy propose un programme intensif pour maîtriser l'art du business plan et convaincre les investisseurs.",
    instructor: "Jean-Pierre Rousseau",
    instructorTitle: "Serial Entrepreneur, Mentor Station F",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-02-15",
    time: "09:00",
    duration: "4h",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "in-person",
    status: "past",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 156,
    category: "Entrepreneuriat",
    level: "Avancé",
    rating: 4.8,
    highlights: ["Business plan", "Financement", "Pitch"],
    color: "yellow",
    price: 449,
    
    positioning: {
      title: " Positionnement Premium",
      points: [
        "Former des entrepreneurs capables de lever des fonds",
        "Maîtriser la finance startup",
        "Convaincre les investisseurs professionnels",
        "Construire un business model scalable"
      ]
    },
    
    program: {
      title: "Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Modèle économique et value proposition", icon: <Target className="w-3.5 h-3.5" /> },
        { number: 2, name: "Étude de marché et concurrence", icon: <LineChart className="w-3.5 h-3.5" /> },
        { number: 3, name: "Prévisions financières", icon: <BarChart className="w-3.5 h-3.5" /> },
        { number: 4, name: "Stratégie de levée de fonds", icon: <TrendingUp className="w-3.5 h-3.5" /> },
        { number: 5, name: "Pitch deck investisseurs", icon: <FileText className="w-3.5 h-3.5" /> },
        { number: 6, name: "Simulation de levée de fonds", icon: <Award className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: "Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un business plan complet",
        "Un modèle financier sur 5 ans",
        "Un pitch deck professionnel",
        "Une vidéo de pitch",
        "Une stratégie de levée de fonds"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Entrepreneuriat" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Business plan prêt à présenter" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Accès réseau d'investisseurs" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation par entrepreneur confirmé",
        "Mentorat personnalisé",
        "Accès au réseau Station F",
        "Pitch devant vrais investisseurs",
        "Suivi post-formation"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des entrepreneurs capables de :",
      skills: [
        "Construire un business plan solide",
        "Convaincre les investisseurs",
        "Gérer la croissance startup",
        "Piloter la performance financière"
      ]
    }
  },
  
  {
    id: 5,
    title: "Leadership et Intelligence Émotionnelle",
    subtitle: "Leadership EQ – Manager Coach",
    tagline: " Une formation pour développer votre leadership authentique",
    description: "La DM+ Academy propose un programme unique pour développer votre leadership grâce à l'intelligence émotionnelle.",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Psychologie, Coach Exécutif",
    instructorImage: "/assets/Formateur Afrique.jpg",
    date: "2024-03-25",
    time: "14:00",
    duration: "2h",
    location: "Présentiel (DM+ Academy) ou En ligne",
    mode: "in-person",
    status: "upcoming",
    thumbnail: "/assets/Masterclass.jpg",
    participants: 98,
    category: "Soft Skills",
    level: "Tous niveaux",
    rating: 4.7,
    highlights: ["Leadership", "EQ", "Management"],
    color: "pink",
    price: 279,
    
    positioning: {
      title: " Positionnement Premium",
      points: [
        "Former des leaders inspirants",
        "Maîtriser l'intelligence émotionnelle",
        "Développer des équipes performantes",
        "Créer une culture d'entreprise positive"
      ]
    },
    
    program: {
      title: " Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Fondamentaux de l'intelligence émotionnelle", icon: <Brain className="w-3.5 h-3.5" /> },
        { number: 2, name: "Conscience de soi et autogestion", icon: <Target className="w-3.5 h-3.5" /> },
        { number: 3, name: "Empathie et relations", icon: <Users className="w-3.5 h-3.5" /> },
        { number: 4, name: "Communication non-violente", icon: <BookOpen className="w-3.5 h-3.5" /> },
        { number: 5, name: "Gestion des conflits", icon: <Shield className="w-3.5 h-3.5" /> },
        { number: 6, name: "Leadership transformationnel", icon: <Award className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: " Projet Final Academy",
      description: "Les participants réalisent :",
      deliverables: [
        "Un plan de développement leadership",
        "Un journal d'intelligence émotionnelle",
        "Une étude de cas de management",
        "Un feedback 360°",
        "Une feuille de route personnelle"
      ]
    },
    
    certification: {
      title: " Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Leadership EQ" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Profil de leadership complet" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence recherchée en entreprise" }
      ]
    },
    
    differentiation: {
      title: " Différenciation Academy",
      points: [
        "Formation par psychologue clinicienne",
        "Approche scientifique validée",
        "Coaching individuel inclus",
        "Outils pratiques immédiats",
        "Communauté de leaders"
      ]
    },
    
    objective: {
      title: " Objectif final",
      description: "Former des leaders capables de :",
      skills: [
        "Inspirer et motiver leurs équipes",
        "Gérer les situations complexes",
        "Développer le potentiel de chacun",
        "Créer un environnement de confiance"
      ]
    }
  }
];

// Configuration des couleurs par catégorie
const categoryConfig = {
  "Finance": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <LineChart className="w-3.5 h-3.5" /> },
  "Outils Digitaux": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: <Zap className="w-3.5 h-3.5" /> },
  "Data": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: <Database className="w-3.5 h-3.5" /> },
  "Entrepreneuriat": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <Briefcase className="w-3.5 h-3.5" /> },
  "Soft Skills": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", icon: <Users className="w-3.5 h-3.5" /> },
  "Sur Mesure": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: <GraduationCap className="w-3.5 h-3.5" /> }
};

// Configuration des couleurs par niveau
const levelConfig = {
  "Débutant": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Avancé": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Tous niveaux": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" }
};

const MasterclassesPageContent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Scroller en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedMasterclass, setSelectedMasterclass] = useState<typeof masterclassData[0] | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Vérifier si l'URL demande les formations sur mesure
  const isSurMesureMode = searchParams.get('type') === 'sur-mesure';

  const categories = useMemo(() => {
    const cats = [...new Set(masterclassData.map(mc => mc.category))];
    return ["all", ...cats];
  }, []);

  const levels = useMemo(() => {
    const levs = [...new Set(masterclassData.map(mc => mc.level))];
    return ["all", ...levs];
  }, []);

  const filteredMasterclass = useMemo(() => {
    // Si mode sur mesure activé, filtrer uniquement les formations sur mesure
    if (isSurMesureMode) {
      return masterclassData.filter(mc => mc.category === "Sur Mesure");
    }
    
    // Sinon, appliquer les filtres normaux
    return masterclassData.filter(mc => {
      const matchesSearch = searchTerm === "" || 
        mc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mc.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mc.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || mc.status === filterStatus;
      const matchesCategory = selectedCategory === "all" || mc.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || mc.level === selectedLevel;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesLevel;
    });
  }, [searchTerm, filterStatus, selectedCategory, selectedLevel, isSurMesureMode]);

  const upcomingMasterclass = filteredMasterclass.filter(mc => mc.status === "upcoming");
  const pastMasterclass = filteredMasterclass.filter(mc => mc.status === "past");

  const stats = useMemo(() => ({
    total: masterclassData.length,
    upcoming: masterclassData.filter(m => m.status === "upcoming").length,
    past: masterclassData.filter(m => m.status === "past").length,
    totalParticipants: masterclassData.reduce((acc, m) => acc + m.participants, 0),
    avgRating: (masterclassData.reduce((acc, m) => acc + m.rating, 0) / masterclassData.length).toFixed(1)
  }), []);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSelectedCategory("all");
    setSelectedLevel("all");
  };

  const handleRegister = (masterclass: typeof masterclassData[0]) => {
    setSelectedMasterclass(masterclass);
    setShowRegistrationForm(true);
  };

  const handleShowDetails = (masterclass: typeof masterclassData[0]) => {
    navigate(`/masterclass/${masterclass.id}`);
  };

  
  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownloadBrochure = (masterclass: typeof masterclassData[0]) => {
    const brochureContent = generateBrochureContent(masterclass);
    const blob = new Blob([brochureContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plaquette-${masterclass.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateBrochureContent = (masterclass: typeof masterclassData[0]) => {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plaquette - ${masterclass.title}</title>
    <style>
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            color: #1e293b;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8fafc;
        }
        .card {
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border: 1px solid #e2e8f0;
        }
        .header {
            background: #0f172a;
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 1.5rem;
        }
        .header h1 {
            font-size: 2rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
        }
        .header .subtitle {
            font-size: 1.1rem;
            color: #94a3b8;
            margin-bottom: 1rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .info-item {
            background: #f1f5f9;
            padding: 1rem;
            border-radius: 0.75rem;
        }
        .module-list {
            display: grid;
            gap: 0.75rem;
        }
        .module-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            background: #f8fafc;
            border-radius: 0.5rem;
            border: 1px solid #e2e8f0;
        }
        .module-number {
            width: 1.5rem;
            height: 1.5rem;
            background: #0f172a;
            color: white;
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #f1f5f9;
            border-radius: 2rem;
            font-size: 0.875rem;
            color: #334155;
            margin: 0.25rem;
        }
        .price {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
        }
        .benefit-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: #f8fafc;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${masterclass.title}</h1>
        <div class="subtitle">${masterclass.subtitle}</div>
        <p style="color: #94a3b8; margin-top: 0.5rem;">${masterclass.tagline}</p>
        <p style="color: #94a3b8; margin-top: 1rem;">avec ${masterclass.instructor} • ${masterclass.instructorTitle}</p>
    </div>

    <div class="card">
        <h2 class="section-title">📋 Informations pratiques</h2>
        <div class="grid">
            <div class="info-item">
                <div style="font-size: 0.875rem; color: #64748b;">Date</div>
                <div style="font-weight: 600;">${masterclass.date === "Sur demande" ? "Sur demande" : new Date(masterclass.date).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
            </div>
            <div class="info-item">
                <div style="font-size: 0.875rem; color: #64748b;">Horaire</div>
                <div style="font-weight: 600;">${masterclass.time}</div>
            </div>
            <div class="info-item">
                <div style="font-size: 0.875rem; color: #64748b;">Durée</div>
                <div style="font-weight: 600;">${masterclass.duration}</div>
            </div>
            <div class="info-item">
                <div style="font-size: 0.875rem; color: #64748b;">Niveau</div>
                <div style="font-weight: 600;">${masterclass.level}</div>
            </div>
        </div>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.positioning.title}</h2>
        <ul style="list-style: none; padding: 0;">
            ${masterclass.positioning.points.map(point => `
                <li style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #10b981;">✓</span>
                    <span>${point}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.program.title}</h2>
        <div class="module-list">
            ${masterclass.program.modules.map(module => `
                <div class="module-item">
                    <div class="module-number">${module.number}</div>
                    <span>${module.name}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.finalProject.title}</h2>
        <p style="color: #64748b; margin-bottom: 1rem;">${masterclass.finalProject.description}</p>
        <ul style="list-style: none; padding: 0;">
            ${masterclass.finalProject.deliverables.map(item => `
                <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #3b82f6;">📊</span>
                    <span>${item}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.certification.title}</h2>
        <p style="color: #64748b; margin-bottom: 1rem;">${masterclass.certification.description}</p>
        <div style="display: grid; gap: 0.5rem;">
            ${masterclass.certification.benefits.map(benefit => `
                <div class="benefit-item">
                    <span style="color: #8b5cf6;">${benefit.icon}</span>
                    <span>${benefit.text}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.differentiation.title}</h2>
        <ul style="list-style: none; padding: 0;">
            ${masterclass.differentiation.points.map(point => `
                <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #f59e0b;">💎</span>
                    <span>${point}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div class="card">
        <h2 class="section-title">${masterclass.objective.title}</h2>
        <p style="color: #64748b; margin-bottom: 1rem;">${masterclass.objective.description}</p>
        <ul style="list-style: none; padding: 0;">
            ${masterclass.objective.skills.map(skill => `
                <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #10b981;">✓</span>
                    <span>${skill}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div style="background: #0f172a; color: white; padding: 2rem; border-radius: 1rem; text-align: center;">
        <div style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Formation certifiante</div>
        <p style="color: #94a3b8; margin-bottom: 1.5rem;">Places limitées</p>
        <a href="/inscription?masterclass=${masterclass.id}" style="display: inline-block; padding: 0.75rem 2rem; background: white; color: #0f172a; text-decoration: none; border-radius: 0.5rem; font-weight: 500;">S'inscrire maintenant</a>
    </div>
</body>
</html>
    `;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] overflow-hidden pt-6 sm:pt-8 md:pt-12">
          <div className="absolute inset-0">
            <img
              src="/assets/Masterclass.jpg"
              alt="Masterclass Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 h-full max-w-7xl flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 h-4 text-yellow-300" />
                <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  {isSurMesureMode ? "Formations Sur Mesure" : "Formations d'excellence"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tight leading-tight">
                {isSurMesureMode ? (
                  <>
                    Masterclass
                    <span className="block font-black text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mt-1 sm:mt-2">
                      Sur Mesure
                    </span>
                  </>
                ) : (
                  <>
                    Masterclass
                    <span className="block font-black text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mt-1 sm:mt-2">
                      Business Revente
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mb-4 sm:mb-6 leading-relaxed">
                {isSurMesureMode 
                  ? "Des formations entièrement personnalisées pour répondre aux besoins spécifiques de votre entreprise." 
                  : "Des formations exclusives animées par des experts reconnus pour accélérer votre réussite professionnelle."
                }
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button className="px-3 sm:px-6 py-1.5 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                  {isSurMesureMode ? "Demander un devis" : "Explorer les formations"}
                </button>
                {!isSurMesureMode && (
                  <button className="px-3 sm:px-6 py-1.5 sm:py-3 border-2 border-white/60 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all">
                    Catalogue complet
                  </button>
                )}
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path fill="white" fillOpacity="1" d="M0,96L1440,32L1440,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Section Filtres et Recherche */}
        <section className="container mx-auto px-4 max-w-7xl py-8">
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
            {/* En-tête de section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Trouver votre formation</h2>
                <p className="text-sm text-gray-600">Explorez notre catalogue de masterclasses</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  <span className="text-base sm:text-lg font-bold text-[hsl(var(--academy-primary))]">{filteredMasterclass.length}</span> formation{filteredMasterclass.length > 1 ? 's' : ''} trouvée{filteredMasterclass.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Barre de recherche principale */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une formation par mot-clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[hsl(var(--academy-primary))] focus:ring-2 focus:ring-[hsl(var(--academy-primary))]/20"
                />
              </div>
            </div>

            {/* Filtres avancés */}
            <div className="space-y-4">
              {/* Filtres desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Statut:</span>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    {[
                      { value: "all", label: "Toutes" },
                      { value: "upcoming", label: "À venir" },
                      { value: "past", label: "Replay" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          filterStatus === status.value
                            ? "bg-[hsl(var(--academy-primary))] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Toutes catégories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Niveau:</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tous niveaux" : level}
                      </option>
                    ))}
                  </select>
                </div>

                {(searchTerm || filterStatus !== "all" || selectedCategory !== "all" || selectedLevel !== "all") && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Filtres mobile */}
              <div className="lg:hidden space-y-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Statut:</span>
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden flex-1">
                      {[
                        { value: "all", label: "Toutes" },
                        { value: "upcoming", label: "À venir" },
                        { value: "past", label: "Replay" }
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                            filterStatus === status.value
                              ? "bg-[hsl(var(--academy-primary))] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "Toutes catégories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Niveau:</span>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>
                          {level === "all" ? "Tous niveaux" : level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(searchTerm || filterStatus !== "all" || selectedCategory !== "all" || selectedLevel !== "all") && (
                    <button
                      onClick={resetFilters}
                      className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>

              {/* Tags rapides */}
              <div className="flex flex-wrap items-center gap-2">
                {["Data", "Finance", "Soft Skills", "Python", "Excel"].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (tag === "Python" || tag === "Excel") {
                        setSelectedCategory("Outils Digitaux");
                      } else {
                        setSelectedCategory(tag);
                      }
                    }}
                    className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-300 hover:border-[hsl(var(--academy-primary))] hover:text-[hsl(var(--academy-primary))] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Résultats */}
        <section className="container mx-auto px-4 max-w-7xl py-8">
          {isSurMesureMode ? (
            // Mode sur mesure - afficher uniquement les formations sur mesure
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-purple-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">Formations Sur Mesure</h2>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                  {filteredMasterclass.length} disponible{filteredMasterclass.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredMasterclass.map((masterclass, index) => (
                  <MasterclassCard 
                    key={masterclass.id} 
                    masterclass={masterclass} 
                    index={index} 
                    onRegister={handleRegister}
                    onShowDetails={handleShowDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(masterclass.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Mode normal - afficher toutes les formations */}
              {/* Section À venir */}
              {filterStatus === "all" && upcomingMasterclass.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-[hsl(var(--academy-primary))] rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nos formats pédagogiques</h2>
                    <span className="hidden sm:inline px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {upcomingMasterclass.length} disponible{upcomingMasterclass.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {upcomingMasterclass.map((masterclass, index) => (
                      <MasterclassCard 
                        key={masterclass.id} 
                        masterclass={masterclass} 
                        index={index} 
                        onRegister={handleRegister}
                        onShowDetails={handleShowDetails}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={wishlist.includes(masterclass.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Section Replay */}
              {filterStatus === "all" && pastMasterclass.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gray-400 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Replays disponibles</h2>
                    <span className="hidden sm:inline px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {pastMasterclass.length} disponible{pastMasterclass.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {pastMasterclass.map((masterclass, index) => (
                      <MasterclassCard 
                        key={masterclass.id} 
                        masterclass={masterclass} 
                        index={index} 
                        onRegister={handleRegister}
                        onShowDetails={handleShowDetails}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={wishlist.includes(masterclass.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Résultats filtrés */}
              {filterStatus !== "all" && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-orange-400 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {filterStatus === "upcoming" ? "Formations à venir" : "Replays disponibles"}
                    </h2>
                    <span className="hidden sm:inline px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                      {filteredMasterclass.length} disponible{filteredMasterclass.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {filteredMasterclass.map((masterclass, index) => (
                      <MasterclassCard 
                        key={masterclass.id} 
                        masterclass={masterclass} 
                        index={index} 
                        onRegister={handleRegister}
                        onShowDetails={handleShowDetails}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={wishlist.includes(masterclass.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Aucune formation trouvée */}
              {filteredMasterclass.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune formation trouvée</h3>
                  <p className="text-gray-600 mb-6">Essayez de modifier vos filtres ou votre recherche</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-[hsl(var(--academy-primary))] text-white font-medium rounded-lg hover:bg-[hsl(var(--academy-primary))]/90 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Section Newsletter */}
        <section className="bg-gray-50 border-t border-gray-200 mt-2">
          <div className="container mx-auto px-4 max-w-7xl py-2">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Restez informé des nouvelles formations</h2>
              <p className="text-gray-600 mb-4">Recevez en avant-première les annonces de nos prochaines masterclasses</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                />
                <button className="px-6 py-3 bg-[hsl(var(--academy-primary))] text-white font-medium rounded-lg hover:bg-[hsl(var(--academy-primary))]/90 transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showRegistrationForm && selectedMasterclass && (
          <RegistrationModal
            masterclass={selectedMasterclass}
            onClose={() => setShowRegistrationForm(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

// Composant Card enrichi avec structure détaillée
const MasterclassCard = ({ 
  masterclass, 
  index, 
  onRegister, 
  onShowDetails,
  onToggleWishlist,
  isWishlisted 
}: { 
  masterclass: typeof masterclassData[0], 
  index: number,
  onRegister: (masterclass: typeof masterclassData[0]) => void,
  onShowDetails: (masterclass: typeof masterclassData[0]) => void,
  onToggleWishlist: (id: number) => void,
  isWishlisted: boolean
}) => {
  const isUpcoming = masterclass.status === "upcoming";
  const categoryStyle = categoryConfig[masterclass.category as keyof typeof categoryConfig] || categoryConfig["Data"];
  const levelStyle = levelConfig[masterclass.level as keyof typeof levelConfig] || levelConfig["Intermédiaire"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group bg-white border border-gray-200/50 rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="md:w-64 lg:w-72 relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={masterclass.thumbnail}
            alt={masterclass.title}
            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "/assets/Masterclass.jpg";
            }}
          />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} backdrop-blur-sm shadow-sm`}>
              {masterclass.category}
            </span>
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border} backdrop-blur-sm shadow-sm`}>
              {masterclass.level}
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(masterclass.id)}
            className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>

          {!isUpcoming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-gray-900 ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex-1 p-3 md:p-5 bg-gradient-to-br from-white to-gray-50/30">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-sm md:text-lg font-bold text-[hsl(var(--academy-primary))] mb-2 group-hover:text-[hsl(var(--academy-primary))]/80 transition-colors">{masterclass.title}</h3>
            <p className="text-xs md:text-xs text-gray-700 mb-1 font-medium">{masterclass.subtitle}</p>
            <p className="text-xs md:text-xs text-gray-500 italic">{masterclass.tagline}</p>
          </div>

          {/* Description courte */}
          <p className="text-xs md:text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{masterclass.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50/50 rounded-xl border border-gray-100/50">
            <img
              src={masterclass.instructorImage}
              alt={masterclass.instructor}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div className="flex-1">
              <p className="text-xs md:text-xs font-semibold text-[hsl(var(--academy-primary))]">{masterclass.instructor}</p>
              <p className="text-xs md:text-xs text-gray-600">{masterclass.instructorTitle}</p>
            </div>
          </div>

          {/* Footer with meta and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-200/50 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-2 text-xs md:text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{masterclass.date === "Sur demande" ? "Sur demande" : new Date(masterclass.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{masterclass.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{masterclass.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onShowDetails(masterclass)}
                className="px-3 md:px-5 py-1.5 md:py-2 bg-red-900 text-white text-xs md:text-xs font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-md"
              >
                <Eye className="w-4 h-4" />
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Modal d'inscription avec formulaire intégré
const RegistrationModal = ({ 
  masterclass, 
  onClose 
}: { 
  masterclass: typeof masterclassData[0], 
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec informations de la masterclass */}
        <div className="bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary)/80%)] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Inscription - {masterclass.title}</h2>
              <p className="text-white/90">{masterclass.subtitle}</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 bg-white/10 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">Formation certifiante</div>
              <div className="text-sm text-white/80">Tarif de la formation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{masterclass.duration}</div>
              <div className="text-sm text-white/80">Durée</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{masterclass.level}</div>
              <div className="text-sm text-white/80">Niveau</div>
            </div>
          </div>
        </div>

        {/* Contenu du formulaire */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <RegistrationForm 
            trainingTitle={masterclass.title}
            onClose={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MasterclassesPageContent;