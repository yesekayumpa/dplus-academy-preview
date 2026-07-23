import { MasterclassCarousel } from "./CoursesCarousel";
import { MasterclassCardData } from "./MasterclassCards";
import { useFormations } from "@/hooks/useFormations";

// Correspondance statut → badge affiché sur la carte
const STATUT_LABELS: Record<string, string> = {
  A_VENIR: "À venir",
  EN_COURS: "En cours",
  REPLAY: "Replay",
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

const MasterclassSection = () => {
  const { data: formations, isLoading, isError } = useFormations();

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

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Nos formations
        </h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
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
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Nos formations
      </h2>
      <MasterclassCarousel data={masterclassData} />
    </div>
  );
};

export default MasterclassSection;