import { useQuery } from '@tanstack/react-query';
import { getStudentActionCenter } from '../services/api';

export const useStudentActionCenter = (studentId: string) => {
  return useQuery({
    queryKey: ['studentActionCenter', studentId],
    queryFn: () => getStudentActionCenter(studentId),
    enabled: !!studentId,
  });
};
