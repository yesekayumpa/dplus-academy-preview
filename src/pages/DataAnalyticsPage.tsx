import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  BarChart3, 
  Database, 
  PieChart, 
  TrendingUp, 
  Award,
  Clock,
  Users,
  Star,
  Calendar,
  ArrowRight,
  Filter,
  X,
  Target,
  Shield,
  BookOpen,
  GraduationCap,
  LineChart,
  Brain,
  Activity,
  GitBranch,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { popularCourses, getCoursesByCategory } from "@/data/courses";

// Formations relatives à Data & Analytics
const dataAnalyticsCourses = [
  {
    id: "data-science-fundamentals",
    title: "Data Science Fundamentals",
    description: "Maîtrisez les fondamentaux de la data science",
    longDescription: "Formation complète sur les concepts fondamentaux de la data science, incluant la collecte, le nettoyage et l'analyse de données.",
    category: "Data & Analytics",
    level: "débutant",
    duration: "50 heures",
    price: 655960, // 1000 FCFA * 655,96
    rating: 4.8,
    reviews: 234,
    students: 720,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Data Scientist Senior",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Data Science", "Python", "Statistiques", "Analyse"],
    objectives: [
      "Comprendre les concepts data science",
      "Maîtriser Python pour l'analyse",
      "Appliquer les statistiques",
      "Visualiser les données"
    ],
    prerequisites: ["Base en programmation", "Mathématiques"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: BarChart3,
    features: [
      "Projets pratiques",
      "Jupyter notebooks inclus",
      "Certification Data Science",
      "Support communautaire"
    ],
    schedule: "Mardi & Jeudi 18h-20h",
    nextSession: "2024-04-05"
  },
  {
    id: "python-data-analysis",
    title: "Python pour l'Analyse de Données",
    description: "Devenez expert en analyse avec Python",
    longDescription: "Formation spécialisée sur l'écosystème Python pour l'analyse de données : Pandas, NumPy, Matplotlib et Scikit-learn.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "60 heures",
    price: 787152, // 1200 FCFA * 655,96
    rating: 4.9,
    reviews: 189,
    students: 580,
    instructor: "Jean-Marc Martin",
    instructorTitle: "Python Data Expert",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=center",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    objectives: [
      "Manipuler des données avec Pandas",
      "Analyser avec NumPy",
      "Visualiser avec Matplotlib",
      "Appliquer le machine learning"
    ],
    prerequisites: ["Python de base", "Statistiques"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "disponible",
    icon: Database,
    features: [
      "Bibliothèque complète",
      "Projets réels",
      "Certification Python Data",
      "Mentorat inclus"
    ],
    schedule: "Lundi & Mercredi 19h-21h",
    nextSession: "2024-04-08"
  },
  {
    id: "r-shiny-masterclass",
    title: "R & Shiny Masterclass",
    description: "Créez des applications web interactives",
    longDescription: "Formation avancée sur R et Shiny pour développer des applications web interactives et des dashboards dynamiques.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "40 heures",
    price: 590364, // 900 FCFA * 655,96
    rating: 4.7,
    reviews: 127,
    students: 450,
    instructor: "Dr. Sophie Laurent",
    instructorTitle: "R & Shiny Expert",
    image: "https://images.unsplash.com/photo-1554224155-6af6314bafcd?w=400&h=300&fit=crop&crop=center",
    tags: ["R", "Shiny", "Data Visualization", "Web Apps"],
    objectives: [
      "Maîtriser le langage R",
      "Développer des apps Shiny",
      "Créer des dashboards",
      "Déployer des applications"
    ],
    prerequisites: ["Base en R", "Statistiques"],
    isUpdated: true,
    lastUpdateDate: "2024-03-12",
    status: "disponible",
    icon: PieChart,
    features: [
      "Apps Shiny incluses",
      "Projets interactifs",
      "Certification R Shiny",
      "Support expert"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-12"
  },
  {
    id: "sql-database-analytics",
    title: "SQL & Database Analytics",
    description: "Maîtrisez SQL pour l'analyse de données",
    longDescription: "Formation complète sur SQL et l'analyse de bases de données relationnelles et NoSQL.",
    category: "Data & Analytics",
    level: "débutant",
    duration: "35 heures",
    price: 459168, // 700 FCFA * 655,96
    rating: 4.6,
    reviews: 156,
    students: 520,
    instructor: "Philippe Bernard",
    instructorTitle: "Database Expert",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    tags: ["SQL", "Database", "Analytics", "PostgreSQL"],
    objectives: [
      "Maîtriser les requêtes SQL",
      "Optimiser les performances",
      "Analyser les données",
      "Gérer les bases de données"
    ],
    prerequisites: ["Base en informatique"],
    isUpdated: false,
    lastUpdateDate: "2024-02-15",
    status: "disponible",
    icon: Database,
    features: [
      "Lab SQL inclus",
      "Projets de base de données",
      "Certification SQL",
      "Support technique"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-15"
  },
  {
    id: "business-intelligence-powerbi",
    title: "Business Intelligence avec Power BI",
    description: "Créez des dashboards interactifs avec Power BI",
    longDescription: "Formation spécialisée sur Power BI pour créer des tableaux de bord interactifs et des rapports analytiques.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "45 heures",
    price: 655960, // 1000 FCFA * 655,96
    rating: 4.8,
    reviews: 178,
    students: 480,
    instructor: "Claire Petit",
    instructorTitle: "BI Consultant",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Power BI", "Dashboards", "DAX", "Analytics"],
    objectives: [
      "Maîtriser Power BI",
      "Créer des dashboards",
      "Utiliser le langage DAX",
      "Analyser les données métier"
    ],
    prerequisites: ["Excel avancé", "Notions de données"],
    isUpdated: true,
    lastUpdateDate: "2024-03-08",
    status: "disponible",
    icon: TrendingUp,
    features: [
      "Licence Power BI incluse",
      "Projets BI réels",
      "Certification Power BI",
      "Templates inclus"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-18"
  },
  {
    id: "tableau-data-visualization",
    title: "Tableau Expert - Data Visualization",
    description: "Devenez expert en visualisation de données",
    longDescription: "Formation complète sur Tableau pour créer des visualisations percutantes et des dashboards interactifs.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "40 heures",
    price: 590364, // 900 FCFA * 655,96
    rating: 4.7,
    reviews: 134,
    students: 380,
    instructor: "Alexandre Kofi",
    instructorTitle: "Tableau Expert",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=400&h=300&fit=crop&crop=center",
    tags: ["Tableau", "Visualization", "Dashboards", "Storytelling"],
    objectives: [
      "Maîtriser Tableau Desktop",
      "Créer des visualisations",
      "Développer des dashboards",
      "Raconter des histoires avec les données"
    ],
    prerequisites: ["Notions de données"],
    isUpdated: false,
    lastUpdateDate: "2024-02-28",
    status: "disponible",
    icon: LineChart,
    features: [
      "Licence Tableau incluse",
      "Projets de visualisation",
      "Certification Tableau",
      "Portfolio inclus"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-20"
  },
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Maîtrisez les bases du machine learning",
    longDescription: "Formation intensive sur les concepts fondamentaux du machine learning et les algorithmes les plus courants.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "55 heures",
    price: 852748, // 1300 FCFA * 655,96
    rating: 4.8,
    reviews: 112,
    students: 290,
    instructor: "Dr. Marie Claire",
    instructorTitle: "ML Engineer",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["Machine Learning", "Scikit-learn", "Python", "AI"],
    objectives: [
      "Comprendre les algorithmes ML",
      "Préparer les données",
      "Entraîner des modèles",
      "Évaluer les performances"
    ],
    prerequisites: ["Python avancé", "Statistiques", "Mathématiques"],
    isUpdated: true,
    lastUpdateDate: "2024-03-18",
    status: "disponible",
    icon: Brain,
    features: [
      "GPU Cloud access",
      "Projets ML réels",
      "Certification ML",
      "Mentorat expert"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-22"
  },
  {
    id: "deep-learning-neural-networks",
    title: "Deep Learning & Neural Networks",
    description: "Plongez dans le deep learning",
    longDescription: "Formation avancée sur les réseaux de neurones, le deep learning et TensorFlow/PyTorch.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "70 heures",
    price: 983940, // 1500 FCFA * 655,96
    rating: 4.9,
    reviews: 89,
    students: 180,
    instructor: "Thomas Bernard",
    instructorTitle: "Deep Learning Expert",
    image: "https://images.unsplash.com/photo-1512941937309-5ba8c2c101c0?w=400&h=300&fit=crop&crop=center",
    tags: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch"],
    objectives: [
      "Comprendre les réseaux de neurones",
      "Maîtriser TensorFlow/PyTorch",
      "Développer des modèles DL",
      "Déployer en production"
    ],
    prerequisites: ["Machine Learning", "Python avancé", "Mathématiques"],
    isUpdated: false,
    lastUpdateDate: "2024-02-20",
    status: "réservation",
    icon: Activity,
    features: [
      "GPU Cloud inclus",
      "Projets deep learning",
      "Certification DL",
      "Support continu"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-05"
  },
  {
    id: "data-engineering-pipelines",
    title: "Data Engineering & Pipelines",
    description: "Construisez des pipelines de données robustes",
    longDescription: "Formation sur l'ingénierie des données, les ETL, et la construction de pipelines de données à grande échelle.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "60 heures",
    price: 852748, // 1300 FCFA * 655,96
    rating: 4.7,
    reviews: 78,
    students: 150,
    instructor: "Marc Rousseau",
    instructorTitle: "Data Engineer",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    tags: ["Data Engineering", "ETL", "Apache Spark", "Cloud"],
    objectives: [
      "Concevoir des pipelines ETL",
      "Utiliser Apache Spark",
      "Optimiser les performances",
      "Déployer dans le cloud"
    ],
    prerequisites: ["Python", "SQL", "Cloud"],
    isUpdated: true,
    lastUpdateDate: "2024-03-20",
    status: "disponible",
    icon: GitBranch,
    features: [
      "Cloud credits inclus",
      "Projets de data engineering",
      "Certification Data Engineer",
      "Accès aux outils professionnels"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-25"
  },
  {
    id: "nlp-text-analytics",
    title: "NLP & Text Analytics",
    description: "Analysez le texte avec l'IA",
    longDescription: "Formation spécialisée sur le traitement du langage naturel et l'analyse de textes avec les techniques modernes de NLP.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "50 heures",
    price: 787152, // 1200 FCFA * 655,96
    rating: 4.6,
    reviews: 67,
    students: 120,
    instructor: "Dr. Jean-Pierre Ndiaye",
    instructorTitle: "NLP Expert",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center",
    tags: ["NLP", "Text Analytics", "Transformers", "BERT"],
    objectives: [
      "Maîtriser les techniques NLP",
      "Utiliser les transformers",
      "Analyser les sentiments",
      "Construire des chatbots"
    ],
    prerequisites: ["Machine Learning", "Python avancé"],
    isUpdated: false,
    lastUpdateDate: "2024-02-25",
    status: "bientôt_disponible",
    icon: BookOpen,
    features: [
      "Modèles pré-entraînés inclus",
      "Projets NLP réels",
      "Certification NLP",
      "Support expert"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-10",
    availableDate: "2024-05-10"
  }
];

const DataAnalyticsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const levels = ["all", "débutant", "intermédiaire", "avancé"];
  const statuses = ["all", "disponible", "réservation", "bientôt_disponible"];

  const filteredCourses = dataAnalyticsCourses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const stats = {
    total: dataAnalyticsCourses.length,
    available: dataAnalyticsCourses.filter(c => c.status === "disponible").length,
    students: dataAnalyticsCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (dataAnalyticsCourses.reduce((acc, c) => acc + c.rating, 0) / dataAnalyticsCourses.length).toFixed(1)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "réservation": return "bg-amber-50 text-amber-700 border-amber-200";
      case "bientôt_disponible": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "disponible": return <CheckCircle className="w-3 h-3" />;
      case "réservation": return <Calendar className="w-3 h-3" />;
      case "bientôt_disponible": return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "débutant": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "intermédiaire": return "bg-amber-50 text-amber-700 border-amber-200";
      case "avancé": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevel("all");
    setSelectedStatus("all");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section - Bordeaux */}
        <section className="relative bg-[#800020] text-white border-b-4 border-[#600018]">
          <div className="absolute inset-0 bg-[#600018] opacity-50"></div>
          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full border-2 border-white/20">
                  <BarChart3 className="w-10 h-10" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-montserrat tracking-tight">
                Data & Analytics
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto font-light">
                Transformez les données en insights et devenez expert en analyse de données
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { value: stats.total, label: "Formations", icon: BookOpen },
                  { value: stats.available, label: "Disponibles", icon: CheckCircle },
                  { value: stats.students.toLocaleString(), label: "Apprenants", icon: Users },
                  { value: stats.avgRating, label: "Note moyenne", icon: Star }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/80" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white border-2 border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-[#800020] outline-none transition-colors"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-[#800020] transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-[#800020] text-white text-xs px-2 py-1">
                    {[
                      selectedLevel !== "all" && selectedLevel,
                      selectedStatus !== "all" && selectedStatus
                    ].filter(Boolean).length}
                  </span>
                )}
              </button>

              {(searchTerm || selectedLevel !== "all" || selectedStatus !== "all") && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-red-200 text-red-700 hover:border-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Réinitialiser
                </button>
              )}
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t-2 border-gray-200 pt-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Niveau
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 border-2 transition-colors ${
                              selectedLevel === level
                                ? "bg-[#800020] text-white border-[#800020]"
                                : "bg-white text-gray-700 border-gray-200 hover:border-[#800020]"
                            }`}
                          >
                            {level === "all" ? "Tous les niveaux" : level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Statut
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-2 border-2 transition-colors ${
                              selectedStatus === status
                                ? "bg-[#800020] text-white border-[#800020]"
                                : "bg-white text-gray-700 border-gray-200 hover:border-[#800020]"
                            }`}
                          >
                            {status === "all" ? "Tous les statuts" : 
                             status === "disponible" ? "Disponible" :
                             status === "réservation" ? "Réservation" : "Bientôt disponible"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="mb-8 border-b-2 border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} disponible{filteredCourses.length > 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600">
              Explorez nos formations spécialisées en data et analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 hover:border-[#800020] transition-colors"
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover border-b-2 border-gray-200"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 text-xs font-medium border-2 flex items-center gap-1 ${getStatusColor(course.status)}`}>
                      {getStatusIcon(course.status)}
                      {course.status === "disponible" ? "Disponible" :
                       course.status === "réservation" ? "Réservation" : "Bientôt dispo"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium border-2 ${getLevelColor(course.level)}`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <course.icon className="w-6 h-6 text-[#800020] flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs border border-gray-200">
                        +{course.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-[#800020]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-[#800020]" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>{course.rating} ({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-[#800020]" />
                      <span>Certificat</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pt-4 border-t-2 border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-[#800020]">
                        {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/formation/${course.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#800020] text-white hover:bg-[#600018] transition-colors border-2 border-[#800020]"
                    >
                      Voir détails
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {course.status === "disponible" && (
                      <button
                        className="px-4 py-3 border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
                      >
                        S'inscrire
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 border-2 border-gray-200">
              <div className="w-16 h-16 bg-gray-100 border-2 border-gray-200 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos filtres ou termes de recherche
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#800020] text-white hover:bg-[#600018] transition-colors border-2 border-[#800020]"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-[#800020] text-white py-16 border-t-4 border-[#600018]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Prêt à devenir expert en data ?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80 font-light">
                Rejoignez nos formations et développez les compétences les plus recherchées du marché
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-[#800020] hover:bg-gray-100 transition-colors border-2 border-white font-semibold">
                  Contacter un conseiller
                </button>
                <button className="px-8 py-3 bg-transparent text-white hover:bg-white/10 transition-colors border-2 border-white font-semibold">
                  Télécharger le catalogue
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DataAnalyticsPage;