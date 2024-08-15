import { useEffect, useState } from 'react'
import styles from '../styles/OrdersDetail.module.css'
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function Cart () {

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    const [finishArticles, setCartArticles] = useState([])
    const [myArticles, setMyArticles] = useState([])
    const [date, setDate] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/orders/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            let allOrders = data.data[0].Orders
            for(let i of allOrders){
                if(i.Finish){
                    setDate(i.Date)
                    setCartArticles(i.article)
                }
            }
            if(finishArticles !== undefined && !loading){
                setLoading(!loading)
            }
        })
        .then(() =>{
            if(loading){
                fetch(`http://localhost:3000/users/detailArticles/${finishArticles[0]}`)
                .then(response => response.json())
                .then(data => {
                    let myArticlesFinish = []
                    for (let i of data.data){
                        console.log(finishArticles.length)
                        for (let j = 0; j < finishArticles.length; j++){
                            if(i._id.includes(finishArticles[j])){
                                myArticlesFinish.push(i)
                            }
                        }
                    }
    
                    setMyArticles(myArticlesFinish)
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