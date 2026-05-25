import { ApiClient } from '@/shared/api/client'
import { JournalControllerFindAllParams } from '@/shared/api/client/api.schemas'
import { useQuery } from '@tanstack/react-query'

export function useJournalFindAll(params?: JournalControllerFindAllParams) {
  return useQuery({
    queryKey: ['journals', params],
    queryFn: () => ApiClient.journalControllerFindAll(params),
    enabled: true,
  })
}
