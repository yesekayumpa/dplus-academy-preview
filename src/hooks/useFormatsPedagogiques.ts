import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatsService } from '@/services/formats.service';
import { CreateFormatPedagogiqueDTO } from '@/types/api';

export const useFormatsPedagogiques = () => {
  return useQuery({
    queryKey: ['formats-pedagogiques'],
    queryFn: formatsService.getFormatsPedagogiques
  });
};

export const useFormatPedagogique = (id: number | string) => {
  return useQuery({
    queryKey: ['formats-pedagogiques', id],
    queryFn: () => formatsService.getFormatPedagogiqueById(id),
    enabled: !!id, // Ne lance la requête que si l'ID est fourni
  });
};

export const useCreateFormatPedagogique = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newFormat: CreateFormatPedagogiqueDTO) => formatsService.createFormatPedagogique(newFormat),
    onSuccess: () => {
      // Invalider la requête pour forcer un rechargement de la liste
      queryClient.invalidateQueries({ queryKey: ['formats-pedagogiques'] });
    },
  });
};

export const useUpdateFormatPedagogique = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreateFormatPedagogiqueDTO> }) => 
      formatsService.updateFormatPedagogique(id, data),
    onSuccess: (_, variables) => {
      // Invalider la liste et le détail du format modifié
      queryClient.invalidateQueries({ queryKey: ['formats-pedagogiques'] });
      queryClient.invalidateQueries({ queryKey: ['formats-pedagogiques', variables.id] });
    },
  });
};

export const useDeleteFormatPedagogique = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => formatsService.deleteFormatPedagogique(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formats-pedagogiques'] });
    },
  });
};
