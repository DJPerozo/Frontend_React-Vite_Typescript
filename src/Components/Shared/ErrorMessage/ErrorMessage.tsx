import type React from 'react'
import styles from './ErrorMessage.module.css'


export default function ErrorMessage( {children}: {children: React.ReactNode} ) {
  return (
    <div className={styles.error} >{children}</div>
  )
}
