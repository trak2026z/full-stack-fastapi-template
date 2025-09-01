import { useQuery } from '@tanstack/vue-query'
import { UsersService, type UserPublic } from '@/client'

/**
 * Zwraca dane aktualnie zalogowanego użytkownika
 */
export function useCurrentUser() {
  return useQuery<UserPublic>({
    queryKey: ['currentUser'],
    queryFn: () => UsersService.readUserMe(),
  })
}
