import { baseUrl } from './api';
import { Cours, ApiResponse, PaginatedData, CreateCoursDTO, UpdateCoursDTO } from '@/types/api';

export const coursService = {
  /**
   * Récupère la liste de tous les cours (sessions) actifs.
   * @returns {Promise<Cours[]>} Liste des cours actifs.
   */
  getCours: async (): Promise<Cours[]> => {
    const response = await fetch(`${baseUrl}/api/cours`);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des cours');
    }

    const data: ApiResponse<PaginatedData<Cours>> = await response.json();

    // On retourne uniquement les cours actifs
    return data.data.content.filter((c) => c.isActive);
  },

  /**
   * Récupère un cours spécifique par son identifiant.
   * @param {number | string} id - L'identifiant du cours.
   * @returns {Promise<Cours>} Le cours demandé.
   */
  getCoursById: async (id: number | string): Promise<Cours> => {
    const response = await fetch(`${baseUrl}/api/cours/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du cours ${id}`);
    }

    const data: ApiResponse<Cours> = await response.json();
    return data.data;
  },

  /**
   * Crée un nouveau cours (session de formation).
   * @param {CreateCoursDTO} payload - Les données du cours à créer.
   * @returns {Promise<Cours>} Le cours créé.
   */
  createCours: async (payload: CreateCoursDTO): Promise<Cours> => {
    const response = await fetch(`${baseUrl}/api/cours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du cours');
    }

    const data: ApiResponse<Cours> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement un cours existant.
   * @param {number | string} id - L'identifiant du cours à mettre à jour.
   * @param {UpdateCoursDTO} payload - Les nouvelles données du cours.
   * @returns {Promise<Cours>} Le cours mis à jour.
   */
  updateCours: async (
    id: number | string,
    payload: UpdateCoursDTO
  ): Promise<Cours> => {
    const response = await fetch(`${baseUrl}/api/cours/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du cours ${id}`);
    }

    const data: ApiResponse<Cours> = await response.json();
    return data.data;
  },

  /**
   * Supprime un cours existant.
   * @param {number | string} id - L'identifiant du cours à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteCours: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/cours/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du cours ${id}`);
    }

    return true;
  },
};
