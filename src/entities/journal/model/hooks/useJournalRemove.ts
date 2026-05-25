import { ApiClient } from '@/shared/api/client'
import { queryClient } from '@/shared/config/react-query'
import { useMutation } from '@tanstack/react-query'

export function useJournalRemove() {
  return useMutation({
    mutationFn: (id: number) => ApiClient.journalControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
    },
  })
}
