import React from 'react';
import styles from '../styles/Search.module.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function DatePickerOk({ departureDate, arrivalDate, setDepartureDate, setArrivalDate }) {
    return (
            <div className={styles.filtre} >
        <LocalizationProvider dateAdapter={AdapterDayjs} >
       <div className={styles.calendar} >
                <DatePicker className={styles.marge } sx={{ '& .MuiOutlinedInput-root': { 
        border: '2px solid #FEBD59'}}}
                    label="Date de départ"
                    value={departureDate}
                    onChange={(newValue) => setDepartureDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker className={styles.marge} sx={{ '& .MuiOutlinedInput-root': { 
        border: '2px solid #FEBD59'}}}
                    label="Date d'arrivée"
                    value={arrivalDate}
                    onChange={(newValue) => setArrivalDate(newValue)}
                    minDate={departureDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
            </div>
    );
}
