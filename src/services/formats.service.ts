import { baseUrl } from './api';
import { FormatPedagogique, ApiResponse, CreateFormatPedagogiqueDTO } from '@/types/api';

export const formatsService = {
  /**
   * Récupère la liste de tous les formats pédagogiques actifs.
   * @returns {Promise<FormatPedagogique[]>} Liste des formats pédagogiques.
   */
  getFormatsPedagogiques: async (): Promise<FormatPedagogique[]> => {
    const response = await fetch(`${baseUrl}/api/formats-pedagogiques`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des formats pédagogiques');
    }
    
    const data: ApiResponse<FormatPedagogique[]> = await response.json();
    
    // On retourne uniquement les formats actifs
    return data.data.filter(format => format.active);
  },
  
  /**
   * Récupère un format pédagogique spécifique par son identifiant.
   * @param {number | string} id - L'identifiant du format pédagogique.
   * @returns {Promise<FormatPedagogique>} Le format pédagogique demandé.
   */
  getFormatPedagogiqueById: async (id: number | string): Promise<FormatPedagogique> => {
    const response = await fetch(`${baseUrl}/api/formats-pedagogiques/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du format pédagogique ${id}`);
    }
    
    const data: ApiResponse<FormatPedagogique> = await response.json();
    return data.data;
  },

  /**
   * Crée un nouveau format pédagogique.
   * @param {CreateFormatPedagogiqueDTO} payload - Les données du format pédagogique à créer.
   * @returns {Promise<FormatPedagogique>} Le format pédagogique créé.
   */
  createFormatPedagogique: async (payload: CreateFormatPedagogiqueDTO): Promise<FormatPedagogique> => {
    const response = await fetch(`${baseUrl}/api/formats-pedagogiques`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du format pédagogique');
    }

    const data: ApiResponse<FormatPedagogique> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement un format pédagogique existant.
   * @param {number | string} id - L'identifiant du format pédagogique à mettre à jour.
   * @param {Partial<CreateFormatPedagogiqueDTO>} payload - Les nouvelles données du format pédagogique.
   * @returns {Promise<FormatPedagogique>} Le format pédagogique mis à jour.
   */
  updateFormatPedagogique: async (id: number | string, payload: Partial<CreateFormatPedagogiqueDTO>): Promise<FormatPedagogique> => {
    const response = await fetch(`${baseUrl}/api/formats-pedagogiques/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du format pédagogique ${id}`);
    }

    const data: ApiResponse<FormatPedagogique> = await response.json();
    return data.data;
  },

  /**
   * Supprime un format pédagogique existant.
   * @param {number | string} id - L'identifiant du format pédagogique à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteFormatPedagogique: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/formats-pedagogiques/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du format pédagogique ${id}`);
    }

    return true;
  }
};
