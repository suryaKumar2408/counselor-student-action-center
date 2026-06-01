import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskStatus } from '../services/api';
import type { Task } from '../types';

interface UpdateTaskArgs {
  taskId: string;
  status: Task['status'];
}

export const useUpdateTaskStatus = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: UpdateTaskArgs) => updateTaskStatus(taskId, status),
    onSuccess: () => {
      // Invalidate and refetch student action center data to keep UI synced
      queryClient.invalidateQueries({ queryKey: ['studentActionCenter', studentId] });
    },
  });
};
