import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useFormations } from "@/hooks/useFormations";
import { useCategories } from "@/hooks/useCategories";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop";

const CATEGORY_FALLBACKS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
  2: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",
  3: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
  4: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?w=400&h=225&fit=crop",
  5: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop",
  6: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
};

const NIVEAU_LABELS: Record<string, string> = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};

const NIVEAU_COLORS: Record<string, string> = {
  DEBUTANT: "bg-green-100 text-green-800",
  INTERMEDIAIRE: "bg-blue-100 text-blue-800",
  AVANCE: "bg-purple-100 text-purple-800",
};

const FormationsPage = () => {
  const navigate = useNavigate();
  const { data: formations, isLoading, isError } = useFormations();
  const { data: apiCategories } = useCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return ["all", ...apiCategories.map((cat) => cat.libelle)];
    }
    return ["all"];
  }, [apiCategories]);

  const filteredFormations = useMemo(() => {
    if (!formations) return [];
    return formations.filter((f) => {
      const matchesSearch =
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.formateur.nomComplet.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        f.categorie?.libelle === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [formations, searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/assets/E-learning2.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#46181e]/90 via-[#6a232d]/85 to-[#8e2e3b]/80" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative container mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
                  <GraduationCap className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-3xl tracking-tight md:text-5xl tracking-tight font-bold mb-4 text-white leading-tight">
                Toutes nos{" "}
                <span className="text-yellow-300 drop-shadow-xl">formations</span>
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                Explorez l'ensemble de notre catalogue et trouvez la formation
                qui correspond à vos ambitions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtres */}
        <section className="container mx-auto px-4 max-w-6xl py-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une formation ou un formateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b23a4a] focus:ring-2 focus:ring-[#b23a4a]/20"
                />
              </div>

              {/* Catégorie */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b23a4a]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Toutes les catégories" : cat}
                  </option>
                ))}
              </select>

              {/* Reset */}
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-xl border border-transparent transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Réinitialiser
                </button>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <span className="font-bold text-[#b23a4a] text-base">
                {filteredFormations.length}
              </span>{" "}
              formation{filteredFormations.length !== 1 ? "s" : ""} trouvée
              {filteredFormations.length !== 1 ? "s" : ""}
            </div>
          </div>
        </section>

        {/* Grille des formations */}
        <section className="container mx-auto px-4 max-w-6xl pb-20">
          {isLoading && (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b23a4a]" />
            </div>
          )}

          {isError && (
            <div className="text-center py-16 lg:py-24 text-red-500">
              Une erreur est survenue lors du chargement des formations.
            </div>
          )}

          {!isLoading && !isError && filteredFormations.length === 0 && (
            <div className="text-center py-20 lg:py-28 text-gray-400">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg leading-relaxed">Aucune formation ne correspond à votre recherche.</p>
            </div>
          )}

          {!isLoading && !isError && filteredFormations.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFormations.map((formation, index) => {
                const image =
                  formation.imageUrl ||
                  CATEGORY_FALLBACKS[formation.categorie?.id] ||
                  FALLBACK_IMAGE;
                return (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-[#b23a4a]/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/formations/${formation.id}`);
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={image}
                        alt={formation.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (t.src !== FALLBACK_IMAGE) t.src = FALLBACK_IMAGE;
                        }}
                      />
                      {/* Catégorie badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#b23a4a]">
                          {formation.categorie?.libelle || "Formation"}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#b23a4a] transition-colors">
                        {formation.titre}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        {formation.formateur.nomComplet}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {formation.niveau && (
                          <span
                            className={`px-2 py-0.5 rounded-xl text-xs font-semibold ${
                              NIVEAU_COLORS[formation.niveau] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {NIVEAU_LABELS[formation.niveau] || formation.niveau}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700">
                          {formation.format.titre}
                        </span>
                      </div>

                      {/* Prix */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#46181e]">
                          {formation.cout.toLocaleString("fr-FR")} FCFA
                        </span>
                        <span className="text-xs text-gray-400">
                          {formation.dureeJours} jour{formation.dureeJours > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default FormationsPage;
