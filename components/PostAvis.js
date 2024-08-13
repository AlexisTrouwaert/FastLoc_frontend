import styles from '../styles/PostAvis.module.css'
import { Typography, Rating } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PostAvis(){

    const userInfo = useSelector((state) => state.users.value)
    const username = userInfo.name
    const token = userInfo.token
    console.log(userInfo)
    console.log('username',username)

    const [rating, setRating] = useState(0)
    const [avis, setAvis] = useState('')

    const handleRatingChange = (event , newValue) => {
        setRating(newValue);
    }

    const handleSendAvis = () => {
        fetch('http://localhost:3000/avis/send', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                rating : rating,
                message : avis,
                username : username,
                token : token,
                usernameTo : 'test'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    return(
        <div className={styles.all}>
                <div>
                    <p className={styles.titleSend}>Laisser un avis à ...</p>
                </div>
                <div className={styles.inputs}>
                    <div>
                        <Typography component="legend">Laisser une note :</Typography> 
                        <Rating
                            name="Avis"
                            value={rating}
                            onChange={handleRatingChange}
                            precision={0.5}
                            size="large"
                        />
                        <p>{rating} / 5</p>
                    </div>
                    <div>
                        <p>Laisser un avis :</p>
                        <textarea placeholder='Votre avis' className={styles.textArea} onChange={e => setAvis(e.target.value)}/>
                    </div>
                    <div>
                        <button className={styles.btnSend} onClick={() => handleSendAvis()}>Envoyer</button>
                    </div>
                </div>
            </div>
    )
}