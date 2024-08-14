import Header from './Header'
import styles from '../styles/Orders.module.css'
import { useRouter } from 'next/router'
import Cart from './Cart'
import Pending from './Pending'
import Finish from './Finish'

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
                        <p className={styles.title}>Commande en cours</p>
                    </div>
                    <div>
                        <Pending/>
                    </div>
                    <div>
                        <p className={styles.title}>Commande passée</p>
                    </div>
                    <div>
                        <Finish/>
                    </div>
                </div>
            </div>
        </div>
    )
}