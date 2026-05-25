import { ApiClient } from '@/shared/api/client'
import { UpdateJournalDto } from '@/shared/api/client/api.schemas'
import { queryClient } from '@/shared/config/react-query'
import { useMutation } from '@tanstack/react-query'

export function useJournalUpdate() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateJournalDto }) =>
      ApiClient.journalControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
    },
  })
}
