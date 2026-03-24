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
  Mic,
  ChevronLeft,
  ChevronRight
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
    price: 393576,
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
    nextSession: "2024-04-05",
    type: "masterclass"
  },
  {
    id: "emotional-intelligence",
    title: "Intelligence Émotionnelle Avancée",
    description: "Maîtrisez vos émotions et celles des autres pour mieux interagir",
    longDescription: "Formation spécialisée sur l'intelligence émotionnelle : conscience de soi, gestion des émotions, empathie et relations interpersonnelles.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "35 heures",
    price: 459168,
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
    nextSession: "2024-04-08",
    type: "e-learning"
  },
  {
    id: "effective-communication",
    title: "Communication Efficace & Publique",
    description: "Devenez un communicant exceptionnel en toutes circonstances",
    longDescription: "Formation sur la communication verbale et non verbale, la prise de parole en public, la négociation et la persuasion.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "25 heures",
    price: 327980,
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
    nextSession: "2024-04-12",
    type: "e-learning"
  },
  {
    id: "conflict-resolution",
    title: "Gestion des Conflits & Médiation",
    description: "Transformez les conflits en opportunités de croissance",
    longDescription: "Formation sur la gestion constructive des conflits : identification des sources, techniques de médiation et résolution de problèmes.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "30 heures",
    price: 393576,
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
    nextSession: "2024-04-15",
    type: "corporate"
  },
  {
    id: "team-building",
    title: "Team Building & Cohésion d'Équipe",
    description: "Créez des équipes performantes et solidaires",
    longDescription: "Formation sur la création et la gestion d'équipes : recrutement, intégration, motivation et développement de la cohésion.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "35 heures",
    price: 459168,
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
    nextSession: "2024-04-18",
    type: "corporate"
  },
  {
    id: "critical-thinking",
    title: "Pensée Critique & Résolution de Problèmes",
    description: "Développez votre capacité à analyser et résoudre des problèmes complexes",
    longDescription: "Formation sur le développement de la pensée critique : analyse logique, créativité, prise de décision et résolution de problèmes.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "30 heures",
    price: 393576,
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
    nextSession: "2024-04-20",
    type: "e-learning"
  },
  {
    id: "time-management",
    title: "Gestion du Temps & Productivité",
    description: "Optimisez votre temps et boostez votre productivité",
    longDescription: "Formation sur les techniques de gestion du temps : priorisation, planification, élimination des distractions et équilibre vie pro/vie perso.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "20 heures",
    price: 262384,
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
    nextSession: "2024-04-22",
    type: "e-learning"
  },
  {
    id: "networking-professional",
    title: "Networking & Relations Professionnelles",
    description: "Construisez et maintenez un réseau professionnel solide",
    longDescription: "Formation sur l'art du networking : créer des contacts, entretenir les relations, réseautage en ligne et développement personnel.",
    category: "Soft Skills & Leadership",
    level: "intermédiaire",
    duration: "25 heures",
    price: 327980,
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
    nextSession: "2024-04-25",
    type: "masterclass"
  },
  {
    id: "stress-management",
    title: "Gestion du Stress & Résilience",
    description: "Développez votre résilience face aux défis professionnels",
    longDescription: "Formation sur la gestion du stress : identification des sources, techniques de relaxation, développement de la résilience et équilibre émotionnel.",
    category: "Soft Skills & Leadership",
    level: "débutant",
    duration: "20 heures",
    price: 262384,
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
    nextSession: "2024-05-05",
    type: "e-learning"
  },
  {
    id: "coaching-mentoring",
    title: "Coaching & Mentorat Professionnel",
    description: "Devenez un coach ou mentor efficace pour vos collaborateurs",
    longDescription: "Formation sur les techniques de coaching et mentorat : écoute active, questionnement puissant, développement des talents et accompagnement.",
    category: "Soft Skills & Leadership",
    level: "avancé",
    duration: "40 heures",
    price: 524768,
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
    nextSession: "2024-04-28",
    type: "masterclass"
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
        <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop")' }}>
          <div className="absolute inset-0 bg-pink-900/80"></div>
          <div className="relative container mx-auto px-4 pt-20 pb-12 lg:pt-24 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-white/20 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-3 text-white">
                Soft Skills & Leadership
              </h1>
              <p className="text-base lg:text-lg mb-6 text-pink-100 max-w-3xl mx-auto">
                Développez vos compétences relationnelles et devenez un leader inspirant
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
                  <div className="text-xs text-pink-100">Formations</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.available}</div>
                  <div className="text-xs text-pink-100">Disponibles</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.students.toLocaleString()}</div>
                  <div className="text-xs text-pink-100">Apprenants</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}</div>
                  <div className="text-xs text-pink-100">Note moyenne</div>
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
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(selectedLevel !== "all" || selectedStatus !== "all") && (
                  <span className="bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
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
                                ? "bg-pink-500 text-white border-pink-500"
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
                                ? "bg-pink-500 text-white border-pink-500"
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
              Explorez nos formations spécialisées en soft skills et leadership
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
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-pink-300 transition-colors cursor-pointer group hover:shadow-lg"
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
                      <course.icon className="w-5 h-5 text-pink-600" />
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
                          className="px-2 py-0.5 bg-pink-50 text-pink-600 text-[10px] rounded hover:bg-pink-100 transition-colors"
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
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-pink-600 text-white text-xs rounded hover:bg-pink-700 transition-colors hover:shadow-md"
                      >
                        Voir
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      {course.status === "disponible" && (
                        <button
                          className="px-3 py-2 border border-pink-600 text-pink-600 text-xs rounded hover:bg-pink-50 transition-colors"
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
                className="px-4 py-1.5 bg-pink-600 text-white text-sm rounded hover:bg-pink-700 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </section>

        {/* Navigation Élégante */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Indicateur de progression */}
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Progression</span>
                  <span className="text-sm font-medium text-pink-600">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Pagination moderne */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/entrepreneurship')}
                  className="group relative px-6 py-3 bg-white border border-gray-300 rounded-2xl text-gray-700 hover:border-pink-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Précédent</span>
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/digital-tools-automation')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-pink-400 hover:text-pink-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    2
                  </button>
                  <button 
                    onClick={() => navigate('/data-analytics')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-pink-400 hover:text-pink-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    3
                  </button>
                  <button 
                    onClick={() => navigate('/entrepreneurship')}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-gray-300 text-gray-600 hover:border-pink-400 hover:text-pink-600 hover:shadow-md transition-all duration-300 font-semibold"
                  >
                    4
                  </button>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/finance-investment')}
                  className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="font-medium">Suivant</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Indicateur de pages */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span>Soft Skills & Leadership</span>
                </div>
                <span className="text-gray-300">|</span>
                <span>Page 5 sur 5</span>
                <span className="text-gray-300">|</span>
                <span>Formation certifiante</span>
              </div>

              {/* Badge d'accomplissement */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full border border-pink-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-pink-700">Parcours complété !</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Sans dégradé */}
        <section className="bg-pink-600 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-2">
                Prêt à devenir un leader inspirant ?
              </h2>
              <p className="text-sm mb-5 max-w-2xl mx-auto text-pink-100">
                Rejoignez nos formations et développez les soft skills les plus recherchées par les entreprises
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-5 py-2 bg-white text-pink-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Contacter un conseiller
                </button>
                <button className="px-5 py-2 bg-pink-500 text-white rounded-lg text-sm font-semibold hover:bg-pink-400 transition-colors">
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