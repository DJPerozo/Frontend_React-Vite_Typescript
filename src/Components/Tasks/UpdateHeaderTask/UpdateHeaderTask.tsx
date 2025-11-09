import { useState } from 'react'
import Logo from '../../Shared/Logo'
import styles from './UpdateHeaderTask.module.css'
import { useMutation } from '@tanstack/react-query'
import { update_tasks_id_patch_ } from '../../../Api/TasksApi'
import { toast } from 'react-toastify'
import type { ProjectType, TasksType } from '../../../types'
import { useNavigate } from 'react-router-dom'

type Props = {
  taskId: TasksType['id']
  project_id: ProjectType['id']
}

export default function UpdateHeaderTask( { taskId, project_id }: Props ) {
  const navigate = useNavigate()

  const [isStatus, setIsStatus] = useState('')
  const onChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value
    setIsStatus(state)
  }

  const mutation = useMutation({
    mutationFn: update_tasks_id_patch_,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate(`/project-details/${project_id}`)
    }
  })

  const onSutmit = (status: string) => {
    const data = {
      taskId,
      status
    }

    mutation.mutate(data)
  }
  
  return (
    <>
      <header className={styles.header}>
        <section className={styles.secctionContainer}>
          <article className={styles.logo}>
            <Logo />
          </article>
          <article className={styles.contentUpdate}>
              <label htmlFor="status">Selecciona un estado →</label>
              <select 
                id="status"
                className={styles.select}
                onChange={onChage}
                value={isStatus}
              >
                <option value="">___selecciona___</option>
                <option value="pending">pendiente</option>
                <option value="onHold">En espera</option>
                <option value="isProgress">En progreso</option>
                <option value="underReview">En revision</option>
                <option value="complete">Completada</option>
              </select>
              <button
                type='button'
                onClick={() => onSutmit(isStatus)}
              >Actualizar estado</button>
          </article>
        </section>
      </header>
    
    </>
  )
}
