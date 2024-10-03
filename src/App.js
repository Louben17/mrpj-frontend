import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [instagramPosts, setInstagramPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchInstagramPosts = async () => {
        try {
            const response = await axios.get('https://mrpj-backend.vercel.app/api/instagram');
            const allPosts = response.data; // Vezmi všechny příspěvky

            // Vyber pouze první 4 příspěvky
            const limitedPosts = allPosts.slice(0, 4);
            setInstagramPosts(limitedPosts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Instagram posts:', error);
            setError('Nepodařilo se načíst Instagram příspěvky. Zkuste to prosím později.');
            setLoading(false);
        }
    };

    fetchInstagramPosts();
}, []);

return (
  <div className="instagram-feed">
    {loading && <p>Načítání Instagram příspěvků...</p>}
    {error && <p className="error">{error}</p>}
    {instagramPosts.slice(0, 4).map((post) => (
      <div key={post.id} className="instagram-post">
        <a href={post.permalink} target="_blank" rel="noopener noreferrer">
          {post.media_type === 'IMAGE' ? (
            <img src={post.media_url} alt={post.caption} />
          ) : post.media_type === 'REEL' ? (
            <video controls style={{ display: 'block' }} muted>
              <source src={post.media_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </a>
      </div>
    ))}
  </div>
);


export default App;
