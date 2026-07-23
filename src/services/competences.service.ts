import { baseUrl } from './api';
import { Competence, ApiResponse, CreateCompetenceDTO } from '@/types/api';

export const competencesService = {
  /**
   * Récupère la liste de toutes les compétences actives.
   * @returns {Promise<Competence[]>} Liste des compétences.
   */
  getCompetences: async (): Promise<Competence[]> => {
    const response = await fetch(`${baseUrl}/api/competences`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des compétences');
    }
    
    const data: ApiResponse<Competence[]> = await response.json();
    
    // On retourne uniquement les compétences actives
    return data.data.filter(competence => competence.active);
  },
  
  /**
   * Récupère une compétence spécifique par son identifiant.
   * @param {number | string} id - L'identifiant de la compétence.
   * @returns {Promise<Competence>} La compétence demandée.
   */
  getCompetenceById: async (id: number | string): Promise<Competence> => {
    const response = await fetch(`${baseUrl}/api/competences/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la compétence ${id}`);
    }
    
    const data: ApiResponse<Competence> = await response.json();
    return data.data;
  },

  /**
   * Crée une nouvelle compétence.
   * @param {CreateCompetenceDTO} payload - Les données de la compétence à créer.
   * @returns {Promise<Competence>} La compétence créée.
   */
  createCompetence: async (payload: CreateCompetenceDTO): Promise<Competence> => {
    const response = await fetch(`${baseUrl}/api/competences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la compétence');
    }

    const data: ApiResponse<Competence> = await response.json();
    return data.data;
  },

  /**
   * Met à jour partiellement une compétence existante.
   * @param {number | string} id - L'identifiant de la compétence à mettre à jour.
   * @param {Partial<CreateCompetenceDTO>} payload - Les nouvelles données de la compétence.
   * @returns {Promise<Competence>} La compétence mise à jour.
   */
  updateCompetence: async (id: number | string, payload: Partial<CreateCompetenceDTO>): Promise<Competence> => {
    const response = await fetch(`${baseUrl}/api/competences/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la compétence ${id}`);
    }

    const data: ApiResponse<Competence> = await response.json();
    return data.data;
  },

  /**
   * Supprime une compétence existante.
   * @param {number | string} id - L'identifiant de la compétence à supprimer.
   * @returns {Promise<boolean>} Indique si la suppression a réussi.
   */
  deleteCompetence: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`${baseUrl}/api/competences/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression de la compétence ${id}`);
    }

    return true;
  }
};
