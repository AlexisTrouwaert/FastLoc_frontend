import styles from '../styles/Articles.module.css'
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


export default function Articles() {
  const [results, setResults] = useState([]);
  const [listCroissant, setListCroissant] = useState('');


  const sortResults = (articles) => {
    if (listCroissant === 'croissant') {
        return articles.sort((a, b) => a.price - b.price);
    } else if (listCroissant === 'decroissant') {
        return articles.sort((a, b) => b.price - a.price);
    }
    return articles;
};
    return(
  
            <div className={styles.containerArticles}>
                        {sortResults(results).map((article, index) => (
                            <div className={styles.articles} key={index}>
                                <h3>{article.outil[0].categorie}</h3>
                                <p>Marque: {article.outil[0].brand}</p>
                                <p>Modele: {article.outil[0].model}</p>
                                <p>Prix: {article.price}</p>
                                <p>Note: {article.note}</p>
                            </div>
                        ))}
            </div>
     
    )
}