import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css';
import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function Map() {

    const [value, setValue] = useState(10);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
      };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 100) {
          setValue(100);
        }
      };

    // Importer les composants dynamiquement pour éviter l'erreur côté serveur
    const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
    const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
    const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    const radius = value * 1000;

    const [position, setPosition] = useState({ latitude: 50.8566, longitude: 132.3522 });

    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            });
        });
        console.log(position)
        } else {
        console.log("Geolocation is not available in your browser.");
        }
    }, []);

    const center = [position.latitude, position.longitude]

    const handleSearch = () => {
        router.push('/search')
    }

    
    return (
        <div>
            <div className={styles.divSearch}>
                <input type='text' placeholder='Recherchez un outils' className={styles.search}/>
                <button 
                    className={styles.btnSearch}
                    onClick={() => handleSearch()}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        <div className={styles.all}>
            <div className={styles.allMap}>
                <MapContainer center={center} zoom={10} className={styles.map} >
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Circle center={center} radius={radius}>
                    <Popup>
                        <span>Rayon de {radius / 1000} kilomètres</span>
                    </Popup>
                    </Circle>
                </MapContainer>
                <div className={styles.slider}>
                    <Slider
                        aria-label="Kilometres"
                        initial
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={5}
                        marks
                        min={5}
                        max={50}
                        color='warning'
                    />
                    <Input
                    className={styles.input}
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 5,
                            min: 5,
                            max: 50,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </div>
            </div>
            <div className={styles.searched}>
                <div className={styles.divP}>
                    <p className={styles.p}>Les plus recherchés...</p>
                </div>
            </div>
        </div>
        </div>
    )
}