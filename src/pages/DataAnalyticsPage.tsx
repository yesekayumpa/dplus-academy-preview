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
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import FormationPagination from "@/components/academy/FormationPagination";

// Formations relatives à Data & Analytics
const dataAnalyticsCourses = [
  {
    id: "data-science-fundamentals",
    title: "Data Science Fundamentals",
    description: "Maîtrisez les fondamentaux de la data science",
    longDescription: "Formation complète sur les concepts fondamentaux de la data science.",
    category: "Data & Analytics",
    level: "débutant",
    duration: "50h",
    price: 655960,
    rating: 4.8,
    reviews: 234,
    students: 720,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Data Scientist Senior",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Data Science", "Python", "Statistiques"],
    status: "disponible",
    icon: BarChart3,
    features: ["Projets pratiques", "Certification"],
    type: "e-learning"
  },
  {
    id: "python-data-analysis",
    title: "Python pour l'Analyse de Données",
    description: "Devenez expert en analyse avec Python",
    longDescription: "Formation spécialisée sur l'écosystème Python pour l'analyse.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "60h",
    price: 787152,
    rating: 4.9,
    reviews: 189,
    students: 580,
    instructor: "Jean-Marc Martin",
    instructorTitle: "Python Data Expert",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=center",
    tags: ["Python", "Pandas", "NumPy"],
    status: "disponible",
    icon: Database,
    features: ["Projets réels", "Certification"],
    type: "masterclass"
  },
  {
    id: "r-shiny-masterclass",
    title: "R & Shiny Masterclass",
    description: "Créez des applications web interactives",
    longDescription: "Formation avancée sur R et Shiny pour développer des applications.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "40h",
    price: 590364,
    rating: 4.7,
    reviews: 127,
    students: 450,
    instructor: "Dr. Sophie Laurent",
    instructorTitle: "R & Shiny Expert",
    image: "https://images.unsplash.com/photo-1554224155-6af6314bafcd?w=400&h=300&fit=crop&crop=center",
    tags: ["R", "Shiny", "Visualization"],
    status: "disponible",
    icon: PieChart,
    features: ["Apps incluses", "Certification"],
    type: "corporate"
  },
  {
    id: "sql-database-analytics",
    title: "SQL & Database Analytics",
    description: "Maîtrisez SQL pour l'analyse de données",
    longDescription: "Formation complète sur SQL et l'analyse de bases de données.",
    category: "Data & Analytics",
    level: "débutant",
    duration: "35h",
    price: 459168,
    rating: 4.6,
    reviews: 156,
    students: 520,
    instructor: "Philippe Bernard",
    instructorTitle: "Database Expert",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    tags: ["SQL", "Database", "Analytics"],
    status: "disponible",
    icon: Database,
    features: ["Lab SQL", "Certification"],
    type: "e-learning"
  },
  {
    id: "business-intelligence-powerbi",
    title: "Business Intelligence Power BI",
    description: "Créez des dashboards interactifs",
    longDescription: "Formation spécialisée sur Power BI pour créer des tableaux de bord.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "45h",
    price: 655960,
    rating: 4.8,
    reviews: 178,
    students: 480,
    instructor: "Claire Petit",
    instructorTitle: "BI Consultant",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Power BI", "Dashboards", "DAX"],
    status: "disponible",
    icon: TrendingUp,
    features: ["Projets BI", "Certification"],
    type: "corporate"
  },
  {
    id: "tableau-data-visualization",
    title: "Tableau Expert",
    description: "Devenez expert en visualisation",
    longDescription: "Formation complète sur Tableau pour créer des visualisations.",
    category: "Data & Analytics",
    level: "intermédiaire",
    duration: "40h",
    price: 590364,
    rating: 4.7,
    reviews: 134,
    students: 380,
    instructor: "Alexandre Kofi",
    instructorTitle: "Tableau Expert",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=400&h=300&fit=crop&crop=center",
    tags: ["Tableau", "Visualization", "Dashboards"],
    status: "disponible",
    icon: LineChart,
    features: ["Projets inclus", "Certification"],
    type: "masterclass"
  },
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Maîtrisez les bases du machine learning",
    longDescription: "Formation sur les concepts fondamentaux du machine learning.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "55h",
    price: 852748,
    rating: 4.8,
    reviews: 112,
    students: 290,
    instructor: "Dr. Marie Claire",
    instructorTitle: "ML Engineer",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["ML", "Scikit-learn", "Python"],
    status: "disponible",
    icon: Brain,
    features: ["Projets ML", "Certification"],
    type: "masterclass"
  },
  {
    id: "deep-learning-neural-networks",
    title: "Deep Learning & Neural Networks",
    description: "Plongez dans le deep learning",
    longDescription: "Formation avancée sur les réseaux de neurones.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "70h",
    price: 983940,
    rating: 4.9,
    reviews: 89,
    students: 180,
    instructor: "Thomas Bernard",
    instructorTitle: "Deep Learning Expert",
    image: "https://images.unsplash.com/photo-1512941937309-5ba8c2c101c0?w=400&h=300&fit=crop&crop=center",
    tags: ["Deep Learning", "TensorFlow", "PyTorch"],
    status: "réservation",
    icon: Activity,
    features: ["GPU inclus", "Certification"],
    type: "masterclass"
  },
  {
    id: "data-engineering-pipelines",
    title: "Data Engineering & Pipelines",
    description: "Construisez des pipelines de données",
    longDescription: "Formation sur l'ingénierie des données et les ETL.",
    category: "Data & Analytics",
    level: "avancé",
    duration: "60h",
    price: 852748,
    rating: 4.7,
    reviews: 78,
    students: 150,
    instructor: "Marc Rousseau",
    instructorTitle: "Data Engineer",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    tags: ["Data Engineering", "ETL", "Spark"],
    status: "disponible",
    icon: GitBranch,
    features: ["Cloud credits", "Certification"],
    type: "corporate"
  }
];

const DataAnalyticsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLevel, selectedStatus]);

  const stats = {
    total: dataAnalyticsCourses.length,
    available: dataAnalyticsCourses.filter(c => c.status === "disponible").length,
    students: dataAnalyticsCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (dataAnalyticsCourses.reduce((acc, c) => acc + c.rating, 0) / dataAnalyticsCourses.length).toFixed(1)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible": return "bg-green-50 text-green-700 border-green-200";
      case "réservation": return "bg-blue-50 text-blue-700 border-blue-200";
      case "bientôt_disponible": return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "débutant": return "bg-emerald-50 text-emerald-700";
      case "intermédiaire": return "bg-amber-50 text-amber-700";
      case "avancé": return "bg-rose-50 text-rose-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  const getCourseTypeBadge = (type: string) => {
    switch (type) {
      case "e-learning": return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: "E-learning" };
      case "corporate": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Corporate" };
      case "masterclass": return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Masterclass" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", label: "Formation" };
    }
  };

  const handleCourseClick = (course: any) => {
    const courseType = course.type || 'e-learning';
    
    switch (courseType) {
      case 'masterclass':
        navigate(`/masterclass/${course.id}`);
        break;
      case 'e-learning':
        navigate('/e-learning');
        break;
      case 'corporate':
        navigate('/corporate-programs');
        break;
      default:
        navigate('/e-learning');
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
        {/* Hero Section avec image de fond */}
        <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=600&fit=crop")' }}>
          <div className="absolute inset-0 bg-[#800020]/85"></div>
          <div className="relative container mx-auto px-4 pt-20 pb-10 lg:pt-24 lg:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-3">
                <div className="p-1.5 bg-white/10 rounded-full border border-white/20">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                Data & Analytics
              </h1>
              <p className="text-sm lg:text-base mb-5 text-white/80 max-w-2xl mx-auto">
                Transformez les données en insights et devenez expert en analyse de données
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold text-white mb-0.5">{stats.total}</div>
                  <div className="text-[10px] text-white/70">Formations</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold text-white mb-0.5">{stats.available}</div>
                  <div className="text-[10px] text-white/70">Disponibles</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold text-white mb-0.5">{stats.students.toLocaleString()}</div>
                  <div className="text-[10px] text-white/70">Apprenants</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-2">
                  <div className="text-lg font-bold text-white mb-0.5">{stats.avgRating}</div>
                  <div className="text-[10px] text-white/70">Note</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 -mt-4 relative z-10">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:border-[#800020] focus:outline-none transition-colors"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm border border-gray-200"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtres</span>
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-[#800020] text-white text-[10px] px-1 py-0.5 rounded-full">
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
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm border border-gray-200"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 mt-3 pt-3"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                        Niveau
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-2.5 py-1 text-[11px] rounded-lg border transition-colors ${
                              selectedLevel === level
                                ? "bg-[#800020] text-white border-[#800020]"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {level === "all" ? "Tous" : level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                        Statut
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-2.5 py-1 text-[11px] rounded-lg border transition-colors ${
                              selectedStatus === status
                                ? "bg-[#800020] text-white border-[#800020]"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {status === "all" ? "Tous" : 
                             status === "disponible" ? "Dispo" :
                             status === "réservation" ? "Résa" : "Bientôt"}
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

        {/* Courses Grid - Cartes réduites */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {currentCourses.length} formation{currentCourses.length > 1 ? 's' : ''} sur {filteredCourses.length}
              </h2>
              <p className="text-xs text-gray-500">
                Page {currentPage} sur {totalPages} • {filteredCourses.length === dataAnalyticsCourses.length 
                  ? "Toutes nos formations en data & analytics" 
                  : "Résultats de votre recherche"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCourses.map((course, index) => {
              const statusColor = getStatusColor(course.status);
              const levelColor = getLevelColor(course.level);
              const typeBadge = getCourseTypeBadge(course.type || 'e-learning');
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#800020] transition-colors cursor-pointer group hover:shadow-lg"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    <img 
                      src={course.image || "/assets/Masterclass.jpg"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/Masterclass.jpg";
                      }}
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full border ${statusColor}`}>
                        {course.status === "disponible" ? "Dispo" :
                         course.status === "réservation" ? "Résa" : "Bientôt"}
                      </span>
                    </div>
                    <div className="absolute top-1.5 right-1.5">
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${levelColor}`}>
                        {course.level === "débutant" ? "Débutant" :
                         course.level === "intermédiaire" ? "Intermédiaire" : "Avancé"}
                      </span>
                    </div>
                    {/* Badge de type en bas à gauche */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full border ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border} backdrop-blur-sm`}>
                        {typeBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-start gap-1.5 mb-1.5">
                      <course.icon className="w-3.5 h-3.5 text-[#800020] flex-shrink-0 mt-0.5" />
                      <h3 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-[10px] text-gray-500 mb-1.5 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {course.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="px-1 py-0.5 bg-gray-50 text-gray-600 text-[9px] rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 2 && (
                        <span className="px-1 py-0.5 bg-gray-50 text-gray-600 text-[9px] rounded border border-gray-200">
                          +{course.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      <div className="flex items-center gap-0.5 text-gray-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span className="text-[9px]">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-gray-500">
                        <Users className="w-2.5 h-2.5" />
                        <span className="text-[9px]">{course.students}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-amber-400" />
                        <span className="text-[10px] font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-900">
                          {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                        </span>
                        {course.price > 0 && (
                          <span className="text-[9px] text-gray-500 ml-1">
                            ~{((course.price / 655.96) / 12).toFixed(0)}€/mois
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 text-[#800020] text-[10px] font-medium">
                        Détails
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination interne */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#800020] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 border border-gray-200">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-0.5">
                Aucune formation trouvée
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Essayez de modifier vos filtres
              </p>
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 bg-[#800020] text-white text-xs rounded-lg hover:bg-[#600018] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section - Sans dégradé */}
        <section className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <BarChart3 className="w-5 h-5 text-[#800020] mx-auto mb-2" />
              <h2 className="text-base font-bold text-gray-900 mb-1">
                Prêt à devenir expert en data ?
              </h2>
              <p className="text-xs text-gray-600 mb-3">
                Rejoignez nos formations et développez les compétences les plus recherchées
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button className="px-4 py-1.5 bg-[#800020] text-white text-xs rounded-lg hover:bg-[#600018] transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-4 py-1.5 bg-white text-gray-700 text-xs rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  Télécharger le catalogue
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Pagination des formations */}
      <FormationPagination />
    </Layout>
  );
};

export default DataAnalyticsPage;