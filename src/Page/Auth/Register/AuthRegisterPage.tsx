import { useForm } from 'react-hook-form'
import type { RegisterUserFormType } from '../../../types'
import styles from './AuthRegister.module.css'
import { Schema } from './AuthRegisterSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../../../Components/Shared/ErrorMessage/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { Register_user } from '../../../Api/AuthApi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function AuthRegisterPage() {
  const navigate = useNavigate()
  const initialValues: RegisterUserFormType = {
    name: '',
    email: '',
    password: '',
    password_conformation: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterUserFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })

  const mutation = useMutation({
    mutationFn: Register_user,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      reset()
      toast.success(data)
      navigate('/auth/login')

    }
  })

  const onSubmit = ( formData: RegisterUserFormType ) =>  {
    mutation.mutate(formData)
  }

  return (
    <>
      <section>
        <h3>Registrate aqui</h3>
        <p>llena el siguiente formulario y crea una cuenta</p>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >

          <div className="">
            <label htmlFor="name" className={styles.label}>nombre de registro</label>
            <input
              id='name' 
              type="text"
              placeholder='nombre EJ: Juan Ramirez'
              className={styles.input} 
              {...register('name')}
            />

            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}

          </div>

          <div className={styles.divContainer}>
            <label htmlFor="email" className={styles.label}>email de registro</label>
            <input
              id='email' 
              type="email"
              placeholder='email EJ: correo@correo.com'
              className={styles.input} 
              {...register('email')}
            />

            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}

          </div>

          <div className={styles.divContainer}>
            <label htmlFor="password" className={styles.label}>contraseña</label>
            <input
              id='password' 
              type="password"
              placeholder='*************'
              className={styles.input} 
              {...register('password')}
            />

            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}

          </div>

          <div className={styles.divContainer}>
            <label htmlFor="password_confirmation" className={styles.label}>repite tu password</label>
            <input
              id='password_confirmation' 
              type="password"
              placeholder='*************'
              className={styles.input} 
              {...register('password_conformation')}
            />

            {errors.password_conformation && (
              <ErrorMessage>{errors.password_conformation.message}</ErrorMessage>
            )}

          </div>

          <button
            type='submit'
            className={styles.buttonAuth}
            disabled={mutation.isPending}
          >
            Registrarse
          </button>

        </form>

        <nav className={styles.nav}>
          <Link
            className={styles.link}
            to={'/auth/login'}
          >¿Ya tienes cuenta? inicia sesion</Link>
        </nav>

      </section>
    
    </>
  )
}
