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

    const handlePostClick = (id) => {
        const video = document.getElementById(`video-${id}`);
        const thumbnail = document.getElementById(`thumbnail-${id}`);

        if (video && thumbnail) {
            video.play(); // Spustí video
            thumbnail.style.display = 'none'; // Skryje náhled
        }
    };

    return (
        <div className="instagram-feed">
            {loading && <p>Načítání Instagram příspěvků...</p>}
            {error && <p className="error">{error}</p>}
            {instagramPosts.map((post) => (
                <div
                    key={post.id}
                    className="instagram-post"
                    onClick={() => handlePostClick(post.id)}
                >
                    <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                        {post.media_type === 'VIDEO' ? (
                            <>
                                {/* Náhledový obrázek */}
                                <img
                                    src={post.thumbnail_url}
                                    alt={post.caption}
                                    className="thumbnail"
                                    id={`thumbnail-${post.id}`}
                                />
                                {/* Video */}
                                <video controls id={`video-${post.id}`} style={{ display: 'none' }}>
                                    <source src={post.media_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </>
                        ) : (
                            <img src={post.media_url} alt={post.caption} />
                        )}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default App;
