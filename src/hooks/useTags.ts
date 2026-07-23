import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsService } from '@/services/tags.service';
import { CreateTagDTO, UpdateTagDTO } from '@/types/api';

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Récupère tous les tags actifs depuis l'API.
 */
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: tagsService.getTags,
  });
};

/**
 * Récupère un tag par son identifiant.
 */
export const useTag = (id: number | string) => {
  return useQuery({
    queryKey: ['tags', id],
    queryFn: () => tagsService.getTagById(id),
    enabled: !!id,
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Crée un nouveau tag (POST /api/tags).
 */
export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTagDTO) =>
      tagsService.createTag(payload),
    onSuccess: () => {
      // Invalider la liste pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

/**
 * Met à jour un tag existant (PUT /api/tags/{id}).
 */
export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateTagDTO }) =>
      tagsService.updateTag(id, data),
    onSuccess: (_, variables) => {
      // Invalider la liste ET le détail du tag modifié
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tags', variables.id] });
    },
  });
};

/**
 * Supprime un tag (DELETE /api/tags/{id}).
 */
export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      tagsService.deleteTag(id),
    onSuccess: () => {
      // Invalider la liste après suppression
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
