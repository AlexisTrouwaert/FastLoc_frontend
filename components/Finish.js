import { useEffect, useState } from 'react'
import styles from '../styles/OrdersDetail.module.css'
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function Finish() {

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    const [cart, setCart] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/orders/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            console.log('data',data)
            setCart(data.data[0].Orders)
        })
    }, [])

    console.log('cart',cart)

    const allCart = cart && cart.map((data, i) => {
        if(data.Finish){
            const dateOrder = moment(data.Date).format('DD/MM/YYYY')
            return(
                <div key={i}>
                    <div>
                        <p>Commande passée le {dateOrder}</p>
                    </div>
                    <div>
                        <p>Total de {data.article.Price}€</p>
                        <button>Voir plus</button>
                    </div>
                    
                </div>
            )
        }
    })

    return (
        <div>
            {allCart}
        </div>
    )
}