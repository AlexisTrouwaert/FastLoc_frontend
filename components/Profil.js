import Header from './Header'
import styles from '../styles/Profil.module.css'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

export default function Profil() {
    const formData = new FormData();

    const [show, setShow] = useState(false)

    const [date, setDate] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setprenom] = useState('')
    const [city, setCity] = useState('')
    const [adresse, setAdresse] = useState('')
    const [url, setUrl] = useState('')
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token

    useEffect(() => {
        fetch(`http://localhost:3000/users/profil/${username}/${token}`)
            .then(response => response.json())
            .then(data => {
                setCity(data.data.addresse.city)
                setNom(data.data.name)
                setprenom(data.data.firstName)
                setDate(data.date)
                setAdresse(data.data.addresse.adresse)
                setUrl(data.data.url)
            })
    }, [])

    const handleEdit = () => {
        setShow(!show)
        setEdit(!edit)
    }

    const handleCloseEdit = () => {
        setShow(!show)
        setEdit(!edit)
    }

    const handleCloseAdd = () => {
        setShow(!show)
        setAdd(!add)
    }

    const handleApply = () => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)
            .then(response => response.json())
            .then(data => {
                let latitude = data.features[0].geometry.coordinates[1]
                let longitude = data.features[0].geometry.coordinates[0]
                formData.append('file', file);
                formData.append('upload_preset', 'ob3welwd')
                fetch('https://api.cloudinary.com/v1_1/dtdjgn5ka/image/upload',
                    {
                        method: "POST",
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.url) {
                            setUrl(data.url)
                        }
                        fetch('http://localhost:3000/users/profil/edit', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                username: username,
                                token: token,
                                nom: nom,
                                prenom: prenom,
                                adresse: adresse,
                                city: city,
                                latitude: latitude,
                                longitude: longitude,
                                url: data.url
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.result) {
                                    setShow(!show)
                                }
                            })
                    })
            })
    }

    const [filename, setFilename] = useState('')
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    };

    const handleAdd = () => {
        setShow(!show)
        setAdd(!add)
    }

    if(edit){
        modal = (<div className="App">
            <Modal show={show} onHide={handleCloseEdit} centered>
                <div className={styles.modaleAll}>
                    <div className={styles.modaleHeader}>
                        <p className={styles.p}>Editez votre profil</p>
                    </div>
                    <div>
                        <input type='file' accept="image/png" onChange={handleFileChange} className={styles.file}/>
                    </div>
                    <div className={styles.inputs}>
                        <input type='text' placeholder="Nom" onChange={e => setNom(e.target.value)} className={styles.inputUnit} value={nom}/>
                        <input type='text' placeholder="Prenom" onChange={e => setprenom(e.target.value)} className={styles.inputUnit} value={prenom} />
                        <input type='text' placeholder='Adresse' onChange={e => setAdresse(e.target.value)} className={styles.inputUnit} value={adresse} />
                        <input type='text' placeholder='Ville' onChange={e => setCity(e.target.value)} className={styles.inputUnit} value={city} />
                    </div>
                    <div>
                        <button onClick={() => handleApply()} className={styles.btnLogs}>Appliquer les modifications</button>
                    </div>
                </div>
            </Modal>
        </div>)
    } else if (add) {
        modal = (<div className='App'>
            <Modal show={show} onHide={handleCloseAdd} centered>
                <div>
                    
                </div>
            </Modal>
        </div>)
    }

    let modal;

    return (
        <div className={styles.all}>
            {modal}
            <div>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.up}>
                    <div className={styles.tileInfos}>
                        <div className={styles.headerInfos}>
                            <img src={url} alt='Photo de profil' className={styles.Pp} />
                            <div>
                                <p className={styles.pName}>{prenom}</p>
                                <p className={styles.pNameF}>{nom}</p>
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
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>
                                <p className={styles.p}>Note locataire : 3</p>
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
                                <FontAwesomeIcon icon={faStar} color={'#FEBD59'} />
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
                            <input type='text' placeholder='Recherchez parmis vos articles en location' className={styles.searchB} />
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
                        <div className={styles.divAddArticle} onClick={() => handleAdd()}>
                            <div className={styles.divPlus}>
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#FEBD59" }} className={styles.plus} />
                            </div>
                            <p className={styles.add}>Ajouter un article</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}