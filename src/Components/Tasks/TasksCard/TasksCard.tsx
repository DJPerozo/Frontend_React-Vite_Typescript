import styles from './TasksCard.module.css'
import type { TasksType } from "../../../types"
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Delete_tasks } from '../../../Api/TasksApi'
import { toast } from 'react-toastify'


type Props = {
  tasks: TasksType
}

export default function TasksCard( { tasks }: Props ) {
  const project_id = tasks.project_id

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Delete_tasks,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['getProjectsWithTasks', project_id]})
      toast.success(data)
    }

  })  

  return (
    <>
      <div className={styles.tasksCart}>
        <div className={styles.status}>
          <p>{tasks.status}</p>
        </div>

        <div className={styles.tasksContent}>
          <div className={styles.decription}>
            <h3>{tasks.name}</h3>
            <p>{tasks.description}</p>
          </div>
          <div className={styles.actions}>
            <Link
              className={styles.linkEdit}
              to={`/update-tasks/${tasks.id}`}
            >Editar Tarea</Link>
            <button
              onClick={() => mutation.mutate(tasks.id)}
            >Eliminar tarea</button>
          </div>
        </div>
      </div>
    </>
  )
}
