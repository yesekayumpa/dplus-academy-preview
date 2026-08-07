import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  LineChart, 
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import FormationPagination from "@/components/academy/FormationPagination";

// Formations relatives à la Finance & Investment
const financeCourses = [
  {
    id: "finance-fundamentals",
    title: "Fondamentaux de la Finance",
    description: "Maîtrisez les bases de la finance d'entreprise et des marchés financiers",
    category: "Finance",
    level: "débutant",
    duration: "45h",
    price: 655960,
    rating: 4.8,
    reviews: 156,
    students: 520,
    instructor: "Dr. Jean-Marc Dubois",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Finance", "Analyse", "Marchés"],
    status: "disponible",
    icon: TrendingUp,
    type: "e-learning"
  },
  {
    id: "investment-strategies",
    title: "Stratégies d'Investissement",
    description: "Développez des stratégies d'investissement performantes",
    category: "Finance",
    level: "avancé",
    duration: "60h",
    price: 983940,
    rating: 4.9,
    reviews: 89,
    students: 280,
    instructor: "Philippe Moreau",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
    tags: ["Investissement", "Trading", "Analyse"],
    status: "disponible",
    icon: DollarSign,
    type: "masterclass"
  },
  {
    id: "financial-modeling",
    title: "Financial Modeling & Valuation",
    description: "Devenez expert en modélisation financière",
    category: "Finance",
    level: "intermédiaire",
    duration: "50h",
    price: 787152,
    rating: 4.7,
    reviews: 112,
    students: 380,
    instructor: "Marie Laurent",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["Modeling", "Valuation", "Excel"],
    status: "disponible",
    icon: LineChart,
    type: "corporate"
  },
  {
    id: "cryptocurrency-trading",
    title: "Cryptocurrency Trading",
    description: "Maîtrisez le trading de crypto-monnaies",
    category: "Finance",
    level: "intermédiaire",
    duration: "40h",
    price: 655960,
    rating: 4.6,
    reviews: 78,
    students: 290,
    instructor: "Alexandre Kofi",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center",
    tags: ["Crypto", "Blockchain", "Trading"],
    status: "réservation",
    icon: Shield,
    type: "corporate"
  },
  {
    id: "corporate-finance",
    title: "Corporate Finance Management",
    description: "Gestion financière d'entreprise",
    category: "Finance",
    level: "avancé",
    duration: "55h",
    price: 852748,
    rating: 4.8,
    reviews: 94,
    students: 310,
    instructor: "Dr. Sophie Bernard",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
    tags: ["Corporate", "Trésorerie", "Stratégie"],
    status: "disponible",
    icon: Briefcase,
    type: "corporate"
  },
  {
    id: "risk-management",
    title: "Financial Risk Management",
    description: "Maîtrisez la gestion des risques financiers",
    category: "Finance",
    level: "avancé",
    duration: "45h",
    price: 787152,
    rating: 4.7,
    reviews: 67,
    students: 195,
    instructor: "Marc Rousseau",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
    tags: ["Risk", "Compliance", "Audit"],
    status: "bientôt_disponible",
    icon: Shield,
    type: "e-learning"
  }
];

const FinanceInvestmentPage = () => {
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

  const filteredCourses = financeCourses.filter(course => {
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
    total: financeCourses.length,
    available: financeCourses.filter(c => c.status === "disponible").length,
    students: financeCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (financeCourses.reduce((acc, c) => acc + c.rating, 0) / financeCourses.length).toFixed(1)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponible": return { bg: "bg-green-50", text: "text-green-700", label: "Disponible" };
      case "réservation": return { bg: "bg-amber-50", text: "text-amber-700", label: "Réservation" };
      case "bientôt_disponible": return { bg: "bg-blue-50", text: "text-blue-700", label: "Bientôt" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", label: "Inconnu" };
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "débutant": return { bg: "bg-emerald-50", text: "text-emerald-700", label: "Débutant" };
      case "intermédiaire": return { bg: "bg-amber-50", text: "text-amber-700", label: "Intermédiaire" };
      case "avancé": return { bg: "bg-rose-50", text: "text-rose-700", label: "Avancé" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", label: "Inconnu" };
    }
  };

  const getCourseTypeBadge = (type: string) => {
    switch (type) {
      case "e-learning": return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: "E-learning" };
      case "corporate": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Corporate" };
      case "masterclass": return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", label: "Masterclass" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", label: "Inconnu" };
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section avec image de fond */}
        <section className="relative bg-cover bg-center bg-no-repeat pt-32 pb-20" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1600&h=600&fit=crop")' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 rounded-full">
                <TrendingUp className="w-5 h-5 text-white mr-2" />
                <span className="text-white text-sm font-medium">Formations certifiantes</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
                Finance & Investment
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Devenez expert en finance et développez des stratégies d'investissement performantes
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
                  <div className="text-sm text-blue-100">Formations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">{stats.available}</div>
                  <div className="text-sm text-blue-100">Disponibles</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">{stats.students.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Apprenants</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}</div>
                  <div className="text-sm text-blue-100">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
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
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors text-sm font-medium"
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
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 mt-4 pt-4"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                              selectedLevel === level
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {level === "all" ? "Tous" : level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                              selectedStatus === status
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {status === "all" ? "Tous" : 
                             status === "disponible" ? "Disponible" :
                             status === "réservation" ? "Réservation" : "Bientôt"}
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
        <section className="container mx-auto px-4 py-16 lg:py-20 lg:py-28">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentCourses.length} formation{currentCourses.length > 1 ? 's' : ''} sur {filteredCourses.length}
              </h2>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Page {currentPage} sur {totalPages} • {filteredCourses.length === financeCourses.length 
                  ? "Toutes nos formations en finance & investment" 
                  : "Résultats de votre recherche"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course, index) => {
              const statusBadge = getStatusBadge(course.status);
              const levelBadge = getLevelBadge(course.level);
              const typeBadge = getCourseTypeBadge(course.type || 'e-learning');
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={course.image || "/assets/Masterclass.jpg"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/Masterclass.jpg";
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-2xl ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-2xl ${levelBadge.bg} ${levelBadge.text}`}>
                        {levelBadge.label}
                      </span>
                    </div>
                    {/* Badge de type en bas à gauche */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border} backdrop-blur-sm`}>
                        {typeBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <course.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-2xl hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                        </span>
                        {course.price > 0 && (
                          <span className="text-xs text-gray-600 ml-1">
                            ~{((course.price / 655.96) / 12).toFixed(0)}€/mois
                          </span>
                        )}
                      </div>
                      <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors hover:shadow-xl transition-all duration-300">
                        Détails
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination interne */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-2xl transition-colors ${
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
                    className={`w-10 h-10 rounded-2xl font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
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
                className={`p-2 rounded-2xl transition-colors ${
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
            <div className="text-center py-16 lg:py-24">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Essayez de modifier vos filtres ou termes de recherche
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 lg:py-20 lg:py-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                Prêt à devenir expert en finance ?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
                Rejoignez nos formations et développez les compétences les plus recherchées du marché
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors">
                  Télécharger le catalogue
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pagination des formations */}
        <FormationPagination />
      </div>
    </Layout>
  );
};

export default FinanceInvestmentPage;