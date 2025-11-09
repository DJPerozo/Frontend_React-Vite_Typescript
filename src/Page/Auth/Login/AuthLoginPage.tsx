import { useForm } from 'react-hook-form'
import type { LoginUserFormType } from '../../../types'
import styles from './AuthLogin.module.css'
import { Schema } from './AuthLoginSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '../../../Components/Shared/ErrorMessage/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { Login_user } from '../../../Api/AuthApi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function AuthLoginPage() {
  const navigate = useNavigate()

  const initialValues: LoginUserFormType = {
    email: '',
    password: ''
  } 

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(Schema)
  })

  const mutation = useMutation({
    mutationFn: Login_user,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      reset()
      navigate('/')
    }
  })

  const onSubmit = ( formData: LoginUserFormType ) => {
    mutation.mutate(formData)
  }

  return (
    <section>
        <h3>Inicia sesion</h3>
        <p>llena el siguiente formulario para iniciar sesion</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
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
            to={'/auth/register'}
          >¿No tienes cuenta? crea una</Link>
        </nav>

      </section>
  )
}
