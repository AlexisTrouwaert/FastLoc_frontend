import Header from './Header'
import styles from '../styles/Confirmation.module.css'
import { useRouter } from 'next/router'

export default function Profil() {

    return(
        <div className={styles.all}>
            <div>
                <Header/>
            </div>
        </div>
    )
}