import Header from './Header'
import styles from '../styles/CartDetail.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function CartDetail() {
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('article');
    const [erreur, setErreur] = useState('');
    const [userData, setUserData] = useState(null);  // Stocker les données utilisateur
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articleSecond, setArticleSecond] = useState(null);


    useEffect(() => {
        if (myParam) {
            fetch(`http://localhost:3000/users/cartDetail/${myParam}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("data : ", data);
                    if (data.length === 0) {
                        setErreur('Aucun article trouvé.');
                    } else {
                        setUserData(data.user);  // Stocker les données utilisateur
                        setArticleSecond(data.article) // Stocke les donnée articles, catégorie, model
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    setErreur('Erreur lors de la récupération des articles.');
                });
        }
    }, [myParam]);

    useEffect(() => {
        if (userData && myParam) {
            const foundArticle = userData.article.find(a => a._id === myParam);
            setSelectedArticle(foundArticle);

        }
    }, [userData, myParam]);

    if (erreur) {
        return <div className={styles.error}>{erreur}</div>;
    }

    if (!userData) {
        return <div className={styles.loading}>Chargement...</div>;
    }
    return (
        <div >
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.divPrincip}>
                <div className={styles.divSecond}>
                    <div className={styles.containerText}>
                        <h3 className={styles.h3}>Détail de l'article</h3>
                    </div>
                    <div className={styles.containerPhoInf}>
                        {selectedArticle ? (
                            <>
                                <div className={styles.photoDroite}>
                                    <img src={selectedArticle.urlPhoto || 'defaultOutil.jpg'} alt="Photo article" />
                                </div>
                                <div className={styles.infoDroite}>
                                    <div className={styles.articleprice}>
                                    <h2 className={styles.h2}>Articles :</h2>
                                        <p className={styles.p1}>{selectedArticle.outil[0].categorie} {selectedArticle.outil[0].brand}</p>
                                        <p className={styles.p1}>Prix: {selectedArticle.price}€</p>
                                    </div>
                                    <div className={styles.detailPrice}>
                                   <div className={styles.price}>
                                   <h2 className={styles.h2}>Tarif :</h2>
                                   <p className={styles.p1}>Tarif Articles: {selectedArticle.price}€</p>
                                   <p className={styles.p1}>Comission Fast'Loc: {selectedArticle.price}€</p>
                                   </div>
                                   <div className={styles.total}>
                                    <p className={styles.gras}>Total: </p>
                                </div>
                                   </div>
                                   </div>
                            </>
                        ) : (
                            <p>Aucun détail pour cet article.</p>
                        )}
                    </div>
                </div>
                                <div className={styles.bouton}>
                            <Stack spacing={2} direction="row">
                                <Button onClick={() => router.push(`/orders?article=${selectedArticle._id}`) }
                                 className={styles.btnArticle} variant="contained">Passer Commande </Button>
                            </Stack>
                                    </div>
            </div>
        </div>
    );
}