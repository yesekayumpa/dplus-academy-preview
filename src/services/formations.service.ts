import { baseUrl } from './api';
import { Formation, ApiResponse, PaginatedData, CreateFormationDTO, UpdateFormationDTO } from '@/types/api';
import { mockFormations } from '@/data/mockApiData';

export const formationsService = {
  /**
   * Récupère la liste de toutes les formations actives.
   * @returns {Promise<Formation[]>} Liste des formations actives.
   */
  getFormations: async (): Promise<Formation[]> => {
    return mockFormations;
  },

  /**
   * Récupère une formation spécifique par son identifiant.
   * @param {number | string} id - L'identifiant de la formation.
   * @returns {Promise<Formation>} La formation demandée.
   */
  getFormationById: async (id: number | string): Promise<Formation> => {
    const formation = mockFormations.find(f => f.id.toString() === id.toString());
    if (!formation) throw new Error(`Erreur lors de la récupération de la formation ${id}`);
    return formation;
  },

  /**
   * Crée une nouvelle formation.
   * @param {CreateFormationDTO} payload - Les données de la formation à créer.
   * @returns {Promise<Formation>} La formation créée.
   */
  createFormation: async (payload: CreateFormationDTO): Promise<Formation> => {
    const response = await fetch(`${baseUrl}/api/formations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la formation');
    }

    const data: ApiResponse<Formation> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement une formation existante.
   * @param {number | string} id - L'identifiant de la formation à mettre à jour.
   * @param {UpdateFormationDTO} payload - Les nouvelles données de la formation.
   * @returns {Promise<Formation>} La formation mise à jour.
   */
  updateFormation: async (
    id: number | string,
    payload: UpdateFormationDTO
  ): Promise<Formation> => {
    const response = await fetch(`${baseUrl}/api/formations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la formation ${id}`);
    }

    const data: ApiResponse<Formation> = await response.json();
    return data.data;
  },

  /**
   * Supprime une formation existante.
   * @param {number | string} id - L'identifiant de la formation à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteFormation: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/formations/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression de la formation ${id}`);
    }

    return true;
  },
};

