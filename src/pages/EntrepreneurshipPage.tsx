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
  PieChart
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
    price: 393576, // 600 FCFA * 655,96
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
    nextSession: "2024-04-05"
  },
  {
    id: "startup-fundraising",
    title: "Startup Fundraising & Levée de fonds",
    description: "Maîtrisez l'art de lever des fonds pour votre startup",
    longDescription: "Formation spécialisée sur les techniques de levée de fonds, du seed funding aux séries A, B, C. Apprenez à approcher les investisseurs et négocier.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "40 heures",
    price: 590364, // 900 FCFA * 655,96
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
    nextSession: "2024-04-08"
  },
  {
    id: "digital-marketing-startup",
    title: "Digital Marketing for Startups",
    description: "Développez votre présence en ligne avec un budget limité",
    longDescription: "Formation pratique sur le marketing digital adapté aux startups : growth hacking, social media, content marketing et SEO avec budget limité.",
    category: "Entrepreneuriat",
    level: "débutant",
    duration: "35 heures",
    price: 459168, // 700 FCFA * 655,96
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
    nextSession: "2024-04-12"
  },
  {
    id: "team-management-startup",
    title: "Team Management & Leadership Startup",
    description: "Construisez et gérez une équipe performante",
    longDescription: "Formation sur le management d'équipe en contexte startup : recrutement, culture d'entreprise, motivation et gestion de la croissance.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "30 heures",
    price: 459168, // 700 FCFA * 655,96
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
    nextSession: "2024-04-15"
  },
  {
    id: "financial-management-startup",
    title: "Financial Management for Entrepreneurs",
    description: "Gérez les finances de votre entreprise efficacement",
    longDescription: "Formation sur la gestion financière pour entrepreneurs : comptabilité, trésorerie, KPIs financiers et prise de décision basée sur les données.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "35 heures",
    price: 524768, // 800 FCFA * 655,96
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
    nextSession: "2024-04-18"
  },
  {
    id: "product-development",
    title: "Product Development & MVP",
    description: "Créez votre produit minimum viable (MVP)",
    longDescription: "Formation sur le développement produit en mode startup : de l'idée au MVP, en passant par le design thinking et l'itération rapide.",
    category: "Entrepreneuriat",
    level: "débutant",
    duration: "40 heures",
    price: 524768, // 800 FCFA * 655,96
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
    nextSession: "2024-04-20"
  },
  {
    id: "legal-compliance-startup",
    title: "Legal & Compliance for Entrepreneurs",
    description: "Naviguez dans les aspects légaux de votre entreprise",
    longDescription: "Formation sur les aspects juridiques essentiels pour entrepreneurs : création d'entreprise, contrats, propriété intellectuelle et conformité.",
    category: "Entrepreneuriat",
    level: "intermédiaire",
    duration: "25 heures",
    price: 393576, // 600 FCFA * 655,96
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
    nextSession: "2024-04-25"
  },
  {
    id: "scaling-strategy",
    title: "Scaling Strategy & Growth",
    description: "Développez votre entreprise de manière durable",
    longDescription: "Formation avancée sur les stratégies de scaling : expansion internationale, leviers de croissance et optimisation des opérations.",
    category: "Entrepreneuriat",
    level: "avancé",
    duration: "45 heures",
    price: 655960, // 1000 FCFA * 655,96
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
    nextSession: "2024-04-22"
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
      case "disponible": return "bg-green-100 text-green-800 border-green-200";
      case "réservation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "bientôt_disponible": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "débutant": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "intermédiaire": return "bg-amber-100 text-amber-800 border-amber-200";
      case "avancé": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevel("all");
    setSelectedStatus("all");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Rocket className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-montserrat">
                Entrepreneuriat
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
                Lancez et développez votre entreprise avec les meilleures stratégies entrepreneuriales
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.total}</div>
                  <div className="text-orange-100">Formations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.available}</div>
                  <div className="text-orange-100">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.students.toLocaleString()}</div>
                  <div className="text-orange-100">Apprenants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.avgRating}</div>
                  <div className="text-orange-100">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
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
                  className="flex items-center gap-2 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
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
                  className="border-t pt-6"
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
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              selectedLevel === level
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              selectedStatus === status
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} disponible{filteredCourses.length > 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600">
              Explorez nos formations spécialisées en entrepreneuriat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                      {course.status === "disponible" ? "Disponible" :
                       course.status === "réservation" ? "Réservation" : "Bientôt disponible"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <course.icon className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
                        +{course.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.students} apprenants</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating} ({course.reviews} avis)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>Certificat</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                      </div>
                      {course.price > 0 && (
                        <div className="text-sm text-gray-500">
                          {(course.price / 655.96 / 1000).toFixed(1)}k XOF
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/formation/${course.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Voir détails
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {course.status === "disponible" && (
                      <button
                        className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
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
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Prêt à lancer votre entreprise ?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-orange-100">
                Rejoignez nos formations et transformez votre idée en entreprise réussie
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-400 transition-colors">
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
