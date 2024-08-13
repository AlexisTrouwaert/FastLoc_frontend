import React from 'react';
import styles from '../styles/Search.module.css';

import { Typography, Rating } from '@mui/material';

export default function TrierNote({ rating, handleRatingChange }) {
    return (
        <div className={styles.filtre}>
           <div className={styles.Note} > 
                <Typography component="legend">Trier par Note</Typography>
                <Rating
                    name="Trier"
                    value={rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    size="large"
                />
            </div>
        </div>
    );
}