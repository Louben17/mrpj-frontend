
document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.getElementById('instagram-feed');

    // URL API endpointu
    const apiUrl = 'https://https://mrpj-backend.vercel.app/instagram-feed'; // Upravte URL podle vašeho nasazení

    fetch(apiUrl)
        .then(response => {
            // Zkontrolujte, zda odpověď je v pořádku
            if (!response.ok) {
                throw new Error('Síťová odpověď nebyla v pořádku');
            }
            return response.json(); // Převeďte odpověď na JSON
        })
        .then(data => {
            // Zpracování získaných dat
            data.forEach(post => {
                const img = document.createElement('img');
                img.src = post.imageUrl;
                img.alt = 'Instagram Post';
                img.style.width = '200px';
                img.style.height = '200px';
                img.style.objectFit = 'cover';
                img.style.margin = '10px';
                feedContainer.appendChild(img);
            });
        })
        .catch(error => {
            // Zpracování chyb
            console.error('Chyba při načítání Instagram feedu:', error);
        });
});
