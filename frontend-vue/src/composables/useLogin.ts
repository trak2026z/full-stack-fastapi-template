import { useMutation } from '@tanstack/vue-query'
import { AuthService, TokenResponse } from '@/client'
import { handleApiError } from '@/service/api'

/**
 * Composable obsługujący logowanie użytkownika.
 * Odpowiada hookowi useAuth z wersji React.
 */
export function useLogin() {
  return useMutation<TokenResponse, unknown, { username: string; password: string }>({
    mutationFn: ({ username, password }) =>
      AuthService.login({
        requestBody: {
          username,
          password,
        },
      }),
    onSuccess: (data) => {
      // Zapisz token w localStorage
      localStorage.setItem('access_token', data.access_token)
      // Redirect na stronę główną
      window.location.href = '/'
    },
    onError: handleApiError,
  })
}
