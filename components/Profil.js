import Header from './Header'
import styles from '../styles/Profil.module.css'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

export default function Profil() {

    const [datauser, setDataUser] = useState([])
    const [date, setDate] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setprenom] = useState('')
    const [city, setCity] = useState('')

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/profil/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            setDataUser(data)
            setCity(data.data.addresse.city)
            setNom(data.data.firstName)
            setprenom(data.data.name)
            setDate(data.date)
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
                                <p className={styles.pName}>{nom}</p>
                                <p className={styles.pNameF}>{prenom}</p>
                            </div>
                        </div>
                        <div className={styles.middleInfos}>
                            <p className={styles.p}>Ville : {city}</p>
                            <p className={styles.p}>Membre depuis le : {date}</p>
                            <p className={styles.p}>Temps de réponse moyen : 30min</p>
                        </div>
                        <div className={styles.divNote}>
                            <div>
                                <p className={styles.p}>Note loueur : 4</p>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                                <p className={styles.p}>Note locataire : 3</p>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'}/>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
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