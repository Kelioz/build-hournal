import { ApiClient } from '@/shared/api/client'
import { useQuery } from '@tanstack/react-query'

export function useJournalFindOne(id: number | undefined) {
  return useQuery({
    queryKey: ['journal', id],
    queryFn: () => {
      if (id === undefined) throw new Error('Journal ID is required')
      return ApiClient.journalControllerFindOne(id)
    },
    enabled: id !== undefined,
  })
}
