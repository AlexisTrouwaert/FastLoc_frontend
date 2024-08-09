import styles from '../styles/MyArticles.module.css'
import { useState, useEffect } from 'react';

export default function MyArticles (props) {

    let articles = props.outildata && props.outildata[0].map((data, i) => {
        let url = data.urlPhoto
        return(
            <div key={i} className={styles.all}>
                    <div className={styles.imgD}>
                        <img src={data.urlPhoto} alt="photo de l'outil" className={styles.img}/>
                    </div>
                    <div className={styles.categorie}>
                        <p className={styles.p}>{data.outil[0].categorie}</p>
                    </div>
                    <div className={styles.marg}>
                        <p className={styles.p}>{data.outil[0].brand}</p>
                        <p className={styles.p}>{data.outil[0].model}</p>
                        <p className={styles.p}>{data.etat}</p>
                    </div>
                    <div className={styles.marg}>
                        <p className={styles.p}>Prix {data.price}€ la journée</p>
                    </div>
                    <div className={styles.divBtn}>
                        <button className={styles.edit}>Modifier</button>
                        <button className={styles.edit}>Supprimer</button>
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