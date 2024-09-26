imagesLoaded( document.querySelector('.grid'), function( instance ) {
    console.log('all images are loaded');
    var spinner = document.getElementById("photo-spinner");
    spinner.classList.remove("d-flex");
    spinner.classList.add("d-none");
    var photogrid = document.getElementById('photo-grid');
    photogrid.style.display = 'block';
    var msnry = new Masonry('.grid', {
                  itemSelector: '.grid-item',
                  gutter: 10
              });
    
  });