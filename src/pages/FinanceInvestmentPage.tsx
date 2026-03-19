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
  GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { popularCourses, getCoursesByCategory } from "@/data/courses";

// Formations relatives à la Finance & Investment
const financeCourses = [
  {
    id: "finance-fundamentals",
    title: "Fondamentaux de la Finance",
    description: "Maîtrisez les bases de la finance d'entreprise et des marchés financiers",
    longDescription: "Formation complète sur les principes fondamentaux de la finance, incluant l'analyse financière, la valorisation d'entreprises et la gestion de portefeuille.",
    category: "Finance",
    level: "débutant",
    duration: "45 heures",
    price: 655960, // 1000 FCFA * 655,96
    rating: 4.8,
    reviews: 156,
    students: 520,
    instructor: "Dr. Jean-Marc Dubois",
    instructorTitle: "Expert Financier",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Finance", "Analyse financière", "Marchés", "Investissement"],
    objectives: [
      "Comprendre les états financiers",
      "Analyser la performance d'entreprise",
      "Évaluer les opportunités d'investissement",
      "Gérer un portefeuille de titres"
    ],
    prerequisites: ["Base en comptabilité", "Mathématiques financières"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: TrendingUp,
    features: [
      "Accès lifetime",
      "Cas pratiques réels",
      "Certification professionnelle",
      "Support communautaire"
    ],
    schedule: "Mardi & Jeudi 18h-20h",
    nextSession: "2024-04-05"
  },
  {
    id: "investment-strategies",
    title: "Stratégies d'Investissement Avancées",
    description: "Développez des stratégies d'investissement performantes sur les marchés",
    longDescription: "Formation spécialisée sur les stratégies d'investissement avancées, incluant l'analyse quantitative, le trading algorithmique et la gestion des risques.",
    category: "Finance",
    level: "avancé",
    duration: "60 heures",
    price: 983940, // 1500 FCFA * 655,96
    rating: 4.9,
    reviews: 89,
    students: 280,
    instructor: "Philippe Moreau",
    instructorTitle: "Trader Professionnel",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
    tags: ["Investissement", "Trading", "Analyse technique", "Risk management"],
    objectives: [
      "Maîtriser l'analyse technique",
      "Développer des stratégies de trading",
      "Gérer les risques financiers",
      "Optimiser les portefeuilles"
    ],
    prerequisites: ["Finance fondamentale", "Analyse de données"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "disponible",
    icon: DollarSign,
    features: [
      "Simulateur de trading",
      "Stratégies backtestées",
      "Mentorat individuel",
      "Certification trader"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-12"
  },
  {
    id: "financial-modeling",
    title: "Financial Modeling & Valuation",
    description: "Devenez expert en modélisation financière et valorisation d'entreprises",
    longDescription: "Formation intensive sur la modélisation financière avancée, la valorisation d'entreprises et l'analyse des fusions-acquisitions.",
    category: "Finance",
    level: "intermédiaire",
    duration: "50 heures",
    price: 787152, // 1200 FCFA * 655,96
    rating: 4.7,
    reviews: 112,
    students: 380,
    instructor: "Marie Laurent",
    instructorTitle: "Analyste Financier Senior",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["Financial Modeling", "Valuation", "M&A", "Excel"],
    objectives: [
      "Créer des modèles financiers complexes",
      "Valoriser des entreprises",
      "Analyser les transactions M&A",
      "Préparer des pitch decks financiers"
    ],
    prerequisites: ["Excel avancé", "Comptabilité analytique"],
    isUpdated: true,
    lastUpdateDate: "2024-03-08",
    status: "disponible",
    icon: LineChart,
    features: [
      "Templates Excel inclus",
      "Projets réels d'entreprise",
      "Certification FMVA",
      "Support expert"
    ],
    schedule: "Lundi & Mercredi 19h-21h",
    nextSession: "2024-04-08"
  },
  {
    id: "cryptocurrency-trading",
    title: "Cryptocurrency Trading & Blockchain",
    description: "Maîtrisez le trading de crypto-monnaies et la technologie blockchain",
    longDescription: "Formation complète sur l'écosystème des crypto-monnaies, le trading digital et les fondamentaux de la blockchain.",
    category: "Finance",
    level: "intermédiaire",
    duration: "40 heures",
    price: 655960, // 1000 FCFA * 655,96
    rating: 4.6,
    reviews: 78,
    students: 290,
    instructor: "Alexandre Kofi",
    instructorTitle: "Blockchain Expert",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center",
    tags: ["Crypto", "Blockchain", "Trading", "DeFi"],
    objectives: [
      "Comprendre la blockchain",
      "Trader les crypto-monnaies",
      "Analyser les projets DeFi",
      "Sécuriser ses actifs digitaux"
    ],
    prerequisites: ["Base en trading", "Notions techniques"],
    isUpdated: false,
    lastUpdateDate: "2024-02-15",
    status: "réservation",
    icon: Shield,
    features: [
      "Accès aux plateformes",
      "Signaux de trading",
      "Wallet sécurisé inclus",
      "Communauté crypto"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-20"
  },
  {
    id: "corporate-finance",
    title: "Corporate Finance Management",
    description: "Gestion financière d'entreprise et prise de décision stratégique",
    longDescription: "Formation spécialisée en finance d'entreprise, couvrant la gestion de trésorerie, la levée de fonds et la stratégie financière.",
    category: "Finance",
    level: "avancé",
    duration: "55 heures",
    price: 852748, // 1300 FCFA * 655,96
    rating: 4.8,
    reviews: 94,
    students: 310,
    instructor: "Dr. Sophie Bernard",
    instructorTitle: "CFO Consultant",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
    tags: ["Corporate Finance", "Trésorerie", "Levée de fonds", "Stratégie"],
    objectives: [
      "Gérer la trésorerie",
      "Préparer des levées de fonds",
      "Optimiser la structure financière",
      "Piloter la performance"
    ],
    prerequisites: ["Finance fondamentale", "Expérience entreprise"],
    isUpdated: true,
    lastUpdateDate: "2024-03-12",
    status: "disponible",
    icon: Briefcase,
    features: [
      "Cas d'entreprises réels",
      "Modèles financiers inclus",
      "Mentorat par CFO",
      "Certification corporate"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-15"
  },
  {
    id: "risk-management",
    title: "Financial Risk Management",
    description: "Maîtrisez la gestion des risques financiers et la conformité réglementaire",
    longDescription: "Formation avancée sur l'identification, l'évaluation et la gestion des risques financiers en entreprise.",
    category: "Finance",
    level: "avancé",
    duration: "45 heures",
    price: 787152, // 1200 FCFA * 655,96
    rating: 4.7,
    reviews: 67,
    students: 195,
    instructor: "Marc Rousseau",
    instructorTitle: "Risk Manager",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
    tags: ["Risk Management", "Compliance", "FRM", "Audit"],
    objectives: [
      "Identifier les risques financiers",
      "Mettre en place des contrôles",
      "Assurer la conformité",
      "Gérer les crises financières"
    ],
    prerequisites: ["Finance avancée", "Réglementation"],
    isUpdated: false,
    lastUpdateDate: "2024-02-28",
    status: "bientôt_disponible",
    icon: Shield,
    features: [
      "Études de cas réglementaires",
      "Certification FRM",
      "Outils de gestion des risques",
      "Support continu"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-10",
    availableDate: "2024-05-10"
  }
];

const FinanceInvestmentPage = () => {
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

  const filteredCourses = financeCourses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const stats = {
    total: financeCourses.length,
    available: financeCourses.filter(c => c.status === "disponible").length,
    students: financeCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (financeCourses.reduce((acc, c) => acc + c.rating, 0) / financeCourses.length).toFixed(1)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-montserrat">
                Finance & Investment
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Devenez expert en finance et développez des stratégies d'investissement performantes
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.total}</div>
                  <div className="text-blue-100">Formations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.available}</div>
                  <div className="text-blue-100">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.students.toLocaleString()}</div>
                  <div className="text-blue-100">Apprenants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.avgRating}</div>
                  <div className="text-blue-100">Note moyenne</div>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
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
                                ? "bg-blue-500 text-white border-blue-500"
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
                                ? "bg-blue-500 text-white border-blue-500"
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
              Explorez nos formations spécialisées en finance et investment
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
                    <course.icon className="w-6 h-6 text-blue-600" />
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
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Voir détails
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {course.status === "disponible" && (
                      <button
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Prêt à devenir expert en finance ?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
                Rejoignez nos formations et développez les compétences les plus recherchées du marché
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors">
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

export default FinanceInvestmentPage;
