async function fetchInstagramFeed() {
    try {
        const response = await fetch('https://your-backend.vercel.app/instagram-feed');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const feed = document.getElementById('feed');
        feed.innerHTML = ''; // Vymazat obsah před načtením nových fotek
        data.data.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.media_url;
            img.alt = photo.caption;
            feed.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
    }
}
fetchInstagramFeed();
