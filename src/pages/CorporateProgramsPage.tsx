import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Target,
  Award,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  GraduationCap,
  BarChart3,
  Globe,
  Clock,
  Star,
  Calendar,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Bookmark,
  Menu,
  Sun,
  Moon,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCategories } from "@/hooks/useCategories";
import { useFormations } from "@/hooks/useFormations";

// Couleurs de la charte graphique rouge-bordeaux
const colors = {
  primary: {
    50: '#fdf2f4',
    100: '#fbe7ea',
    200: '#f5cbd1',
    300: '#efa7b1',
    400: '#e77a8a',
    500: '#d44c5e', // Rouge bordeaux principal
    600: '#b23a4a',
    700: '#8e2e3b',
    800: '#6a232d',
    900: '#46181e',
  }
};



const CorporateProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Formations depuis l'API backend
  const { data: apiFormations } = useFormations();

  // Mapping des données backend vers corporatePrograms attendus par la page
  const corporatePrograms = useMemo(() => {
    if (!apiFormations) return [];

    // Filtrer uniquement pour le format corporate-programs
    const rawFiltered = apiFormations.filter(f => f.format.slug === "corporate-programs");

    return rawFiltered.map(f => {
      const levelMap: Record<string, string> = {
        DEBUTANT: "Débutant",
        INTERMEDIAIRE: "Intermédiaire",
        AVANCE: "Avancé"
      };

      return {
        id: f.id,
        title: f.titre,
        subtitle: f.sousTitre,
        description: f.sousTitre || "Programme de formation sur mesure conçu pour répondre aux besoins des entreprises.",
        duration: `${f.dureeJours} jours`,
        format: f.format.titre,
        participants: `${f.capacite} personnes`,
        level: levelMap[f.niveau] || "Sur mesure",
        category: f.categorie?.libelle || "Digital",
        thumbnail: f.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        price: `${f.cout.toLocaleString("fr-FR")} FCFA`,
        highlights: f.tags.map(t => t.titre),
        modules: f.competences.map(c => c.titre),
        targetAudience: f.competences.map(c => c.titre),
        benefits: f.competences.map(c => c.description)
      };
    });
  }, [apiFormations]);

  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    program: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Empêcher le scroll de la page quand un modal est ouvert
  useEffect(() => {
    if (selectedProgram || showContactModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [selectedProgram, showContactModal]);

  // Scroll automatique vers le haut au chargement de la page
  useEffect(() => {
    // Forcer le scroll vers le haut immédiatement
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Double garantie pour s'assurer qu'on est bien en haut
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // 3 par page (1 ligne) ou 6

  const filteredPrograms = corporatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Mapping catégorie backend -> locale
    let matchesCategory = selectedCategory === "all";
    if (!matchesCategory) {
      const categoryMap: { [key: string]: string[] } = {
        "Développement Web": ["Digital"],
        "Data & Intelligence Artificielle": ["Data"],
        "Design UX/UI": ["Design"],
        "Marketing Digital": ["Digital"],
        "Gestion de Projet": ["Management"]
      };
      const mappedLocalCategories = categoryMap[selectedCategory] || [selectedCategory];
      matchesCategory = mappedLocalCategories.some(
        localCat => program.category.toLowerCase() === localCat.toLowerCase()
      );
    }
    
    return matchesSearch && matchesCategory;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Catégories depuis l'API backend
  const { data: apiCategories } = useCategories();
  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return ["all", ...apiCategories.map(cat => cat.libelle)];
    }
    // Fallback statique si l'API n'est pas disponible
    return ["all", "Digital", "Management", "Data"];
  }, [apiCategories]);

  const handleContactExpert = (programName = "") => {
    setContactForm({...contactForm, program: programName});
    setShowContactModal(true);
  };

  const handleScheduleCall = () => {
    // Ouvrir Calendly ou lien de planification
    window.open('https://calendly.com/votre-entreprise/appel-conseil', '_blank');
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi - À remplacer par votre logique d'envoi réelle
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowContactModal(false);
        setSubmitSuccess(false);
        setContactForm({ name: "", email: "", phone: "", company: "", message: "", program: "" });
      }, 2000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section avec image de fond Corporate.jpg */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Image de fond */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(/assets/E-learning2.jpg)`,
            }}
          />
          
          {/* Overlay bordeaux avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#46181e]/90 via-[#6a232d]/85 to-[#8e2e3b]/80" />
          
          {/* Overlay supplémentaire pour meilleure lisibilité */}
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative container mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
                  <Building2 className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl tracking-tight lg:text-5xl tracking-tight font-bold mb-3 md:mb-4 text-white leading-tight">
                Programmes
                <span className="block text-yellow-300 drop-shadow-xl">Corporate</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/95 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed">
                Des programmes de formation conçus spécifiquement pour les entreprises, 
                <br className="hidden sm:block" />
                adaptés à leurs objectifs, leur secteur et leurs équipes.
              </p>
              <div className="flex justify-center gap-2 sm:gap-3 px-2 sm:px-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                  onClick={() => handleContactExpert()}
                >
                  Demander un devis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white rounded-xl font-semibold shadow-lg hover:bg-white/15 transition-all text-xs sm:text-sm"
                  onClick={() => window.open('/catalogue-corporate.pdf', '_blank')}
                >
                  Télécharger le catalogue
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section avec couleurs bordeaux */}
        <section className="py-16 lg:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="md:flex items-center justify-between gap-4 hidden md:flex md:overflow-visible">
              {[
                { number: "500+", label: "Entreprises formées", icon: Building2 },
                { number: "15K+", label: "Employés formés", icon: Users },
                { number: "98%", label: "Satisfaction", icon: Star },
                { number: "35%", label: "ROI moyen", icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-2xl flex items-center justify-center shadow-xl">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    {index < 3 && (
                      <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#b23a4a]/30 to-transparent" />
                    )}
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-[#46181e] group-hover:text-[#b23a4a] transition-colors">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Version mobile avec défilement */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto md:hidden">
              <div className="flex animate-scroll">
                {[
                  { number: "500+", label: "Entreprises formées", icon: Building2 },
                  { number: "15K+", label: "Employés formés", icon: Users },
                  { number: "98%", label: "Satisfaction", icon: Star },
                  { number: "35%", label: "ROI moyen", icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2 group flex-shrink-0 px-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-2xl flex items-center justify-center shadow-xl">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#46181e]">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
                {/* Duplication pour défilement infini sur mobile */}
                {[
                  { number: "500+", label: "Entreprises formées", icon: Building2 },
                  { number: "15K+", label: "Employés formés", icon: Users },
                  { number: "98%", label: "Satisfaction", icon: Star },
                  { number: "35%", label: "ROI moyen", icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="flex items-center gap-2 group flex-shrink-0 px-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-2xl flex items-center justify-center shadow-xl">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#46181e]">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Section Filtres et Recherche */}
        <section className="container mx-auto px-4 max-w-6xl py-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Trouver votre programme</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Explorez notre catalogue de formations pour entreprises</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="text-base sm:text-lg font-bold text-[#b23a4a]">{filteredPrograms.length}</span> programme{filteredPrograms.length > 1 ? 's' : ''} trouvé{filteredPrograms.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un programme par mot-clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base focus:outline-none focus:border-[#b23a4a] focus:ring-2 focus:ring-[#b23a4a]/20"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b23a4a]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Toutes catégories" : cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="px-4 py-3 sm:py-4 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-xl border border-transparent transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>
            
            {/* Tags rapides */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-gray-100">
              {["Management", "Digital", "Data", "Leadership"].map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-colors border ${
                    selectedCategory === tag
                      ? "bg-[#b23a4a]/10 border-[#b23a4a] text-[#b23a4a]"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 lg:py-20 lg:py-28 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-[#b23a4a]/30 flex flex-col h-full"
                  onClick={() => setSelectedProgram(program)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.thumbnail}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#b23a4a] shadow-lg border border-white/10">
                        {program.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{program.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[#46181e]">{program.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{program.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{program.participants}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-[#fbe7ea] to-[#f5cbd1] text-[#b23a4a] rounded-2xl text-xs font-medium shadow-md border border-[#b23a4a]/10">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-[#46181e]">{program.price}</span>
                        <span className="text-xs text-gray-600">par employé</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-2xl font-medium shadow-xl hover:shadow-lg hover:from-[#8e2e3b] hover:to-[#b23a4a] transition-all duration-300 text-sm flex items-center gap-1 group">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-2xl text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? "bg-[#b23a4a] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Program Detail Modal */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedProgram(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedProgram.thumbnail}
                    alt={selectedProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#b23a4a]">
                      {selectedProgram.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-3xl tracking-tight font-bold mb-2 text-[#46181e]">{selectedProgram.title}</h2>
                  <p className="text-xl text-[#b23a4a] mb-6 leading-relaxed">{selectedProgram.subtitle}</p>
                  <p className="text-gray-700 mb-8 leading-relaxed">{selectedProgram.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                        <GraduationCap className="w-5 h-5 text-[#b23a4a]" />
                        Modules de formation
                      </h3>
                      <ul className="space-y-2">
                        {selectedProgram.modules.map((module, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{module}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                        <Users className="w-5 h-5 text-[#b23a4a]" />
                        Public cible
                      </h3>
                      <ul className="space-y-2">
                        {selectedProgram.targetAudience.map((audience, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-[#b23a4a] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{audience}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                      <TrendingUp className="w-5 h-5 text-[#b23a4a]" />
                      Bénéfices attendus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProgram.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-[#fbe7ea] rounded-2xl">
                          <Zap className="w-5 h-5 text-[#b23a4a] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedProgram(null);
                        handleContactExpert(selectedProgram.title);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Demander un devis personnalisé
                    </button>
                    <button
                      onClick={() => handleScheduleCall()}
                      className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Planifier un appel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#46181e]">Contacter un expert</h2>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {submitSuccess ? (
                    <div className="text-center py-16 lg:py-20 lg:py-28">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message envoyé !</h3>
                      <p className="text-gray-600 leading-relaxed">Un expert vous contactera dans les 24h.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="jean.dupont@entreprise.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.company}
                          onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      {contactForm.program && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Programme d'intérêt</label>
                          <input
                            type="text"
                            value={contactForm.program}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                        <textarea
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Décrivez vos besoins de formation..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer la demande
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 px-4 bg-gradient-to-r from-[#46181e] to-[#8e2e3b]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl tracking-tight font-bold mb-6 text-white">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Contactez-nous pour un audit gratuit et une proposition sur mesure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacter un expert
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CorporateProgramsPage;