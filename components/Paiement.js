import Header from './Header'
import styles from '../styles/Paiement.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal } from '@fortawesome/free-solid-svg-icons';

export default function Paiement() {
    const router = useRouter()

    const [cart, setCart] = useState(true)
    const [paypal, setPaypal] = useState(false)
    const [whatcard, setWhatcard] = useState('')

    const [cardNumber, setCardNumber] = useState('')
    const [expiMonth, setExpiMonth] = useState('')
    const [expiYear, setExpiYear] = useState('')
    const [CVV, setCVV] = useState('')

    const [error, setError] = useState('')

    const handleCart = () => {
        setCart(!cart)
        setPaypal(!paypal)
    }

    const handlePaypal = () => {
        setCart(!cart)
        setPaypal(!paypal)
    }
    
    
    let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    let amexpRegEx = /^(?:3[47][0-9]{13})$/;

    useEffect(() => {
        if(cardNumber.length == 15 || cardNumber.length == 16){
            if(visaRegEx.test(cardNumber)){
                setWhatcard('Carte Visa')
            } else if (mastercardRegEx.test(cardNumber)){
                setWhatcard('Carte Mastercard')
            } else if (amexpRegEx.test(cardNumber)){
                setWhatcard('Carte American Express')
            } else {
                setWhatcard('Numero de carte invalide')
            }
        }
    },[cardNumber])


    let content;

    if(cart){
        content = (
            <div>
                <div>
                    <input type='text' placeholder='Numéro de carte' maxLength='16' onChange={e => setCardNumber(e.target.value)} className={styles.inputsCard}/>
                    <p>{whatcard}</p>
                </div>
                <div className={styles.divInput}>
                    <div className={styles.inputsExpi}>
                        <input type="text" name="month" placeholder="MM" maxLength="2" size="2" onChange={e => setExpiMonth(e.target.value)}  className={styles.expi}/>
                        <span>/</span>
                        <input type="text" name="year" placeholder="YY" maxLength="2" size="2" onChange={e => setExpiYear(e.target.value)} className={styles.expi}/>
                    </div>
                    <input type='text' placeholder='CVV' maxLength='3' onChange={e => setCVV(e.target.value)} className={styles.inputs}/>
                </div>
            </div>
        )
    } else if (paypal){
        content = (
            <div>
                <p>Paypal</p>
            </div>
        )
    }


    const handlePay = () => {
        if(whatcard !== 'Numero de carte invalide' || whatcard !== ''){
            if(CVV !== '' && expiMonth !== '' && expiYear !== ''){
                router.push('/confirmation')
            } else {
                setError('Des champs sont vide')
            }
        }
    }

    return(
        <div>
            <div className={styles.stick}>
                <Header/>
            </div>
            <div className={styles.all}>
                <div className={styles.tile}>
                    <div className={styles.header}>
                        <p>Paiement</p>
                    </div>
                    <div>
                        <button onClick={() => handlePaypal()} className={styles.modePaiement}>
                            {/* <FontAwesomeIcon icon={faCcPaypal} style={{color: "#FEBD59"}} /> */}
                            Paypal
                        </button>
                        <button onClick={() => handleCart()} className={styles.modePaiement}>Carte de credit</button>
                    </div>
                    {content}
                    <div className={styles.divBtn}>
                        <p>{error}</p>
                        <button className={styles.paiement} onClick={() => handlePay()}>Procéder au paiement</button>
                    </div>
                </div>
            </div>
        </div>
    )
}