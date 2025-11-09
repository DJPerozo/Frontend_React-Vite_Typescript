import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TasksCreateFormType } from '../../../types'
import styles from './FormTasks.module.css'
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage'

type Props = {
  register: UseFormRegister<TasksCreateFormType>
  errors: FieldErrors<TasksCreateFormType>
} 

export default function FormTasks( { register, errors }: Props ) {
  return (
    <>
      <div>
      <div className=''>
        <label htmlFor="name" className={styles.label}>Nombre de la tarea</label>
        <input
          id='name' 
          type="text"
          placeholder='nombre de la tarea'
          className={styles.input} 
          {...register('name')}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}

      </div>

      <div className={styles.div}>
        <label htmlFor="description" className={styles.label}>descripcion</label>
        <textarea 
            id="description" 
            placeholder='descripcion de la tarea'
            className={styles.input}
            {...register('description')}
          />

          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}

      </div>

      
    </div>
    </>
  )
}

