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
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SalesFunnelExamples from "@/components/SalesFunnelExamples";

// Données des cours enrichies
const courses = [
  {
    id: 1,
    title: "Python Bootcamp",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "PhD Computer Science, ex-Google",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108777-466d853b884d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 299,
    originalPrice: 599,
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
    color: "blue",
    studentsCount: 15420,
    lastUpdated: "Mars 2024",
    tags: ["Python", "Développement", "Backend"],
    modules: 12,
    language: "Français",
  },
  {
    id: 2,
    title: "Data Science Pro",
    instructor: "Prof. Jean Martin",
    instructorTitle: "Data Scientist, ex-IBM",
    instructorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 499,
    originalPrice: 899,
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
    color: "purple",
    studentsCount: 8750,
    lastUpdated: "Février 2024",
    tags: ["IA", "Python", "Statistics"],
    modules: 18,
    language: "Français",
  },
  {
    id: 3,
    title: "Web Design Créatif",
    instructor: "Sarah Laurent",
    instructorTitle: "Lead Designer, Freelance",
    instructorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 199,
    originalPrice: 399,
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
    color: "pink",
    studentsCount: 9800,
    lastUpdated: "Janvier 2024",
    tags: ["UI", "UX", "Figma"],
    modules: 10,
    language: "Français",
  },
  {
    id: 4,
    title: "Business Strategy",
    instructor: "Marc Dubois",
    instructorTitle: "Strategy Consultant, McKinsey",
    instructorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 399,
    originalPrice: 799,
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
    color: "green",
    studentsCount: 6200,
    lastUpdated: "Mars 2024",
    tags: ["Stratégie", "Management", "Finance"],
    modules: 14,
    language: "Français",
  },
  {
    id: 5,
    title: "Marketing Digital",
    instructor: "Julie Bernard",
    instructorTitle: "Growth Marketing Lead",
    instructorAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    price: 249,
    originalPrice: 499,
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
    color: "orange",
    studentsCount: 11200,
    lastUpdated: "Décembre 2023",
    tags: ["SEO", "Social Media", "Analytics"],
    modules: 9,
    language: "Français",
  },
];

const ElearningPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFunnels, setShowFunnels] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [savedCourses, setSavedCourses] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

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
    return matchesCategory && matchesLevel && matchesPrice;
  });

  const stats = {
    students: courses.reduce((acc, c) => acc + c.students, 0),
    courses: courses.length,
    avgRating: (
      courses.reduce((acc, c) => acc + c.rating, 0) / courses.length
    ).toFixed(1),
    reviews: courses.reduce((acc, c) => acc + c.reviews, 0),
  };

  const toggleSaveCourse = (courseId: number) => {
    setSavedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
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
    const isHovered = hoveredCourse === course.id;
    const isSaved = savedCourses.includes(course.id);

    return (
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onHoverStart={() => setHoveredCourse(course.id)}
        onHoverEnd={() => setHoveredCourse(null)}
        className="group bg-white border border-gray-100 hover:border-gray-300 transition-all relative"
      >
        {/* Save Button */}
        <button
          onClick={() => toggleSaveCourse(course.id)}
          className={`absolute top-4 right-4 z-10 p-2 bg-white border border-gray-200 transition-colors ${
            isSaved ? "border-gray-900" : "hover:border-gray-400"
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-gray-900 text-gray-900" : "text-gray-600"}`}
          />
        </button>

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-white/5 flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-white flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <Play className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {course.isUpdated && (
              <span className="px-2 py-1 bg-white text-xs font-medium border border-gray-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Nouveau
              </span>
            )}
            <span className="px-2 py-1 bg-white text-xs font-medium border border-gray-200">
              -{discount}%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {course.tags.map((tag, i) => (
              <span key={i} className="text-xs text-gray-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title & Category */}
          <div className="mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {course.category}
            </span>
            <h3 className="text-lg font-medium text-gray-900 mt-1 leading-tight">
              {course.title}
            </h3>
          </div>

          {/* Instructor with Avatar */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {course.instructor}
              </p>
              <p className="text-xs text-gray-400">{course.instructorTitle}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-y-3 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-600">
                {course.studentsCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-600">
                {course.rating} ({course.reviews})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-600">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-600">
                {course.modules} modules
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-light text-gray-900">
              {course.price} FCFA
            </span>
            <span className="text-sm text-gray-300 line-through">
              {course.originalPrice} FCFA
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedCourse(course);
                setShowFunnels(true);
              }}
              className="flex-1 px-4 py-3 bg-[hsl(345_70%_35%)] text-white text-sm font-medium hover:bg-[hsl(345_75%_30%)] transition-colors"
            >
              Voir les tunnels
            </button>
            <button className="px-4 py-3 border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Update Info */}
          {course.isUpdated && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Mis à jour {course.lastUpdated} · Version {course.updateVersion}
              </p>
            </div>
          )}
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
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
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
        {/* Hero Section - Élégante */}
        <div className="relative border-b border-gray-100">
          {/* Image de fond */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/Elearning.jpg"
              alt="E-learning platform background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/80 to-white/85" />
          </div>

          <div className="relative container mx-auto px-4 py-24 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-6 block">
                E-learning Platform
              </span>
              <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Transformez votre
                <br />
                <span className="italic">carrière</span>
              </h1>
              <p className="text-lg text-gray-400 font-light mb-10 max-w-xl leading-relaxed">
                Des formations de qualité avec des tunnels de vente optimisés
                pour maximiser vos conversions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[hsl(345_70%_35%)] text-white text-sm font-medium hover:bg-[hsl(345_75%_30%)] transition-colors tracking-wide">
                  Explorer les cours
                </button>
                <button className="px-8 py-4 border border-[hsl(345_70%_35%)] text-[hsl(345_70%_35%)] text-sm font-medium hover:bg-[hsl(345_70%_35%)] hover:text-white transition-colors tracking-wide">
                  Voir les tunnels
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats élégantes */}
        <div className="relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <div className="relative container mx-auto px-4 py-16 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 place-items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-light text-gray-900 tracking-tight text-center">
                      {stats.students.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider flex items-center justify-center gap-2">
                    Étudiants
                    <Trending className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="mt-2 text-xs text-green-600 font-medium text-center">
                    +12% ce mois
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-light text-gray-900 tracking-tight text-center">
                      {stats.courses}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider flex items-center justify-center gap-2">
                    Cours
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="mt-2 text-xs text-purple-600 font-medium text-center">
                    2 nouveaux ce mois
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-light text-gray-900 tracking-tight text-center">
                      {stats.avgRating}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider flex items-center justify-center gap-2">
                    Note moyenne
                    <Award className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="mt-2 text-xs text-yellow-600 font-medium text-center">
                    Excellence
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-light text-gray-900 tracking-tight text-center">
                      {stats.reviews.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider flex items-center justify-center gap-2">
                    Avis
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="mt-2 text-xs text-green-600 font-medium text-center">
                    98% positifs
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Filtres sophistiqués */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-30">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  {filteredCourses.length} cours
                </span>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex gap-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                        selectedCategory === category
                          ? "text-white bg-[hsl(345_70%_35%)]"
                          : "text-gray-400 hover:text-[hsl(345_70%_35%)]"
                      }`}
                    >
                      {category === "all" ? "Tous" : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 text-xs border border-gray-200 bg-transparent focus:outline-none focus:border-gray-400"
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
        </div>

        {/* Course Grid */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + selectedLevel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tunnels Section - Élégante */}
        <div className="bg-gray-50 border-t border-gray-100 py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-4 block">
                Optimisation
              </span>
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Tunnels de vente
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                5 stratégies testées pour maximiser vos conversions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-gray-200 mb-12">
              {[
                { name: "Scarcity", desc: "Urgence et rareté", color: "gray" },
                {
                  name: "Premium",
                  desc: "Positionnement haut de gamme",
                  color: "gray",
                },
                {
                  name: "Freemium",
                  desc: "Accès gratuit puis premium",
                  color: "gray",
                },
                {
                  name: "Flash Sale",
                  desc: "Offre limitée dans le temps",
                  color: "gray",
                },
                {
                  name: "Communauté",
                  desc: "Appartenance et exclusivité",
                  color: "gray",
                },
              ].map((funnel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-8 text-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {funnel.name}
                  </h3>
                  <p className="text-sm text-gray-400">{funnel.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowFunnels(true)}
                className="px-8 py-4 bg-[hsl(345_70%_35%)] text-white text-sm font-medium hover:bg-[hsl(345_75%_30%)] transition-colors tracking-wide"
              >
                Explorer les tunnels
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTA élégant avec image de fond */}
        <div className="relative border-t border-gray-100 overflow-hidden pt-16">
          {/* Image de fond */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              src="/assets/dakar-city.webp"
              alt="Dakar city skyline"
              className="w-full h-full object-cover"
            />

            {/* Overlay très sombre pour meilleure lisibilité */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Overlay gradient avec la charte graphique en surimpression légère */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(346,100%,25%)]/80 via-[hsl(346,100%,25%)]/50 to-[hsl(346,100%,35%)]/40 mix-blend-overlay" />

            {/* Effet de lumière subtil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
          </div>

          <div className="relative container mx-auto px-4 py-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Badge compact - plus opaque */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full mb-4 shadow-2xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs text-white font-medium tracking-wider">
                  Rejoignez l'excellence
                </span>
              </motion.div>

              {/* Titre principal - avec ombre très prononcée */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight"
                style={{
                  textShadow:
                    "0 4px 15px rgba(0,0,0,0.8), 0 2px 5px rgba(0,0,0,0.9)",
                }}
              >
                Prêt à
                <span className="relative inline-block mx-2">
                  <span className="relative z-10 font-bold text-white">
                    commencer
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute bottom-1 left-0 h-2 bg-white/30 -z-0 rounded-full"
                  />
                </span>
                ?
              </motion.h2>

              {/* Description - avec fond semi-transparent et ombre */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base text-white/90 font-light mb-5 max-w-xl mx-auto px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg inline-block"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Rejoignez{" "}
                <span className="text-white font-bold text-lg">
                  {stats.students.toLocaleString()}+
                </span>{" "}
                apprenants passionnés
              </motion.p>

              {/* Boutons compacts */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-3 bg-white text-[hsl(346,100%,25%)] text-sm font-medium rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Commencer maintenant
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-black/40 backdrop-blur-sm border-2 border-white/50 text-white text-sm font-medium rounded-lg hover:bg-black/60 transition-all duration-300 shadow-2xl"
                >
                  En savoir plus
                </motion.button>
              </motion.div>

              {/* Stats additionnelles - avec fonds individuels */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20"
              >
                {[
                  { value: stats.courses + "+", label: "Formations" },
                  { value: stats.avgRating + "/5", label: "Note" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center bg-black/30 backdrop-blur-sm rounded-lg py-2 px-1"
                  >
                    <div className="text-xl font-bold text-white mb-0.5 drop-shadow-2xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/80 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Badges de confiance - avec fond et ombre */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center justify-center gap-4 mt-6 text-white/90 text-xs bg-black/30 backdrop-blur-sm rounded-full py-2 px-6 mx-auto w-fit"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="w-0.5 h-3 bg-white/40" />
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Accès à vie</span>
                </div>
                <div className="w-0.5 h-3 bg-white/40" />
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certification</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ElearningPage;
