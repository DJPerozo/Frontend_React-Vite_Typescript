import styles from './TasksLists.module.css'
import type { TasksType } from "../../../types"
import TasksCard from '../TasksCard/TasksCard'

type Props = {
  tasks: TasksType[]
}

export default function TasksLists( { tasks }: Props  ) {
  return (
    <>
      <section className={styles.seccionTasksContainer}>
          {tasks.length === 0 ?(
            <p>No as creado tareas aun</p>
          ): (
            <>
              <p className={styles.titletasks}>Tareas</p>

              <article className={styles.tasksCartContainer}>
                {tasks.map(tasks => (
                  <TasksCard 
                    key={tasks.id}
                    tasks={tasks}
                  />
              ))}
              </article>
            
            </>
          )}
      </section>
    </>
  )
}


