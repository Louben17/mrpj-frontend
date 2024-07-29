document.addEventListener('DOMContentLoaded', function() {
    const feedElement = document.getElementById('feed');

    async function fetchInstagramFeed() {
        try {
            const response = await fetch('https://mrpj-backend.vercel.app/instagram-feed');
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();

            if (data && data.length) {
                feedElement.innerHTML = data.map(post => `
                    <a href="${post.permalink}" target="_blank">
                        <img src="${post.media_url}" alt="Instagram photo">
                    </a>
                `).join('');
            } else {
                feedElement.innerHTML = '<p>Žádné příspěvky nejsou k dispozici.</p>';
            }
        } catch (error) {
            console.error('Error fetching Instagram feed:', error);
            feedElement.innerHTML = '<p>Došlo k chybě při načítání příspěvků.</p>';
        }
    }

    fetchInstagramFeed();
});
