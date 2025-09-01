import { ApiError } from "@/client"

export function handleApiError(error: unknown) {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem("access_token")
    window.location.href = "/login"
  }
}
