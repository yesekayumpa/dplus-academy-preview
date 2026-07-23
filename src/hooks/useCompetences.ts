import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { competencesService } from '@/services/competences.service';
import { CreateCompetenceDTO } from '@/types/api';

export const useCompetences = () => {
  return useQuery({
    queryKey: ['competences'],
    queryFn: competencesService.getCompetences
  });
};

export const useCompetence = (id: number | string) => {
  return useQuery({
    queryKey: ['competences', id],
    queryFn: () => competencesService.getCompetenceById(id),
    enabled: !!id,
  });
};

export const useCreateCompetence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCompetence: CreateCompetenceDTO) => competencesService.createCompetence(newCompetence),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competences'] });
    },
  });
};

export const useUpdateCompetence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreateCompetenceDTO> }) => 
      competencesService.updateCompetence(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['competences'] });
      queryClient.invalidateQueries({ queryKey: ['competences', variables.id] });
    },
  });
};

export const useDeleteCompetence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => competencesService.deleteCompetence(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competences'] });
    },
  });
};
