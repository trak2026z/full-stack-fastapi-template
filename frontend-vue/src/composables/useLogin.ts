import { useMutation } from '@tanstack/vue-query'
import { LoginService, type Token } from '@/client'
import { handleApiError } from '@/services/api'

/**
 * Composable obsługujący logowanie użytkownika.
 * Odpowiada hookowi useAuth z wersji React.
 */
export function useLogin() {
  return useMutation<Token, unknown, { username: string; password: string }>({
    mutationFn: ({ username, password }) =>
      LoginService.loginAccessToken({
        formData: {
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
