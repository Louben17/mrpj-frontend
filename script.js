async function fetchInstagramFeed() {
    try {
        const response = await fetch('https://mrpj-backend.vercel.app/instagram-feed');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const feedContainer = document.getElementById('instagram-feed');

        data.forEach(post => {
            const img = document.createElement('img');
            img.src = post.media_url;
            img.alt = post.caption || 'Instagram post';
            feedContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
    }
}

fetchInstagramFeed();
