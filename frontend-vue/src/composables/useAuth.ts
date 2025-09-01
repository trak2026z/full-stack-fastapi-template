import { useCurrentUser } from './useCurrentUser'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export function useAuth() {
  const userQuery = useCurrentUser()
  const router = useRouter()

  // Zwracamy currentUser jako computed
  const currentUser = computed(() => userQuery.data.value ?? null)

  function logout() {
    localStorage.removeItem('access_token')
    router.push('/login')
  }

  return {
    currentUser,
    logout,
  }
}
