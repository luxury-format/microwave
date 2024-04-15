// Wait for images to load before initializing Masonry
// document.addEventListener('DOMContentLoaded', function() {
//     var grid = document.querySelector('.grid');

//     console.log("I am alive")

//     imagesLoaded(grid), function(instance) {
//         console.log("images are loaded");
//     }

//     imagesLoaded(grid, function() {
//         var msnry = new Masonry(grid, {
//             itemSelector: '.grid-item',
//             columnWidth: 200
//         });
//     });
// });

imagesLoaded( document.querySelector('.grid'), function( instance ) {
    console.log('all images are loaded');
    var msnry = new Masonry('.grid', {
                  itemSelector: '.grid-item',
              });
  });