import { useSelector } from 'react-redux';
import styles from '../styles/MyArticles.module.css'
import { useState, useEffect } from 'react';


export default function MyArticles (props) {

    const handleSuppress = (id) => {
        fetch(`http://localhost:3000/users/deleteArt/${id}/${props.username}/${props.token}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                props.functionR()
            }
        })
    }

    let articles = props.outildata && props.outildata[0].map((data, i) => {
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
                        <button className={styles.edit} onClick={() => handleSuppress(data._id)}>Supprimer</button>
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