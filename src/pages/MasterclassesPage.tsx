import { useState, useMemo } from "react";
import { 
  Search, Calendar, Clock, Users, Play, BookOpen, ArrowRight, 
  Award, TrendingUp, Star, Filter, X, ChevronRight, Sparkles,
  GraduationCap, Briefcase, LineChart, Globe, Zap, Shield, ShoppingCart,
  CheckCircle2, Target, Eye, Download, Heart, Share2, Server,
  Database, Cloud, Cpu, Network, BarChart, PieChart, Brain,
  Code, Layers, GitBranch, Box, FileText, Trophy, Medal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { CartProvider, CartSidebar, CartButton, useCart } from "@/components/CartContext";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

// Données enrichies des masterclass avec structure détaillée
const masterclassData = [
  {
    id: 1,
    title: "Big Data avec Apache Spark",
    subtitle: "Big Data & Apache Spark – Niveau Professionnel",
    tagline: "💡 Une formation stratégique orientée carrière",
    description: "La DM+ Academy lance un programme intensif dédié aux technologies Big Data modernes, centré sur Apache Spark, outil incontournable utilisé par les grandes entreprises technologiques.",
    instructor: "Antoine Bernard",
    instructorTitle: "Data Engineer, Datadog",
    instructorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-12",
    time: "10:00",
    duration: "4h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 156,
    category: "Data",
    level: "Avancé",
    rating: 4.7,
    highlights: ["Spark", "Big Data", "Scala"],
    color: "blue",
    price: 599,
    
    // Nouvelle structure enrichie
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des profils immédiatement opérationnels",
        "Répondre aux besoins du marché africain et international",
        "Préparer aux environnements Cloud & Data Engineering",
        "Développer des compétences à forte valeur salariale"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
      modules: [
        { number: 1, name: "Fondamentaux Big Data", icon: <Database className="w-3.5 h-3.5" /> },
        { number: 2, name: "Architecture distribuée & Spark Core", icon: <Server className="w-3.5 h-3.5" /> },
        { number: 3, name: "Spark SQL & DataFrames avancés", icon: <BarChart className="w-3.5 h-3.5" /> },
        { number: 4, name: "Streaming & temps réel", icon: <Network className="w-3.5 h-3.5" /> },
        { number: 5, name: "Machine Learning distribué", icon: <Brain className="w-3.5 h-3.5" /> },
        { number: 6, name: "Projet Professionnel complet", icon: <Target className="w-3.5 h-3.5" /> }
      ]
    },
    
    finalProject: {
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Professionnel" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Portfolio projet" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence valorisable sur CV et LinkedIn" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation orientée résultats",
        "Coaching personnalisé",
        "Sessions Live + Replay",
        "Support technique continu",
        "Communauté privée"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
    id: 7,
    title: "Analyse Technique pour Traders",
    subtitle: "Trading Pro – Maîtrise des Marchés Financiers",
    tagline: "💡 Une formation intensive pour devenir trader professionnel",
    description: "La DM+ Academy propose un programme complet d'analyse technique, enseigné par un ancien trader de la Société Générale, pour maîtriser les marchés financiers.",
    instructor: "Philippe Moreau",
    instructorTitle: "Trader Professionnel, ex-Société Générale",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-28",
    time: "18:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Trader Professionnel" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Stratégies backtestées" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence recherchée par les fonds" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation par un trader institutionnel",
        "Accès à des données de marché professionnelles",
        "Sessions live de trading",
        "Support communauté de traders",
        "Mises à jour mensuelles des stratégies"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
    tagline: "💡 Une formation pratique pour automatiser votre travail",
    description: "La DM+ Academy lance un programme intensif pour maîtriser l'automatisation avec Python, compétence clé pour gagner en productivité.",
    instructor: "Thomas Martin",
    instructorTitle: "Lead Developer, Google",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-20",
    time: "10:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-4000743ab122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 189,
    category: "Outils Digitaux",
    level: "Débutant",
    rating: 4.7,
    highlights: ["Python", "Scripting", "Productivité"],
    color: "purple",
    price: 249,
    
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des profils capables d'automatiser les tâches répétitives",
        "Maîtriser les bibliothèques Python professionnelles",
        "Gagner 10+ heures par semaine",
        "Développer des compétences recherchées en entreprise"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
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
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Python Automation" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Bibliothèque de scripts réutilisables" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence très recherchée" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation 100% pratique",
        "Cas réels d'entreprise",
        "Support technique illimité",
        "Mises à jour à vie",
        "Communauté d'automation"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
    tagline: "💡 Une formation pour transformer les données en décisions",
    description: "La DM+ Academy propose un programme complet de data visualization avec Tableau, outil leader du marché.",
    instructor: "Sophie Laurent",
    instructorTitle: "Data Visualization Expert, Microsoft",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-02-28",
    time: "15:00",
    duration: "2h30",
    status: "past",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 312,
    category: "Data",
    level: "Intermédiaire",
    rating: 4.8,
    highlights: ["Tableau", "Dashboards", "Data storytelling"],
    color: "orange",
    price: 379,
    
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des experts en visualisation de données",
        "Maîtriser Tableau comme un professionnel",
        "Créer des dashboards impactants",
        "Communiquer efficacement avec les données"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
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
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Tableau Expert" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Portfolio de dashboards" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence certifiante" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation certifiante Tableau",
        "Projets réels d'entreprise",
        "Coaching personnalisé",
        "Accès aux dernières fonctionnalités",
        "Communauté de data analysts"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
    tagline: "💡 Une formation pour transformer votre idée en entreprise",
    description: "La DM+ Academy propose un programme intensif pour maîtriser l'art du business plan et convaincre les investisseurs.",
    instructor: "Jean-Pierre Rousseau",
    instructorTitle: "Serial Entrepreneur, Mentor Station F",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-02-15",
    time: "09:00",
    duration: "4h",
    status: "past",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 156,
    category: "Entrepreneuriat",
    level: "Avancé",
    rating: 4.8,
    highlights: ["Business plan", "Financement", "Pitch"],
    color: "yellow",
    price: 449,
    
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des entrepreneurs capables de lever des fonds",
        "Maîtriser la finance startup",
        "Convaincre les investisseurs professionnels",
        "Construire un business model scalable"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
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
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Entrepreneuriat" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Business plan prêt à présenter" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Accès réseau d'investisseurs" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation par entrepreneur confirmé",
        "Mentorat personnalisé",
        "Accès au réseau Station F",
        "Pitch devant vrais investisseurs",
        "Suivi post-formation"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
    tagline: "💡 Une formation pour développer votre leadership authentique",
    description: "La DM+ Academy propose un programme unique pour développer votre leadership grâce à l'intelligence émotionnelle.",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Psychologie, Coach Exécutif",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-25",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 98,
    category: "Soft Skills",
    level: "Tous niveaux",
    rating: 4.7,
    highlights: ["Leadership", "EQ", "Management"],
    color: "pink",
    price: 279,
    
    positioning: {
      title: "🚀 Positionnement Premium",
      points: [
        "Former des leaders inspirants",
        "Maîtriser l'intelligence émotionnelle",
        "Développer des équipes performantes",
        "Créer une culture d'entreprise positive"
      ]
    },
    
    program: {
      title: "🧠 Programme structuré en 6 modules",
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
      title: "📊 Projet Final Academy",
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
      title: "🏆 Certification DM+ Academy",
      description: "À la fin du programme :",
      benefits: [
        { icon: <Award className="w-3.5 h-3.5" />, text: "Certificat Leadership EQ" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Profil de leadership complet" },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Compétence recherchée en entreprise" }
      ]
    },
    
    differentiation: {
      title: "💎 Différenciation Academy",
      points: [
        "Formation par psychologue clinicienne",
        "Approche scientifique validée",
        "Coaching individuel inclus",
        "Outils pratiques immédiats",
        "Communauté de leaders"
      ]
    },
    
    objective: {
      title: "🎯 Objectif final",
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
  "Soft Skills": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", icon: <Users className="w-3.5 h-3.5" /> }
};

// Configuration des couleurs par niveau
const levelConfig = {
  "Débutant": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Avancé": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Tous niveaux": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" }
};

const MasterclassesPageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedMasterclass, setSelectedMasterclass] = useState<typeof masterclassData[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsMasterclass, setDetailsMasterclass] = useState<typeof masterclassData[0] | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const categories = useMemo(() => {
    const cats = [...new Set(masterclassData.map(mc => mc.category))];
    return ["all", ...cats];
  }, []);

  const levels = useMemo(() => {
    const levs = [...new Set(masterclassData.map(mc => mc.level))];
    return ["all", ...levs];
  }, []);

  const filteredMasterclass = useMemo(() => {
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
  }, [searchTerm, filterStatus, selectedCategory, selectedLevel]);

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

  const handleAddToCart = (masterclass: typeof masterclassData[0]) => {
    addToCart({
      id: masterclass.id,
      title: masterclass.title,
      instructor: masterclass.instructor,
      instructorTitle: masterclass.instructorTitle,
      date: masterclass.date,
      time: masterclass.time,
      duration: masterclass.duration,
      category: masterclass.category,
      level: masterclass.level,
      thumbnail: masterclass.thumbnail,
      price: masterclass.price
    });
  };

  const handleShowDetails = (masterclass: typeof masterclassData[0]) => {
    setDetailsMasterclass(masterclass);
    setShowDetailsModal(true);
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
                <div style="font-weight: 600;">${new Date(masterclass.date).toLocaleDateString('fr-FR', { 
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
        <div style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">{masterclass.price * 655} FCFA</div>
        <p style="color: #94a3b8; margin-bottom: 1.5rem;">Formation certifiante - Places limitées</p>
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
        <div className="relative h-[450px] overflow-hidden pt-8">
          <div className="absolute inset-0">
            <img
              src="/assets/Masterclass.jpg"
              alt="Masterclass Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full max-w-7xl flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-white"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-medium text-white drop-shadow-lg">Formation d'excellence</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight leading-tight drop-shadow-lg">
                Masterclass
                <span className="block font-black text-5xl md:text-6xl text-white mt-2 drop-shadow-lg">
                  Business Revente
                </span>
              </h1>
              
              <p className="text-xl text-white max-w-xl mb-8 leading-relaxed drop-shadow-lg">
                Des formations exclusives animées par des experts reconnus pour votre réussite professionnelle.
              </p>
              
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-white text-[hsl(var(--academy-primary))] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Découvrir
                </button>
                <button className="px-6 py-3 border-2 border-white text-white text-sm font-semibold rounded-full hover:bg-white hover:text-[hsl(var(--academy-primary))] transition-all">
                  Programme
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path fill="white" fillOpacity="1" d="M0,96L1440,32L1440,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Stats minimales */}
        <div className="container mx-auto px-4 max-w-7xl py-12 -mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: stats.total, label: "Masterclasses", icon: <BookOpen className="w-3.5 h-3.5" /> },
              { value: stats.upcoming, label: "À venir", icon: <Calendar className="w-3.5 h-3.5" /> },
              { value: stats.totalParticipants + '+', label: "Participants", icon: <Users className="w-3.5 h-3.5" /> },
              { value: stats.avgRating, label: "Note moyenne", icon: <Star className="w-3.5 h-3.5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white border border-gray-100 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  {stat.icon}
                  <span className="text-xs">{stat.label}</span>
                </div>
                <p className="text-xl font-semibold text-[hsl(var(--academy-primary))]">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-2 py-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une masterclass..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                Filtres
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  {[
                    { value: "all", label: "Tout" },
                    { value: "upcoming", label: "À venir" },
                    { value: "past", label: "Replay" }
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        filterStatus === status.value
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "Toutes catégories" : cat}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === "all" ? "Tous niveaux" : level}
                    </option>
                  ))}
                </select>

                {(searchTerm || filterStatus !== "all" || selectedCategory !== "all" || selectedLevel !== "all") && (
                  <button
                    onClick={resetFilters}
                    className="p-1.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden pb-3 space-y-2"
                >
                  <div className="flex gap-1">
                    {[
                      { value: "all", label: "Tout" },
                      { value: "upcoming", label: "À venir" },
                      { value: "past", label: "Replay" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md ${
                          filterStatus === status.value
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Toutes catégories" : cat}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tous niveaux" : level}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tags rapides */}
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
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
                className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Résultats */}
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-500">
              <span className="text-base font-medium text-[hsl(var(--academy-primary))]">{filteredMasterclass.length}</span> masterclass{filteredMasterclass.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Section À venir */}
          {filterStatus === "all" && upcomingMasterclass.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-medium text-[hsl(var(--academy-primary))] mb-3 flex items-center gap-2">
                <span className="w-0.5 h-3.5 bg-gray-900 rounded-full" />
                À venir
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  {upcomingMasterclass.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {upcomingMasterclass.map((masterclass, index) => (
                  <MasterclassCard 
                    key={masterclass.id} 
                    masterclass={masterclass} 
                    index={index} 
                    onRegister={handleRegister}
                    onAddToCart={handleAddToCart}
                    onShowDetails={handleShowDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(masterclass.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Section Replay */}
          {filterStatus === "all" && pastMasterclass.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-medium text-[hsl(var(--academy-primary))] mb-3 flex items-center gap-2">
                <span className="w-0.5 h-3.5 bg-gray-300 rounded-full" />
                Replays disponibles
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  {pastMasterclass.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {pastMasterclass.map((masterclass, index) => (
                  <MasterclassCard 
                    key={masterclass.id} 
                    masterclass={masterclass} 
                    index={index} 
                    onRegister={handleRegister}
                    onAddToCart={handleAddToCart}
                    onShowDetails={handleShowDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(masterclass.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Vue filtrée */}
          {filterStatus !== "all" && (
            <div className="grid grid-cols-1 gap-4">
              {filteredMasterclass.map((masterclass, index) => (
                <MasterclassCard 
                  key={masterclass.id} 
                  masterclass={masterclass} 
                  index={index} 
                  onRegister={handleRegister}
                  onAddToCart={handleAddToCart}
                  onShowDetails={handleShowDetails}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(masterclass.id)}
                />
              ))}
            </div>
          )}

          {/* État vide */}
          {filteredMasterclass.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mb-3">
                <BookOpen className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-[hsl(var(--academy-primary))] mb-1">Aucune masterclass</h3>
              <p className="text-xs text-gray-500 mb-4">Essayez d'ajuster vos filtres</p>
              <button
                onClick={resetFilters}
                className="px-4 py-1.5 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors"
              >
                Réinitialiser
              </button>
            </motion.div>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-50 border-t border-gray-100 mt-8">
          <div className="container mx-auto px-4 max-w-7xl py-8">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-sm font-medium text-[hsl(var(--academy-primary))] mb-1">Restez informé</h2>
              <p className="text-xs text-gray-500 mb-3">Recevez les prochaines masterclasses</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                />
                <button className="px-4 py-1.5 bg-[hsl(var(--academy-primary))] text-white text-xs rounded-md hover:bg-[hsl(var(--academy-primary))]/90 transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDetailsModal && detailsMasterclass && (
          <DetailsModal
            masterclass={detailsMasterclass}
            onClose={() => setShowDetailsModal(false)}
            onRegister={handleRegister}
            onAddToCart={handleAddToCart}
            onDownloadBrochure={handleDownloadBrochure}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRegistrationForm && selectedMasterclass && (
          <RegistrationModal
            masterclass={selectedMasterclass}
            onClose={() => setShowRegistrationForm(false)}
          />
        )}
      </AnimatePresence>

      <CartSidebar />
      <CartButton />
    </Layout>
  );
};

// Composant Card enrichi avec structure détaillée
const MasterclassCard = ({ 
  masterclass, 
  index, 
  onRegister, 
  onAddToCart, 
  onShowDetails,
  onToggleWishlist,
  isWishlisted 
}: { 
  masterclass: typeof masterclassData[0], 
  index: number,
  onRegister: (masterclass: typeof masterclassData[0]) => void,
  onAddToCart: (masterclass: typeof masterclassData[0]) => void,
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
      className="group bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="md:w-64 lg:w-72 relative bg-gray-100">
          <img
            src={masterclass.thumbnail}
            alt={masterclass.title}
            className="w-full h-48 md:h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
          
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
              {masterclass.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
              {masterclass.level}
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(masterclass.id)}
            className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
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
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-[hsl(var(--academy-primary))] mb-1">{masterclass.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{masterclass.subtitle}</p>
            <p className="text-xs text-gray-500">{masterclass.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{masterclass.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={masterclass.instructorImage}
              alt={masterclass.instructor}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--academy-primary))]">{masterclass.instructor}</p>
              <p className="text-xs text-gray-500">{masterclass.instructorTitle}</p>
            </div>
          </div>

          {/* Programme modules - compact */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {masterclass.program.title}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
              {masterclass.program.modules.slice(0, 3).map((module, i) => (
                <div key={i} className="flex items-center gap-1 text-[10px] text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  <span className="text-gray-400">{module.icon}</span>
                  <span className="truncate">{module.name}</span>
                </div>
              ))}
              {masterclass.program.modules.length > 3 && (
                <div className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded flex items-center">
                  +{masterclass.program.modules.length - 3} modules
                </div>
              )}
            </div>
          </div>

          {/* Key benefits */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Points clés
            </p>
            <div className="flex flex-wrap gap-1.5">
              {masterclass.highlights.map((h, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] rounded">
                  {h}
                </span>
              ))}
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] rounded flex items-center gap-0.5">
                <Trophy className="w-3 h-3" />
                Certifiant
              </span>
            </div>
          </div>

          {/* Footer with meta and actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(masterclass.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{masterclass.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3.5 h-3.5" />
                <span>{masterclass.participants}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-gray-700">{masterclass.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-[hsl(var(--academy-primary))]">{masterclass.price * 655} FCFA</span>
              
              <button
                onClick={() => onShowDetails(masterclass)}
                className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                Détails
              </button>
              
              {isUpcoming ? (
                <>
                  <button
                    onClick={() => onAddToCart(masterclass)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 border border-gray-200 rounded hover:border-gray-300"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRegister(masterclass)}
                    className="px-3 py-1.5 bg-[hsl(var(--academy-primary))] text-white text-xs rounded hover:bg-[hsl(var(--academy-primary))]/90 transition-colors"
                  >
                    S'inscrire
                  </button>
                </>
              ) : (
                <button className="px-4 py-1.5 bg-[hsl(var(--academy-primary))] text-white text-xs rounded-md hover:bg-[hsl(var(--academy-primary))]/90 transition-colors">
                  Voir le replay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Modal de détails enrichi
const DetailsModal = ({ 
  masterclass, 
  onClose, 
  onRegister, 
  onAddToCart,
  onDownloadBrochure 
}: { 
  masterclass: typeof masterclassData[0], 
  onClose: () => void,
  onRegister: (masterclass: typeof masterclassData[0]) => void,
  onAddToCart: (masterclass: typeof masterclassData[0]) => void,
  onDownloadBrochure: (masterclass: typeof masterclassData[0]) => void
}) => {
  const categoryStyle = categoryConfig[masterclass.category as keyof typeof categoryConfig] || categoryConfig["Data"];
  const levelStyle = levelConfig[masterclass.level as keyof typeof levelConfig] || levelConfig["Intermédiaire"];
  const isUpcoming = masterclass.status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec image */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={masterclass.thumbnail}
            alt={masterclass.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-md ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
              {masterclass.category}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-md ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
              {masterclass.level}
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold mb-1">{masterclass.title}</h2>
            <p className="text-sm text-white/80">{masterclass.subtitle}</p>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-192px)]">
          {/* Tagline */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">{masterclass.tagline}</p>
          </div>

          {/* Description et formateur */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-4">{masterclass.description}</p>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={masterclass.instructorImage}
                alt={masterclass.instructor}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{masterclass.instructor}</p>
                <p className="text-sm text-gray-500">{masterclass.instructorTitle}</p>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Date</div>
              <div className="text-sm font-medium">
                {new Date(masterclass.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Horaire</div>
              <div className="text-sm font-medium">{masterclass.time}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Durée</div>
              <div className="text-sm font-medium">{masterclass.duration}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Participants</div>
              <div className="text-sm font-medium">{masterclass.participants}</div>
            </div>
          </div>

          {/* Positionnement */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🚀</span>
              {masterclass.positioning.title}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {masterclass.positioning.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programme */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🧠</span>
              {masterclass.program.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {masterclass.program.modules.map((module) => (
                <div key={module.number} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                  <span className="w-5 h-5 bg-gray-900 text-white text-xs rounded flex items-center justify-center">
                    {module.number}
                  </span>
                  <span className="text-xs text-gray-700">{module.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projet final */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">📊</span>
              {masterclass.finalProject.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{masterclass.finalProject.description}</p>
            <ul className="grid grid-cols-2 gap-2">
              {masterclass.finalProject.deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                  <span className="text-blue-600">📌</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certification */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              {masterclass.certification.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{masterclass.certification.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {masterclass.certification.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded border border-gray-100">
                  <span className="text-purple-600">{benefit.icon}</span>
                  <span className="text-xs text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Différenciation */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💎</span>
              {masterclass.differentiation.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {masterclass.differentiation.points.map((point, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-amber-50 rounded border border-amber-100">
                  <span className="text-amber-600">✦</span>
                  <span className="text-xs text-amber-800">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Objectifs */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              {masterclass.objective.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{masterclass.objective.description}</p>
            <ul className="grid grid-cols-2 gap-2">
              {masterclass.objective.skills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer avec actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <span className="text-2xl font-bold text-[hsl(var(--academy-primary))]">{masterclass.price * 655} FCFA</span>
              <span className="text-sm text-gray-500 ml-2">TTC</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => onDownloadBrochure(masterclass)}
                className="px-4 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Plaquette
              </button>
              
              {isUpcoming && (
                <button
                  onClick={() => onAddToCart(masterclass)}
                  className="px-4 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Réserver
                </button>
              )}
              
              <button
                onClick={() => onRegister(masterclass)}
                className="px-6 py-2 bg-[hsl(var(--academy-primary))] text-white text-sm rounded hover:bg-[hsl(var(--academy-primary))]/90 transition-colors"
              >
                {isUpcoming ? "S'inscrire" : "Accéder au replay"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
              <div className="text-2xl font-bold">{masterclass.price * 655} FCFA</div>
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
          <MasterclassRegistrationForm />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default () => (
  <CartProvider>
    <MasterclassesPageContent />
  </CartProvider>
);