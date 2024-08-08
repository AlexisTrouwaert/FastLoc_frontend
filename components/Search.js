import React, { useState } from 'react';
import { Container } from '@mui/material';
import styles from '../styles/Search.module.css';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowDown, faArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    //Recherche par tri 
    const [rechercheArt, setRechercheArt] = useState('');
    const [listCroissant, setListCroissant] = useState('');
    const [results, setResults] = useState([]);
    const [erreur, setErreur] = useState('');

    //Recherche par filtre 
    const [villeFiltre, setVilleFiltre] = useState('');
    const [noteFiltre, setNoteFiltre] = useState('');
    const [dateFiltre, setDateFiltre] = useState('');
    const [prixFiltre, setPrixFiltre] = useState('');
    const [etatFiltre, setEtatFiltre] = useState('');

    const handleSearch = async () => {
        try {
            let url = `http://localhost:3000/users/search/${rechercheArt}`;
            if (listCroissant) {
                url += `?sort=${listCroissant}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data.result) {
                const DataOk = sortResults(data.data);
                setResults(DataOk);
            } else {
                setErreur(data.error);
            }
        } catch (error) {
            console.error('mauvais lien:', error);
            setErreur('Erreur aucune data.');
        }
    };

    const sortResults = (articles) => {
        if (listCroissant === 'croissant') {
            return articles.sort((a, b) => a.price - b.price);
        } else if (listCroissant === 'decroissant') {
            return articles.sort((a, b) => b.price - a.price);
        }
        return articles;
    };

    const Filters = (articles) => {
        return articles.filter(article => {
            return (
                (!villeFiltre || article.outil[0].ville.includes(villeFiltre)) &&
                (!noteFiltre || article.note === (noteFiltre)) &&
                (!dateFiltre || article.date === dateFiltre) &&
                (!prixFiltre || article.price === (prixFiltre)) &&
                (!etatFiltre || article.etat.includes(etatFiltre))
            );
        });
    };

    // Creer Btn Filtre par Ville
    const [fCity, setFCity] = useState(false)

    let filters;

    if (fCity) {
        filters = (
            <div>
                <input type="text" placeholder="Ville" value={villeFiltre} onChange={(e) => setVilleFiltre(e.target.value)} className={styles.search} />
            </div>
        );
    } else {
        filters = (<div></div>);
    }

    const handleFilterCity = () => {
        setFCity(!fCity);
    };

    // Creer Btn Filtre par Note
    const [fNote, setFNote] = useState(false)

    let note;

    if (fNote) {
        note = (
            <div>
                <input type="text" placeholder="Note" value={noteFiltre} onChange={(e) => setNoteFiltre(e.target.value)} className={styles.search} />
            </div>
        );
    } else {
        note = (<div></div>);
    }

    const handleFilterNote = () => {
        setFNote(!fNote);
    };

    // Creer Btn Date 
    const [fDate, setFDate] = useState(false)

    let date;

    if (fDate) {
        date = (
            <div>
                <input type="text" placeholder="Date" value={dateFiltre} onChange={(e) => setDateFiltre(e.target.value)} className={styles.search} />
            </div>
        );
    } else {
        date = (<div></div>);
    }

    const handleFilterDate = () => {
        setFDate(!fDate);
    };

    // Creer Btn Prix 
    const [fPrix, setFPrix] = useState(false)

    let prix;

    if (fPrix) {
        prix = (
            <div>
                <input type="text" placeholder="Prix" value={prixFiltre} onChange={(e) => setPrixFiltre(e.target.value)} className={styles.search} />
            </div>
        );
    } else {
        prix = (<div></div>);
    }

    const handleFilterPrice = () => {
        setFPrix(!fPrix);
    };

    // Creer Btn Etat 
    const [fEtat, setFEtat] = useState(false)

    let etat;

    if (fEtat) {
        etat = (
            <div>
                <input type="text" placeholder="Etat de l'Outil" value={etatFiltre} onChange={(e) => setEtatFiltre(e.target.value)} className={styles.search} />
            </div>
        );
    } else {
        etat = (<div></div>);
    }

    const handleFilterEtat = () => {
        setFEtat(!fEtat);
    };

    return (
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.container}>
                <div className={styles.divSearch}>
                    <input
                        onChange={(e) => setRechercheArt(e.target.value)}
                        type='text'
                        placeholder='Recherchez un outil'
                        className={styles.search}
                    />
                    <button
                        className={styles.btnSearch}
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <select value={listCroissant} onChange={(e) => setListCroissant(e.target.value)}>
                        <option value="">Sélectionner le tri</option>
                        <option value="croissant">Prix Croissant</option>
                        <option value="decroissant">Prix Decroissant</option>
                    </select>
                    {erreur && <p>{erreur}</p>}
                </div>
                <div className={styles.divFiltre}>
                    <div className={styles.filtre}>
                        <p className={styles.p}>Filtrer par:</p>
                    </div>
                    <div>
                        <div className={styles.filtre}>
                            <button className={styles.btnLogo}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <p className={styles.p}>Villes</p>
                            <input type="text" placeholder="Ville" value={prixFiltre} onChange={(e) => setVilleFiltre(e.target.value)} className={styles.searchFilter} />

                        {filters}
                        </div>
                    </div>
                    <div>
                        <div className={styles.filtre} >
                            <button className={styles.btnLogo}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                            <p className={styles.p}>Note</p>
                            <input type="select" placeholder="Note" value={noteFiltre} onChange={(e) => setNoteFiltre(e.target.value)} className={styles.searchFilter} />

                        {note}
                        </div>
                    </div>
                    <div>
                        <div className={styles.filtre}>
                            <button className={styles.btnLogo}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </button>
                            <p className={styles.p}>Date</p>
                            <input type="Date" placeholder="Date" value={dateFiltre} onChange={(e) => setDateFiltre(e.target.value)} className={styles.searchFilter} />
                        {date}
                        </div>
                    </div>
                    <div>
                        <div className={styles.filtre}>
                            <button className={styles.btnLogo}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </button>
                            <p className={styles.p}>Prix</p>
                            <input type="Number" placeholder="Prix" value={prixFiltre} onChange={(e) => setPrixFiltre(e.target.value)} className={styles.searchFilter} />

                        {prix}
                        </div>
                    </div>
                    <div>
                        <div className={styles.filtre}>
                            <button className={styles.btnLogo}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </button>
                            <p className={styles.p}>Etats</p>
                            <input type="Etats" placeholder="Etats" value={etatFiltre} onChange={(e) => setEtatFiltre(e.target.value)} className={styles.searchFilter} />

                        {etat}
                        </div>
                    </div>
                </div>
               
                <div className={styles.containerTwo}>
                    <div className={styles.containerArticles}>
                        {sortResults(results).map((article, index) => (
                            <div className={styles.articles} key={index}>
                                <h3 className={styles.p3}>{article.outil[0].categorie}</h3>
                                <p className={styles.p2}>Marque: {article.outil[0].brand}</p>
                                <p className={styles.p2}>Modele: {article.outil[0].model}</p>
                                <p className={styles.p2}>Prix: {article.price}</p>
                                <p className={styles.p2}>Note: {article.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}