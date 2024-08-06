import Header from './Header'
import styles from '../styles/Confirmation.module.css'
import { useRouter } from 'next/router'

export default function Confirmation() {
    const router = useRouter()

    const handleMain = () => {
        router.push('/')
    }

    const handleMess = () => {
        router.push('/messages')
    }

    return(
        <div className={styles.all}>
            <div>
                <Header/>
            </div>
            <div className={styles.content}>
                <div className={styles.tile}>
                    <div className={styles.title}>
                        <p className={styles.pTitle}>Confirmation</p>
                    </div>
                    <div className={styles.divText}>
                        <p className={styles.pText}>
                            Le paiement à bien été pris en compte.
                        </p>
                        <p className={styles.pText}>
                            il sera effectif qu'une fois l'échange d'outil effectué
                        </p>
                    </div>
                    <div className={styles.divBtn}>
                        <p className={styles.pText}>
                            Vous pouvez contacter l'utilisateur ci-dessous
                        </p>
                        <button onClick={() => handleMess()} className={styles.btnMess}>Messages</button>
                        <p className={styles.pText}>
                            Ou retourner sur le site principal
                        </p>
                        <button onClick={() => handleMain()} className={styles.btnMain}>Page principale</button>
                    </div>
                </div>
            </div>
        </div>
    )
}