import React from 'react';
import Villes from './Villes';
import styles from '../styles/Search.module.css';
import SlidePrix from './SlidePrix';
import DatePickerOk from './DatePickerOk';
import TrierNote from './TrierNote';
import EtatOutil from './EtatOutil';
import { Box, Typography } from '@mui/material';

export default function Filters(props) {
    const {  city, radius, rating, toolState, departureDate, arrivalDate, priceRange, handleCityChange, handleRadiusChange, handleRatingChange, handleToolStateChange,
    handleSliderChange, handleInputChange, handleBlur, setDepartureDate, setArrivalDate } = props;

    return (
        <div className={styles.filtre}>
            <Box sx={{ maxWidth: 200, margin: 'auto', padding: 2 }}>
                <Villes
                    city={city}
                    radius={radius}
                    handleCityChange={handleCityChange}
                    handleRadiusChange={handleRadiusChange}
                />
                <TrierNote rating={rating} handleRatingChange={handleRatingChange} />
                <EtatOutil toolState={toolState} handleToolStateChange={handleToolStateChange} />
                <DatePickerOk
                    departureDate={departureDate}
                    arrivalDate={arrivalDate}
                    setDepartureDate={setDepartureDate}
                    setArrivalDate={setArrivalDate}
                />
                <SlidePrix
                    priceRange={priceRange}
                    handleSliderChange={handleSliderChange}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                />
            </Box>
        </div>
    );
}
