import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/services/categories.service';
import { CreateCategorieDTO, UpdateCategorieDTO } from '@/types/api';

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Récupère toutes les catégories actives depuis l'API.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getCategories,
  });
};

/**
 * Récupère une catégorie par son identifiant.
 */
export const useCategorie = (id: number | string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesService.getCategorieById(id),
    enabled: !!id,
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Crée une nouvelle catégorie (POST /api/categories).
 */
export const useCreateCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCategorieDTO) =>
      categoriesService.createCategorie(payload),
    onSuccess: () => {
      // Invalider la liste pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * Met à jour une catégorie existante (PUT /api/categories/{id}).
 */
export const useUpdateCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateCategorieDTO }) =>
      categoriesService.updateCategorie(id, data),
    onSuccess: (_, variables) => {
      // Invalider la liste ET le détail de la catégorie modifiée
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
    },
  });
};

/**
 * Supprime une catégorie (DELETE /api/categories/{id}).
 */
export const useDeleteCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      categoriesService.deleteCategorie(id),
    onSuccess: () => {
      // Invalider la liste après suppression
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
