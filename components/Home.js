import styles from '../styles/Home.module.css';
import Header from './Header'

function Home() {
  return (
    <div className={styles.all}>
      <div className={styles.header}>
        <Header/>
      </div>
    </div>
  );
}

export default Home;
