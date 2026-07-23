/**
 * Représente un format pédagogique (ex: Formation Live, Bootcamp).
 */
export interface FormatPedagogique {
  id: number;
  titre: string;
  description: string;
  imageUrl: string;
  slug: string;
  active: boolean;
}

export type CreateFormatPedagogiqueDTO = Omit<FormatPedagogique, 'id'>;

/**
 * Représente une compétence (ex: React, Java, Management).
 */
export interface Competence {
  id: number;
  code: string;
  titre: string;
  description: string;
  active: boolean;
}

export type CreateCompetenceDTO = Omit<Competence, 'id'>;

// ─── Formations ───────────────────────────────────────────────────────────────

/** Niveau de difficulté d'une formation. */
export type NiveauFormation = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE';
/** Statut actuel d'une formation. */
export type StatutFormation = 'A_VENIR' | 'EN_COURS' | 'REPLAY' | 'TERMINE';

/**
 * Représente une catégorie de formation (ex: Développement Web, Data & IA).
 */
export interface Categorie {
  id: number;
  libelle: string;
  active: boolean;
}

/** Payload pour la création d'une catégorie (POST /api/categories) */
export type CreateCategorieDTO = Omit<Categorie, 'id'>;

/** Payload pour la mise à jour partielle (PUT /api/categories/{id}) */
export type UpdateCategorieDTO = Partial<CreateCategorieDTO>;

/**
 * Représente un tag ou mot-clé associé à une formation.
 */
export interface Tag {
  id: number;
  titre: string;
  description: string;
  active: boolean;
}

/** Payload pour la création d'un tag (POST /api/tags) */
export type CreateTagDTO = Omit<Tag, 'id'>;

/** Payload pour la mise à jour partielle (PUT /api/tags/{id}) */
export type UpdateTagDTO = Partial<CreateTagDTO>;

/**
 * Représente un formateur ou instructeur de la plateforme.
 */
export interface Formateur {
  id: number;
  nomComplet: string;
  titre: string;
  numero: string;
  imageUrl: string;
  competences: Competence[];
  isActive: boolean;
}

/** Payload pour la création d'un formateur (POST /api/formateurs) */
export interface CreateFormateurDTO {
  nomComplet: string;
  titre: string;
  numero?: string;
  imageUrl?: string;
  competenceIds?: number[];
  isActive?: boolean;
}

/** Payload pour la mise à jour partielle (PUT /api/formateurs/{id}) */
export type UpdateFormateurDTO = Partial<CreateFormateurDTO>;

/**
 * Représente une formation complète avec toutes ses relations (catégorie, formateur, compétences, etc.).
 */
export interface Formation {
  id: number;
  titre: string;
  sousTitre: string;
  imageUrl: string;
  niveau: NiveauFormation;
  statut: StatutFormation;
  categorie: Categorie;
  format: FormatPedagogique;
  formateur: Formateur;
  tags: Tag[];
  competences: Competence[];
  cout: number;
  capacite: number;
  dureeJours: number;
  isActive: boolean;
}

/** Payload pour la création d'une formation (POST /api/formations) */
export interface CreateFormationDTO {
  titre: string;
  sousTitre: string;
  imageUrl?: string;
  niveau: NiveauFormation;
  statut: StatutFormation;
  categorieId: number;
  formatId: number;
  formateurId: number;
  tagIds: number[];
  competenceIds: number[];
  cout: number;
  capacite: number;
  dureeJours: number;
  isActive?: boolean;
}

/** Payload pour la mise à jour partielle (PUT /api/formations/{id}) */
export type UpdateFormationDTO = Partial<CreateFormationDTO>;

// ─── Cours (Sessions) ─────────────────────────────────────────────────────────

/** Lieu de déroulement du cours */
export type LieuCours = 'EN_LIGNE' | 'PRESENTIEL' | 'HYBRIDE';

/**
 * Représente une session (cours) planifiée pour une formation.
 */
export interface Cours {
  id: number;
  date: string;
  lieu: LieuCours;
  statut: StatutFormation;
  dureeHeures: number;
  formationId: number;
  formationTitre: string;
  isActive: boolean;
}

/** Payload pour la création d'un cours (POST /api/cours) */
export interface CreateCoursDTO {
  date: string;
  lieu: LieuCours;
  statut: StatutFormation;
  dureeHeures: number;
  formationId: number;
  isActive?: boolean;
}

/** Payload pour la mise à jour partielle (PUT /api/cours/{id}) */
export type UpdateCoursDTO = Partial<CreateCoursDTO>;

/**
 * Structure de réponse paginée standardisée par le backend.
 */
export interface PaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// ─── Generic API wrapper ───────────────────────────────────────────────────────

/**
 * Structure de réponse standardisée pour tous les appels à l'API.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
