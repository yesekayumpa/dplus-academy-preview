import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Star,
  Clock,
  TrendingUp,
  Award,
  Target,
  Play,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  GraduationCap,
  Code,
  BarChart3,
  Palette,
  Briefcase,
  X,
  ChevronRight,
  Heart,
  Share2,
  Bookmark,
  TrendingUp as Trending,
  Filter,
  Search,
  Menu,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SalesFunnelExamples from "@/components/SalesFunnelExamples";

// Données des cours enrichies
const courses = [
  {
    id: 9,
    title: "Formation Graphisme",
    instructor: "DIGITALMIND+ ACADEMY",
    instructorTitle: "Formation Professionnelle",
    instructorAvatar: "/assets/academy-white.png",
    price: 4900,
    originalPrice: 9900,
    image: "/assets/pack-design-graphique-removebg-preview.png",
    category: "Design",
    level: "Débutant",
    duration: "30h",
    students: 2500,
    rating: 4.7,
    reviews: 180,
    isUpdated: true,
    updateVersion: "v1.0",
    updateDate: "2024-03-15",
    features: [
      "Photoshop, Illustrator et Indesign",
      "Pack en Marketing Digital",
      "Pack en Montage vidéo",
      "Certificat",
    ],
    icon: Palette,
    color: "red",
    studentsCount: 2500,
    lastUpdated: "Mars 2024",
    tags: ["Photoshop", "Illustrator", "Indesign", "Graphisme"],
    modules: 15,
    language: "Français",
    certificate: true,
    projects: 10,
  },
  {
    id: 1,
    title: "Python Bootcamp",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Computer Science, ex-Google",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108777-466d853b884d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 299 * 655,
    originalPrice: 599 * 655,
    image:
      "/assets/E-learning2.jpg",
    category: "Programmation",
    level: "Débutant",
    duration: "40h",
    students: 15420,
    rating: 4.8,
    reviews: 1243,
    isUpdated: true,
    updateVersion: "v3.2",
    updateDate: "2024-03-01",
    features: [
      "50+ heures de vidéo",
      "Projets pratiques",
      "Certificat",
      "Accès à vie",
    ],
    icon: Code,
    color: "red",
    studentsCount: 15420,
    lastUpdated: "Mars 2024",
    tags: ["Python", "Développement", "Backend"],
    modules: 12,
    language: "Français",
    certificate: true,
    projects: 8,
  },
  {
    id: 2,
    title: "Data Science Pro",
    instructor: "Prof. Jean Martin",
    instructorTitle: "Data Scientist, ex-IBM",
    instructorAvatar:
      "/assets/Formateur Afrique.jpg",
    price: 499 * 655,
    originalPrice: 899 * 655,
    image:
      "/assets/E-learning2.jpg",
    category: "Data Science",
    level: "Avancé",
    duration: "60h",
    students: 8750,
    rating: 4.9,
    reviews: 892,
    isUpdated: true,
    updateVersion: "v2.5",
    updateDate: "2024-02-15",
    features: [
      "Machine Learning",
      "Deep Learning",
      "Projets réels",
      "Mentorat",
    ],
    icon: BarChart3,
    color: "red",
    studentsCount: 8750,
    lastUpdated: "Février 2024",
    tags: ["IA", "Python", "Statistics"],
    modules: 18,
    language: "Français",
    certificate: true,
    projects: 12,
  },
  {
    id: 3,
    title: "Web Design Créatif",
    instructor: "Sarah Laurent",
    instructorTitle: "Lead Designer, Freelance",
    instructorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 199 * 655,
    originalPrice: 399 * 655,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Design",
    level: "Intermédiaire",
    duration: "25h",
    students: 9800,
    rating: 4.6,
    reviews: 756,
    isUpdated: false,
    features: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Portfolio"],
    icon: Palette,
    color: "red",
    studentsCount: 9800,
    lastUpdated: "Janvier 2024",
    tags: ["UI", "UX", "Figma"],
    modules: 10,
    language: "Français",
    certificate: true,
    projects: 6,
  },
  {
    id: 4,
    title: "Business Strategy",
    instructor: "Marc Dubois",
    instructorTitle: "Strategy Consultant, McKinsey",
    instructorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 399 * 655,
    originalPrice: 799 * 655,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Business",
    level: "Intermédiaire",
    duration: "30h",
    students: 6200,
    rating: 4.7,
    reviews: 534,
    isUpdated: true,
    updateVersion: "v4.0",
    updateDate: "2024-03-10",
    features: ["Stratégie", "Leadership", "Finance", "Marketing"],
    icon: Briefcase,
    color: "red",
    studentsCount: 6200,
    lastUpdated: "Mars 2024",
    tags: ["Stratégie", "Management", "Finance"],
    modules: 14,
    language: "Français",
    certificate: true,
    projects: 5,
  },
  {
    id: 5,
    title: "Marketing Digital",
    instructor: "Julie Bernard",
    instructorTitle: "Growth Marketing Lead",
    instructorAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 249 * 655,
    originalPrice: 499 * 655,
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    level: "Débutant",
    duration: "20h",
    students: 11200,
    rating: 4.5,
    reviews: 982,
    isUpdated: false,
    features: ["SEO/SEA", "Social Media", "Emailing", "Analytics"],
    icon: Target,
    color: "red",
    studentsCount: 11200,
    lastUpdated: "Décembre 2023",
    tags: ["SEO", "Social Media", "Analytics"],
    modules: 9,
    language: "Français",
    certificate: true,
    projects: 4,
  },
  {
    id: 6,
    title: "UI/UX Design Pro",
    instructor: "Claire Martin",
    instructorTitle: "Senior UX Designer",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108777-466d853b884d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 349 * 655,
    originalPrice: 699 * 655,
    image:
      "/assets/pack-design-graphique-removebg-preview.png",
    category: "Design",
    level: "Intermédiaire",
    duration: "35h",
    students: 7800,
    rating: 4.7,
    reviews: 654,
    isUpdated: true,
    updateVersion: "v2.1",
    updateDate: "2024-02-20",
    features: ["Design Thinking", "Prototypage", "User Research", "Figma Pro"],
    icon: Palette,
    color: "red",
    studentsCount: 7800,
    lastUpdated: "Février 2024",
    tags: ["UI", "UX", "Figma", "Prototyping"],
    modules: 12,
    language: "Français",
    certificate: true,
    projects: 7,
  },
  {
    id: 7,
    title: "JavaScript Avancé",
    instructor: "Thomas Dubois",
    instructorTitle: "Full Stack Developer",
    instructorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd72210f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 399 * 655,
    originalPrice: 799 * 655,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop&crop=entropy&auto=format",
    category: "Programmation",
    level: "Avancé",
    duration: "45h",
    students: 9200,
    rating: 4.8,
    reviews: 1123,
    isUpdated: true,
    updateVersion: "v3.0",
    updateDate: "2024-03-05",
    features: ["ES6+", "Async/Await", "Frameworks", "Node.js"],
    icon: Code,
    color: "red",
    studentsCount: 9200,
    lastUpdated: "Mars 2024",
    tags: ["JavaScript", "Node.js", "React", "ES6"],
    modules: 15,
    language: "Français",
    certificate: true,
    projects: 10,
  },
  {
    id: 8,
    title: "Gestion de Projet",
    instructor: "Marie Laurent",
    instructorTitle: "PMP Certified",
    instructorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 279 * 655,
    originalPrice: 549 * 655,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format",
    category: "Business",
    level: "Intermédiaire",
    duration: "25h",
    students: 5600,
    rating: 4.6,
    reviews: 445,
    isUpdated: false,
    features: ["Agile", "Scrum", "Planning", "Leadership"],
    icon: Briefcase,
    color: "red",
    studentsCount: 5600,
    lastUpdated: "Janvier 2024",
    tags: ["Management", "Agile", "Scrum", "PMP"],
    modules: 10,
    language: "Français",
    certificate: true,
    projects: 3,
  },
];

// Composant pour l'animation lettre par lettre
const TypewriterText = ({ text, delay = 0, className = "" }) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.15,
            delay: delay + index * 0.06, // Réduit à 60ms entre chaque lettre pour mobile
          }}
          style={{ 
            display: 'inline-block',
            whiteSpace: 'pre-wrap' // Meilleure gestion des espaces
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

const ElearningPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFunnels, setShowFunnels] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  // Scroller en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [savedCourses, setSavedCourses] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    500 * 655,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const categories = [
    "all",
    "Programmation",
    "Data Science",
    "Design",
    "Business",
    "Marketing",
  ];
  const levels = ["all", "Débutant", "Intermédiaire", "Avancé"];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesPrice =
      course.price >= priceRange[0] && course.price <= priceRange[1];
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });

  const stats = {
    students: courses.reduce((acc, c) => acc + c.students, 0),
    courses: courses.length,
    avgRating: (
      courses.reduce((acc, c) => acc + c.rating, 0) / courses.length
    ).toFixed(1),
    reviews: courses.reduce((acc, c) => acc + c.reviews, 0),
    projects: courses.reduce((acc, c) => acc + (c.projects || 0), 0),
    certificates: courses.filter((c) => c.certificate).length,
  };

  const toggleSaveCourse = (courseId: number) => {
    setSavedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      blue: "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      purple:
        "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      pink: "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      green:
        "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      orange:
        "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
      yellow:
        "bg-red-50 text-red-700 border-red-100 group-hover:bg-red-100",
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  const CourseCard = ({
    course,
    index,
  }: {
    course: (typeof courses)[0];
    index: number;
  }) => {
    const isSaved = savedCourses.includes(course.id);

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="bg-white rounded-lg border border-red-200 hover:border-red-500 hover:shadow-md transition-all duration-200 relative overflow-hidden h-full flex flex-col"
      >
        {/* Image Container - ratio plus compact */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-t-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />

          {/* Badge - uniquement si nouveau */}
          {course.isUpdated && (
            <div className="absolute top-1.5 left-1.5">
              <span className="px-1.5 py-0.5 bg-red-700 text-white text-[9px] font-medium rounded-full flex items-center gap-0.5 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                Nouveau
              </span>
            </div>
          )}

          {/* Bouton sauvegarder */}
          <button
            onClick={() => toggleSaveCourse(course.id)}
            className={`absolute top-1.5 right-1.5 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-colors ${
              isSaved ? "text-red-700" : "text-red-600 hover:text-red-700"
            }`}
          >
            <Heart className={`w-3 h-3 ${isSaved ? "fill-current" : ""}`} />
          </button>

          {/* Barre de progression animée */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "78%" }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="h-full bg-gradient-to-r from-red-600 to-red-700"
            />
          </div>
        </div>

        {/* Content - padding encore plus réduit */}
        <div className="p-2.5 flex-grow flex flex-col">
          {/* Catégorie et durée */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-medium text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full">
              {course.category}
            </span>
            <span className="text-[9px] text-gray-500 flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              {course.duration}
            </span>
          </div>

          {/* Titre */}
          <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
            {course.title}
          </h3>

          {/* Instructeur */}
          <div className="flex items-center gap-1 mb-1.5">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="text-[9px] text-gray-600 truncate">
              {course.instructor}
            </span>
          </div>

          {/* Rating compact */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star className="w-2.5 h-2.5 text-amber-400 fill-current" />
              <span className="text-[9px] font-semibold text-gray-900 ml-0.5">
                {course.rating}
              </span>
            </div>
            <span className="text-[8px] text-gray-400">
              ({course.reviews})
            </span>
            <span className="text-[8px] text-gray-300">•</span>
            <div className="flex items-center text-[8px] text-gray-500">
              <Users className="w-2.5 h-2.5 mr-0.5" />
              {course.students > 1000 
                ? `${(course.students / 1000).toFixed(1)}k` 
                : course.students}
            </div>
          </div>

          {/* Prix et CTA */}
          <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-gray-100">
            <div className="leading-tight">
              {course.originalPrice > course.price && (
                <span className="text-[8px] text-gray-400 line-through block">
                  {course.originalPrice.toLocaleString()} FCFA
                </span>
              )}
              <span className="text-xs font-bold text-red-700">
                {course.price.toLocaleString()} FCFA
              </span>
            </div>
            
            <button
              onClick={() => {
                window.open('https://dmplus-tunnel-de-vente-cgpg.vercel.app/', '_blank');
              }}
              className="px-3 py-1.5 bg-red-700 text-white text-[12px] font-medium rounded-lg hover:bg-red-800 transition-colors shadow-sm flex items-center gap-1"
            >
              Voir plus
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.article>
    );
  };

  if (showFunnels) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          {/* Header minimal */}
          <div className="border-b border-gray-100 bg-white sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4 max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setShowFunnels(false)}
                    className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    <span className="text-sm">Retour</span>
                  </button>
                  <div className="h-6 w-px bg-gray-100" />
                  <div>
                    <h2 className="text-sm text-gray-900">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {selectedCourse.isUpdated
                        ? "Version mise à jour"
                        : "Version standard"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 line-through">
                    {selectedCourse.originalPrice} FCFA
                  </span>
                  <span className="text-lg font-light text-red-700">
                    {selectedCourse.price} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tunnels */}
          <SalesFunnelExamples onBack={() => setShowFunnels(false)} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-red-800 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  EduPro
                </span>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un cours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors relative">
                  <Heart className="w-5 h-5" />
                  {savedCourses.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-700 text-white text-xs rounded-full flex items-center justify-center">
                      {savedCourses.length}
                    </span>
                  )}
                </button>
                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section avec animation lettre par lettre */}
        <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-800 min-h-[400px] md:min-h-[450px] lg:min-h-[400px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/E-learning2.jpg"
              alt="E-learning platform"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-800/70" />
          </div>

          {/* Éléments décoratifs animés */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/10 rounded-full blur-3xl" 
          />

          <div className="relative container mx-auto px-4 py-8 max-w-7xl z-10">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-400" 
                  />
                  <span className="text-xs font-medium text-white tracking-wide">
                    PLATEFORME N°1
                  </span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-red-300" />
                  </motion.div>
                </motion.div>

                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug sm:leading-tight">
                    <TypewriterText text="Transformez votre" delay={0.2} />
                    <span className="block mt-1">
                      <TypewriterText 
                        text="avenir numérique" 
                        delay={0.2 + "Transformez votre".length * 0.08 + 0.2}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white"
                      />
                    </span>
                  </h1>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + "Transformez votre avenir numérique".length * 0.08 + 0.4 }}
                    className="text-sm text-gray-200 mt-2 max-w-lg"
                  >
                    Maîtrisez les compétences les plus recherchées.
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + "Transformez votre avenir numérique".length * 0.08 + 0.6 }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 max-w-md border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-white">50+</div>
                    <div className="text-xs text-gray-300">Formations</div>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-white">15k+</div>
                    <div className="text-xs text-gray-300">Apprenants</div>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-white">4.8</div>
                    <div className="text-xs text-gray-300">Note</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + "Transformez votre avenir numérique".length * 0.08 + 0.3 }}
                className="hidden lg:block relative"
              >
                <div className="relative max-w-sm mx-auto">
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/assets/E-learning2.jpg"
                      alt="Student learning"
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Barre de progression sur l'image hero */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="flex items-center justify-between text-white text-xs mb-1">
                          <span>Formation en cours</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "78%" }}
                            transition={{ duration: 1.5, delay: 0.2 + "Transformez votre avenir numérique".length * 0.08 + 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filtres */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Nos formations
                  </h2>
                  <p className="text-xs text-gray-500">
                    {filteredCourses.length} cours disponibles
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        selectedCategory === category
                          ? "bg-white text-red-700 shadow-sm"
                          : "text-red-600 hover:text-red-700"
                      }`}
                    >
                      {category === "all" ? "Tous" : category}
                    </button>
                  ))}
                </div>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-1.5 border border-red-200 rounded-lg text-xs focus:outline-none focus:border-red-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level === "all" ? "Tous niveaux" : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid - avec gap réduit */}
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + selectedLevel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Pourquoi nous choisir
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Apprentissage accéléré",
                  description: "Progressez rapidement",
                },
                {
                  icon: Users,
                  title: "Communauté active",
                  description: "Échangez entre apprenants",
                },
                {
                  icon: Award,
                  title: "Certification",
                  description: "Certificats reconnus",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-red-700" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/dakar-city.webp"
              alt="Dakar city"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-red-800/95" />
          </div>

          <div className="relative container mx-auto px-4 py-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Prêt à commencer ?
              </h2>

              <p className="text-base text-white/80 mb-6">
                Rejoignez plus de {stats.students.toLocaleString()} apprenants
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold rounded-lg hover:from-red-800 hover:to-red-900 transition-all shadow-lg flex items-center justify-center gap-2">
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
                  Parler à un conseiller
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ElearningPage;