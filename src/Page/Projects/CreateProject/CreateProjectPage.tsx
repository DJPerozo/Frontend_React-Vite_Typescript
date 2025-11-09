import { Link, useNavigate } from 'react-router-dom'
import FormProjects from '../../../Components/projects/FormProject/FormProjects'
import styles from './CreateProject.module.css'
import type { ProjectCreateFormType } from '../../../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Schema } from './CreateProjectSchemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Create_project } from '../../../Api/ProjectApi'
import { toast } from 'react-toastify'

export default function CreateProjectPage() {
  const navigate = useNavigate()
  
  const initialValues: ProjectCreateFormType = {
    projectName: '',
    clientName: '',
    description: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectCreateFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })


  const queryClien = useQueryClient()
  const mutation = useMutation({
    mutationFn: Create_project,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClien.invalidateQueries({queryKey: ['getAllProjects']})
      reset()
      toast.success(data)
      navigate('/')
    }
  })

  const onSubmit = (formData: ProjectCreateFormType) => {
    mutation.mutate(formData)
  }

  return (
    <section className={styles.seccionContainer}>
      <h3>Crear Proyecto</h3>
      <p>llena el siguiente formulario para crear un proyecto</p>

      <button
        className={styles.buttonUptask}
      >< Link
        className={styles.Link}
        to={'/'}
      >Volver a proyectos</Link></button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.from}
        noValidate
      >

        <FormProjects 
          register={register}
          errors={errors}
        />

      <button
        type='submit'
        value={'crear proyecto'}
        className={styles.buttonForm}
      >crear proyecto</button>

      </form>
      
    </section>
  )
}


