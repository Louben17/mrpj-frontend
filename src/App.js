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
        const imagePosts = response.data.filter(post => post.media_type === 'IMAGE').slice(0, 5);
        setInstagramPosts(imagePosts);
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
            <img src={post.media_url} alt={post.caption} />
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
