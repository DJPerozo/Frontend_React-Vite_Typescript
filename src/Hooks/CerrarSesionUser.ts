import { useQueryClient } from "@tanstack/react-query"

export const useCloseSesion = () => {
  const queryClient = useQueryClient()
  const seccionClose = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({queryKey: ['authProfile']})
  }

  return {
    seccionClose
  }

}