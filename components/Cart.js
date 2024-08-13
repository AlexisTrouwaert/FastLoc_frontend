import { useEffect, useState } from 'react'
import styles from '../styles/OrdersDetail.module.css'
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function () {

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    const [cart, setCart] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/orders/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // console.log('test', data.find[0].Orders)
            // setCart(data.find[0].Orders)
        })
    }, [])

    console.log('cart',cart)

    // const allCart = cart.map((data, i) => {
    //     if(data.Cart){
    //         const dateOrder = moment(data.Date).format('DD/MM/YYYY')
    //         return(
    //             <div key={i}>
    //                 <div>
    //                     <p>Commande passée le {dateOrder}</p>
    //                 </div>
    //                 <div>
    //                     <p>Total de </p>
    //                 </div>
    //             </div>
    //         )
    //     }
    // })

    return (
        <div>
            {/* {allCart} */}
        </div>
    )
}