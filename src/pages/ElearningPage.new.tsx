import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Clock, Users, Star, Award, Play, BookOpen, ArrowRight,
  Heart, Calendar, MapPin, Eye, Sparkles, Monitor, GraduationCap,
  ChevronLeft, ChevronRight, X, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { RegistrationForm } from "@/components/ui/RegistrationForm";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useFormations } from "@/hooks/useFormations";

// Configuration des couleurs par catégorie
const categoryConfig: Record<string, { bg: string; text: string; border: string }> = {
  "Programmation": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Développement Web": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Data Science": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "Data & Intelligence Artificielle": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "Design": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "Design UX/UI": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "Marketing": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "Marketing Digital": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "Business": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Vidéo": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const levelConfig: Record<string, { bg: string; text: string; border: string }> = {
  "Débutant": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Avancé": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Tous niveaux": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
};

const ElearningPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Formations depuis l'API backend
  const { data: apiFormations, isLoading: formationsLoading } = useFormations();

  // Mapping des données backend vers le format enrichi
  const courses = useMemo(() => {
    if (!apiFormations) return [];

    // Filtrer uniquement pour le format e-learning
    const rawFiltered = apiFormations.filter(f => f.format.slug === "e-learning");

    return rawFiltered.map(f => {
      const levelMap: Record<string, string> = {
        DEBUTANT: "Débutant",
        INTERMEDIAIRE: "Intermédiaire",
        AVANCE: "Avancé"
      };

      const statusMap: Record<string, "upcoming" | "past"> = {
        A_VENIR: "upcoming",
        EN_COURS: "upcoming",
        REPLAY: "past",
        TERMINE: "past"
      };

      return {
        id: f.id,
        title: f.titre,
        subtitle: f.sousTitre,
        tagline: "Formation e-learning à votre rythme",
        description: f.format.description || "Formation en ligne proposée par DM+ Academy.",
        instructor: f.formateur.nomComplet,
        instructorTitle: f.formateur.titre,
        instructorImage: f.formateur.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        date: "Accès immédiat",
        duration: `${f.dureeJours} jours`,
        location: "En ligne",
        mode: "online",
        status: statusMap[f.statut] || "upcoming",
        thumbnail: f.imageUrl || "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&crop=entropy&auto=format",
        participants: f.capacite || 100,
        category: f.categorie?.libelle || "Programmation",
        level: levelMap[f.niveau] || "Débutant",
        rating: 4.8,
        highlights: f.tags.map(t => t.titre),
        price: f.cout,
      };
    });
  }, [apiFormations]);

  // Scroller en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Catégories depuis l'API backend
  const { data: apiCategories } = useCategories();
  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return ["all", ...apiCategories.map(cat => cat.libelle)];
    }
    const cats = [...new Set(courses.map(c => c.category))];
    return ["all", ...cats];
  }, [apiCategories, courses]);

  const levels = useMemo(() => {
    const levs = [...new Set(courses.map(c => c.level))];
    return ["all", ...levs];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = searchTerm === "" ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = selectedCategory === "all";
      if (!matchesCategory) {
        const categoryMap: { [key: string]: string[] } = {
          "Développement Web": ["Programmation", "Développement"],
          "Data & Intelligence Artificielle": ["Data", "Data Science"],
          "Design UX/UI": ["Design"],
          "Marketing Digital": ["Marketing"],
          "Gestion de Projet": ["Business", "Management"]
        };
        const mappedLocalCategories = categoryMap[selectedCategory] || [selectedCategory];
        matchesCategory = mappedLocalCategories.some(
          localCat => c.category.toLowerCase() === localCat.toLowerCase()
        ) || c.category === selectedCategory;
      }

      const matchesLevel = selectedLevel === "all" || c.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel, courses]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
  };

  const handleRegister = (course: any) => {
    setSelectedCourse(course);
    setShowRegistrationForm(true);
  };

  const handleShowDetails = (course: any) => {
    navigate(`/masterclass/${course.id}`);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[300px] sm:min-h-[350px] overflow-hidden pt-16 lg:pt-24 pb-8 sm:pt-16 lg:pt-24 sm:pb-8 md:pt-20 md:pb-10">
          <div className="absolute inset-0">
            <img
              src="/assets/E-learning2.jpg"
              alt="E-learning Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 h-full max-w-7xl flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4 sm:mb-6">
                <Monitor className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  Formations en ligne
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tight leading-tight">
                E-Learning
                <span className="block font-black text-3xl tracking-tight sm:text-5xl tracking-tight md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mt-1 sm:mt-2">
                  DM+ Academy
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mb-4 sm:mb-6 leading-relaxed">
                Apprenez à votre rythme avec nos formations en ligne conçues par des experts reconnus.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button className="px-3 sm:px-6 py-1.5 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                  Explorer les formations
                </button>
                <button className="px-3 sm:px-6 py-1.5 sm:py-3 border-2 border-white/60 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all">
                  Catalogue complet
                </button>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path fill="white" fillOpacity="1" d="M0,96L1440,32L1440,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Section Filtres et Recherche */}
        <section className="container mx-auto px-4 max-w-7xl py-8">
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Trouver votre formation</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Explorez notre catalogue de formations e-learning</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="text-base sm:text-lg font-bold text-[hsl(var(--academy-primary))]">{filteredCourses.length}</span> formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une formation par mot-clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[hsl(var(--academy-primary))] focus:ring-2 focus:ring-[hsl(var(--academy-primary))]/20"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Filtres desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Toutes catégories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Niveau:</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tous niveaux" : level}
                      </option>
                    ))}
                  </select>
                </div>

                {(searchTerm || selectedCategory !== "all" || selectedLevel !== "all") && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Filtres mobile */}
              <div className="lg:hidden space-y-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "Toutes catégories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Niveau:</span>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[hsl(var(--academy-primary))]"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>
                          {level === "all" ? "Tous niveaux" : level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(searchTerm || selectedCategory !== "all" || selectedLevel !== "all") && (
                    <button
                      onClick={resetFilters}
                      className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>

              {/* Tags rapides */}
              <div className="flex flex-wrap items-center gap-2">
                {["Design", "Programmation", "Marketing", "Data Science", "Business"].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(tag)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      selectedCategory === tag
                        ? "bg-[hsl(var(--academy-primary))]/10 border-[hsl(var(--academy-primary))] text-[hsl(var(--academy-primary))]"
                        : "bg-white text-gray-600 border-gray-300 hover:border-[hsl(var(--academy-primary))] hover:text-[hsl(var(--academy-primary))]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Résultats */}
        <section className="container mx-auto px-4 max-w-7xl py-8">
          {formationsLoading ? (
            <div className="text-center py-16 lg:py-24">
              <div className="w-12 h-12 border-4 border-[hsl(var(--academy-primary))] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">Chargement des formations...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16 lg:py-20 lg:py-28">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune formation trouvée</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Essayez de modifier vos filtres ou votre recherche</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[hsl(var(--academy-primary))] text-white font-medium rounded-2xl hover:bg-[hsl(var(--academy-primary))]/90 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-[hsl(var(--academy-primary))] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Formations E-Learning</h2>
                <span className="hidden sm:inline px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {filteredCourses.length} disponible{filteredCourses.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    onRegister={handleRegister}
                    onShowDetails={handleShowDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(course.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal d'inscription */}
      <AnimatePresence>
        {showRegistrationForm && selectedCourse && (
          <RegistrationModal
            course={selectedCourse}
            onClose={() => setShowRegistrationForm(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

// Composant Card horizontal (même design que MasterclassesPage)
const CourseCard = ({
  course,
  index,
  onRegister,
  onShowDetails,
  onToggleWishlist,
  isWishlisted
}: {
  course: any;
  index: number;
  onRegister: (course: any) => void;
  onShowDetails: (course: any) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}) => {
  const isUpcoming = course.status === "upcoming";
  const categoryStyle = categoryConfig[course.category] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  const levelStyle = levelConfig[course.level] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group bg-white border border-gray-200/50 rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="md:w-64 lg:w-72 relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "/assets/E-learning2.jpg";
            }}
          />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} backdrop-blur-sm shadow-md`}>
              {course.category}
            </span>
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border} backdrop-blur-sm shadow-md`}>
              {course.level}
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(course.id)}
            className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>

          {!isUpcoming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-gray-900 ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex-1 p-3 md:p-5 bg-gradient-to-br from-white to-gray-50/30">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-sm md:text-lg font-bold text-[hsl(var(--academy-primary))] mb-2 group-hover:text-[hsl(var(--academy-primary))]/80 transition-colors">{course.title}</h3>
            <p className="text-xs text-gray-700 mb-1 font-medium leading-relaxed">{course.subtitle}</p>
            <p className="text-xs text-gray-600 italic leading-relaxed">{course.tagline}</p>
          </div>

          {/* Description courte */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{course.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50/50 rounded-xl border border-gray-100/50">
            <img
              src={course.instructorImage}
              alt={course.instructor}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[hsl(var(--academy-primary))] leading-relaxed">{course.instructor}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{course.instructorTitle}</p>
            </div>
          </div>

          {/* Footer with meta and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-200/50 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <Monitor className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{course.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <Clock className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onShowDetails(course)}
                className="px-3 md:px-5 py-1.5 md:py-2 bg-red-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <Eye className="w-4 h-4" />
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Modal d'inscription
const RegistrationModal = ({
  course,
  onClose
}: {
  course: any;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary)/80%)] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Inscription - {course.title}</h2>
              <p className="text-white/90 leading-relaxed">{course.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-white/10 rounded-2xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">Formation certifiante</div>
              <div className="text-sm text-white/80">Tarif de la formation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{course.duration}</div>
              <div className="text-sm text-white/80">Durée</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{course.level}</div>
              <div className="text-sm text-white/80">Niveau</div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <RegistrationForm
            trainingTitle={course.title}
            onClose={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ElearningPage;