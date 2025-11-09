import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { Get_by_id_projects } from "../../../Api/ProjectApi"
import UpdateProject from "../../../Components/projects/UpdateProject/UpdateProject"

export default function UpdateProjectPage() {
  const params = useParams()
  const projectId = parseInt(params.projectId!)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['GetAllProjects', projectId],
    queryFn: () => Get_by_id_projects(projectId),
    retry: false
  })

  if (isLoading) {
    return(
      <p>Cargando</p>
    )
  }

  if (isError) return <Navigate to={'/404'} />
  
  
  if(data) return (
     <>
      <UpdateProject 
        project={data}
        projectId={projectId}
      />
     </>
  )
}
