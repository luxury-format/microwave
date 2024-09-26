var currentImageIndex = 0;
var images = [];

// Function to open the lightbox
function openLightbox(index) {
  var lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'flex';
  toggleNavButtons(images.length > 1);
  showImage(index);
}

function toggleNavButtons(visible) {
  prevBtn.style.display = visible ? 'block' : 'none';
  nextBtn.style.display = visible ? 'block' : 'none';
}

// Function to close the lightbox
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

// Function to show a specific image
function showImage(index) {
  var lightboxImage = document.getElementById('lightbox-image');
  lightboxImage.src = images[index].src;
  currentImageIndex = index;
}

// Add click event listeners to all images
var gallery = document.getElementById('my-gallery');
if (gallery) {
  var imgs = gallery.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    images.push({
      src: imgs[i].src,
      alt: imgs[i].alt
    });
    imgs[i].addEventListener('click', function() {
      openLightbox(Array.from(imgs).indexOf(this));
    });
  }
} 

// Add click event listeners to navigation buttons
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
prevBtn.addEventListener('click', function() {
    showImage((currentImageIndex - 1 + images.length) % images.length);
});
nextBtn.addEventListener('click', function() {
    showImage((currentImageIndex + 1) % images.length);
});

// Close lightbox when clicking outside the image
var lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', function(event) {
  if (event.target === this) {
    closeLightbox();
  }
});

var lightboxContainer = document.getElementById('lightbox-container');
lightboxContainer.addEventListener('click', function(event) {
  if (event.target === this) {
    closeLightbox();
  }
});