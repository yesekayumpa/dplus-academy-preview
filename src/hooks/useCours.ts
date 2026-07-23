import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursService } from '@/services/cours.service';
import { CreateCoursDTO, UpdateCoursDTO } from '@/types/api';

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Récupère tous les cours (sessions) actifs depuis l'API.
 */
export const useCoursList = () => {
  return useQuery({
    queryKey: ['cours'],
    queryFn: coursService.getCours,
  });
};

/**
 * Récupère un cours par son identifiant.
 */
export const useCours = (id: number | string) => {
  return useQuery({
    queryKey: ['cours', id],
    queryFn: () => coursService.getCoursById(id),
    enabled: !!id,
  });
};

/**
 * Récupère les cours associés à une formation spécifique.
 */
export const useCoursByFormationId = (formationId: number | string) => {
  return useQuery({
    queryKey: ['cours', 'formation', formationId],
    queryFn: async () => {
      const cours = await coursService.getCours();
      return cours.filter((c) => c.formationId === Number(formationId));
    },
    enabled: !!formationId,
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Crée un nouveau cours (POST /api/cours).
 */
export const useCreateCours = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCoursDTO) =>
      coursService.createCours(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cours'] });
      if (variables.formationId) {
        queryClient.invalidateQueries({ queryKey: ['cours', 'formation', variables.formationId] });
      }
    },
  });
};

/**
 * Met à jour un cours existant (PUT /api/cours/{id}).
 */
export const useUpdateCours = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateCoursDTO }) =>
      coursService.updateCours(id, data),
    onSuccess: (updatedCours, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cours'] });
      queryClient.invalidateQueries({ queryKey: ['cours', variables.id] });
      if (updatedCours.formationId) {
        queryClient.invalidateQueries({ queryKey: ['cours', 'formation', updatedCours.formationId] });
      }
    },
  });
};

/**
 * Supprime un cours (DELETE /api/cours/{id}).
 */
export const useDeleteCours = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      coursService.deleteCours(id),
    onSuccess: () => {
      // Pour être sûr, on invalide tout ce qui est lié aux cours
      queryClient.invalidateQueries({ queryKey: ['cours'] });
    },
  });
};
