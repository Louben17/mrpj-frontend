import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [instagramPosts, setInstagramPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedRef = useRef(null);

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                const response = await axios.get('https://mrpj-backend.vercel.app/api/instagram');
                const allPosts = response.data;
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

    // Přidejte effect pro kontrolu a opravu rozměrů
    useEffect(() => {
        if (feedRef.current) {
            const images = feedRef.current.getElementsByTagName('img');
            Array.from(images).forEach(img => {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
            });
        }
    }, [instagramPosts]);

    return (
        <div className="instagram-feed-container">
            <div className="instagram-feed" ref={feedRef}>
                {loading && <p>Načítání Instagram příspěvků...</p>}
                {error && <p className="error">{error}</p>}
                {instagramPosts.map((post) => (
                    <div key={post.id} className="instagram-post">
                        <a 
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            <img 
                                src={post.media_url}
                                alt={post.caption}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
