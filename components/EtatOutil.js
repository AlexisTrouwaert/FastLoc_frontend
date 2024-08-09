import React from 'react';
import styles from '../styles/Search.module.css';

import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

export default function EtatOutil({ toolState, handleToolStateChange }) {
    const states = ["Neuf", "Bon état", "État moyen"];

    return (
        <div className={styles.filtre}>
        <TextField sx={{ '& .MuiOutlinedInput-root': { 
        border: '2px solid #FEBD59'}}}
        className={styles.etat}
            select
            label="État de l'outil"
            value={toolState}
            onChange={handleToolStateChange}
            fullWidth
        >
            {states.map((state, index) => (
                <MenuItem key={index} value={state}>
                    {state}
                </MenuItem>
            ))}
        </TextField>
        </div>
    );
}
