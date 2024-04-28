
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.wson.me/api/lastfm/recent?limit=1', {
        headers: {
            'X-API-KEY': 'ke3rwwTJgpvBqGeo6hOPltQ0Gz0KhrUwyvI0tSYFFXSAb3l1C1TtUME861mNcv5bVkLZyOAfcnNi0ITGrm043OVxCe3IEuw4RkmEEPpwOhwi1v3OiPfqDK7hu8GzWGRm'
        }
    })
        .then(response => response.json())
        .then(data => {
            const track = data.data.recenttracks.track[0];
            const artist = track.artist['#text'];
            const title = track.name;
            const largeImage = track.image.find(img => img.size === 'large')['#text'];
            
            document.getElementById('last-fm-art').src = largeImage;
            document.getElementById('last-fm-art-side').src = largeImage;
            document.getElementById('last-fm-artist').textContent = artist;
            document.getElementById('last-fm-artist-side').textContent = artist;
            document.getElementById('last-fm-title').textContent = title;
            document.getElementById('last-fm-title-side').textContent = title;
            
            const spinnerOverlay = document.getElementById('spinner-overlay');
            spinnerOverlay.style.display = 'none';
            const spinnerOverlaySide = document.getElementById('spinner-overlay-side');
            spinnerOverlaySide.style.display = 'none';
        })
        .catch(error => console.error('Error:', error))
});