import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Rocket, 
  Briefcase, 
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
  DollarSign,
  Lightbulb,
  Users2,
  Building,
  PieChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { popularCourses, getCoursesByCategory } from "@/data/courses";

// Formations relatives à l'Entrepreneuriat
const entrepreneurshipCourses = [
  {
    id: "business-plan-fundamentals",
    title: "Business Plan Fundamentals",
    description: "Créez un business plan convaincant pour votre projet",
    longDescription: "Formation complète sur la rédaction et la présentation d'un business plan professionnel. Apprenez à structurer votre projet et à convaincre les investisseurs.",
    category: "Entrepreneuriat",
    level: "débutant",
    duration: "30 heures",
    price: 393576,
    rating: 4.7,
    reviews: 156,
    students: 480,
    instructor: "Jean-Pierre Rousseau",
    instructorTitle: "Business Coach",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
    tags: ["Business Plan", "Stratégie", "Modèle économique", "Pitch"],
    objectives: [
      "Structurer un business plan",
      "Définir le modèle économique",
      "Analyser le marché",
      "Préparer un pitch convaincant"
    ],
    prerequisites: ["Idée de projet", "Motivation"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: Briefcase,
    features: [
      "Template business plan inclus",
      "Projets guidés",
      "Certification Entrepreneur",
      "Support personnalisé"
    ],
    schedule: "Mardi & Jeudi 18h-20h",
    nextSession: "2024-04-05",
    type: "e-learning"
  },
  {
    id: "startup-fundraising",
    title: "Startup Fundraising & Levée de fonds",
    description: "Maîtrisez l'art de lever des fonds pour votre startup",
    longDescription: "Formation spécialisée sur les techniques de levée de fonds, du seed funding aux séries A, B, C. Apprenez à approcher les investisseurs et négocier.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "40 heures",
    price: 590364,
    rating: 4.8,
    reviews: 89,
    students: 290,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "VC Expert",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
    tags: ["Fundraising", "Investisseurs", "Valuation", "Term Sheet"],
    objectives: [
      "Comprendre les types de financement",
      "Préparer des documents d'investissement",
      "Négocier avec les VCs",
      "Structurer les deals"
    ],
    prerequisites: ["Business plan", "Projet avancé"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "disponible",
    icon: DollarSign,
    features: [
      "Term sheet templates",
      "Simulations de pitch",
      "Certification Fundraising",
      "Réseau d'investisseurs"
    ],
    schedule: "Lundi & Mercredi 19h-21h",
    nextSession: "2024-04-08",
    type: "masterclass"
  },
  {
    id: "digital-marketing-startup",
    title: "Digital Marketing for Startups",
    description: "Développez votre présence en ligne avec un budget limité",
    longDescription: "Formation pratique sur le marketing digital adapté aux startups : growth hacking, social media, content marketing et SEO avec budget limité.",
    category: "Entrepreneuriat",
    level: "débutant",
    duration: "35 heures",
    price: 459168,
    rating: 4.6,
    reviews: 134,
    students: 420,
    instructor: "Thomas Martin",
    instructorTitle: "Growth Hacker",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    tags: ["Digital Marketing", "Growth Hacking", "SEO", "Social Media"],
    objectives: [
      "Développer une stratégie marketing",
      "Maîtriser le growth hacking",
      "Optimiser le SEO",
      "Créer du contenu engageant"
    ],
    prerequisites: ["Base marketing", "Notions digitales"],
    isUpdated: false,
    lastUpdateDate: "2024-02-15",
    status: "disponible",
    icon: TrendingUp,
    features: [
      "Outils marketing inclus",
      "Campagnes pratiques",
      "Certification Digital Marketing",
      "Support communautaire"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-12",
    type: "e-learning"
  },
  {
    id: "team-management-startup",
    title: "Team Management & Leadership Startup",
    description: "Construisez et gérez une équipe performante",
    longDescription: "Formation sur le management d'équipe en contexte startup : recrutement, culture d'entreprise, motivation et gestion de la croissance.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "30 heures",
    price: 459168,
    rating: 4.7,
    reviews: 112,
    students: 310,
    instructor: "Sophie Laurent",
    instructorTitle: "HR Startup Expert",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center",
    tags: ["Team Building", "Leadership", "Recrutement", "Culture"],
    objectives: [
      "Recruter les bons talents",
      "Développer la culture d'entreprise",
      "Motiver l'équipe",
      "Gérer la croissance"
    ],
    prerequisites: ["Management de base"],
    isUpdated: true,
    lastUpdateDate: "2024-03-12",
    status: "disponible",
    icon: Users2,
    features: [
      "Templates de recrutement",
      "Cas pratiques RH",
      "Certification Team Management",
      "Mentorat inclus"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-15",
    type: "corporate"
  },
  {
    id: "financial-management-startup",
    title: "Financial Management for Entrepreneurs",
    description: "Gérez les finances de votre entreprise efficacement",
    longDescription: "Formation sur la gestion financière pour entrepreneurs : comptabilité, trésorerie, KPIs financiers et prise de décision basée sur les données.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "35 heures",
    price: 524768,
    rating: 4.8,
    reviews: 98,
    students: 280,
    instructor: "Philippe Bernard",
    instructorTitle: "CFO Startup",
    image: "https://images.unsplash.com/photo-1554224155-6af6314bafcd?w=400&h=300&fit=crop&crop=center",
    tags: ["Finance", "Comptabilité", "KPIs", "Trésorerie"],
    objectives: [
      "Maîtriser la comptabilité",
      "Gérer la trésorerie",
      "Suivre les KPIs financiers",
      "Prendre des décisions éclairées"
    ],
    prerequisites: ["Base en comptabilité"],
    isUpdated: false,
    lastUpdateDate: "2024-02-28",
    status: "disponible",
    icon: PieChart,
    features: [
      "Modèles financiers inclus",
      "Tableaux de bord KPIs",
      "Certification Finance Startup",
      "Support expert"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-18",
    type: "corporate"
  },
  {
    id: "product-development",
    title: "Product Development & MVP",
    description: "Créez votre produit minimum viable (MVP)",
    longDescription: "Formation sur le développement produit en mode startup : de l'idée au MVP, en passant par le design thinking et l'itération rapide.",
    category: "Entrepreneuriat",
    level: "débutant",
    duration: "40 heures",
    price: 524768,
    rating: 4.7,
    reviews: 127,
    students: 380,
    instructor: "Alexandre Kofi",
    instructorTitle: "Product Manager",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Product Development", "MVP", "Design Thinking", "Agile"],
    objectives: [
      "Appliquer le design thinking",
      "Développer un MVP",
      "Itérer rapidement",
      "Valider le produit marché"
    ],
    prerequisites: ["Idée de produit"],
    isUpdated: true,
    lastUpdateDate: "2024-03-08",
    status: "disponible",
    icon: Lightbulb,
    features: [
      "MVP framework inclus",
      "Projets de développement",
      "Certification Product Development",
      "Mentorat produit"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-20",
    type: "masterclass"
  },
  {
    id: "legal-compliance-startup",
    title: "Legal & Compliance for Entrepreneurs",
    description: "Naviguez dans les aspects légaux de votre entreprise",
    longDescription: "Formation sur les aspects juridiques essentiels pour entrepreneurs : création d'entreprise, contrats, propriété intellectuelle et conformité.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "25 heures",
    price: 393576,
    rating: 4.6,
    reviews: 78,
    students: 220,
    instructor: "Dr. Claire Petit",
    instructorTitle: "Business Lawyer",
    image: "https://images.unsplash.com/photo-1589994955856-a9d9a905b24b?w=400&h=300&fit=crop&crop=center",
    tags: ["Droit", "Contrats", "PI", "Compliance"],
    objectives: [
      "Choisir la structure juridique",
      "Rédiger des contrats",
      "Protéger la propriété intellectuelle",
      "Assurer la conformité"
    ],
    prerequisites: ["Aucun"],
    isUpdated: false,
    lastUpdateDate: "2024-02-20",
    status: "réservation",
    icon: Shield,
    features: [
      "Modèles de contrats inclus",
      "Checklists légales",
      "Certification Legal Startup",
      "Support juridique"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-25",
    type: "corporate"
  },
  {
    id: "scaling-strategy",
    title: "Scaling Strategy & Growth",
    description: "Développez votre entreprise de manière durable",
    longDescription: "Formation avancée sur les stratégies de scaling : expansion internationale, leviers de croissance et optimisation des opérations.",
    category: "Entrepreneuriat",
    level: "avancé",
    duration: "45 heures",
    price: 655960,
    rating: 4.8,
    reviews: 67,
    students: 150,
    instructor: "Marc Rousseau",
    instructorTitle: "Scaling Expert",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center",
    tags: ["Scaling", "Growth", "International", "Operations"],
    objectives: [
      "Développer une stratégie de scaling",
      "Planifier l'expansion",
      "Optimiser les opérations",
      "Gérer la croissance rapide"
    ],
    prerequisites: ["Business établi", "Expérience management"],
    isUpdated: true,
    lastUpdateDate: "2024-03-18",
    status: "disponible",
    icon: Building,
    features: [
      "Framework scaling inclus",
      "Plans d'expansion",
      "Certification Scaling Strategy",
      "Mentorat avancé"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-22",
    type: "masterclass"
  }
];

const EntrepreneurshipPage = () => {
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

  const filteredCourses = entrepreneurshipCourses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const stats = {
    total: entrepreneurshipCourses.length,
    available: entrepreneurshipCourses.filter(c => c.status === "disponible").length,
    students: entrepreneurshipCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (entrepreneurshipCourses.reduce((acc, c) => acc + c.rating, 0) / entrepreneurshipCourses.length).toFixed(1)
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
      case "débutant": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "intermédiaire": return "bg-amber-50 text-amber-700 border-amber-200";
      case "avancé": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
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
      <div className="min-h-screen bg-white">
        {/* Hero Section avec image de fond */}
        <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1600&h=600&fit=crop")' }}>
          <div className="absolute inset-0 bg-orange-900/80"></div>
          <div className="relative container mx-auto px-4 pt-20 pb-12 lg:pt-24 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-white/20 rounded-full">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-3 text-white">
                Entrepreneuriat
              </h1>
              <p className="text-base lg:text-lg mb-6 text-orange-100 max-w-3xl mx-auto">
                Lancez et développez votre entreprise avec les meilleures stratégies entrepreneuriales
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
                  <div className="text-xs text-orange-100">Formations</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.available}</div>
                  <div className="text-xs text-orange-100">Disponibles</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.students.toLocaleString()}</div>
                  <div className="text-xs text-orange-100">Apprenants</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}</div>
                  <div className="text-xs text-orange-100">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 py-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
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
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
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
                  className="border-t border-gray-200 pt-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Niveau
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                              selectedLevel === level
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {level === "all" ? "Tous" : level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                              selectedStatus === status
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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

        {/* Courses Grid - Cartes réduites */}
        <section className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''}
            </h2>
            <p className="text-xs text-gray-600">
              Explorez nos formations spécialisées en entrepreneuriat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course, index) => {
              const statusColor = getStatusColor(course.status);
              const levelColor = getLevelColor(course.level);
              const typeBadge = getCourseTypeBadge(course.type || 'e-learning');
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors cursor-pointer group hover:shadow-lg"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative">
                    <img 
                      src={course.image || "/assets/Masterclass.jpg"} 
                      alt={course.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/Masterclass.jpg";
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
                        {course.status === "disponible" ? "Disponible" :
                         course.status === "réservation" ? "Réservation" : "Bientôt"}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${levelColor}`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>
                    {/* Badge de type en bas à gauche */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border} backdrop-blur-sm`}>
                        {typeBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <course.icon className="w-5 h-5 text-orange-600" />
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] rounded hover:bg-orange-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded">
                          +{course.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{course.rating} ({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Award className="w-3 h-3" />
                        <span>Certificat</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-base font-bold text-gray-900">
                          {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                        </div>
                        {course.price > 0 && (
                          <div className="text-[10px] text-gray-500">
                            ~{((course.price / 655.96) / 12).toFixed(0)}€/mois
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCourseClick(course)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors hover:shadow-md"
                      >
                        Voir
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      {course.status === "disponible" && (
                        <button
                          className="px-3 py-2 border border-orange-600 text-orange-600 text-xs rounded hover:bg-orange-50 transition-colors"
                        >
                          S'inscrire
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Aucune formation trouvée
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Essayez de modifier vos filtres ou termes de recherche
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-1.5 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </section>

        {/* Navigation Élégante */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Indicateur de progression */}
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Progression</span>
                  <span className="text-sm font-medium text-orange-600">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Pagination moderne */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/data-analytics')}
                  className="group relative px-6 py-3 bg-white border border-gray-300 rounded-2xl text-gray-700 hover:border-orange-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Précédent</span>
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/digital-tools-automation')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    2
                  </button>
                  <button 
                    onClick={() => navigate('/data-analytics')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    3
                  </button>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <button 
                    onClick={() => navigate('/soft-skills-leadership')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    5
                  </button>
                </div>

                <button 
                  onClick={() => navigate('/soft-skills-leadership')}
                  className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="font-medium">Suivant</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Indicateur de pages */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>Entrepreneuriat</span>
                </div>
                <span className="text-gray-300">|</span>
                <span>Page 4 sur 5</span>
                <span className="text-gray-300">|</span>
                <span>Formation certifiante</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Sans dégradé */}
        <section className="bg-orange-600 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-2">
                Prêt à lancer votre entreprise ?
              </h2>
              <p className="text-sm mb-5 max-w-2xl mx-auto text-orange-100">
                Rejoignez nos formations et transformez votre idée en entreprise réussie
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-5 py-2 bg-white text-orange-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-400 transition-colors">
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

export default EntrepreneurshipPage;