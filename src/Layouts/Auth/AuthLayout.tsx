import Logo from '../../Components/Shared/Logo';
import styles from './AuthLayout.module.css'
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
  return (
    <>

      <section className={styles.seccionContainer} >

        <article>
          <div>
            <div className={styles.cajaLogo}>
              <Logo />
            </div>
          </div>

          <main>
            <Outlet />
          </main>
          <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
          />
        </article>

      </section>
    
    </>
  )
}
