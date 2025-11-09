import styles from './ProjectDetalis.module.css'

import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { Get_project_id_with_tasks } from "../../../Api/ProjectApi"
import TasksLists from '../../../Components/Tasks/TasksLists/TasksLists'
import CreateTasksPage from '../../tasks/CreateTasks/CreateTasksPage'

export default function ProjectDetailsPage() {
  const params = useParams()
  const project_id = parseInt(params.project_id!)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getProjectsWithTasks', project_id],
    queryFn: () => Get_project_id_with_tasks(project_id),
    retry: false
  })

  if (isLoading) return <p>Cargando datos....</p>
  if (isError) return <Navigate to={'/404'} /> 


  if(data) return (
    <>
      <section className={styles.section}>
        <article>
          <h3 className={styles.projectDetailsTitle}>{data.projectName}</h3>
          <p className={styles.projectDetailsDescription}>{data.description}</p>
        </article>
        <article>
          <CreateTasksPage
            project_id={data.id}
          />
        </article>
      </section>

      <TasksLists 
        tasks={data.tasks}
      />

    </>
  )



}
