import { useState } from "react";
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
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 499 * 655,
    originalPrice: 899 * 655,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1559027857-344e26669f82?w=800&h=600&fit=crop&crop=entropy&auto=format",
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
      "https://images.unsplash.com/photo-1579468118864-3b2ea3c00b3b?w=800&h=600&fit=crop&crop=entropy&auto=format",
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

const ElearningPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFunnels, setShowFunnels] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [savedCourses, setSavedCourses] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    500 * 655,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      red: "bg-red-50 text-red-600 border-red-100 group-hover:bg-red-100",
      blue: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100",
      purple:
        "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-100",
      pink: "bg-pink-50 text-pink-600 border-pink-100 group-hover:bg-pink-100",
      green:
        "bg-green-50 text-green-600 border-green-100 group-hover:bg-green-100",
      orange:
        "bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-100",
      yellow:
        "bg-yellow-50 text-yellow-600 border-yellow-100 group-hover:bg-yellow-100",
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
    const discount = Math.round(
      (1 - course.price / course.originalPrice) * 100,
    );
    const isSaved = savedCourses.includes(course.id);
    const colorClasses = getColorClasses(course.color);

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {course.isUpdated && (
              <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" />
                Nouveau
              </span>
            )}
            <span className="px-2.5 py-1 bg-red-700 text-white text-xs font-medium rounded-full shadow-lg">
              -{discount}%
            </span>
          </div>

          {/* Save Button */}
          <button
            onClick={() => toggleSaveCourse(course.id)}
            className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all ${
              isSaved ? "text-red-600" : "text-gray-600 hover:text-red-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Category & Level */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {course.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm font-semibold text-gray-900 ml-1">
                {course.rating}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              ({course.reviews} avis)
            </span>
            <span className="text-xs text-gray-300">•</span>
            <div className="flex items-center text-xs text-gray-500">
              <Users className="w-3 h-3 mr-1" />
              {course.students.toLocaleString()}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Price & Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
            <button
              onClick={() => {
                window.open('https://dmplus-tunnel-de-vente-cgpg.vercel.app/', '_blank');
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg flex items-center gap-1"
            >
              Voir plus
              <ChevronRight className="w-4 h-4" />
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
                    className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors"
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
                  <span className="text-lg font-light text-gray-900">
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
        {/* Navigation améliorée */}
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative">
                  <Heart className="w-5 h-5" />
                  {savedCourses.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {savedCourses.length}
                    </span>
                  )}
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* Hero Section - Design épuré avec hauteur réduite */}
        <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-800 min-h-[600px] lg:min-h-[450px] flex items-center overflow-hidden">
          {/* Image de fond avec overlay sophistiqué */}
          <div className="absolute inset-0">
            <img
              src="/assets/E-learning2.jpg"
              alt="E-learning platform"
              className="w-full h-full object-cover object-center opacity-40 lg:object-cover"
              style={{ objectPosition: "center 20%" }}
            />
            {/* Overlay avec dégradé plus léger */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-800/70" />
          </div>

          {/* Éléments décoratifs minimalistes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/10 rounded-full blur-3xl" />

          {/* Contenu principal */}
          <div className="relative container mx-auto px-4 py-8 lg:py-12 max-w-7xl z-10">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Colonne gauche - Texte */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 lg:space-y-5"
              >
                {/* Badge premium simplifié */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-medium text-white tracking-wide">
                    PLATEFORME N°1
                  </span>
                  <Sparkles className="w-3 h-3 text-red-300" />
                </motion.div>

                {/* Titre principal - plus compact */}
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl lg:text-5xl font-bold text-white leading-tight"
                  >
                    Transformez votre
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white">
                      avenir numérique
                    </span>
                  </motion.h1>

                  {/* Sous-titre court */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-sm lg:text-base text-gray-200 mt-2 max-w-lg"
                  >
                    Maîtrisez les compétences les plus recherchées et accélérez votre carrière.
                  </motion.p>
                </div>

                {/* Mini-statistiques en ligne - responsive */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex items-center gap-4 lg:gap-6 bg-white/5 backdrop-blur-sm rounded-xl px-3 lg:px-4 py-2 max-w-md border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-base lg:text-lg font-bold text-white">50+</div>
                    <div className="text-xs text-gray-300">Formations</div>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <div className="text-base lg:text-lg font-bold text-white">15k+</div>
                    <div className="text-xs text-gray-300">Apprenants</div>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <div className="text-base lg:text-lg font-bold text-white">4.8</div>
                    <div className="text-xs text-gray-300">Note</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Colonne droite - Image/Card compacte */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:block relative mt-8 lg:mt-0 w-full"
              >
                <div className="relative w-full max-w-sm mx-auto lg:max-w-md lg:mx-auto">
                  {/* Image principale avec overlay */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/assets/E-learning2.jpg"
                      alt="Student learning"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Mini progress bar */}
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
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filtres avancés */}
        <section className="pt-8 pb-8 lg:pt-12 lg:pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col gap-6 mb-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Nos formations
                  </h2>
                  <p className="text-gray-500 text-xs lg:text-sm">
                    {filteredCourses.length} cours disponibles
                  </p>
                </div>
              </div>

              {/* Filtres - Stack sur mobile */}
              <div className="flex flex-col gap-4">
                {/* Filtre catégorie - Full width sur mobile */}
                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg overflow-x-auto">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                        selectedCategory === category
                          ? "bg-white text-red-600 shadow-md"
                          : "text-gray-600 hover:text-red-600"
                      }`}
                    >
                      {category === "all" ? "Tous" : category}
                    </button>
                  ))}
                </div>

                {/* Filtres secondaires - Horizontal sur mobile */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Filtre niveau */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg text-xs lg:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 min-w-0"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tous niveaux" : level}
                      </option>
                    ))}
                  </select>

                  {/* Tri */}
                  <select className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg text-xs lg:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 min-w-0">
                    <option>Plus populaires</option>
                    <option>Mieux notés</option>
                    <option>Prix croissant</option>
                    <option>Prix décroissant</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid - Moderne */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + selectedLevel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {filteredCourses.length > 8 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                        page === 1
                          ? "bg-red-600 text-white"
                          : "border border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                Pourquoi nous choisir
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Une expérience d'apprentissage unique
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Apprentissage accéléré",
                  description:
                    "Des formations conçues pour vous faire progresser rapidement",
                  color: "red",
                },
                {
                  icon: Users,
                  title: "Communauté active",
                  description:
                    "Échangez avec des milliers d'apprenants passionnés",
                  color: "red",
                },
                {
                  icon: Award,
                  title: "Certification reconnue",
                  description: "Valorisez vos compétences avec nos certificats",
                  color: "red",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 text-center group"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA élégant avec charte rouge-bordeaux */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/dakar-city.webp"
              alt="Dakar city"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-red-800/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.2)_0%,_transparent_70%)]" />
          </div>

          <div className="relative container mx-auto px-4 py-20 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">
                  Rejoignez l'excellence
                </span>
              </motion.div>

              {/* Titre */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Prêt à commencer votre voyage ?
              </h2>

              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Rejoignez plus de {stats.students.toLocaleString()} apprenants
                et donnez un nouvel élan à votre carrière dès aujourd'hui.
              </p>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-2"
                >
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  Parler à un conseiller
                </motion.button>
              </div>

              {/* Badges de confiance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Accès à vie</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Certification</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Garantie satisfait</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ElearningPage;