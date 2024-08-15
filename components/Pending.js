import { useEffect, useState } from 'react'
import styles from '../styles/OrdersDetail.module.css'
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function Pending () {

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    const [pendingArticles, setPendingArticles] = useState([])
    const [myArticles, setMyArticles] = useState([])
    const [date, setDate] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/orders/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            let allOrders = data.data[0].Orders
            for(let i of allOrders){
                if(i.Pending){
                    setDate(i.Date)
                    setPendingArticles(i.article)
                }
            }
            if(pendingArticles !== undefined && !loading){
                setLoading(!loading)
            }
        })
        .then(() =>{
            if(loading){
                fetch(`http://localhost:3000/users/detailArticles/${pendingArticles[0]}`)
                .then(response => response.json())
                .then(data => {
                    let myArticlesPending = []
                    for (let i of data.data){
                        console.log(pendingArticles.length)
                        for (let j = 0; j < pendingArticles.length; j++){
                            if(i._id.includes(pendingArticles[j])){
                                myArticlesPending.push(i)
                            }
                        }
                    }
    
                    setMyArticles(myArticlesPending)
                })
            }
        })
    },[loading])

    let total = 0;

    for (let i of myArticles){
        total += i.price
    }

    let dateOfOrder = moment(date).format('DD/MM/YYYY')

    return (
        <div className={styles.all}>
            <div>
                <p className={styles.p}>Commande passée le {dateOfOrder}</p>
            </div>
            <div>
                <p className={styles.p}>{myArticles.length} article(s)</p>
            </div>
            <div className={styles.right}>
                <p className={styles.p}>Pour un total de {total} €</p>
                <button className={styles.btn}>Voir plus</button>
            </div>
        </div>
    )
}