import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles['home-container']}>
      <div className={styles['home-content']}>
        <h1 className={styles['home-title']}>
          Bem-vindo ao Sistema
        </h1>
        
        <div className={styles['button-container']}>
          <Link href="/cep" className={`${styles['home-button']} ${styles['cep-button']}`}>
            🔍 Buscar CEP
          </Link>
          
          <Link href="/cursos" className={`${styles['home-button']} ${styles['cursos-button']}`}>
            📚 Ver Cursos
          </Link>
        </div>
        
        <p className={styles['home-subtitle']}>
          Escolha uma das opções acima para começar
        </p>
      </div>
    </div>
  )
}
