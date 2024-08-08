import React, { useState } from 'react';
import { Container, Box, TextField, Slider, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowDown, faArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import styles from '../styles/Search.module.css';
import Header from './Header';

export default function Search() {
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [arrivalDate, setArrivalDate] = useState(dayjs().add(1, 'day'));

    // Recherche par tri
    const [rechercheArt, setRechercheArt] = useState('');
    const [listCroissant, setListCroissant] = useState('');
    const [results, setResults] = useState([]);
    const [erreur, setErreur] = useState('');

    // Recherche par filtre
    const [villeFiltre, setVilleFiltre] = useState('');
    const [noteFiltre, setNoteFiltre] = useState('');
    const [dateFiltre, setDateFiltre] = useState('');
    const [prixFiltre, setPrixFiltre] = useState('');
    const [etatFiltre, setEtatFiltre] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleInputChange = (event, index) => {
        const value = event.target.value === '' ? '' : Number(event.target.value);
        setPriceRange((prevRange) => {
            const newRange = [...prevRange];
            newRange[index] = value;
            return newRange;
        });
    };

    const handleBlur = () => {
        if (priceRange[0] < 0) {
            setPriceRange([0, priceRange[1]]);
        } else if (priceRange[1] > 1000) {
            setPriceRange([priceRange[0], 1000]);
        } else if (priceRange[0] > priceRange[1]) {
            setPriceRange([priceRange[1], priceRange[1]]);
        }
    };

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
                        <option value="decroissant">Prix Décroissant</option>
                    </select>
                    {erreur && <p>{erreur}</p>}
                </div>
                <div className={styles.divFiltre}>
                    <div className={styles.filtre}>
                        <p className={styles.p}>Filtrer par:</p>
                    </div>
                    <div className={styles.filtre}>
                        <button className={styles.btnLogo}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <p className={styles.p}>Villes</p>
                        <input type="text" placeholder="Ville" value={villeFiltre} onChange={(e) => setVilleFiltre(e.target.value)} className={styles.searchFilter} />
                    </div>
                    <div className={styles.filtre}>
                        <button className={styles.btnLogo}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                        <p className={styles.p}>Note</p>
                        <input type="text" placeholder="Note" value={noteFiltre} onChange={(e) => setNoteFiltre(e.target.value)} className={styles.searchFilter} />
                    </div>
                    <div className={styles.filtre}>
                        <button className={styles.btnLogo}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </button>
                        <p className={styles.p}>Date</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className={styles.calendar}>
                                <DatePicker
                                    label="Date de départ"
                                    value={departureDate}
                                    onChange={(newValue) => setDepartureDate(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DatePicker
                                    label="Date d'arrivée"
                                    value={arrivalDate}
                                    onChange={(newValue) => setArrivalDate(newValue)}
                                    minDate={departureDate} // Empêche de sélectionner une date d'arrivée avant la date de départ
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <div className={styles.filtre}>
                        <button className={styles.btnLogo}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </button>
                        <p className={styles.p}>Prix</p>
                        <Box sx={{ width: 300 }}>
                            <Typography id="range-slider" gutterBottom>
                                Plage de prix
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                aria-labelledby="range-slider"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    label="Prix min"
                                    value={priceRange[0]}
                                    onChange={(event) => handleInputChange(event, 0)}
                                    onBlur={handleBlur}
                                    inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 1000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    sx={{ width: '45%' }}
                                />
                                <TextField
                                    label="Prix max"
                                    value={priceRange[1]}
                                    onChange={(event) => handleInputChange(event, 1)}
                                    onBlur={handleBlur}
                                    inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 1000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    sx={{ width: '45%' }}
                                />
                            </Box>
                        </Box>
                    </div>
                    <div className={styles.filtre}>
                        <button className={styles.btnLogo}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </button>
                        <p className={styles.p}>État</p>
                        <input type="text" placeholder="État de l'Outil" value={etatFiltre} onChange={(e) => setEtatFiltre(e.target.value)} className={styles.searchFilter} />
                    </div>
                </div>
                <div className={styles.containerTwo}>
                    <div className={styles.containerArticles}>
                        {sortResults(results).map((article, index) => (
                            <div className={styles.articles} key={index}>
                                <h3 className={styles.p3}>{article.outil[0].categorie}</h3>
                                <p className={styles.p2}>Marque: {article.outil[0].brand}</p>
                                <p className={styles.p2}>Modèle: {article.outil[0].model}</p>
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