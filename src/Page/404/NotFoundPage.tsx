import { Link } from 'react-router-dom'
import styles from './notFound.module.css'

export default function NotFoundPage() {
  return (
    <>
      <section className={styles.notFoundContainer}>
        <article className={styles.contentNotfound}>
          <h3>404</h3>
          <p>Lo sentimos este recurso no existe 🫡😭🚀</p>
          <Link
            className={styles.Link}
            to={'/'}
          >Volver a proyectos</Link>
        </article>
      </section>
    </>
  )
}
