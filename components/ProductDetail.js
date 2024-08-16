import Header from './Header';
import styles from '../styles/ProductDetail.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ProductDetail() {
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('article');
    const [erreur, setErreur] = useState('');
    const [userData, setUserData] = useState(null);  // Stocker les données utilisateur
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articleSecond, setArticleSecond] = useState(null);
    
    useEffect(() => {
        if (myParam) {
            fetch(`http://localhost:3000/users/detailArticles/${myParam}`)
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
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.divPrincip}>
                <div className={styles.containerDroite}>
                    <div className={styles.hautDroite}>
                        <div className={styles.photoUser}>
                            <img src={userData.url || 'default.png'} alt="Photo utilisateur" />
                        </div>
                        <div className={styles.nomUser}>
                            <p className={styles.p1}>{userData.firstName} {userData.name}</p>
                        </div>
                    </div>
                    <div className={styles.btnProfil}>
                            <Stack spacing={2} direction="row">
                                <Button onClick={() => router.push(`/profil?users=${userData._id}`) } className={styles.btnProfil} variant="contained">Voir le Profil de {userData.firstName} </Button>
                            </Stack>
                                    </div>
                    <div className={styles.centreDroite}>
                        <p className={styles.p1}>VILLE: {userData.addresse.city}</p>
                        <p className={styles.p1}>Membre depuis le: {new Date(userData.date).toLocaleDateString()}</p>
                        <p className={styles.p1}>Dernière Connexion: {new Date(userData.date).toLocaleDateString()}</p>
                        {/* <p className={styles.p1}>Dernière location effectuée: Le 14/08/2024</p> */}
                    </div>
                    <div className={styles.noteDroite}>
                        <p className={styles.p1}>Note Loueur: {userData.noteLou}</p>
                    </div>
                    <div className={styles.noteDroite}>
                        <p className={styles.p1}>Note Locataire: {userData.noteLoc}</p>
                    </div>
                </div>
                <div className={styles.containerGauche}>
                    <div className={styles.containerHautGauche}>
                        <div className={styles.containerText}>
                            <h3 className={styles.h3}>Détail de L'article</h3>
                        </div>
                        <div className={styles.containerPhoInf}>
                            {selectedArticle ? (
                                <>
                                    <div className={styles.photoDroite}>
                                        <img src={selectedArticle.urlPhoto || 'defaultOutil.jpg'} alt="Photo article" />
                                    </div>
                                    <div className={styles.infoDroite}>
                                        <div>
                                        <p className={styles.p1}>Catégorie: {selectedArticle.outil[0].categorie}</p>
                                        <p className={styles.p1}>Marque: {selectedArticle.outil[0].brand}</p>
                                        <p className={styles.p1}>Model: {selectedArticle.outil[0].model}</p>
                                        <p className={styles.p1}>État: {selectedArticle.etat}</p>
                                        <p className={styles.p1}>Prix: {selectedArticle.price}€</p>
                                        <p className={styles.p1}>Disponible: {selectedArticle.isAvailable ? 'Oui' : 'Non'}</p>
                                        </div>
                                        <div className={styles.btn}>
                            <Stack spacing={2} direction="row">
                                <Button  onClick={() => router.push(`/cartDetail?article=${selectedArticle._id}`)                }
                    className={styles.btnCommande} variant="contained">Commander cet Article</Button>
                            </Stack>
                                </div>
                                    </div>
                                  

                                </>
                            ) : (
                                <p>Aucun détail pour cet article.</p>
                            )}

                        </div>
                    </div>
                    <div className={styles.containerbasGauche}>
                        <div className={styles.containerText}>
                            <h3>Autres articles de l'utilisateur</h3>
                        </div>
                        <div className={styles.containerPhoInf}>
                            {userData.article
                                .filter(a => a._id !== selectedArticle?._id)  // alexis ca exlu 'article  selectionné
                                .map((articleData, index) => (
                                    <div key={index} className={styles.artUser}>
                                        {console.log(articleData)}

                                        <div className={styles.articlePhoto}>
                                            <img src={articleData.urlPhoto || 'defaultOutil.jpg'} alt="Photo article" />
                                        </div>
                                        <div className={styles.articleInfo}>
                                            <p className={styles.p1}>Catégorie: {articleData.outil[0].categorie}</p>
                                            <p className={styles.p1}>État: {articleData.etat}</p>
                                            <p className={styles.p1}>Prix: {articleData.price}€</p>
                                            <p className={styles.p1}>Disponible: {articleData.isAvailable ? 'Oui' : 'Non'}</p>
                                        </div>
                                        <div >
                            <Stack spacing={2} direction="row">
                                <Button onClick={() => router.push(`/productDetail?article=${articleData._id}`) }
                                 className={styles.btnArticle} variant="contained">Voir L'Article </Button>
                            </Stack>
                                    </div>
                                    </div>
                                ))}
                            <div className={styles.artUser}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
