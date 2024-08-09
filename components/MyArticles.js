import styles from '../styles/MyArticles.module.css'
import { useState, useEffect } from 'react';

export default function MyArticles (props) {

    let articles = props.outildata && props.outildata[0].map((data, i) => {
        let url = data.urlPhoto
        return(
            <div key={i} className={styles.all}>
                <div styles={{backgroundImage : `${url}`, backgroundSize : 'cover', backgroundRepeat : 'no-repeat', backgroundPosition : 'center'}}>
                    {/* <img src={data.urlPhoto} alt="image de l'outil" className={styles.img}/> */}
                </div>
                <div>
                    <p>{data.outil[0].categorie}</p>
                </div>
                <div>
                    <p>{data.outil[0].brand}</p>
                    <p>{data.etat}</p>
                </div>
                <div>
                    <p>Prix {data.price}€ la journée</p>
                </div>
                <div>
                    <button>Modifier</button>
                </div>
            </div>
        )
    })
    return (
        <>
            {articles}
        </>
        
    )
}