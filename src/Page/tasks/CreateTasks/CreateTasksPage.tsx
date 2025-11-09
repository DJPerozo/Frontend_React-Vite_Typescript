import styles from './CreateTasks.module.css'
import FormTasks from '../../../Components/Tasks/FormTasks/FormTasks'
import type { ProjectType, TasksCreateFormType } from '../../../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Schema } from './CreateTasksSchemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Create_tasks } from '../../../Api/TasksApi'
import { toast } from 'react-toastify'

type Props = {
  project_id: ProjectType['id']
}

export default function CreateTasksPage( { project_id }: Props ) {
  const initialValues: TasksCreateFormType = {
    name: '',
    description: ''
  }

  const { register, handleSubmit, formState: { errors } , reset } = useForm<TasksCreateFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Create_tasks,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['getProjectsWithTasks', project_id]})
      reset()
      toast.success(data)
    }
  })

  const onSubmit = ( formData: TasksCreateFormType ) => {
    const data = {
      project_id,
      formData
    }
    mutation.mutate(data)
  }

  return (
    <>
      <section className={styles.seccionContainer}>
      <p>llena el siguiente formulario para agregar una tarea</p>


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
        value={'agregar tarea'}
        className={styles.buttonForm}
      >Agregar tarea</button>

      </form>
      
    </section>
    </>
  )
}
