// Wait for images to load before initializing Masonry
var grid = document.querySelector('.grid');
imagesLoaded(grid, function() {
  var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: 200
  });
});