import { useQuery } from "@tanstack/react-query"
import { Profile_user } from "../Api/AuthApi"


export const useAuthProfile = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['authProfile'],
    queryFn: Profile_user,
    retry: false,
    refetchOnWindowFocus: false

  })

  return {
    data,
    isError,
    isLoading
  }    
}