import React, { useState, useEffect } from 'react';



const AffichArticles = () => {
    const [affArticles, setAffArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users/articles')
            .then(response => response.json())
            .then(data => setAffArticles(data))
            .catch(error => console.error('Erreur:', error));
    
    }, 
    [])
    return (
        <div>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        <small>{new Date(article.date).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AffichArticles;
