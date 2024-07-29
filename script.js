async function fetchInstagramFeed() {
    console.log('Fetching Instagram feed...'); // Ladicí výstup
    try {
        const response = await fetch('https://mrpj-backend.vercel.app/instagram-feed');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Ladicí výstup

        if (!Array.isArray(data)) {
            throw new Error('Returned data is not an array');
        }
        
        const feedContainer = document.getElementById('instagram-feed');
        if (!feedContainer) {
            throw new Error('Instagram feed container not found');
        }
        
        feedContainer.innerHTML = ''; // Clear any previous content

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
