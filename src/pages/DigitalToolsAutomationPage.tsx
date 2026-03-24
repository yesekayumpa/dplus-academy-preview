import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Zap, 
  Code, 
  Cpu, 
  Settings, 
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
  Bot,
  Smartphone,
  Laptop,
  Database,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Formations relatives aux Outils Digitaux & Automatisation
const digitalToolsCourses = [
  {
    id: "python-automation",
    title: "Python pour l'Automatisation",
    description: "Automatisez vos tâches quotidiennes avec Python",
    longDescription: "Formation complète sur l'automatisation des processus avec Python.",
    category: "Outils Digitaux",
    level: "débutant",
    duration: "40h",
    price: 524768,
    rating: 4.8,
    reviews: 189,
    students: 650,
    instructor: "Thomas Martin",
    instructorTitle: "Python Expert",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=center",
    tags: ["Python", "Automatisation", "Scripting"],
    status: "disponible",
    icon: Code,
    features: ["Projets pratiques", "Certification Python"],
    type: "e-learning"
  },
  {
    id: "excel-automation-vba",
    title: "Excel Avancé & VBA",
    description: "Maîtrisez Excel et automatisez avec VBA",
    longDescription: "Formation spécialisée sur les fonctionnalités avancées d'Excel.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "35h",
    price: 459168,
    rating: 4.7,
    reviews: 156,
    students: 480,
    instructor: "Sophie Laurent",
    instructorTitle: "Excel Expert",
    image: "https://images.unsplash.com/photo-1554224155-6af6314bafcd?w=400&h=300&fit=crop&crop=center",
    tags: ["Excel", "VBA", "Power Query"],
    status: "disponible",
    icon: Database,
    features: ["Templates inclus", "Certification VBA"],
    type: "corporate"
  },
  {
    id: "no-code-low-code",
    title: "No-Code & Low-Code",
    description: "Créez des applications sans coder",
    longDescription: "Formation sur les plateformes no-code et low-code.",
    category: "Outils Digitaux",
    level: "débutant",
    duration: "30h",
    price: 393576,
    rating: 4.6,
    reviews: 112,
    students: 380,
    instructor: "Marie Dubois",
    instructorTitle: "No-Code Consultant",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    tags: ["No-Code", "Bubble", "Webflow"],
    status: "disponible",
    icon: Zap,
    features: ["Projets guidés", "Certification No-Code"],
    type: "e-learning"
  },
  {
    id: "rpa-automation",
    title: "RPA - Robotic Process Automation",
    description: "Automatisez les processus métier avec des robots",
    longDescription: "Formation complète sur l'automatisation robotique des processus.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "45h",
    price: 655960,
    rating: 4.8,
    reviews: 89,
    students: 290,
    instructor: "Jean-Pierre Ndiaye",
    instructorTitle: "RPA Expert",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["RPA", "UiPath", "Automation"],
    status: "disponible",
    icon: Bot,
    features: ["Projets entreprise", "Certification RPA"],
    type: "masterclass"
  },
  {
    id: "api-integration",
    title: "API Integration & Web Services",
    description: "Connectez vos applications via les APIs",
    longDescription: "Formation sur l'intégration d'APIs.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "40h",
    price: 590364,
    rating: 4.7,
    reviews: 78,
    students: 220,
    instructor: "Alexandre Kofi",
    instructorTitle: "API Architect",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=400&h=300&fit=crop&crop=center",
    tags: ["API", "REST", "Postman"],
    status: "réservation",
    icon: Settings,
    features: ["Projets d'intégration", "Certification API"],
    type: "masterclass"
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Optimisez vos processus métier",
    longDescription: "Formation sur l'automatisation des workflows métier.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "25h",
    price: 327980,
    rating: 4.6,
    reviews: 94,
    students: 310,
    instructor: "Dr. Marie Claire",
    instructorTitle: "Process Automation Expert",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["Workflow", "Zapier", "Power Automate"],
    status: "disponible",
    icon: Cpu,
    features: ["Cas d'usage réels", "Certification Workflow"],
    type: "corporate"
  },
  {
    id: "mobile-automation",
    title: "Mobile App Automation",
    description: "Automatisez les tests et déploiements mobiles",
    longDescription: "Formation sur l'automatisation des applications mobiles.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "35h",
    price: 524768,
    rating: 4.5,
    reviews: 67,
    students: 180,
    instructor: "Thomas Bernard",
    instructorTitle: "Mobile Automation Expert",
    image: "https://images.unsplash.com/photo-1512941937309-5ba8c2c101c0?w=400&h=300&fit=crop&crop=center",
    tags: ["Mobile", "Appium", "Testing"],
    status: "bientôt_disponible",
    icon: Smartphone,
    features: ["Projets de test", "Certification Mobile"],
    type: "masterclass"
  },
  {
    id: "cloud-automation",
    title: "Cloud Automation & DevOps",
    description: "Automatisez vos infrastructures cloud",
    longDescription: "Formation sur l'automatisation des infrastructures cloud.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "50h",
    price: 787152,
    rating: 4.8,
    reviews: 103,
    students: 250,
    instructor: "Marc Rousseau",
    instructorTitle: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    tags: ["Cloud", "DevOps", "Terraform"],
    status: "disponible",
    icon: Laptop,
    features: ["Projets DevOps", "Certification Cloud"],
    type: "masterclass"
  }
];

const DigitalToolsAutomationPage = () => {
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

  const filteredCourses = digitalToolsCourses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const stats = {
    total: digitalToolsCourses.length,
    available: digitalToolsCourses.filter(c => c.status === "disponible").length,
    students: digitalToolsCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (digitalToolsCourses.reduce((acc, c) => acc + c.rating, 0) / digitalToolsCourses.length).toFixed(1)
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
        <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=600&fit=crop")' }}>
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
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                Outils Digitaux & Automatisation
              </h1>
              <p className="text-sm lg:text-base mb-5 text-white/80 max-w-2xl mx-auto">
                Automatisez vos processus et boostez votre productivité avec les outils digitaux modernes
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
          <div className="mb-4">
            <h2 className="text-base font-medium text-gray-900 mb-0.5">
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''}
            </h2>
            <p className="text-xs text-gray-500">
              {filteredCourses.length === digitalToolsCourses.length 
                ? "Toutes nos formations en automatisation" 
                : "Résultats de votre recherche"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredCourses.map((course, index) => {
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
                        {course.level}
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
                    <div className="flex items-start gap-1.5 mb-2">
                      <course.icon className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-[10px] text-gray-500 mb-2 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
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

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] px-1 py-0.5 rounded ${levelColor}`}>
                          {course.level}
                        </span>
                        <div className="flex items-center gap-0.5 text-gray-500">
                          <Clock className="w-2.5 h-2.5" />
                          <span className="text-[9px]">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-amber-400" />
                        <span className="text-[10px] font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-900">
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
                        <ChevronRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

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

        {/* Navigation Élégante */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Indicateur de progression */}
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Progression</span>
                  <span className="text-sm font-medium text-red-600">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Pagination moderne */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/finance-investment')}
                  className="group relative px-6 py-3 bg-white border border-gray-300 rounded-2xl text-gray-700 hover:border-red-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Précédent</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <button 
                    onClick={() => navigate('/data-analytics')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    3
                  </button>
                  <button 
                    onClick={() => navigate('/entrepreneurship')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    4
                  </button>
                  <button 
                    onClick={() => navigate('/soft-skills-leadership')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    5
                  </button>
                </div>

                <button 
                  onClick={() => navigate('/data-analytics')}
                  className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="font-medium">Suivant</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Indicateur de pages */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Outils Digitaux & Automatisation</span>
                </div>
                <span className="text-gray-300">|</span>
                <span>Page 2 sur 5</span>
                <span className="text-gray-300">|</span>
                <span>Formation certifiante</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Sans dégradé */}
        <section className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-5 h-5 text-[#800020] mx-auto mb-2" />
              <h2 className="text-base font-bold text-gray-900 mb-1">
                Prêt à automatiser votre travail ?
              </h2>
              <p className="text-xs text-gray-600 mb-3">
                Rejoignez nos formations et gagnez jusqu'à 10 heures par semaine
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
    </Layout>
  );
};

export default DigitalToolsAutomationPage;