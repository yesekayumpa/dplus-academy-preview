import { useNavigate } from "react-router-dom";
import { MasterclassCard, MasterclassCardData } from "./MasterclassCards";
import { useFormations } from "@/hooks/useFormations";

// Correspondance statut → badge affiché sur la carte
const STATUT_LABELS: Record<string, string> = {
  A_VENIR: "À venir",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
};

// Correspondance niveau → badge
const NIVEAU_LABELS: Record<string, string> = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};

// Images de fallback par catégorie (Unsplash — fiables)
const CATEGORY_FALLBACKS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop", // Développement Web
  2: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",    // Data & IA
  3: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",    // Design UX/UI
  4: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?w=400&h=225&fit=crop", // Marketing
  5: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop",    // Cybersécurité
  6: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",    // Gestion de Projet
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop";

const PREVIEW_COUNT = 3;

const MasterclassSection = () => {
  const { data: formations, isLoading, isError } = useFormations();
  const navigate = useNavigate();

  // Mapper les formations de l'API vers le format attendu par MasterclassCarousel
  const masterclassData: MasterclassCardData[] = (formations ?? []).map(
    (formation) => ({
      id: String(formation.id),
      title: formation.titre,
      instructor: formation.formateur.nomComplet,
      image: formation.imageUrl || CATEGORY_FALLBACKS[formation.categorie.id] || DEFAULT_FALLBACK,
      rating: 0,
      reviewCount: 0,
      currentPrice: `${formation.cout.toLocaleString("fr-FR")} FCFA`,
      originalPrice: "",
      // Badges dynamiques selon les données de l'API
      isBestseller: formation.statut === "EN_COURS",
      isCertified: formation.niveau === "AVANCE",
      isPrensential:
        formation.format.slug === "formation-live" ||
        formation.format.slug === "bootcamp-intensif" ||
        formation.format.slug === "formation-hybride",
      isFollowed: formation.statut === "REPLAY",
    })
  );

  // Seulement 4 formations en aperçu
  const previewData = masterclassData.slice(0, PREVIEW_COUNT);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-foreground text-center">
          Nos formations
        </h2>
        <div className="flex justify-center items-center py-16 lg:py-20 lg:py-28">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-foreground text-center">
          Nos formations
        </h2>
        <div className="text-center py-8 text-red-500">
          Une erreur est survenue lors du chargement des formations.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-foreground text-center">
        Nos formations
      </h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {previewData.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[300px] md:w-[320px] flex-shrink-0"
          >
            <MasterclassCard data={item} />
          </div>
        ))}
      </div>

      {masterclassData.length > PREVIEW_COUNT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/formations")}
            className="px-8 py-3 bg-academy text-white font-semibold rounded-xl shadow-xl hover:opacity-90 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            Voir toutes les formations
            <span className="text-sm opacity-80">({masterclassData.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MasterclassSection;