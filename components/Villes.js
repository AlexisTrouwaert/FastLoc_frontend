import React from 'react';
import styles from '../styles/Search.module.css';

import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material';


export default function Ville({ city, radius, handleCityChange, handleRadiusChange }) {
    const cities = ["Paris", "Marseille", "Lyon", "Bordeaux", "Rennes", "Lille"];

    return (
        <div className={styles.filtre}>
        <Box sx={{ maxWidth: 150, padding: 2, '& .MuiOutlinedInput-root': { 
        border: '2px solid #FEBD59'}}} >
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="city-label">Ville</InputLabel>
                <Select
                    labelId="city-label"
                    value={city}
                    label="Ville"
                    onChange={handleCityChange}
                >
                    {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Rayon Km "
                type="number"
                value={radius}
                onChange={handleRadiusChange}
                inputProps={{ min: 0 }}
            />
        </Box>
        </div>
    );
}