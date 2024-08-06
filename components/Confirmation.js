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
                        <p>Confirmation</p>
                    </div>
                    <div>
                        <p>
                            Le paiement à bien été pris en compte.
                        </p>
                        <p>
                            il sera effectif qu'un fois l'échange d'outil effectué
                        </p>
                    </div>
                    <div>
                        <p>
                            Vous pouvez contacter l'utilisateur ci-dessous
                        </p>
                        <button onClick={() => handleMess()}>Messages</button>
                        <p>
                            Ou retourner sur le site principal
                        </p>
                        <button onClick={() => handleMain()}>Page principale</button>
                    </div>
                </div>
            </div>
        </div>
    )
}