import { ApiClient } from '@/shared/api/client'
import { CreateJournalDto } from '@/shared/api/client/api.schemas'
import { queryClient } from '@/shared/config/react-query'
import { useMutation } from '@tanstack/react-query'

export function useJournalCreate() {
  return useMutation({
    mutationFn: (data: CreateJournalDto) =>
      ApiClient.journalControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] })
    },
  })
}
