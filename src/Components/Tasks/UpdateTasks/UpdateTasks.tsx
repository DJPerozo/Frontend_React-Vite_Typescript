import { useForm } from 'react-hook-form'
import type { ProjectType, TasksCreateFormType, TasksType } from '../../../types'
import styles from './UpdateTasks.module.css'
import { Schema } from './UpdateTasksSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormTasks from '../FormTasks/FormTasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Update_tasks } from '../../../Api/TasksApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type Props = {
  task: TasksType,
  taskId: TasksType['id']
  project_id: ProjectType['id']
}

export default function UpdateTasks( { task, taskId, project_id }: Props ) {
  const navigate = useNavigate()
  const initialValues: TasksCreateFormType = {
    name:task.name || '' ,
    description: task.description || ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm<TasksCreateFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })

  
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Update_tasks,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['getProjectsWithTasks', project_id]})
      queryClient.invalidateQueries({queryKey: ['GetByIdTasks', taskId]})
      navigate(`/project-details/${project_id}`)
      toast.success(data)
    }
  })

  const onSubmit = (formData: TasksCreateFormType) => {
    const data = {
      taskId,
      formData
    }
    mutation.mutate(data)
  }

  return (
    <>
      <section className={styles.seccionContainer}>
        <article>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.from}
            noValidate
          >

            <FormTasks 
              register={register}
              errors={errors}
            />
           
  
            <button
              type='submit'
              value={'editar tarea'}
              className={styles.buttonForm}
            >Editar tarea</button>

          </form>
       </article>
      
    </section>
    </>
  )
}
