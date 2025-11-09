import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { ProjectCreateFormType } from '../../../types'
import styles from './FormProject.module.css'
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage'

type Props = {
  register: UseFormRegister<ProjectCreateFormType>
  errors: FieldErrors<ProjectCreateFormType>
}

export default function FormProjects( { register, errors }: Props ) {
  return (
    <div>
      <div className=''>
        <label htmlFor="projectName" className={styles.label}>Nombre del proyecto</label>
        <input
          id='projectName' 
          type="text"
          placeholder='nombre del proyecto EJ: E_commerce'
          className={styles.input} 
          {...register('projectName')}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}

      </div>

      <div className={styles.div}>
        <label htmlFor="clientName" className={styles.label}>Nombre del cliente</label>
        <input
          id='clientName' 
          type="text"
          placeholder='nombre del cliente'
          className={styles.input} 
          {...register('clientName')}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}

      </div>

      <div className={styles.div}>
        <label htmlFor="description" className={styles.label}>descripcion</label>
        <input
          id='description' 
          type="text"
          placeholder='descripcion del proyecto'
          className={styles.input} 
          {...register('description')}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

      </div>
    </div>
  )
}
