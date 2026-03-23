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
  ChevronRight,
  Sparkles
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { popularCourses, getCoursesByCategory } from "@/data/courses";

// Formations relatives aux Outils Digitaux & Automatisation
const digitalToolsCourses = [
  {
    id: "python-automation",
    title: "Python pour l'Automatisation",
    description: "Automatisez vos tâches quotidiennes avec Python",
    longDescription: "Formation complète sur l'automatisation des processus avec Python. Apprenez à créer des scripts pour gagner en productivité et automatiser les tâches répétitives.",
    category: "Outils Digitaux",
    level: "débutant",
    duration: "40 heures",
    price: 524768,
    rating: 4.8,
    reviews: 189,
    students: 650,
    instructor: "Thomas Martin",
    instructorTitle: "Python Expert",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=center",
    tags: ["Python", "Automatisation", "Scripting", "Productivité"],
    objectives: [
      "Écrire des scripts Python efficaces",
      "Automatiser les tâches bureautiques",
      "Manipuler des fichiers et données",
      "Créer des bots d'automatisation"
    ],
    prerequisites: ["Base en programmation", "Logique algorithmique"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: Code,
    features: [
      "Projets pratiques",
      "Bibliothèque de scripts",
      "Certification Python",
      "Support communautaire"
    ],
    schedule: "Mardi & Jeudi 18h-20h",
    nextSession: "2024-04-05"
  },
  {
    id: "excel-automation-vba",
    title: "Excel Avancé & VBA",
    description: "Maîtrisez Excel et automatisez avec VBA",
    longDescription: "Formation spécialisée sur les fonctionnalités avancées d'Excel et la programmation VBA pour automatiser vos tableurs et analyses.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "35 heures",
    price: 459168,
    rating: 4.7,
    reviews: 156,
    students: 480,
    instructor: "Sophie Laurent",
    instructorTitle: "Excel Expert",
    image: "https://images.unsplash.com/photo-1554224155-6af6314bafcd?w=400&h=300&fit=crop&crop=center",
    tags: ["Excel", "VBA", "Power Query", "Automatisation"],
    objectives: [
      "Maîtriser les fonctions complexes",
      "Automatiser avec VBA",
      "Utiliser Power Query",
      "Créer des dashboards dynamiques"
    ],
    prerequisites: ["Excel intermédiaire"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "disponible",
    icon: Database,
    features: [
      "Templates inclus",
      "Projets réels",
      "Certification VBA",
      "Support par email"
    ],
    schedule: "Lundi & Mercredi 19h-21h",
    nextSession: "2024-04-08"
  },
  {
    id: "no-code-low-code",
    title: "No-Code & Low-Code Development",
    description: "Créez des applications sans coder",
    longDescription: "Formation sur les plateformes no-code et low-code pour développer des applications web et mobiles rapidement.",
    category: "Outils Digitaux",
    level: "débutant",
    duration: "30 heures",
    price: 393576,
    rating: 4.6,
    reviews: 112,
    students: 380,
    instructor: "Marie Dubois",
    instructorTitle: "No-Code Consultant",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    tags: ["No-Code", "Bubble", "Webflow", "Automation"],
    objectives: [
      "Utiliser les plateformes no-code",
      "CrÃ©er des applications web",
      "Automatiser les workflows",
      "Déployer des solutions rapides"
    ],
    prerequisites: ["Aucun"],
    isUpdated: false,
    lastUpdateDate: "2024-02-15",
    status: "disponible",
    icon: Zap,
    features: [
      "Accès plateformes",
      "Projets guidés",
      "Certification No-Code",
      "Mentorat inclus"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-12"
  },
  {
    id: "rpa-automation",
    title: "RPA - Robotic Process Automation",
    description: "Automatisez les processus métier avec les robots",
    longDescription: "Formation complète sur l'automatisation robotique des processus (RPA) avec UiPath et Automation Anywhere.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "45 heures",
    price: 655960,
    rating: 4.8,
    reviews: 89,
    students: 290,
    instructor: "Jean-Pierre Ndiaye",
    instructorTitle: "RPA Expert",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["RPA", "UiPath", "Automation", "Robotics"],
    objectives: [
      "Comprendre les concepts RPA",
      "Développer des robots logiciels",
      "Automatiser les processus métier",
      "Optimiser les workflows"
    ],
    prerequisites: ["Logique métier", "Base en informatique"],
    isUpdated: true,
    lastUpdateDate: "2024-03-12",
    status: "disponible",
    icon: Bot,
    features: [
      "Licence UiPath incluse",
      "Projets entreprise",
      "Certification RPA",
      "Support expert"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-15"
  },
  {
    id: "api-integration",
    title: "API Integration & Web Services",
    description: "Connectez vos applications via les APIs",
    longDescription: "Formation sur l'intégration d'APIs et la création de services web pour connecter différentes applications.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "40 heures",
    price: 590364,
    rating: 4.7,
    reviews: 78,
    students: 220,
    instructor: "Alexandre Kofi",
    instructorTitle: "API Architect",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=400&h=300&fit=crop&crop=center",
    tags: ["API", "REST", "Postman", "Integration"],
    objectives: [
      "Comprendre les architectures API",
      "Consommer des APIs REST",
      "Créer des web services",
      "Sécuriser les intégrations"
    ],
    prerequisites: ["HTTP", "JSON", "Base en programmation"],
    isUpdated: false,
    lastUpdateDate: "2024-02-28",
    status: "réservation",
    icon: Settings,
    features: [
      "Tests d'API inclus",
      "Projets d'intégration",
      "Certification API",
      "Documentation complète"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-20"
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation & Business Process",
    description: "Optimisez vos processus métier",
    longDescription: "Formation sur l'automatisation des workflows métier avec des outils comme Zapier, Make et Power Automate.",
    category: "Outils Digitaux",
    level: "intermédiaire",
    duration: "25 heures",
    price: 327980,
    rating: 4.6,
    reviews: 94,
    students: 310,
    instructor: "Dr. Marie Claire",
    instructorTitle: "Process Automation Expert",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    tags: ["Workflow", "Zapier", "Power Automate", "Process"],
    objectives: [
      "Analyser les processus métier",
      "Automatiser les workflows",
      "Intégrer les outils SaaS",
      "Optimiser la productivité"
    ],
    prerequisites: ["Connaissance métier"],
    isUpdated: true,
    lastUpdateDate: "2024-03-08",
    status: "disponible",
    icon: Cpu,
    features: [
      "Accès aux plateformes",
      "Cas d'usage réels",
      "Certification Workflow",
      "Templates inclus"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-10"
  },
  {
    id: "mobile-automation",
    title: "Mobile App Automation",
    description: "Automatisez les tests et déploiements mobiles",
    longDescription: "Formation spécialisée sur l'automatisation des applications mobiles avec Appium et les frameworks de test.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "35 heures",
    price: 524768,
    rating: 4.5,
    reviews: 67,
    students: 180,
    instructor: "Thomas Bernard",
    instructorTitle: "Mobile Automation Expert",
    image: "https://images.unsplash.com/photo-1512941937309-5ba8c2c101c0?w=400&h=300&fit=crop&crop=center",
    tags: ["Mobile", "Appium", "Testing", "CI/CD"],
    objectives: [
      "Automatiser les tests mobiles",
      "Configurer les pipelines CI/CD",
      "Tester sur iOS et Android",
      "Optimiser les performances"
    ],
    prerequisites: ["Développement mobile", "Testing"],
    isUpdated: false,
    lastUpdateDate: "2024-02-20",
    status: "bientôt_disponible",
    icon: Smartphone,
    features: [
      "Lab mobile virtuel",
      "Projets de test",
      "Certification Mobile",
      "Support continu"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-05",
    availableDate: "2024-05-05"
  },
  {
    id: "cloud-automation",
    title: "Cloud Automation & DevOps",
    description: "Automatisez vos infrastructures cloud",
    longDescription: "Formation sur l'automatisation des infrastructures cloud avec Terraform, Ansible et les pratiques DevOps.",
    category: "Outils Digitaux",
    level: "avancé",
    duration: "50 heures",
    price: 787152,
    rating: 4.8,
    reviews: 103,
    students: 250,
    instructor: "Marc Rousseau",
    instructorTitle: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    tags: ["Cloud", "DevOps", "Terraform", "Ansible"],
    objectives: [
      "Automatiser l'infrastructure",
      "Configurer les pipelines CI/CD",
      "Gérer les conteneurs",
      "Optimiser le cloud"
    ],
    prerequisites: ["Cloud", "Linux", "Scripting"],
    isUpdated: true,
    lastUpdateDate: "2024-03-18",
    status: "disponible",
    icon: Laptop,
    features: [
      "Lab cloud inclus",
      "Projets DevOps",
      "Certification Cloud",
      "Accès AWS/Azure"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-18"
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
      case "disponible": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "réservation": return "bg-blue-50 text-blue-700 border-blue-200";
      case "bientôt_disponible": return "bg-amber-50 text-amber-700 border-amber-200";
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

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevel("all");
    setSelectedStatus("all");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section avec image de fond */}
        <section className="relative bg-[#800020] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/dmplus-tech.jpg')" }}
          />
          <div className="absolute inset-0 bg-[#800020]" />
          <div className="relative container mx-auto px-4 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-white/10 rounded-full border border-white/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white">
                Outils Digitaux & Automatisation
              </h1>
              <p className="text-base lg:text-lg mb-6 text-white/80 max-w-2xl mx-auto">
                Automatisez vos processus et boostez votre productivité avec les outils digitaux modernes
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{stats.total}</div>
                  <div className="text-xs text-white/70">Formations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{stats.available}</div>
                  <div className="text-xs text-white/70">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{stats.students.toLocaleString()}</div>
                  <div className="text-xs text-white/70">Apprenants</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{stats.avgRating}</div>
                  <div className="text-xs text-white/70">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#800020] focus:outline-none transition-colors"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm border border-gray-200"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-[#800020] text-white text-xs px-1.5 py-0.5 rounded-full">
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
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm border border-gray-200"
                >
                  <X className="w-4 h-4" />
                  Reset
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
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
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
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
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

        {/* Courses Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''}
            </h2>
            <p className="text-sm text-gray-500">
              {filteredCourses.length === digitalToolsCourses.length 
                ? "Toutes nos formations en automatisation" 
                : "Résultats de votre recherche"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#800020] transition-colors cursor-pointer group"
                onClick={() => navigate(`/formation/${course.id}`)}
              >
                <div className="relative h-32 overflow-hidden bg-gray-100">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(course.status)}`}>
                      {course.status === "disponible" ? "Disponible" :
                       course.status === "réservation" ? "Réservation" : "Bientôt"}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <course.icon className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {course.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded border border-gray-200">
                        +{course.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px]">{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-900">
                        {course.price === 0 ? "Gratuit" : `${(course.price / 655.96).toFixed(0)} FCFA`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#800020] text-xs font-medium">
                      Détails
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-200">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Aucune formation trouvée
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Essayez de modifier vos filtres
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#800020] text-white text-sm rounded-lg hover:bg-[#600018] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-6 h-6 text-[#800020] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Prêt à automatiser votre travail ?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Rejoignez nos formations et gagnez jusqu'à 10 heures par semaine
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button className="px-5 py-2 bg-[#800020] text-white text-sm rounded-lg hover:bg-[#600018] transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-5 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
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