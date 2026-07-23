import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  User,
  Tag,
  Layers,
  Star,
  BadgeCheck,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useFormation } from "@/hooks/useFormations";
import { NiveauFormation, StatutFormation } from "@/types/api";

// ─── Constantes d'affichage ───────────────────────────────────────────────────

const NIVEAU_LABELS: Record<NiveauFormation, string> = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};

const NIVEAU_COLORS: Record<NiveauFormation, string> = {
  DEBUTANT: "bg-green-100 text-green-700 border-green-200",
  INTERMEDIAIRE: "bg-blue-100 text-blue-700 border-blue-200",
  AVANCE: "bg-purple-100 text-purple-700 border-purple-200",
};

const STATUT_LABELS: Record<StatutFormation, string> = {
  A_VENIR: "À venir",
  EN_COURS: "En cours",
  REPLAY: "Replay",
  TERMINE: "Terminé",
};

const STATUT_COLORS: Record<StatutFormation, string> = {
  A_VENIR: "bg-amber-100 text-amber-700 border-amber-200",
  EN_COURS: "bg-green-100 text-green-700 border-green-200",
  REPLAY: "bg-orange-100 text-orange-700 border-orange-200",
  TERMINE: "bg-gray-100 text-gray-700 border-gray-200",
};

const CATEGORY_FALLBACKS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
  2: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop",
  3: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
  4: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?w=800&h=450&fit=crop",
  5: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop",
  6: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop";

// ─── Composant ────────────────────────────────────────────────────────────────

const FormationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: formation, isLoading, isError } = useFormation(id!);

  // ── Loading ──
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-white border-t-transparent mx-auto mb-4" />
            <p className="text-white text-sm font-medium">Chargement...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Erreur / non trouvée ──
  if (isError || !formation) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
          <h1 className="text-2xl font-bold text-gray-800">Formation introuvable</h1>
          <p className="text-gray-500 text-center">
            La formation demandée n'existe pas ou une erreur est survenue.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-lg text-sm font-semibold hover:bg-[#6a001a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
      </Layout>
    );
  }

  const coverImage =
    formation.imageUrl ||
    CATEGORY_FALLBACKS[formation.categorie.id] ||
    DEFAULT_FALLBACK;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b] text-white overflow-hidden">
        {/* Overlay pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container mx-auto max-w-6xl px-4 py-10 md:py-16">
          {/* Retour */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux formations
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Infos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badges niveau + statut */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                    NIVEAU_COLORS[formation.niveau]
                  }`}
                >
                  <Star className="w-3 h-3" />
                  {NIVEAU_LABELS[formation.niveau]}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                    STATUT_COLORS[formation.statut]
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  {STATUT_LABELS[formation.statut]}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-white/10 text-white border-white/20">
                  <Layers className="w-3 h-3" />
                  {formation.categorie.libelle}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {formation.titre}
              </h1>
              <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                {formation.sousTitre}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                  <p className="text-lg font-bold">{formation.dureeJours}j</p>
                  <p className="text-xs text-white/60">Durée</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <Users className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                  <p className="text-lg font-bold">{formation.capacite}</p>
                  <p className="text-xs text-white/60">Places</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <BookOpen className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                  <p className="text-lg font-bold">{formation.format.titre.split(" ")[1] || "Live"}</p>
                  <p className="text-xs text-white/60">Format</p>
                </div>
              </div>

              {/* Prix + CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-3xl font-bold text-amber-300">
                  {formation.cout.toLocaleString("fr-FR")} FCFA
                </span>
                <button className="px-6 py-3 bg-white text-[#800020] font-bold rounded-xl text-sm hover:bg-amber-50 transition-colors shadow-lg">
                  S'inscrire maintenant
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={coverImage}
                alt={formation.titre}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_FALLBACK;
                }}
              />
              {/* Format badge overlay */}
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                {formation.format.titre}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Corps ── */}
      <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            {/* Format pédagogique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#800020]" />
                Format pédagogique
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {formation.format.description}
              </p>
            </motion.div>

            {/* Compétences développées */}
            {formation.competences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#800020]" />
                  Compétences développées
                </h2>
                <div className="space-y-3">
                  {formation.competences.map((comp) => (
                    <div key={comp.id} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">{comp.titre}</p>
                        <p className="text-xs text-muted-foreground">{comp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            {formation.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#800020]" />
                  Technologies abordées
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formation.tags.map((tag) => (
                    <span
                      key={tag.id}
                      title={tag.description}
                      className="px-3 py-1.5 bg-[#800020]/10 text-[#800020] text-xs font-semibold rounded-full border border-[#800020]/20 hover:bg-[#800020]/20 transition-colors cursor-default"
                    >
                      {tag.titre}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-5">
            {/* Formateur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[#800020]" />
                Votre formateur
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#800020] to-[#6a001a] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {formation.formateur.nomComplet.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{formation.formateur.nomComplet}</p>
                  <p className="text-xs text-muted-foreground">{formation.formateur.titre}</p>
                </div>
              </div>
              {/* Compétences du formateur */}
              <div className="space-y-1.5 mt-3">
                {formation.formateur.competences.map((comp) => (
                  <div key={comp.id} className="flex items-center gap-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#800020]" />
                    <span className="text-xs text-muted-foreground">{comp.titre}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Infos rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#800020]" />
                Infos pratiques
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Durée</span>
                  <span className="font-semibold">{formation.dureeJours} jour{formation.dureeJours > 1 ? "s" : ""}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Capacité max</span>
                  <span className="font-semibold">{formation.capacite} participants</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Niveau</span>
                  <span className="font-semibold">{NIVEAU_LABELS[formation.niveau]}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-semibold">{formation.format.titre}</span>
                </li>
                <li className="flex justify-between border-t border-border pt-3 mt-3">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-bold text-[#800020]">
                    {formation.cout.toLocaleString("fr-FR")} FCFA
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* CTA latéral */}
            <button className="w-full py-3.5 bg-[#800020] text-white font-bold rounded-xl text-sm hover:bg-[#6a001a] transition-colors shadow-lg">
              S'inscrire à cette formation
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationDetailPage;
