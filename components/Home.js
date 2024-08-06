import styles from '../styles/Home.module.css';
import Header from './Header'
import Map from './Map'

function Home() {

  return (
    <div className={styles.all}>
      <div className={styles.header}>
        <Header/>
      </div>
      <div className={styles.map}>
        <Map/>
      </div>
    </div>
  );
}

export default Home;
