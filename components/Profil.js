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
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    let [userNfo, setUserNfo] = useState({})
    const [Ins, setIns] = useState('')
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [adresse, setAdresse] = useState('')
    const [postal, setpostal] = useState('')
    const [city, setCity] = useState('')


    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/profil/${username}/${token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUserNfo(userNfo = data)
            console.log('test',userNfo)
            setPrenom(data.data.firstName)
            setNom(data.data.name)
            setIns(moment(data.data.date).format('MM/DD/YYYY'))
            if(data.data.name === 'empty'){
                setShow(!show)
            }
            console.log(show)
        })
    }, [])

    const handleConfirm = () => {
        fetch('http://localhost:3000/updateProfil/')
    }
    
    let modal = (
        <Modal show={show} centered>
            <div>
                <p>Veuillez remplir vos données de profil</p>
            </div>
            <div>
                <input type='text' placeholder='Prénom' onChange={(e) => setPrenom(e.target.value)} value={prenom}/>
                <input type='text' placeholder='Nom' onChange={(e) => setNom(e.target.value)} value={nom}/>
                <input type='text' placeholder='Adresse' onChange={(e) => setAdresse(e.target.value)} value={adresse}/>
                <div>
                    <input type='text' placeholder='Ville' onChange={(e) => setCity(e.target.value)} value={city}/>
                    <input type='text' placeholder='Code postal' onChange={(e) => setpostal(e.target.value)} value={postal}/>
                </div>
            </div>
            <button onClick={() => handleConfirm()}>
                Confirmer
            </button>
        </Modal>
    )
    return(
        <div className={styles.all}>
            <div>
                <Header/>
            </div>
            {modal}
            <div className={styles.content}>
                <div className={styles.up}>
                    <div className={styles.tileInfos}>
                        <div className={styles.headerInfos}>
                            <img src='default.png' alt='Photo de profil' className={styles.Pp}/>
                            <div>
                                <p className={styles.pName}>{prenom}</p>
                                <p className={styles.pNameF}>{nom}</p>
                            </div>
                        </div>
                        <div>
                            <p>Ville : Paris</p>
                            <p>Membre depuis le : {Ins}</p>
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
                            <button className={styles.edit}>Éditer mon profil</button>
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