import styles from './UpdateProject.module.css'
import FormProjects from "../FormProject/FormProjects";
import type { ProjectCreateFormType, ProjectType } from '../../../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema } from './UpdateProjectSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Update_projects } from '../../../Api/ProjectApi';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  project: ProjectType
  projectId: ProjectType['id']
}

export default function UpdateProject( { project, projectId }: Props ) {
  const navigate = useNavigate()

  const initialValues: ProjectCreateFormType = {
    projectName: project.projectName || '' ,
    clientName: project.clientName || '',
    description: project.description || ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectCreateFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Update_projects,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['getAllProjects']})
      queryClient.invalidateQueries({queryKey: ['GetAllProjects']})
      reset()
      toast.success(data)
      navigate('/')
    }
  })

  const onSubmit = ( formData: ProjectCreateFormType ) => {
    const data = {
      projectId,
      formData
    }

    mutation.mutate(data)
  }

  return (
    <section className={styles.seccionContainer}>
      <h3>Editar proyecto</h3>
      <p>llena el siguiente formulario para editar tu proyecto</p>

      <button
        className={styles.buttonUptask}
      >< Link
        className={styles.Link}
        to={'/'}
      >Volver a peoyectos</Link></button>

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
          value={'Editar proyecto'}
          className={styles.buttonForm}
        >Editar Proyecto</button>

      </form>
      
    </section>
  )
}


