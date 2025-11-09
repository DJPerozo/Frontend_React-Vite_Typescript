import { Link, Navigate, Outlet } from "react-router-dom";
import styles from './DashboardLayout.module.css'
import Logo from "../../Components/Shared/Logo";
import { ToastContainer } from "react-toastify";
import { useAuthProfile } from "../../Hooks/useAuthProfile";
import { useCloseSesion } from "../../Hooks/CerrarSesionUser";

export default function DashboardLayout() {

  const { seccionClose } = useCloseSesion()
  const { data, isError, isLoading } = useAuthProfile()

  if (isLoading) return <p>Cargando datos...</p>
  if(isError) return <Navigate to={'/auth/login'}/>
  

  if(data) return (
    <>
    <section className={styles.containerLayout}>
      <header className={styles.header}>
          <section className={styles.containerHeader}>
            <article className={styles.containerLogo}>
              <Logo />
            </article>
            <nav className={styles.navegationHeader}>
              
              <Link 
                to={'/profile'}
                className={styles.navLink}
              >profile</Link>

              <Link 
                to={'/'}
                className={styles.navLink}
              >Mis proyectos</Link>

              <button
                className={styles.button}
                onClick={seccionClose} 
              >
                cerrar sesion
              </button>
            </nav>
          </section>
      </header>

      <main className={styles.main}>
        <Outlet/>
      </main>
      <ToastContainer
        pauseOnFocusLoss = {false}
        pauseOnHover= {false}
      />

      <footer className={styles.footer}>
        <p className={styles.footerParrafo}>Todos los derechos reservados {new Date().getUTCFullYear()}</p>
      </footer>
    </section>
    </>
  )
}
