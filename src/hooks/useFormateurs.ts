import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formateursService } from '@/services/formateurs.service';
import { CreateFormateurDTO, UpdateFormateurDTO } from '@/types/api';

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Récupère tous les formateurs depuis l'API, avec pagination et filtres optionnels.
 */
export const useFormateurs = (params?: { page?: number; size?: number; competenceId?: number | string }) => {
  return useQuery({
    queryKey: ['formateurs', params],
    queryFn: () => formateursService.getFormateurs(params),
  });
};

/**
 * Récupère un formateur par son identifiant.
 */
export const useFormateur = (id: number | string) => {
  return useQuery({
    queryKey: ['formateurs', id],
    queryFn: () => formateursService.getFormateurById(id),
    enabled: !!id,
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Crée un nouveau formateur (POST /api/formateurs).
 */
export const useCreateFormateur = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFormateurDTO) =>
      formateursService.createFormateur(payload),
    onSuccess: () => {
      // Invalider la liste pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ['formateurs'] });
    },
  });
};

/**
 * Met à jour un formateur existant (PUT /api/formateurs/{id}).
 */
export const useUpdateFormateur = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateFormateurDTO }) =>
      formateursService.updateFormateur(id, data),
    onSuccess: (_, variables) => {
      // Invalider la liste ET le détail du formateur modifié
      queryClient.invalidateQueries({ queryKey: ['formateurs'] });
      queryClient.invalidateQueries({ queryKey: ['formateurs', variables.id] });
    },
  });
};

/**
 * Supprime un formateur (DELETE /api/formateurs/{id}).
 */
export const useDeleteFormateur = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      formateursService.deleteFormateur(id),
    onSuccess: () => {
      // Invalider la liste après suppression
      queryClient.invalidateQueries({ queryKey: ['formateurs'] });
    },
  });
};
