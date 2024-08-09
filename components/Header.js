import styles from '../styles/Header.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LogIn, LogOut } from '../reducers/users'
import { useRouter } from 'next/router'

export default function Header() {
    const dispatch = useDispatch()
    const router = useRouter()

    //variables pour la connexion persistante
    const user = useSelector((state) => state.users.value)
    const usernamePersist = user.name
    const tokenPersist = user.token

    
    //Etat qui gere le header
    const [connect, setConnect] = useState(false)

    //connexion à l'arriver sur le site prise en charge de la connexion persistante
    useEffect(() => {
        fetch(`http://localhost:3000/users/connexion/${usernamePersist}/${tokenPersist}`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                setConnect(!connect)
            }
        })
      }, []);

    //Etat qui gere la modal
    const [show, setShow] = useState(false)
    const [connexion, setConnexion] = useState(false)
    const [inscription, setInscription] = useState(false)
    const [next, setNext] = useState(false)

    //close la modal et remet les etat a false
    const handleCloseConnexion = () => {
        setShow(!show);
        setConnexion(!connexion)
        setError('')
    }

    //close la modal et remet les etat a false
    const handleCloseInscription = () => {
        setShow(!show);
        setInscription(!inscription)
        setError('')
    }

    //met l'etat connection à true pour afficher la modal qui correspond
    const handleShowConnection = () => {
        setShow(!show);
        setConnexion(!connexion)
    }

    //met l'etat inscription à true pour afficher la modal qui correspond
    const handleShowInscription = () => {
        setShow(!show);
        setInscription(!inscription)
    }

    //Recuprer inputs text si c'est une connexion
    const [coUsername, setCoUsername] = useState('')
    const [coPassword, setCoPassword] = useState('')


    //Recuprer inputs text si c'est une inscription
    const [insUsername, setInsUsername] = useState('')
    const [email, setEmail] = useState('')
    const [insPassword, setInsPassword] = useState('')
    //Si inscription avec google les champs nom et prenom seront remplis automatiquement
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')

    const [adresse, setAdresse] = useState('')
    const [ville, setVille] = useState('')

    let credential;
    let decoded;

    let google = (
        <GoogleLogin
        clientId='1046784655004-q5eet7kpn5ot4pamenvt1jdu5u9sdvse.apps.googleusercontent.com'
          onSuccess={credentialResponse => {
            credential = credentialResponse.credential
            console.log(credential)  
            decoded = jwtDecode(credential)
            setEmail(decoded.email)
            setInsPassword('eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjljNDA5Zjc3YTEwNmZiNjdlZTFhODVkMTY4ZmQyY2ZiN2MwYjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDQ2Nzg0NjU1MDA0LXE1ZWV0N2twbjVvdDRwYW1lbnZ0MWpkdTV1OXNkdnNlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA0Njc4NDY1NTAwNC1xNWVldDdrcG41b3Q0cGFtZW52dDFqZHU1dTlzZHZzZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwOTM5MTk0NjE5NTA1MDYyMDI5NyIsImVtYWlsIjoiYWxleGlzLnRyb3V3YWVydEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzIzMDE4MTA2LCJuYW1lIjoiQWxleGlzIFRyb3V3YWVydCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLM1Y0emRla0JhaE9tRkRUUEoyekZNWG01aDEzVFd4VG44Y2xKUXlkQlZnTnRycHc9czk2LWMiLCJnaXZlbl9uYW1lIjoiQWxleGlzIiwiZmFtaWx5X25hbWUiOiJUcm91d2FlcnQiLCJpYXQiOjE3MjMwMTg0MDYsImV4cCI6MTcyMzAyMjAwNiwianRpIjoiMDlmYjNlZWE5ZTY2MWYyOWEwZmZhMzM0Njg3ZjEwYjYwODQ0ODdhYSJ9.dF537BvACTfFlcGfUnc1MkRseNrMYcQY9feE-cmvCTjO31xL9tn1vjKzYSKtqL6Ts2lcL8EPWNc6Dm1PX4R5AMrn_Qw_xJUajjIRprSwtVXix5Q2iXF3II4UA9Eo_TJJBVORx4s_Zl702eD7wvpU2-gPMx2ApLWFX1lHiV4zZyOnIMMZk-dwKH0k-mmlS7al2WG28FB7sKOdCLVHnxy4VkooHeMPf9jgvu2Ak0Q6W3febFaBdPoBCP-f2gbBV948BhQkKZl7qfwJEURbetyoz1iHoPtxfCIK9ly0wCnwqNtj9NSK_Tb51Z_m1aQ1ewBsiAEWmK31QbBaFGAU07g1mg')
            setInsUsername(decoded.name)
            setNom(decoded.family_name)
            setPrenom(decoded.given_name)
            fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username : decoded.name, password : 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjljNDA5Zjc3YTEwNmZiNjdlZTFhODVkMTY4ZmQyY2ZiN2MwYjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDQ2Nzg0NjU1MDA0LXE1ZWV0N2twbjVvdDRwYW1lbnZ0MWpkdTV1OXNkdnNlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA0Njc4NDY1NTAwNC1xNWVldDdrcG41b3Q0cGFtZW52dDFqZHU1dTlzZHZzZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwOTM5MTk0NjE5NTA1MDYyMDI5NyIsImVtYWlsIjoiYWxleGlzLnRyb3V3YWVydEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzIzMDE4MTA2LCJuYW1lIjoiQWxleGlzIFRyb3V3YWVydCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLM1Y0emRla0JhaE9tRkRUUEoyekZNWG01aDEzVFd4VG44Y2xKUXlkQlZnTnRycHc9czk2LWMiLCJnaXZlbl9uYW1lIjoiQWxleGlzIiwiZmFtaWx5X25hbWUiOiJUcm91d2FlcnQiLCJpYXQiOjE3MjMwMTg0MDYsImV4cCI6MTcyMzAyMjAwNiwianRpIjoiMDlmYjNlZWE5ZTY2MWYyOWEwZmZhMzM0Njg3ZjEwYjYwODQ0ODdhYSJ9.dF537BvACTfFlcGfUnc1MkRseNrMYcQY9feE-cmvCTjO31xL9tn1vjKzYSKtqL6Ts2lcL8EPWNc6Dm1PX4R5AMrn_Qw_xJUajjIRprSwtVXix5Q2iXF3II4UA9Eo_TJJBVORx4s_Zl702eD7wvpU2-gPMx2ApLWFX1lHiV4zZyOnIMMZk-dwKH0k-mmlS7al2WG28FB7sKOdCLVHnxy4VkooHeMPf9jgvu2Ak0Q6W3febFaBdPoBCP-f2gbBV948BhQkKZl7qfwJEURbetyoz1iHoPtxfCIK9ly0wCnwqNtj9NSK_Tb51Z_m1aQ1ewBsiAEWmK31QbBaFGAU07g1mg'})
            })
            .then(response => response.json())
            .then(data => {
                if(data.result){
                    dispatch(LogIn({name :data.username, email: data.email, token : data.token}))
                    setShow(!show)
                    setConnect(!connect)
                    setInscription(false)
                    setConnexion(false)
                } else {
                    console.log('ok')
                    setInscription(!inscription)
                    setNext(!next)
                }
            })
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
    )

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [error, setError] = useState('')
    const [errorMail, setErrorMail] = useState ('')

    //Inscription
    const handleNext = () => {
        if(insPassword !== '' && insUsername !== ''){
            setError('')
                if(email.match(regex)){
                setErrorMail('')
                setInscription(!inscription)
                setNext(!next)
            } else {
                setError('Des champs sont manquants')
            }
        } else {
            setErrorMail("Le format de l'adresse mail est invalide")
        }
    }

    const handleSignUp = () => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)
        .then(response => response.json())
        .then(data => {
            let latitude = data.features[0].geometry.coordinates[1]
            let longitude = data.features[0].geometry.coordinates[0]
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username : insUsername, email : email, password : insPassword, nom : nom, prenom : prenom, adresse : adresse, ville : ville, latitude : latitude, longitude : longitude})
            })
            .then(response => response.json())
            .then(data => {
                if(data.result){
                    dispatch(LogIn({name :data.newuserInfos.username, email: data.newuserInfos.email, token : data.newuserInfos.token}))
                    setShow(!show)
                    setConnect(!connect)
                    setNext(!next)
                    console.log(data.newuserInfos)
                    setError('')
                    setErrorMail('')
                } else {
                    setError(data.error)
                }
            })
        })
    }

    //connexion
    const handleSignIn = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username : coUsername, password : coPassword})
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                dispatch(LogIn({name :data.username, email: data.email, token : data.token}))
                setShow(!show)
                setConnexion(!connexion)
                setConnect(!connect)
                setError('')
                setErrorMail('')
            } else {
                setError(data.error)
            }
        })
    }

    //deconnexion
    const handleLogOut = () => {
        router.push('/')
        dispatch(LogOut())
        setConnect(!connect)
        setNom('')
        setPrenom('')
        setAdresse('')
        setVille('')
    }

    //la modale change en fonction de si l'utilisateur s'inscrit ou se connecte
    if(inscription){
        modale = (<div className="App">
            <Modal show={show} onHide={handleCloseInscription} centered>
            <div className={styles.modaleAll}>
                <div className={styles.modaleHeader}>
                    <p className={styles.p}>Inscrivez-vous à Fast'Loc</p>
                </div>
                <p>{error}</p>
                <p className={styles.error}>{errorMail}</p>
                <div className={styles.inputs}>
                    <input type='text' placeholder="Nom d'utilisateur" onChange={e => setInsUsername(e.target.value)} className={styles.inputUnit}/>
                    <input type='text' placeholder="E-mail" onChange={e => setEmail(e.target.value)} className={styles.inputUnit}/>
                    <input type='password' placeholder='Mot de passe' onChange={e => setInsPassword(e.target.value)} className={styles.inputUnit}/>
                </div>
                <div className={styles.divBtnLogs}>
                    {google}
                    <button onClick={() => handleNext()} className={styles.btnLogs}>Suivant</button>
                </div>
            </div>
        </Modal>
        </div>)
    } else if (connexion) {
        modale = (<div className="App">
            <Modal show={show} onHide={handleCloseConnexion} centered>
            <div className={styles.modaleAll}>
                <div className={styles.modaleHeader}>
                    <p className={styles.p}>Connectez-vous à Fast'Loc</p>
                </div>
                <p>{error}</p>
                <div className={styles.inputs}>
                    <input type='text' placeholder="Nom d'utilisateur ou Email" onChange={e => setCoUsername(e.target.value)} className={styles.inputUnit}/>
                    <input type='password' placeholder='Mot de passe' onChange={e => setCoPassword(e.target.value)} className={styles.inputUnit}/>
                </div>
                <div className={styles.divBtnLogs}>
                {google}
                    <button onClick={() => handleSignIn()} className={styles.btnLogs}>Se connecter</button>
                </div>
            </div>
        </Modal>
        </div>)
    } else if (next) {
        modale = (<div className="App">
            <Modal show={show} onHide={handleCloseInscription} centered>
            <div className={styles.modaleAll}>
                <div className={styles.modaleHeader}>
                    <p className={styles.p}>Information supplémentaire</p>
                </div>
                <div className={styles.inputs}>
                    <input type='text' placeholder="Nom" onChange={e => setNom(e.target.value)} className={styles.inputUnit} value={nom}/>
                    <input type='text' placeholder="Prenom" onChange={e => setPrenom(e.target.value)} className={styles.inputUnit} value={prenom}/>
                    <input type='text' placeholder='Adresse' onChange={e => setAdresse(e.target.value)} className={styles.inputUnit} value={adresse}/>
                    <input type='text' placeholder='Ville' onChange={e => setVille(e.target.value)} className={styles.inputUnit} value={ville}/>
                </div>
                <div className={styles.divBtnLogs}>
                    <button onClick={() => handleSignUp()} className={styles.btnLogs}>S'inscrire</button>
                </div>
            </div>
        </Modal>
        </div>)
    }

    let modale;
    let btns;

    const handleMessages = () => {
        router.push('/messages')
    }

    const handleOrder = () => {
        router.push('/orders')
    }

    const handleProfil = () => {
        router.push('/profil')
    }

    const handleMain = () => {
        router.push('/')
    }

    //change le header en fonction de si l'utilisateur est connecter ou non
    if(!connect){
        btns = (
            <div>
                <button className={styles.btns} onClick={() => handleShowConnection()}>CONNEXION</button>
                <button className={styles.btnIns} onClick={() => handleShowInscription()}>INSCRIPTION</button>
            </div>
        )
    } else {
        btns = (
            <div>
                <button className={styles.btnsCmd} onClick={() => handleOrder()}>MES COMMANDES</button>
                <button className={styles.btns} onClick={() => handleMessages()}>MESSAGES</button>
                <button className={styles.btnIns} onClick={() => handleProfil()}>MON PROFIL</button>
                <button className={styles.btns} onClick={() => handleLogOut()}>DECONNEXION</button>
            </div>
        )
    }


    return (
        <div className={styles.all}>
            {modale}
            <div className={styles.header}>
                <div>
                    <img src='logo.png' alt='logo FastLoc' className={styles.logo} onClick={() => handleMain()}/>
                </div>
                {btns}
            </div>
        </div>
    )
}