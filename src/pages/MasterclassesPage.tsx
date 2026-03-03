import { useState, useMemo } from "react";
import { 
  Search, Calendar, Clock, Users, Play, BookOpen, ArrowRight, 
  Award, TrendingUp, Star, Filter, X, ChevronRight, Sparkles,
  GraduationCap, Briefcase, LineChart, Globe, Zap, Shield, ShoppingCart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { CartProvider, CartSidebar, CartButton, useCart } from "@/components/CartContext";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

// Données des masterclass complètes
const masterclassData = [
  // FINANCE (2 masterclasses)
  {
    id: 1,
    title: "Introduction à l'Investissement ESG",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Finance Durable, HEC Paris",
    instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-15",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Découvrez les principes de l'investissement durable et son impact sur la finance moderne.",
    participants: 245,
    category: "Finance",
    level: "Intermédiaire",
    rating: 4.8,
    highlights: ["ESG", "Finance durable", "Impact investing"],
    color: "from-blue-600 to-cyan-600",
    price: 299
  },
  {
    id: 7,
    title: "Analyse Technique pour Traders",
    instructor: "Philippe Moreau",
    instructorTitle: "Trader Professionnel, ex-Société Générale",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-28",
    time: "18:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Maîtrisez l'analyse technique et les indicateurs clés pour optimiser vos trades.",
    participants: 178,
    category: "Finance",
    level: "Avancé",
    rating: 4.9,
    highlights: ["Trading", "Analyse technique", "Indicateurs"],
    color: "from-blue-600 to-indigo-600",
    price: 399
  },

  // OUTILS DIGITAUX (2 masterclasses)
  {
    id: 2,
    title: "Automatisation des Tâches avec Python",
    instructor: "Thomas Martin",
    instructorTitle: "Lead Developer, Google",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-20",
    time: "10:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-4000743ab122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Apprenez à automatiser vos tâches quotidiennes avec des scripts Python efficaces.",
    participants: 189,
    category: "Outils Digitaux",
    level: "Débutant",
    rating: 4.7,
    highlights: ["Python", "Scripting", "Productivité"],
    color: "from-purple-600 to-pink-600",
    price: 249
  },
  {
    id: 8,
    title: "Maîtrisez Microsoft Excel - Niveau Expert",
    instructor: "Claire Dubois",
    instructorTitle: "Formatrice Microsoft Certified",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-05",
    time: "14:00",
    duration: "4h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Devenez un expert Excel : tableaux croisés, macros, VBA et Power Query.",
    participants: 312,
    category: "Outils Digitaux",
    level: "Avancé",
    rating: 4.9,
    highlights: ["Excel", "VBA", "Macros"],
    color: "from-green-600 to-emerald-600",
    price: 349
  },

  // DATA (2 masterclasses)
  {
    id: 3,
    title: "Data Visualization avec Tableau",
    instructor: "Sophie Laurent",
    instructorTitle: "Data Visualization Expert, Microsoft",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-02-28",
    time: "15:00",
    duration: "2h30",
    status: "past",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Créez des dashboards interactifs et des visualisations de données percutantes.",
    participants: 312,
    category: "Data",
    level: "Intermédiaire",
    rating: 4.8,
    highlights: ["Tableau", "Dashboards", "Data storytelling"],
    color: "from-orange-600 to-red-600",
    price: 379
  },
  {
    id: 6,
    title: "Machine Learning pour Débutants",
    instructor: "Sophie Laurent",
    instructorTitle: "AI Research Scientist",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-10",
    time: "11:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Une introduction complète au machine learning et à ses applications pratiques.",
    participants: 423,
    category: "Data",
    level: "Débutant",
    rating: 4.9,
    highlights: ["Machine Learning", "IA", "Python"],
    color: "from-indigo-600 to-purple-600",
    price: 499
  },
  {
    id: 9,
    title: "Big Data avec Apache Spark",
    instructor: "Antoine Bernard",
    instructorTitle: "Data Engineer, Datadog",
    instructorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-12",
    time: "10:00",
    duration: "4h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Traitez des volumes massifs de données avec Apache Spark et Scala.",
    participants: 156,
    category: "Data",
    level: "Avancé",
    rating: 4.7,
    highlights: ["Spark", "Big Data", "Scala"],
    color: "from-blue-600 to-purple-600",
    price: 599
  },

  // ENTREPRENEURIAT (2 masterclasses)
  {
    id: 4,
    title: "Business Plan pour Startups",
    instructor: "Jean-Pierre Rousseau",
    instructorTitle: "Serial Entrepreneur, Mentor Station F",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-02-15",
    time: "09:00",
    duration: "4h",
    status: "past",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Élaborez un business plan convaincant pour financer votre projet entrepreneurial.",
    participants: 156,
    category: "Entrepreneuriat",
    level: "Avancé",
    rating: 4.8,
    highlights: ["Business plan", "Financement", "Pitch"],
    color: "from-yellow-600 to-orange-600",
    price: 449
  },
  {
    id: 10,
    title: "Growth Hacking pour Startups",
    instructor: "Julie Martinez",
    instructorTitle: "Growth Lead, Blablacar",
    instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-22",
    time: "14:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Découvrez les techniques de growth hacking pour acquérir des utilisateurs rapidement.",
    participants: 234,
    category: "Entrepreneuriat",
    level: "Intermédiaire",
    rating: 4.9,
    highlights: ["Growth Hacking", "Acquisition", "SEO/SEA"],
    color: "from-green-600 to-teal-600",
    price: 329
  },
  {
    id: 11,
    title: "Levée de Fonds : Guide Complet",
    instructor: "Marc Delacroix",
    instructorTitle: "Venture Partner, Partech",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-18",
    time: "18:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Préparez votre levée de fonds et convaincre les investisseurs.",
    participants: 98,
    category: "Entrepreneuriat",
    level: "Avancé",
    rating: 4.9,
    highlights: ["Venture Capital", "Pitch", "Due diligence"],
    color: "from-purple-600 to-pink-600",
    price: 549
  },

  // SOFT SKILLS (3 masterclasses)
  {
    id: 5,
    title: "Leadership et Intelligence Émotionnelle",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Psychologie, Coach Exécutif",
    instructorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-25",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Développez votre leadership grâce à une meilleure compréhension des émotions.",
    participants: 98,
    category: "Soft Skills",
    level: "Tous niveaux",
    rating: 4.7,
    highlights: ["Leadership", "EQ", "Management"],
    color: "from-pink-600 to-rose-600",
    price: 279
  },
  {
    id: 12,
    title: "Prise de Parole en Public",
    instructor: "Stéphane Bern",
    instructorTitle: "Coach en Communication",
    instructorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-08",
    time: "19:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Maîtrisez l'art du storytelling et captez l'attention de votre audience.",
    participants: 267,
    category: "Soft Skills",
    level: "Débutant",
    rating: 4.9,
    highlights: ["Communication", "Storytelling", "Présentation"],
    color: "from-indigo-600 to-blue-600",
    price: 259
  },
  {
    id: 13,
    title: "Gestion du Stress et Mindfulness",
    instructor: "Dr. Sarah Cohen",
    instructorTitle: "Psychologue Clinicienne",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-03-30",
    time: "12:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Techniques de respiration et méditation pour gérer le stress professionnel.",
    participants: 145,
    category: "Soft Skills",
    level: "Débutant",
    rating: 4.8,
    highlights: ["Mindfulness", "Stress", "Bien-être"],
    color: "from-teal-600 to-cyan-600",
    price: 199
  },
  {
    id: 14,
    title: "Négociation et Communication Persuasives",
    instructor: "Laurent Dupont",
    instructorTitle: "Expert en Négociation, Harvard Alumni",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    date: "2024-04-20",
    time: "14:00",
    duration: "4h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Techniques de négociation avancées pour obtenir le meilleur accord.",
    participants: 189,
    category: "Soft Skills",
    level: "Intermédiaire",
    rating: 4.9,
    highlights: ["Négociation", "Persuasion", "Communication"],
    color: "from-amber-600 to-orange-600",
    price: 389
  }
];

// Catégories avec icônes
const categoryIcons: Record<string, JSX.Element> = {
  "Finance": <LineChart className="w-4 h-4" />,
  "Outils Digitaux": <Zap className="w-4 h-4" />,
  "Data": <LineChart className="w-4 h-4" />,
  "Entrepreneuriat": <Briefcase className="w-4 h-4" />,
  "Soft Skills": <Users className="w-4 h-4" />
};

const MasterclassesPageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedMasterclass, setSelectedMasterclass] = useState<typeof masterclassData[0] | null>(null);
  const { addToCart } = useCart();

  // Extraire les catégories et niveaux uniques
  const categories = useMemo(() => {
    const cats = [...new Set(masterclassData.map(mc => mc.category))];
    return ["all", ...cats];
  }, []);

  const levels = useMemo(() => {
    const levs = [...new Set(masterclassData.map(mc => mc.level))];
    return ["all", ...levs];
  }, []);

  // Filtrer les masterclass
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

  // Séparer les masterclass à venir et passées
  const upcomingMasterclass = filteredMasterclass.filter(mc => mc.status === "upcoming");
  const pastMasterclass = filteredMasterclass.filter(mc => mc.status === "past");

  // Statistiques
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Masterclass Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(346,100%,25%)] via-[hsl(346,100%,25%)/80] to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full max-w-7xl flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-light tracking-wider">Formation d'excellence</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl font-light mb-2 leading-tight"
              >
                Masterclasses
                <br />
                <span className="font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                  Business Revente
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base text-white/80 font-light max-w-xl mb-4"
              >
                Des formations exclusives animées par des experts reconnus.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <button className="group px-6 py-2.5 bg-white text-[hsl(346,100%,25%)] text-sm font-medium rounded-full hover:shadow-lg transition-all flex items-center gap-2">
                  Découvrir
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-2.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all">
                  Programme
                </button>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path fill="white" fillOpacity="1" d="M0,96L1440,32L1440,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container mx-auto px-4 -mt-10 relative z-10 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <BookOpen className="w-4 h-4" />, value: stats.total, label: "Masterclasses", color: "from-blue-500 to-cyan-500" },
              { icon: <Calendar className="w-4 h-4" />, value: stats.upcoming, label: "À venir", color: "from-green-500 to-emerald-500" },
              { icon: <Users className="w-4 h-4" />, value: stats.totalParticipants + '+', label: "Participants", color: "from-purple-500 to-pink-500" },
              { icon: <Star className="w-4 h-4" />, value: stats.avgRating, label: "Note", color: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 flex items-center justify-center mb-2`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
                <p className="text-xs text-gray-500 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-20 shadow-sm">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une masterclass..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-0 focus:bg-white transition-all text-gray-900 text-sm placeholder-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="text-sm">Filtres</span>
              </button>

              <div className="hidden lg:flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 p-0.5 bg-gray-50 border border-gray-200 rounded-lg">
                  {[
                    { value: "all", label: "Tout" },
                    { value: "upcoming", label: "Live" },
                    { value: "past", label: "Replay" }
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        filterStatus === status.value
                          ? "bg-[hsl(346,100%,35%)] text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-900 hover:bg-white"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-0 text-gray-900 text-xs rounded-lg appearance-none cursor-pointer min-w-[140px]"
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
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-0 text-gray-900 text-xs rounded-lg appearance-none cursor-pointer min-w-[120px]"
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
                    className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-900"
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
                  className="lg:hidden mt-3 space-y-2"
                >
                  <div className="flex gap-1">
                    {[
                      { value: "all", label: "Tout" },
                      { value: "upcoming", label: "Live" },
                      { value: "past", label: "Replay" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md ${
                          filterStatus === status.value
                            ? "bg-[hsl(346,100%,35%)] text-white"
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

        {/* Tags populaires */}
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[hsl(346,100%,35%)]" />
            <span className="text-xs text-gray-500 mr-1">Populaires :</span>
            {["Data", "Finance", "Soft Skills", "Python", "Excel"].map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(tag === "Python" || tag === "Excel" ? "Outils Digitaux" : tag);
                }}
                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 hover:border-[hsl(346,100%,35%)] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal - MASTERCLASSES ICI */}
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          {/* Résultats */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <span className="text-lg font-bold text-gray-900">{filteredMasterclass.length}</span> masterclass{filteredMasterclass.length > 1 ? 's' : ''} trouvée{filteredMasterclass.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Section À venir */}
          {filterStatus === "all" && upcomingMasterclass.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[hsl(346,100%,35%)] rounded-full" />
                Masterclasses à venir
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">
                  {upcomingMasterclass.length} sessions
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingMasterclass.map((masterclass, index) => (
                  <MasterclassCard 
                    key={masterclass.id} 
                    masterclass={masterclass} 
                    index={index} 
                    onRegister={handleRegister}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Section Passées */}
          {filterStatus === "all" && pastMasterclass.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-400 rounded-full" />
                Replays disponibles
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                  {pastMasterclass.length} sessions
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastMasterclass.map((masterclass, index) => (
                  <MasterclassCard 
                    key={masterclass.id} 
                    masterclass={masterclass} 
                    index={index} 
                    onRegister={handleRegister}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Vue filtrée (quand un filtre spécifique est sélectionné) */}
          {filterStatus !== "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMasterclass.map((masterclass, index) => (
                <MasterclassCard 
                  key={masterclass.id} 
                  masterclass={masterclass} 
                  index={index} 
                  onRegister={handleRegister}
                  onAddToCart={handleAddToCart}
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full mb-3">
                <BookOpen className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1">Aucune masterclass trouvée</h3>
              <p className="text-sm text-gray-500 mb-4">Essayez d'ajuster vos filtres</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[hsl(346,100%,35%)] text-white text-sm rounded-lg hover:bg-[hsl(346,100%,30%)] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>

        {/* Section Newsletter */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 mt-8">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-xl md:text-2xl font-light text-white">
                  Restez informé des <span className="font-bold text-[hsl(346,100%,65%)]">prochaines masterclasses</span>
                </h2>
                <p className="text-white/60 text-sm">
                  Recevez les dernières actualités directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-lg focus:border-[hsl(346,100%,65%)]"
                  />
                  <button className="px-4 py-2 bg-[hsl(346,100%,35%)] text-white text-sm rounded-lg hover:bg-[hsl(346,100%,30%)] transition-colors">
                    S'inscrire
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'inscription modal */}
      <AnimatePresence>
        {showRegistrationForm && selectedMasterclass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRegistrationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header du modal */}
              <div className="bg-gradient-to-r from-[hsl(346,100%,35%)] to-[hsl(346,100%,45%)] text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Inscription à la masterclass</h2>
                    <p className="text-white/80">{selectedMasterclass.title}</p>
                    <p className="text-sm text-white/60 mt-1">avec {selectedMasterclass.instructor}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contenu du formulaire */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <MasterclassRegistrationForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panier latéral et bouton */}
      <CartSidebar />
      <CartButton />
    </Layout>
  );
};

// Composant Card
const MasterclassCard = ({ masterclass, index, onRegister, onAddToCart }: { 
  masterclass: typeof masterclassData[0], 
  index: number,
  onRegister: (masterclass: typeof masterclassData[0]) => void,
  onAddToCart: (masterclass: typeof masterclassData[0]) => void
}) => {
  const isUpcoming = masterclass.status === "upcoming";
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-xl border border-gray-200 hover:border-[hsl(346,100%,35%)] hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <motion.img
          src={masterclass.thumbnail}
          alt={masterclass.title}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
        
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full shadow-sm">
            {masterclass.category}
          </span>
          <span className="px-2 py-0.5 bg-[hsl(346,100%,35%)] text-xs font-medium text-white rounded-full shadow-sm">
            {masterclass.level}
          </span>
        </div>
        
        {!isUpcoming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-4 h-4 text-[hsl(346,100%,35%)] ml-0.5" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex-shrink-0">
            <img
              src={masterclass.instructorImage}
              alt={masterclass.instructor}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 leading-tight truncate">
              {masterclass.title}
            </h3>
            <p className="text-xs text-gray-600 truncate">{masterclass.instructor}</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {masterclass.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {masterclass.highlights.slice(0, 2).map((highlight, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
              {highlight}
            </span>
          ))}
          {masterclass.highlights.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full">
              +{masterclass.highlights.length - 2}
            </span>
          )}
        </div>

        {/* Prix */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[hsl(346,100%,35%)]">{masterclass.price}</span>
            <span className="text-sm text-gray-500">€</span>
            {isUpcoming && (
              <span className="ml-2 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                Places limitées
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar className="w-3 h-3 text-[hsl(346,100%,35%)]" />
            <span>{new Date(masterclass.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-3 h-3 text-[hsl(346,100%,35%)]" />
            <span>{masterclass.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-3 h-3 text-[hsl(346,100%,35%)]" />
            <span>{masterclass.participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-900">{masterclass.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            isUpcoming 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}>
            {isUpcoming ? "À venir" : "Replay"}
          </span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-0.5"
            >
              {showDetails ? "Moins" : "En savoir plus"}
              <ChevronRight className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
            </button>
            
            {isUpcoming ? (
              <button 
                onClick={() => onRegister(masterclass)}
                className="text-xs font-medium text-[hsl(346,100%,35%)] hover:text-[hsl(346,100%,25%)] transition-colors flex items-center gap-0.5"
              >
                S'inscrire
                <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button className="text-xs font-medium text-[hsl(346,100%,35%)] hover:text-[hsl(346,100%,25%)] transition-colors flex items-center gap-0.5">
                Voir
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
        
        {/* Section détails dépliable */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 bg-gray-50"
            >
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contenu de la masterclass</h4>
                  <ul className="space-y-1">
                    {masterclass.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="w-1 h-1 bg-[hsl(346,100%,35%)] rounded-full mt-1.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">À propos de l'instructeur</h4>
                  <p className="text-xs text-gray-600">{masterclass.instructorTitle}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(masterclass.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {masterclass.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUpcoming && (
                      <button 
                        onClick={() => onAddToCart(masterclass)}
                        className="px-3 py-1 border border-[hsl(346,100%,35%)] text-[hsl(346,100%,35%)] text-xs font-medium rounded-full hover:bg-[hsl(346,100%,5%)] transition-colors flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Réserver
                      </button>
                    )}
                    <button 
                      onClick={() => onRegister(masterclass)}
                      className="px-3 py-1 bg-[hsl(346,100%,35%)] text-white text-xs font-medium rounded-full hover:bg-[hsl(346,100%,30%)] transition-colors"
                    >
                      {isUpcoming ? "S'inscrire maintenant" : "Accéder au replay"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

export default () => (
  <CartProvider>
    <MasterclassesPageContent />
  </CartProvider>
);