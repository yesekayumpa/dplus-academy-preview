import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formationsService } from '@/services/formations.service';
import { NiveauFormation, StatutFormation, CreateFormationDTO, UpdateFormationDTO } from '@/types/api';

// ── Queries ────────────────────────────────────────────────────────────────────

/**
 * Récupère toutes les formations actives depuis l'API.
 */
export const useFormations = () => {
  return useQuery({
    queryKey: ['formations'],
    queryFn: formationsService.getFormations,
  });
};

/**
 * Récupère une formation par son identifiant.
 */
export const useFormation = (id: number | string) => {
  return useQuery({
    queryKey: ['formations', id],
    queryFn: () => formationsService.getFormationById(id),
    enabled: !!id,
  });
};

/**
 * Récupère les formations filtrées par niveau.
 */
export const useFormationsByNiveau = (niveau: NiveauFormation) => {
  return useQuery({
    queryKey: ['formations', 'niveau', niveau],
    queryFn: async () => {
      const formations = await formationsService.getFormations();
      return formations.filter((f) => f.niveau === niveau);
    },
  });
};

/**
 * Récupère les formations filtrées par statut.
 */
export const useFormationsByStatut = (statut: StatutFormation) => {
  return useQuery({
    queryKey: ['formations', 'statut', statut],
    queryFn: async () => {
      const formations = await formationsService.getFormations();
      return formations.filter((f) => f.statut === statut);
    },
  });
};

// ── Mutations ──────────────────────────────────────────────────────────────────

/**
 * Crée une nouvelle formation (POST /api/formations).
 */
export const useCreateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFormationDTO) =>
      formationsService.createFormation(payload),
    onSuccess: () => {
      // Invalider la liste pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
  });
};

/**
 * Met à jour une formation existante (PUT /api/formations/{id}).
 */
export const useUpdateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateFormationDTO }) =>
      formationsService.updateFormation(id, data),
    onSuccess: (_, variables) => {
      // Invalider la liste ET le détail de la formation modifiée
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['formations', variables.id] });
    },
  });
};

/**
 * Supprime une formation (DELETE /api/formations/{id}).
 */
export const useDeleteFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      formationsService.deleteFormation(id),
    onSuccess: () => {
      // Invalider la liste après suppression
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
  });
};

