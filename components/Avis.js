import styles from '../styles/Avis.module.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Avis (props){
    console.log('props', props.info)

    const avis = props.info && props.info.map((data, i) => {
        const date = moment(data.date).format('DD/MM/YYYY')
        const stars = [];
        for (let i = 0; i < 5; i++) {
            let style = {};
            if (i < data.Note) {
            style = { 'color': '#f1c40f' };
            }
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
        }
        
        if(data.Loc){
            return(
                <div className={styles.tile}>
                    <div className={styles.mainInfo}>
                        <img src={data.userIdAvis[0].url} alt='Photo de profil' className={styles.img}/>
                        <div>
                            <p className={styles.p}>{data.userIdAvis[0].firstName}</p>
                            <p className={styles.name}>{data.userIdAvis[0].name}</p>
                        </div>
                    </div>
                    <div className={styles.divAvis}>
                        <p className={styles.p}>Avis :</p>
                        <p className={styles.p}>{data.Avis}</p>
                    </div>
                    <div className={styles.divAvis}>
                        <p className={styles.p}>Note : {data.Note}</p>
                        {stars}
                    </div>
                    <div className={styles.divCategorie}>
                        <p>Avis laisser le : {date}</p>
                        <p className={styles.pCategorie}>En tant que loueur</p>
                    </div>
                </div>
            )
        } else if (data.Lou){
            return(
                <div className={styles.tile}>
                    <div className={styles.mainInfo}>
                        <img src={data.userIdAvis[0].url} alt='Photo de profil' className={styles.img}/>
                        <div>
                            <p className={styles.p}>{data.userIdAvis[0].firstName}</p>
                            <p className={styles.name}>{data.userIdAvis[0].name}</p>
                        </div>
                    </div>
                    <div className={styles.divAvis}>
                        <p className={styles.p}>Avis :</p>
                        <p className={styles.p}>{data.Avis}</p>
                    </div>
                    <div className={styles.divAvis}>
                        <p className={styles.p}>Note : {data.Note}</p>
                        {stars}
                    </div>
                    <div className={styles.divCategorie}>
                        <p>Avis laisser le : {date}</p>
                        <p className={styles.pCategorie}>En tant que locataire</p>
                    </div>
                </div>
            )
        }
    })
    return(
        <div className={styles.all}>
            {avis}
        </div>
    )
}