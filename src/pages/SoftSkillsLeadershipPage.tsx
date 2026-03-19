import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Users, 
  Brain, 
  Heart, 
  MessageSquare, 
  Award,
  Clock,
  Star,
  Calendar,
  ArrowRight,
  Filter,
  X,
  Target,
  Shield,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Handshake,
  Eye,
  Mic
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { popularCourses, getCoursesByCategory } from "@/data/courses";

// Formations relatives aux Soft Skills & Leadership
const softSkillsCourses = [
  {
    id: "leadership-fundamentals",
    title: "Leadership Fundamentals",
    description: "Développez votre leadership authentique et inspirez vos équipes",
    longDescription: "Formation complète sur les fondements du leadership : styles de leadership, intelligence émotionnelle, communication et prise de décision.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "30 heures",
    price: 393576, // 600 FCFA * 655,96
    rating: 4.7,
    reviews: 178,
    students: 520,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Leadership Coach",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center",
    tags: ["Leadership", "Management", "Communication", "EQ"],
    objectives: [
      "Comprendre les styles de leadership",
      "Développer l'intelligence émotionnelle",
      "Maîtriser la communication",
      "Prendre des décisions éclairées"
    ],
    prerequisites: ["Expérience professionnelle", "Motivation"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: Users,
    features: [
      "Assessments leadership inclus",
      "Cas pratiques réels",
      "Certification Leadership",
      "Coaching individuel"
    ],
    schedule: "Mardi & Jeudi 18h-20h",
    nextSession: "2024-04-05"
  },
  {
    id: "emotional-intelligence",
    title: "Intelligence Émotionnelle Avancée",
    description: "Maîtrisez vos émotions et celles des autres pour mieux interagir",
    longDescription: "Formation spécialisée sur l'intelligence émotionnelle : conscience de soi, gestion des émotions, empathie et relations interpersonnelles.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "35 heures",
    price: 459168, // 700 FCFA * 655,96
    rating: 4.8,
    reviews: 145,
    students: 380,
    instructor: "Dr. Sophie Laurent",
    instructorTitle: "Psychologue Organisationnelle",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
    tags: ["Intelligence Émotionnelle", "Empathie", "Relations", "Psychologie"],
    objectives: [
      "Développer la conscience de soi",
      "Gérer les émotions",
      "Cultiver l'empathie",
      "Améliorer les relations"
    ],
    prerequisites: ["Base en psychologie"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "disponible",
    icon: Heart,
    features: [
      "Tests EQ inclus",
      "Exercices pratiques",
      "Certification EQ",
      "Support psychologique"
    ],
    schedule: "Lundi & Mercredi 19h-21h",
    nextSession: "2024-04-08"
  },
  {
    id: "effective-communication",
    title: "Communication Efficace & Publique",
    description: "Devenez un communicant exceptionnel en toutes circonstances",
    longDescription: "Formation sur la communication verbale et non verbale, la prise de parole en public, la négociation et la persuasion.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "25 heures",
    price: 327980, // 500 FCFA * 655,96
    rating: 4.6,
    reviews: 189,
    students: 580,
    instructor: "Thomas Martin",
    instructorTitle: "Communication Coach",
    image: "https://images.unsplash.com/photo-1596428202152-17a9468851dd?w=400&h=300&fit=crop&crop=center",
    tags: ["Communication", "Public Speaking", "Négociation", "Persuasion"],
    objectives: [
      "Maîtriser la communication verbale",
      "Développer l'écoute active",
      "Prendre parole en public",
      "Négocier efficacement"
    ],
    prerequisites: ["Aucun"],
    isUpdated: false,
    lastUpdateDate: "2024-02-15",
    status: "disponible",
    icon: MessageSquare,
    features: [
      "Enregistrements vidéo inclus",
      "Exercices de prise de parole",
      "Certification Communication",
      "Feedback personnalisé"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-12"
  },
  {
    id: "conflict-resolution",
    title: "Gestion des Conflits & Médiation",
    description: "Transformez les conflits en opportunités de croissance",
    longDescription: "Formation sur la gestion constructive des conflits : identification des sources, techniques de médiation et résolution de problèmes.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "30 heures",
    price: 393576, // 600 FCFA * 655,96
    rating: 4.7,
    reviews: 112,
    students: 290,
    instructor: "Philippe Bernard",
    instructorTitle: "Médiateur Professionnel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    tags: ["Conflits", "Médiation", "Négociation", "Relations"],
    objectives: [
      "Identifier les sources de conflit",
      "Appliquer les techniques de médiation",
      "Négocier des solutions",
      "Prévenir les conflits"
    ],
    prerequisites: ["Communication de base"],
    isUpdated: true,
    lastUpdateDate: "2024-03-12",
    status: "disponible",
    icon: Handshake,
    features: [
      "Simulations de médiation",
      "Cas d'étude réels",
      "Certification Médiation",
      "Support continu"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-15"
  },
  {
    id: "team-building",
    title: "Team Building & Cohésion d'Équipe",
    description: "Créez des équipes performantes et solidaires",
    longDescription: "Formation sur la création et la gestion d'équipes : recrutement, intégration, motivation et développement de la cohésion.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "35 heures",
    price: 459168, // 700 FCFA * 655,96
    rating: 4.8,
    reviews: 134,
    students: 350,
    instructor: "Claire Petit",
    instructorTitle: "Team Building Expert",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center",
    tags: ["Team Building", "Cohésion", "Motivation", "Management"],
    objectives: [
      "Construire des équipes solides",
      "Développer la cohésion",
      "Motiver les collaborateurs",
      "Gérer la diversité"
    ],
    prerequisites: ["Management de base"],
    isUpdated: false,
    lastUpdateDate: "2024-02-28",
    status: "disponible",
    icon: Users,
    features: [
      "Activités team building incluses",
      "Plans de motivation",
      "Certification Team Building",
      "Mentorat inclus"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-18"
  },
  {
    id: "critical-thinking",
    title: "Pensée Critique & Résolution de Problèmes",
    description: "Développez votre capacité à analyser et résoudre des problèmes complexes",
    longDescription: "Formation sur le développement de la pensée critique : analyse logique, créativité, prise de décision et résolution de problèmes.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "30 heures",
    price: 393576, // 600 FCFA * 655,96
    rating: 4.6,
    reviews: 98,
    students: 280,
    instructor: "Alexandre Kofi",
    instructorTitle: "Critical Thinking Expert",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center",
    tags: ["Pensée Critique", "Résolution de Problèmes", "Créativité", "Logique"],
    objectives: [
      "Développer la pensée critique",
      "Analyser les problèmes",
      "Stimuler la créativité",
      "Prendre des décisions éclairées"
    ],
    prerequisites: ["Aucun"],
    isUpdated: true,
    lastUpdateDate: "2024-03-08",
    status: "disponible",
    icon: Brain,
    features: [
      "Exercices de logique inclus",
      "Cas pratiques complexes",
      "Certification Critical Thinking",
      "Support personnalisé"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-20"
  },
  {
    id: "time-management",
    title: "Gestion du Temps & Productivité",
    description: "Optimisez votre temps et boostez votre productivité",
    longDescription: "Formation sur les techniques de gestion du temps : priorisation, planification, élimination des distractions et équilibre vie pro/vie perso.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "20 heures",
    price: 262384, // 400 FCFA * 655,96
    rating: 4.5,
    reviews: 156,
    students: 420,
    instructor: "Marc Rousseau",
    instructorTitle: "Productivity Coach",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
    tags: ["Time Management", "Productivité", "Planification", "Focus"],
    objectives: [
      "Prioriser les tâches",
      "Planifier efficacement",
      "Éliminer les distractions",
      "Maintenir la concentration"
    ],
    prerequisites: ["Aucun"],
    isUpdated: false,
    lastUpdateDate: "2024-02-20",
    status: "disponible",
    icon: Target,
    features: [
      "Templates planning inclus",
      "Outils de productivité",
      "Certification Time Management",
      "Suivi personnalisé"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-22"
  },
  {
    id: "networking-professional",
    title: "Networking & Relations Professionnelles",
    description: "Construisez et maintenez un réseau professionnel solide",
    longDescription: "Formation sur l'art du networking : créer des contacts, entretenir les relations, réseautage en ligne et développement personnel.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "25 heures",
    price: 327980, // 500 FCFA * 655,96
    rating: 4.6,
    reviews: 89,
    students: 220,
    instructor: "Dr. Jean-Pierre Ndiaye",
    instructorTitle: "Networking Expert",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center",
    tags: ["Networking", "Relations", "LinkedIn", "Développement Personnel"],
    objectives: [
      "Créer des contacts qualitatifs",
      "Entretenir les relations",
      "Utiliser LinkedIn efficacement",
      "Développer sa marque personnelle"
    ],
    prerequisites: ["Expérience professionnelle"],
    isUpdated: true,
    lastUpdateDate: "2024-03-18",
    status: "disponible",
    icon: Handshake,
    features: [
      "Stratégies networking incluses",
      "Templates messages",
      "Certification Networking",
      "Mentorat carrière"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-25"
  },
  {
    id: "stress-management",
    title: "Gestion du Stress & Résilience",
    description: "Développez votre résilience face aux défis professionnels",
    longDescription: "Formation sur la gestion du stress : identification des sources, techniques de relaxation, développement de la résilience et équilibre émotionnel.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "20 heures",
    price: 262384, // 400 FCFA * 655,96
    rating: 4.7,
    reviews: 145,
    students: 380,
    instructor: "Dr. Marie Claire",
    instructorTitle: "Stress Management Coach",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    tags: ["Stress", "Résilience", "Bien-être", "Mindfulness"],
    objectives: [
      "Identifier les sources de stress",
      "Appliquer les techniques de relaxation",
      "Développer la résilience",
      "Maintenir l'équilibre émotionnel"
    ],
    prerequisites: ["Aucun"],
    isUpdated: false,
    lastUpdateDate: "2024-02-25",
    status: "réservation",
    icon: Shield,
    features: [
      "Exercices de relaxation inclus",
      "Programme mindfulness",
      "Certification Stress Management",
      "Support bien-être"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-05"
  },
  {
    id: "coaching-mentoring",
    title: "Coaching & Mentorat Professionnel",
    description: "Devenez un coach ou mentor efficace pour vos collaborateurs",
    longDescription: "Formation sur les techniques de coaching et mentorat : écoute active, questionnement puissant, développement des talents et accompagnement.",
    category: "Soft Skills & Leadership",
    level: "avancé",
    duration: "40 heures",
    price: 524768, // 800 FCFA * 655,96
    rating: 4.8,
    reviews: 67,
    students: 150,
    instructor: "Thomas Bernard",
    instructorTitle: "Executive Coach",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop&crop=center",
    tags: ["Coaching", "Mentorat", "Développement", "Accompagnement"],
    objectives: [
      "Maîtriser les techniques de coaching",
      "Développer l'écoute active",
      "Utiliser le questionnement puissant",
      "Accompagner le développement"
    ],
    prerequisites: ["Management avancé", "Expérience professionnelle"],
    isUpdated: true,
    lastUpdateDate: "2024-03-20",
    status: "disponible",
    icon: GraduationCap,
    features: [
      "Sessions coaching pratiques",
      "Cas d'accompagnement réels",
      "Certification Coaching",
      "Mentorat avancé"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-28"
  }
];

const SoftSkillsLeadershipPage = () => {
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

  const filteredCourses = softSkillsCourses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const stats = {
    total: softSkillsCourses.length,
    available: softSkillsCourses.filter(c => c.status === "disponible").length,
    students: softSkillsCourses.reduce((acc, c) => acc + c.students, 0),
    avgRating: (softSkillsCourses.reduce((acc, c) => acc + c.rating, 0) / softSkillsCourses.length).toFixed(1)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-700 text-white">
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
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-montserrat">
                Soft Skills & Leadership
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto">
                Développez vos compétences relationnelles et devenez un leader inspirant
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.total}</div>
                  <div className="text-pink-100">Formations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.available}</div>
                  <div className="text-pink-100">Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.students.toLocaleString()}</div>
                  <div className="text-pink-100">Apprenants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stats.avgRating}</div>
                  <div className="text-pink-100">Note moyenne</div>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
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
                                ? "bg-pink-500 text-white border-pink-500"
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
                                ? "bg-pink-500 text-white border-pink-500"
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
              Explorez nos formations spécialisées en soft skills et leadership
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
                    <course.icon className="w-6 h-6 text-pink-600" />
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
                        className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-lg"
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Voir détails
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {course.status === "disponible" && (
                      <button
                        className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
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
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-600 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Prêt à devenir un leader inspirant ?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-pink-100">
                Rejoignez nos formations et développez les soft skills les plus recherchées par les entreprises
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-8 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition-colors">
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

export default SoftSkillsLeadershipPage;
