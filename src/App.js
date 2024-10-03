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
        setInstagramPosts(response.data); // Uložíme všechny příspěvky
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
        {instagramPosts.map((post) => (
            <div key={post.id} className="instagram-post">
                <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    {post.media_type === 'VIDEO' ? (
                        <video controls>
                            <source src={post.media_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={post.media_url} alt={post.caption} />
                    )}
                </a>
            </div>
        ))}
    </div>
);


export default App;
