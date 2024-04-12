// Wait for images to load before initializing Masonry
document.addEventListener('DOMContentLoaded', function() {
    var grid = document.querySelector('.grid');

    imagesLoaded(grid), function(instance) {
        console.log("images are loaded");
    }

    imagesLoaded(grid, function() {
    var msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: 200
    });
    });
});