import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Delete_project } from "../Api/ProjectApi"
import { toast } from "react-toastify"


export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Delete_project,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['getAllProjects']})
        toast.success(data)
      }
  })

  return {
    mutation
  }
}

