
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
            
            // set text content with an existence check
            function setContentById(id, content) {
                var element = document.getElementById(id);
                if (element) {
                    element.textContent = content;
                }
            }

            // same for images
            function setImageSrcById(id, src) {
                var element = document.getElementById(id);
                if (element) {
                    element.src = src;
                }
            }
            
            if (largeImage !== "") {
                setImageSrcById('last-fm-art', largeImage);
                setImageSrcById('last-fm-art-side', largeImage);
            }
            setContentById('last-fm-artist', artist);
            setContentById('last-fm-artist-side', artist);
            setContentById('last-fm-title', title);
            setContentById('last-fm-title-side', title);
            
            const spinnerOverlay = document.getElementById('spinner-overlay');
            if (spinnerOverlay) {
                spinnerOverlay.style.display = 'none';
            }
            const spinnerOverlaySide = document.getElementById('spinner-overlay-side');
            if (spinnerOverlaySide) {
                spinnerOverlaySide.style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error))
});