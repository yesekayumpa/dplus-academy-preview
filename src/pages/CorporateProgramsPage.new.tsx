import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Clock, Users, Building2, Play, Heart, Calendar,
  MapPin, Eye, Sparkles, X, ArrowRight, TrendingUp, Star
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { RegistrationForm } from "@/components/ui/RegistrationForm";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useFormations } from "@/hooks/useFormations";

// Configuration des couleurs par catégorie
const categoryConfig: Record<string, { bg: string; text: string; border: string }> = {
  "Développement Web": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Data & Intelligence Artificielle": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "Design UX/UI": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "Marketing Digital": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "Gestion de Projet": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Digital": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Management": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "Corporate": { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
};

const levelConfig: Record<string, { bg: string; text: string; border: string }> = {
  "Débutant": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Avancé": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Sur mesure": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Tous niveaux": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
};

const CorporateProgramsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Formations depuis l'API backend
  const { data: apiFormations, isLoading: formationsLoading } = useFormations();

  // Mapping des données backend vers le format enrichi
  const programs = useMemo(() => {
    if (!apiFormations) return [];

    // Filtrer uniquement pour le format corporate
    const rawFiltered = apiFormations.filter(
      f => f.format.slug === "corporate" || f.format.slug === "entreprise"
    );

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
        tagline: "Programme de formation en entreprise",
        description: f.format.description || "Programme corporate proposé par DM+ Academy.",
        instructor: f.formateur.nomComplet,
        instructorTitle: f.formateur.titre,
        instructorImage: f.formateur.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        date: "Sur devis",
        duration: `${f.dureeJours} jours`,
        location: "Sur site ou En ligne",
        mode: "hybrid",
        status: statusMap[f.statut] || "upcoming",
        rawStatus: f.statut,
        thumbnail: f.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        participants: f.capacite || 25,
        category: f.categorie?.libelle || "Corporate",
        level: levelMap[f.niveau] || "Sur mesure",
        rating: 4.8,
        highlights: f.tags.map(t => t.titre),
        price: `${f.cout.toLocaleString("fr-FR")} FCFA`,
      };
    });
  }, [apiFormations]);

  // Scroller en haut au chargement de la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Catégories depuis l'API backend
  const { data: apiCategories } = useCategories();
  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return ["all", ...apiCategories.map(cat => cat.libelle)];
    }
    return ["all", "Digital", "Management", "Data"];
  }, [apiCategories]);

  const levels = useMemo(() => {
    const levs = [...new Set(programs.map(p => p.level))];
    return ["all", ...levs];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchesSearch = searchTerm === "" ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = selectedCategory === "all";
      if (!matchesCategory) {
        const categoryMap: { [key: string]: string[] } = {
          "Développement Web": ["Digital", "Programmation"],
          "Data & Intelligence Artificielle": ["Data"],
          "Design UX/UI": ["Design"],
          "Marketing Digital": ["Digital"],
          "Gestion de Projet": ["Management"]
        };
        const mappedLocalCategories = categoryMap[selectedCategory] || [selectedCategory];
        matchesCategory = mappedLocalCategories.some(
          localCat => p.category.toLowerCase() === localCat.toLowerCase()
        ) || p.category === selectedCategory;
      }

      const matchesLevel = selectedLevel === "all" || p.level === selectedLevel;

      const matchesStatus = filterStatus === "all" ||
        (filterStatus === "upcoming" && (p.rawStatus === "A_VENIR" || p.rawStatus === "EN_COURS")) ||
        (filterStatus === "past" && (p.rawStatus === "REPLAY" || p.rawStatus === "TERMINE"));

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedLevel, filterStatus, programs]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setFilterStatus("all");
  };

  const handleRegister = (program: any) => {
    setSelectedProgram(program);
    setShowRegistrationForm(true);
  };

  const handleShowDetails = (program: any) => {
    navigate(`/masterclass/${program.id}`);
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
        <section className="relative min-h-[400px] sm:min-h-[500px] overflow-hidden pt-32 pb-20 sm:pt-32 sm:pb-20 md:pt-32 md:pb-20">
          <div className="absolute inset-0">
            <img
              src="/assets/E-learning2.jpg"
              alt="Corporate Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
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
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  Programmes en entreprise
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tight leading-tight">
                Programmes
                <span className="block font-black text-3xl tracking-tight sm:text-5xl tracking-tight md:text-6xl tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Corporate
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mb-4 sm:mb-6 leading-relaxed">
                Des programmes de formation conçus pour les entreprises, adaptés à vos objectifs, votre secteur et vos équipes.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button className="px-3 sm:px-6 py-1.5 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                  Demander un devis
                </button>
                <button className="px-3 sm:px-6 py-1.5 sm:py-3 border-2 border-white/60 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all">
                  Télécharger le catalogue
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Trouver votre programme</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Explorez notre catalogue de programmes corporate</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="text-base sm:text-lg font-bold text-[hsl(var(--academy-primary))]">{filteredPrograms.length}</span> programme{filteredPrograms.length > 1 ? 's' : ''} trouvé{filteredPrograms.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un programme par mot-clé..."
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
                  <span className="text-sm font-medium text-gray-700">Statut:</span>
                  <div className="flex border border-gray-200 rounded-2xl overflow-hidden">
                    {[
                      { value: "all", label: "Toutes" },
                      { value: "upcoming", label: "À venir" },
                      { value: "past", label: "Replay" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          filterStatus === status.value
                            ? "bg-[hsl(var(--academy-primary))] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

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

                {(searchTerm || filterStatus !== "all" || selectedCategory !== "all" || selectedLevel !== "all") && (
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
                    <span className="text-sm font-medium text-gray-700">Statut:</span>
                    <div className="flex border border-gray-200 rounded-2xl overflow-hidden flex-1">
                      {[
                        { value: "all", label: "Toutes" },
                        { value: "upcoming", label: "À venir" },
                        { value: "past", label: "Replay" }
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                            filterStatus === status.value
                              ? "bg-[hsl(var(--academy-primary))] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>

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

                  {(searchTerm || filterStatus !== "all" || selectedCategory !== "all" || selectedLevel !== "all") && (
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
                {["Digital", "Management", "Data", "Leadership", "RH"].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(tag)}
                    className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-full border border-gray-300 hover:border-[hsl(var(--academy-primary))] hover:text-[hsl(var(--academy-primary))] transition-colors"
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
              <p className="text-gray-600 leading-relaxed">Chargement des programmes...</p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-16 lg:py-20 lg:py-28">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun programme trouvé</h3>
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Programmes Corporate</h2>
                <span className="hidden sm:inline px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                  {filteredPrograms.length} disponible{filteredPrograms.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredPrograms.map((program, index) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    index={index}
                    onRegister={handleRegister}
                    onShowDetails={handleShowDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(program.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal d'inscription */}
      <AnimatePresence>
        {showRegistrationForm && selectedProgram && (
          <RegistrationModal
            program={selectedProgram}
            onClose={() => setShowRegistrationForm(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

// Composant Card horizontal (même design que MasterclassesPage)
const ProgramCard = ({
  program,
  index,
  onRegister,
  onShowDetails,
  onToggleWishlist,
  isWishlisted
}: {
  program: any;
  index: number;
  onRegister: (program: any) => void;
  onShowDetails: (program: any) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}) => {
  const isUpcoming = program.status === "upcoming";
  const categoryStyle = categoryConfig[program.category] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  const levelStyle = levelConfig[program.level] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };

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
            src={program.thumbnail}
            alt={program.title}
            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "/assets/E-learning2.jpg";
            }}
          />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} backdrop-blur-sm shadow-md`}>
              {program.category}
            </span>
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border} backdrop-blur-sm shadow-md`}>
              {program.level}
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(program.id)}
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
            <h3 className="text-sm md:text-lg font-bold text-[hsl(var(--academy-primary))] mb-2 group-hover:text-[hsl(var(--academy-primary))]/80 transition-colors">{program.title}</h3>
            <p className="text-xs text-gray-700 mb-1 font-medium leading-relaxed">{program.subtitle}</p>
            <p className="text-xs text-gray-600 italic leading-relaxed">{program.tagline}</p>
          </div>

          {/* Description courte */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{program.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50/50 rounded-xl border border-gray-100/50">
            <img
              src={program.instructorImage}
              alt={program.instructor}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[hsl(var(--academy-primary))] leading-relaxed">{program.instructor}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{program.instructorTitle}</p>
            </div>
          </div>

          {/* Footer with meta and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-200/50 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <Calendar className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{program.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <MapPin className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{program.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-gray-50/50 px-3 py-2 rounded-2xl">
                <Clock className="w-4 h-4 text-[hsl(var(--academy-primary))]" />
                <span>{program.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onShowDetails(program)}
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
  program,
  onClose
}: {
  program: any;
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
              <h2 className="text-2xl font-bold mb-1">Contact - {program.title}</h2>
              <p className="text-white/90 leading-relaxed">{program.subtitle}</p>
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
              <div className="text-2xl font-bold">Sur devis</div>
              <div className="text-sm text-white/80">Tarif du programme</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{program.duration}</div>
              <div className="text-sm text-white/80">Durée</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{program.participants}+</div>
              <div className="text-sm text-white/80">Participants</div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <RegistrationForm
            trainingTitle={program.title}
            onClose={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CorporateProgramsPage;