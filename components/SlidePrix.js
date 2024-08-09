import React from 'react';
import styles from '../styles/Search.module.css';

import { Box, Typography, Slider, TextField } from '@mui/material';

export default function SlidePrix({ priceRange, handleSliderChange, handleInputChange, handleBlur }) {
    return (

        <div className={styles.filtre}>
        <Box sx={{ '& .MuiOutlinedInput-root': { 
        border: '2px solid #FEBD59'}}}>
            <div className={styles.divPrix} >
            <TextField className={styles.cadrePrix}
                label="Prix Min"
                value={priceRange[0]}
                onChange={(e) => handleInputChange(e, 0)}
                onBlur={handleBlur}
                inputProps={{ type: 'number' }}
            />
            <Slider className={styles.slider}
                value={priceRange} onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
            />
            <TextField className={styles.cadrePrix}
                label="Prix Max"
                value={priceRange[1]}
                onChange={(e) => handleInputChange(e, 1)}
                onBlur={handleBlur}
                inputProps={{ type: 'number' }}
            />
            </div>
        
        </Box>
        </div>
    );
}

