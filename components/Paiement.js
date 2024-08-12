import Header from './Header'
import styles from '../styles/Paiement.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Paiement() {

    const [cart, setCart] = useState(true)
    const [paypal, setPaypal] = useState(false)
    const [whatcard, setWhatcard] = useState('')

    const [cardNumber, setCardNumber] = useState('')
    const [expiMonth, setExpiMonth] = useState('')
    const [expiYear, setExpiYear] = useState('')
    const [CVV, setCVV] = useState('')

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

    if(cardNumber.length == 15 || cardNumber.length == 16){
        if(visaRegEx.test(cardNumber)){
            console.log('ok visa')
        } else if (mastercardRegEx.test(cardNumber)){
            console.log('ok Master')
        } else if (amexpRegEx.test(cardNumber)){
            console.log('ok amex')
        } else {
            console.log('not ok')
        }
    }

    let content;

    if(cart){
        content = (
            <div>
                <div>
                    <p>Format XXXX</p>
                    <input type='text' placeholder='Numéro de carte' maxlength='16' onChange={e => setCardNumber(e.target.value)} className={styles.inputs}/>
                    <p>{whatcard}</p>
                </div>
                <div className={styles.divInput}>
                    <div className={styles.inputsExpi}>
                        <input type="text" name="month" placeholder="MM" maxlength="2" size="2" onChange={e => setExpiMonth(e.target.value)}  className={styles.expi}/>
                        <span>/</span>
                        <input type="text" name="year" placeholder="YY" maxlength="2" size="2" onChange={e => setExpiYear(e.target.value)} className={styles.expi}/>
                    </div>
                    <input type='text' placeholder='CVV' maxlength='3' onChange={e => setCVV(e.target.value)} className={styles.inputs}/>
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
                        <button onClick={() => handlePaypal()}>Paypal</button>
                        <button onClick={() => handleCart()}>Carte de credit</button>
                    </div>
                    {content}
                    <div className={styles.divBtn}>
                        <button className={styles.paiement} onClick={() => handlePaypal()}>Procéder au paiement</button>
                    </div>
                </div>
            </div>
        </div>
    )
}