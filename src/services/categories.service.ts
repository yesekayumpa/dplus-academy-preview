import { baseUrl } from './api';
import { Categorie, ApiResponse, CreateCategorieDTO, UpdateCategorieDTO } from '@/types/api';

export const categoriesService = {
  /**
   * Récupère la liste de toutes les catégories actives.
   * @returns {Promise<Categorie[]>} Liste des catégories.
   */
  getCategories: async (): Promise<Categorie[]> => {
    const response = await fetch(`${baseUrl}/api/categories`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    
    const data: ApiResponse<Categorie[]> = await response.json();
    
    // On retourne uniquement les catégories actives
    return data.data.filter(cat => cat.active);
  },
  
  /**
   * Récupère une catégorie spécifique par son identifiant.
   * @param {number | string} id - L'identifiant de la catégorie.
   * @returns {Promise<Categorie>} La catégorie demandée.
   */
  getCategorieById: async (id: number | string): Promise<Categorie> => {
    const response = await fetch(`${baseUrl}/api/categories/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la catégorie ${id}`);
    }
    
    const data: ApiResponse<Categorie> = await response.json();
    return data.data;
  },

  /**
   * Crée une nouvelle catégorie.
   * @param {CreateCategorieDTO} payload - Les données de la catégorie à créer.
   * @returns {Promise<Categorie>} La catégorie créée.
   */
  createCategorie: async (payload: CreateCategorieDTO): Promise<Categorie> => {
    const response = await fetch(`${baseUrl}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la catégorie');
    }

    const data: ApiResponse<Categorie> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement une catégorie existante.
   * @param {number | string} id - L'identifiant de la catégorie à mettre à jour.
   * @param {UpdateCategorieDTO} payload - Les nouvelles données de la catégorie.
   * @returns {Promise<Categorie>} La catégorie mise à jour.
   */
  updateCategorie: async (id: number | string, payload: UpdateCategorieDTO): Promise<Categorie> => {
    const response = await fetch(`${baseUrl}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la catégorie ${id}`);
    }

    const data: ApiResponse<Categorie> = await response.json();
    return data.data;
  },

  /**
   * Supprime une catégorie existante.
   * @param {number | string} id - L'identifiant de la catégorie à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteCategorie: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression de la catégorie ${id}`);
    }

    return true;
  }
};
