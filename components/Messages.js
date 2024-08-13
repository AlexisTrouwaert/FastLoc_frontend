import Header from './Header'
import styles from '../styles/Confirmation.module.css'
import { useRouter } from 'next/router'
import { Typography, Rating } from '@mui/material';
import { useState } from 'react';
import PostAvis from './PostAvis'

export default function Messages() {

    return(
        <div className={styles.all}>
            <div>
                <Header/>
            </div>
            <PostAvis/>
        </div>
    )
}