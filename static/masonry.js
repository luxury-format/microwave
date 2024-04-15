imagesLoaded( document.querySelector('.grid'), function( instance ) {
    console.log('all images are loaded');
    var msnry = new Masonry('.grid', {
                  itemSelector: '.grid-item',
              });
  });