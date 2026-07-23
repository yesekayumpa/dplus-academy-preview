import { baseUrl } from './api';
import { Formateur, ApiResponse, PaginatedData, CreateFormateurDTO, UpdateFormateurDTO } from '@/types/api';

export const formateursService = {
  /**
   * Récupère la liste de tous les formateurs (avec pagination et filtres optionnels).
   * @param {Object} params - Paramètres de requête optionnels
   * @param {number} [params.page] - Numéro de la page (commence à 0)
   * @param {number} [params.size] - Nombre d'éléments par page
   * @param {number | string} [params.competenceId] - Filtrer par compétence
   * @returns {Promise<Formateur[]>} Le tableau des formateurs (données extraites).
   */
  getFormateurs: async (params?: {
    page?: number;
    size?: number;
    competenceId?: number | string;
  }): Promise<Formateur[]> => {
    const queryParams = new URLSearchParams();
    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('size', params.size.toString());
    if (params?.competenceId !== undefined) queryParams.append('competenceId', params.competenceId.toString());

    const queryString = queryParams.toString();
    const url = `${baseUrl}/api/formateurs${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des formateurs');
    }

    const data: ApiResponse<PaginatedData<Formateur>> = await response.json();
    return data.data.content.filter((formateur) => formateur.isActive);
  },

  /**
   * Récupère un formateur spécifique par son identifiant.
   * @param {number | string} id - L'identifiant du formateur.
   * @returns {Promise<Formateur>} Le formateur demandé.
   */
  getFormateurById: async (id: number | string): Promise<Formateur> => {
    const response = await fetch(`${baseUrl}/api/formateurs/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du formateur ${id}`);
    }

    const data: ApiResponse<Formateur> = await response.json();
    return data.data;
  },

  /**
   * Crée un nouveau formateur.
   * @param {CreateFormateurDTO} payload - Les données du formateur à créer.
   * @returns {Promise<Formateur>} Le formateur créé.
   */
  createFormateur: async (payload: CreateFormateurDTO): Promise<Formateur> => {
    const response = await fetch(`${baseUrl}/api/formateurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du formateur');
    }

    const data: ApiResponse<Formateur> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement un formateur existant.
   * @param {number | string} id - L'identifiant du formateur à mettre à jour.
   * @param {UpdateFormateurDTO} payload - Les nouvelles données du formateur.
   * @returns {Promise<Formateur>} Le formateur mis à jour.
   */
  updateFormateur: async (
    id: number | string,
    payload: UpdateFormateurDTO
  ): Promise<Formateur> => {
    const response = await fetch(`${baseUrl}/api/formateurs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du formateur ${id}`);
    }

    const data: ApiResponse<Formateur> = await response.json();
    return data.data;
  },

  /**
   * Supprime un formateur existant.
   * @param {number | string} id - L'identifiant du formateur à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteFormateur: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/formateurs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du formateur ${id}`);
    }

    return true;
  },
};
