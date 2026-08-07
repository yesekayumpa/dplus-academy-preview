import { useEffect } from "react";
import {
  Clock, Users, BookOpen, Award,
  CheckCircle2, Target, UserCircle, ArrowLeft,
  BadgeCheck, Star, CheckCircle, Layers,
  GraduationCap, Zap, MapPin, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useFormation } from "@/hooks/useFormations";
import { NiveauFormation, StatutFormation } from "@/types/api";

// ─── Constantes ───────────────────────────────────────────────────────────────

const NIVEAU_LABELS: Record<NiveauFormation, string> = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};

const NIVEAU_BADGE: Record<NiveauFormation, string> = {
  DEBUTANT: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
  INTERMEDIAIRE: "bg-blue-400/20 text-blue-200 border-blue-400/30",
  AVANCE: "bg-purple-400/20 text-purple-200 border-purple-400/30",
};

const STATUT_LABELS: Record<StatutFormation, string> = {
  A_VENIR: "À venir",
  EN_COURS: "En cours",
  REPLAY: "Replay disponible",
  TERMINE: "Terminé",
};

const STATUT_DOT: Record<StatutFormation, string> = {
  A_VENIR: "bg-emerald-400",
  EN_COURS: "bg-blue-400",
  REPLAY: "bg-amber-400",
  TERMINE: "bg-gray-400",
};

const CATEGORY_FALLBACKS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
  2: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop",
  3: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
  4: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?w=1200&h=600&fit=crop",
  5: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
  6: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop";

// ─── Page ─────────────────────────────────────────────────────────────────────

const MasterclassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: formation, isLoading, isError } = useFormation(id!);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#1D0000]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin mx-auto mb-5" />
            <p className="text-white/70 text-sm tracking-wide">Chargement de la formation…</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Erreur ───────────────────────────────────────────────────────────────────
  if (isError || !formation) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-5 px-4">
          <div className="w-20 h-20 rounded-full bg-[#800020]/10 flex items-center justify-center">
            <GraduationCap className="w-9 h-9 text-[#800020]" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Formation introuvable</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Cette formation n'existe pas ou a été retirée du catalogue.
            </p>
          </div>
          <button
            onClick={() => navigate("/masterclasses")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#800020] text-white text-sm font-semibold rounded-2xl hover:bg-[#6a001a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux masterclasses
          </button>
        </div>
      </Layout>
    );
  }

  const coverImage =
    formation.imageUrl ||
    CATEGORY_FALLBACKS[formation.categorie?.id] ||
    DEFAULT_FALLBACK;

  const isLive = formation.statut === "A_VENIR" || formation.statut === "EN_COURS";

  return (
    <Layout>
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — fond sombre, image en overlay, toutes les infos clés
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0f0505] overflow-hidden">
        {/* Image de fond avec overlay sombre */}
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={formation.titre}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => { e.currentTarget.src = DEFAULT_FALLBACK; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0505] via-[#0f0505]/90 to-[#0f0505]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0505] via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button
              onClick={() => navigate("/masterclasses")}
              className="hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Masterclasses
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60 truncate max-w-xs">{formation.titre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Texte principal (7 colonnes) */}
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${NIVEAU_BADGE[formation.niveau]}`}>
                  <Star className="w-3 h-3 mr-1.5" />
                  {NIVEAU_LABELS[formation.niveau]}
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-white/20 bg-white/10 text-white/80">
                  <Layers className="w-3 h-3 mr-1.5" />
                  {formation.categorie?.libelle}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border border-amber-400/40 bg-amber-400/15 text-amber-300">
                  <Award className="w-3 h-3" />
                  Certifiante
                </span>
                {/* Statut */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/10 border border-white/20 text-white/80">
                  <span className={`w-2 h-2 rounded-full ${STATUT_DOT[formation.statut]} ${isLive ? "animate-pulse" : ""}`} />
                  {STATUT_LABELS[formation.statut]}
                </span>
              </div>

              {/* Titre */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                {formation.titre}
              </h1>

              {/* Sous-titre */}
              {formation.sousTitre && (
                <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-xl">
                  {formation.sousTitre}
                </p>
              )}

              {/* Formateur */}
              <div className="flex items-center gap-3 mb-8 p-3 bg-white/5 rounded-2xl border border-white/10 w-fit">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#800020] to-[#b00030] flex items-center justify-center text-white font-bold text-base flex-shrink-0 overflow-hidden">
                  {formation.formateur.imageUrl ? (
                    <img
                      src={formation.formateur.imageUrl}
                      alt={formation.formateur.nomComplet}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    formation.formateur.nomComplet.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{formation.formateur.nomComplet}</p>
                  <p className="text-white/50 text-xs">{formation.formateur.titre}</p>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="flex flex-wrap gap-5">
                {[
                  { icon: Clock, label: "Durée", value: `${formation.dureeJours} jour${formation.dureeJours > 1 ? "s" : ""}` },
                  { icon: Users, label: "Places", value: `${formation.capacite} max` },
                  { icon: BookOpen, label: "Format", value: formation.format.titre },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">{label}</p>
                      <p className="text-white text-sm font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image flottante (5 colonnes) – visible seulement desktop */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={coverImage}
                  alt={formation.titre}
                  className="w-full h-72 object-cover"
                  onError={(e) => { e.currentTarget.src = DEFAULT_FALLBACK; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Badge format */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-xl border border-white/10">
                  {formation.format.titre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTENU PRINCIPAL — grille 2 colonnes
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── Colonne contenu (2 tiers) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Description du format */}
              {formation.format.description && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#800020]" />
                    </div>
                    À propos de cette formation
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {formation.format.description}
                  </p>
                </motion.div>
              )}

              {/* Compétences */}
              {formation.competences.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#800020]" />
                    </div>
                    Ce que vous allez apprendre
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formation.competences.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                      >
                        <CheckCircle className="w-5 h-5 text-[#800020] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{comp.titre}</p>
                          {comp.description && (
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{comp.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tags / Technologies */}
              {formation.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#800020]" />
                    </div>
                    Technologies & thèmes abordés
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {formation.tags.map((tag) => (
                      <span
                        key={tag.id}
                        title={tag.description}
                        className="px-4 py-2 text-sm font-medium text-[#800020] bg-[#800020]/8 rounded-xl border border-[#800020]/15 hover:bg-[#800020]/15 transition-colors"
                      >
                        {tag.titre}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Formateur – version étendue */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                    <UserCircle className="w-4 h-4 text-[#800020]" />
                  </div>
                  Votre formateur
                </h2>
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800020] to-[#b00030] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 overflow-hidden shadow-md">
                    {formation.formateur.imageUrl ? (
                      <img
                        src={formation.formateur.imageUrl}
                        alt={formation.formateur.nomComplet}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      formation.formateur.nomComplet.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900">{formation.formateur.nomComplet}</p>
                    <p className="text-sm text-[#800020] font-medium mb-3">{formation.formateur.titre}</p>
                    {formation.formateur.competences.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formation.formateur.competences.map((comp) => (
                          <span
                            key={comp.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl"
                          >
                            <BadgeCheck className="w-3 h-3 text-[#800020]" />
                            {comp.titre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Garanties */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="bg-[#1D0000] rounded-3xl p-8 text-white"
              >
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-300" />
                  </div>
                  Nos engagements qualité
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Certificat professionnel reconnu",
                    "Formateurs experts actifs",
                    "Suivi personnalisé inclus",
                    "Accès aux replays illimité",
                    "Communauté privée d'apprenants",
                    "Support technique disponible",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* ── Sidebar sticky (1 tiers) ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">

                {/* Carte Prix & CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xl"
                >
                  {/* Prix */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Investissement</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900">
                        {formation.cout.toLocaleString("fr-FR")}
                      </span>
                      <span className="text-base font-semibold text-gray-500">FCFA</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 mb-5">
                    <button className="w-full py-4 bg-[#800020] text-white font-bold rounded-2xl text-sm hover:bg-[#6a001a] active:scale-95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      S'inscrire maintenant
                    </button>
                    <button className="w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl text-sm hover:border-[#800020] hover:text-[#800020] transition-colors">
                      Télécharger la brochure
                    </button>
                  </div>

                  {/* Infos pratiques */}
                  <div className="space-y-3">
                    {[
                      { icon: Clock, label: "Durée", value: `${formation.dureeJours} jour${formation.dureeJours > 1 ? "s" : ""}` },
                      { icon: Users, label: "Participants max", value: `${formation.capacite} places` },
                      { icon: Star, label: "Niveau", value: NIVEAU_LABELS[formation.niveau] },
                      { icon: BookOpen, label: "Format", value: formation.format.titre },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-400 flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">{value}</span>
                      </div>
                    ))}

                    {/* Statut */}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
                      <span className="text-sm text-gray-400 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        Statut
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full text-white ${STATUT_DOT[formation.statut].replace("bg-", "bg-")} ${
                        formation.statut === "A_VENIR" ? "bg-emerald-500" :
                        formation.statut === "EN_COURS" ? "bg-blue-500" :
                        formation.statut === "REPLAY" ? "bg-amber-500" : "bg-gray-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-white ${isLive ? "animate-pulse" : ""}`} />
                        {STATUT_LABELS[formation.statut]}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Catégorie badge */}
                <div className="bg-gradient-to-br from-[#800020] to-[#1D0000] text-white rounded-3xl p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Domaine</p>
                  <p className="text-lg font-bold">{formation.categorie?.libelle}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MasterclassDetailPage;