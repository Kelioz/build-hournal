import { ApiClient } from '@/shared/api/client'
import { useQuery } from '@tanstack/react-query'

export function useWorkTypesFindAll() {
  return useQuery({
    queryKey: ['workTypes'],
    queryFn: () => ApiClient.workTypesControllerFindAll(),
    enabled: true,
  })
}
