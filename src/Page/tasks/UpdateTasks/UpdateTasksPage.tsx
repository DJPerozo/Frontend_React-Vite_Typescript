import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { Get_by_id_task } from "../../../Api/TasksApi"
import UpdateHeaderTask from "../../../Components/Tasks/UpdateHeaderTask/UpdateHeaderTask"
import UpdateTasks from "../../../Components/Tasks/UpdateTasks/UpdateTasks"

export default function UpdateTasksPage() {
  const params = useParams()
  const taskId = parseInt(params.taskId!)
  
  const { data, isError, isLoading } = useQuery({
    queryKey: ['GetByIdTasks', taskId],
    queryFn: () => Get_by_id_task(taskId),
    retry: false
  })

  if (isLoading) {
    return (
      <p>Cargando Datos.......</p>
    )
  }

  if (isError) {
    return (
      <Navigate to={'/404'} />
    )
  }

  if(data) return (
    <>
      <UpdateHeaderTask 
        taskId={taskId}
        project_id={data.project_id}
      />

      <UpdateTasks 
        task={data}
        taskId={taskId}
        project_id={data.project_id}
      />
    </>
  )

}
