import styles from '../styles/Header.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LogIn, LogOut } from '../reducers/users'

export default function Header() {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.users.value)

    //Etat qui gere le header
    const [connect, setConnect] = useState(false)

    //Etat qui gere la modal
    const [show, setShow] = useState(false)
    const [connexion, setConnexion] = useState(false)
    const [inscription, setInscription] = useState(false)

    //close la modal et remet les etat a false
    const handleCloseConnexion = () => {
        setShow(!show);
        setConnexion(!connexion)
    }

    //close la modal et remet les etat a false
    const handleCloseInscription = () => {
        setShow(!show);
        setInscription(!inscription)
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

    //Inscription / connexion Google
    const [verifMail, setVerifMail] = useState(false)
    const [decod, setDecod] = useState({})

    let credential;
    let decoded;

    let google = (
        <GoogleLogin
        clientId='1046784655004-q5eet7kpn5ot4pamenvt1jdu5u9sdvse.apps.googleusercontent.com'
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            credential = credentialResponse.credential
            console.log(credential)  
            decoded = jwtDecode(credential)
            console.log('decoded', decoded)
            setVerifMail(decoded.email_verified)
            setDecod(decoded)
            setShow(!show)
            dispatch(LogIn({name : decoded.name, email: decoded.email, token: null}))
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
    const handleSignUp = () => {
        if(email.match(regex)){
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username : insUsername, email : email, password : insPassword})
            })
            .then(response => response.json())
            .then(data => {
                if(data.result){
                    dispatch(LogIn({name :data.newuserInfos.username, email: data.newuserInfos.email, token : data.newuserInfos.token}))
                    setShow(!show)
                    setConnect(!connect)
                } else {
                    setError(data.error)
                }
            })
        } else {
            setErrorMail("Le format de l'adresse mail est invalide")
        }
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
                dispatch(LogIn({name :data.newuserInfos.username, email: data.newuserInfos.email, token : data.newuserInfos.token}))
                setShow(!show)
            } else {
                setError(data.error)
            }
        })
    }

    //deconnexion
    const handleLogOut = () => {
        dispatch(LogOut())
        setConnect(!connect)
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
                    <button onClick={() => handleSignUp()} className={styles.btnLogs}>S'inscrire</button>
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
    }

    let modale;
    let btns;

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
                <button className={styles.btnsCmd} >MES COMMANDES</button>
                <button className={styles.btns} >MESSAGES</button>
                <button className={styles.btnIns} >MON PROFIL</button>
                <button className={styles.btns} onClick={() => handleLogOut()}>DECONNEXION</button>
            </div>
        )
    }


    return (
        <div className={styles.all}>
            {modale}
            <div className={styles.header}>
                <div>
                    <img src='logo.png' alt='logo FastLoc' className={styles.logo}/>
                </div>
                {btns}
            </div>
        </div>
    )
}