import Header from './Header'
import styles from '../styles/Orders.module.css'
import { useRouter } from 'next/router'
import Cart from './Cart'

export default function Orders() {

    return(
        <div>
            <div className={styles.stick}>
                <Header/>
            </div>
            <div className={styles.all}>
                <div className={styles.tile}>
                    <div>
                        <p className={styles.title}>Pannier en cours</p>
                    </div>
                    <div>
                        <Cart/>
                    </div>
                    <div>
                        <p>Commande en cours</p>
                    </div>
                    <div>
                        <p>Détail</p>
                    </div>
                    <div>
                        <p>Commande passée</p>
                    </div>
                    <div>
                        <p>Détail</p>
                    </div>
                </div>
            </div>
        </div>
    )
}