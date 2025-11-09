import { useQuery } from '@tanstack/react-query'
import styles from './Dashboard.module.css'
import { Get_all_project } from '../../../Api/ProjectApi'
import { Link } from 'react-router-dom'
import { useDeleteProject } from '../../../Hooks/useDeleteProject'


export default function DashboardPage() {
  // Hoos delete Project
  const { mutation } = useDeleteProject()
  

  const { data, isLoading } = useQuery({
    queryKey: ['getAllProjects'],
    queryFn: Get_all_project
  })

  if (isLoading) {
    return (
      <p>Cargando.....</p>
    )
  }


  if(data) return (
    <>
      <section className={styles.section}>
        <article>
          <h2>Mis proyectos</h2>
          <p>Hola administra tus proyectos</p>

          <button
            className={styles.buttonUptask}
          >< Link
            className={styles.Link}
            to={'/create-project'}
          >Crear Proyecto</Link></button>

        </article>
        <article className={styles.projectContainer}>
          {data.length === 0 ? (
            <p>No as creado proyectos aun</p>
          ): (

            <article className={styles.projectArticle}>
              {data.map(project => (
                <div key={project.id} className={styles.projectCart}>
                
                  <div>
                    <h2>{project.projectName}</h2>
                    <h3>Cliente: {project.clientName}</h3>
                    <p>{project.description}</p>
                  </div>
                  
                  <div className={styles.navProjects}>
                    
                    <Link
                      className={styles.Link}
                      to={`/project-details/${project.id}`}
                    >Ver proyecto</Link>
                    <Link
                      className={styles.Link}
                      to={`/update-project/${project.id}`}
                    >Editar Proyecto</Link>

                    <button
                      onClick={() => mutation.mutate(project.id)}
                    >Eliminar</button>
                  
                  </div>  

                </div>
              ))}
            </article>
            
          )} 
        </article>
      </section>
    </>
  )
}
