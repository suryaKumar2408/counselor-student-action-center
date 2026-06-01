import { useQuery } from '@tanstack/react-query';
import { getStudentList } from '../services/api';

export const useStudentList = () => {
  return useQuery({
    queryKey: ['studentList'],
    queryFn: getStudentList,
    staleTime: Infinity, // student list from mockData never changes at runtime
  });
};
