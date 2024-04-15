imagesLoaded( document.querySelector('.grid'), function( instance ) {
    console.log('all images are loaded');
    document.getElementById("photo-spinner").classList.remove("d-flex");
    document.getElementById("photo-spinner").classList.add("d-none");
    var photogrid = document.getElementById('photo-grid');
    photogrid.style.display = 'block';
    var msnry = new Masonry('.grid', {
                  itemSelector: '.grid-item',
              });
    
  });