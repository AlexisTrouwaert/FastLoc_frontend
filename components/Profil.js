import Header from './Header'
import styles from '../styles/Profil.module.css'
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

export default function Profil() {

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/profil/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            
        })
    }, [])

    return(
        <div className={styles.all}>
            <div>
                <Header/>
            </div>
            <div className={styles.content}>
                <div className={styles.up}>
                    <div className={styles.tileInfos}>
                        <div className={styles.headerInfos}>
                            <img src='default.png' alt='Photo de profil' className={styles.Pp}/>
                            <div>
                                <p className={styles.pName}></p>
                                <p className={styles.pNameF}></p>
                            </div>
                        </div>
                        <div>
                            <p>Ville : Paris</p>
                            <p>Membre depuis le : </p>
                            <p>Temps de réponse moyen : 30min</p>
                        </div>
                        <div>
                            <div>
                                <p>Note loueur :</p>
                                <p>etoiles</p>
                            </div>
                            <div>
                                <p>Note locataire :</p>
                                <p>etoiles</p>
                            </div>
                            <button className={styles.edit} onClick={() => handleEdit()}>Éditer mon profil</button>
                        </div>
                    </div>
                    <div className={styles.avisAndSearch}>
                        <div className={styles.avis}>

                        </div>
                        <div className={styles.divSearch}>
                            <input type='text' placeholder='Recherchez parmis vos articles en location' className={styles.searchB}/>
                            <button 
                                className={styles.btnSearch}
                                onClick={() => handleSearch()}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.divtools}>
                    <div className={styles.innerTool}>

                    </div>
                </div>
            </div>
        </div>
    )
}