import Header from './Header'
import styles from '../styles/Confirmation.module.css'

export default function Confirmation() {

    const handleMain = () => {
        window.location.href = "http://localhost:3001"
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
                        <button>Messages</button>
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