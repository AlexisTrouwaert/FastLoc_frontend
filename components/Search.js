
import React, { useState } from 'react';
import styles from '../styles/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Header from './Header';
import Button from '@mui/material/Button';
import Filtres from './Filtres';
import Villes from './Villes';
import SlidePrix from './SlidePrix';
import DatePickerOk from './DatePickerOk';
import TrierNote from './TrierNote';
import EtatOutil from './EtatOutil';
import { Container, TextField, Slider, Rating, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { faMagnifyingGlass, faArrowDown, faArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    const [city, setCity] = useState('');
    const [radius, setRadius] = useState('');
    const [rating, setRating] = useState(0);
    const [toolState, setToolState] = useState('');
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [arrivalDate, setArrivalDate] = useState(dayjs().add(1, 'day'));
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [rechercheArt, setRechercheArt] = useState('');
    const [listCroissant, setListCroissant] = useState('');
    const [results, setResults] = useState([]);
    const [erreur, setErreur] = useState('');
    //const [activeFilter, setActiveFilter] = useState(false)


    //const handleFilterClick = (filter) => { setActiveFilter(prevFilter => (prevFilter === filter ? '' : filter)); };



    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleRadiusChange = (event) => {
        setRadius(event.target.value);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleToolStateChange = (event) => {
        setToolState(event.target.value);
    };

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
                        onClick={() => handleSearch()}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                    {erreur && <p>{erreur}</p>}
                </div>
                <div className={styles.divPrincip}>
                    <div className={styles.divFiltre}>
                        <div className={styles.filtre}>
                            <p className={styles.p}>Filtrer par:</p>
                        </div>
                        <div className={styles.filtre}>
                            <Villes
                                city={city}
                                radius={radius}
                                handleCityChange={handleCityChange}
                                handleRadiusChange={handleRadiusChange}
                            />
                        </div>
                        <div className={styles.filtre}>
                            <SlidePrix 
                                priceRange={priceRange}
                                handleSliderChange={handleSliderChange}
                                handleInputChange={handleInputChange}
                                handleBlur={handleBlur}
                            />
                        </div>
                        <div className={styles.filtre}>
                            <DatePickerOk
                                departureDate={departureDate}
                                arrivalDate={arrivalDate}
                                setDepartureDate={setDepartureDate}
                                setArrivalDate={setArrivalDate}
                            />
                        </div>
                        <div className={styles.Note}>
                            <TrierNote
                                rating={rating}
                                handleRatingChange={handleRatingChange}
                            />
                        </div>
                        <div className={styles.filtre}>
                            <EtatOutil 
                                toolState={toolState}
                                handleToolStateChange={handleToolStateChange}
                            />
                        </div>
                                </div>
                        <div className={styles.containerTwo}>
                            <div className={styles.containerArticles}>
                                <div className={styles.tri}>
                            <select value={listCroissant} onChange={(e) => setListCroissant(e.target.value)}>
                                <option value="">Sélectionner le tri</option>
                                <option value="croissant">Prix Croissant</option>
                                <option value="decroissant">Prix Décroissant</option>
                            </select>
                            </div>
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
        </div>
    );
}