import { baseUrl } from './api';
import { Tag, ApiResponse, CreateTagDTO, UpdateTagDTO } from '@/types/api';

export const tagsService = {
  /**
   * Récupère la liste de tous les tags (mots-clés) actifs.
   * @returns {Promise<Tag[]>} Liste des tags.
   */
  getTags: async (): Promise<Tag[]> => {
    const response = await fetch(`${baseUrl}/api/tags`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des tags');
    }
    
    const data: ApiResponse<Tag[]> = await response.json();
    
    // On retourne uniquement les tags actifs
    return data.data.filter(tag => tag.active);
  },
  
  /**
   * Récupère un tag spécifique par son identifiant.
   * @param {number | string} id - L'identifiant du tag.
   * @returns {Promise<Tag>} Le tag demandé.
   */
  getTagById: async (id: number | string): Promise<Tag> => {
    const response = await fetch(`${baseUrl}/api/tags/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du tag ${id}`);
    }
    
    const data: ApiResponse<Tag> = await response.json();
    return data.data;
  },

  /**
   * Crée un nouveau tag.
   * @param {CreateTagDTO} payload - Les données du tag à créer.
   * @returns {Promise<Tag>} Le tag créé.
   */
  createTag: async (payload: CreateTagDTO): Promise<Tag> => {
    const response = await fetch(`${baseUrl}/api/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du tag');
    }

    const data: ApiResponse<Tag> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement un tag existant.
   * @param {number | string} id - L'identifiant du tag à mettre à jour.
   * @param {UpdateTagDTO} payload - Les nouvelles données du tag.
   * @returns {Promise<Tag>} Le tag mis à jour.
   */
  updateTag: async (id: number | string, payload: UpdateTagDTO): Promise<Tag> => {
    const response = await fetch(`${baseUrl}/api/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du tag ${id}`);
    }

    const data: ApiResponse<Tag> = await response.json();
    return data.data;
  },

  /**
   * Supprime un tag existant.
   * @param {number | string} id - L'identifiant du tag à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteTag: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/tags/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du tag ${id}`);
    }

    return true;
  }
};
