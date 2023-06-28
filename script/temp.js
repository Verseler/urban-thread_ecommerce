/* home carousel transition */
const carousel = document.querySelector('.carousel__display-wrapper');
const prevButton = document.querySelector('.carousel__button--prev');
const nextButton = document.querySelector('.carousel__button--next');
const images = Array.from(carousel.getElementsByTagName('img'));
const carouselDescription = document.querySelector('.carousel__display-wrapper_description');
const h3Element = carouselDescription.querySelector('h3');
const h1Elements = carouselDescription.querySelectorAll('h1');
let currentIndex = 0;
let transitioning = false;

// Hide all images except the first one initially
images.forEach((image, index) => {
  if (index !== 0) {
    image.style.display = 'none';
  }
});

function showImage(index) {
  if (index < 0 || index >= images.length || transitioning) {
    return;
  }

  transitioning = true;

  const currentImage = carousel.querySelector('.carousel__display-wrapper_img--active');
  const nextImage = images[index];

  currentImage.classList.remove('carousel__display-wrapper_img--active');
  nextImage.classList.add('carousel__display-wrapper_img--next');

  setTimeout(() => {
    currentImage.style.display = 'none';
    currentImage.classList.remove('carousel__display-wrapper_img--next');
    nextImage.style.display = 'block';
    nextImage.classList.add('carousel__display-wrapper_img--active');
    transitioning = false;

    // Delay the update of carousel description after the image transition completes
    setTimeout(() => {
      const imageAlt = nextImage.getAttribute('alt');
      const carouselData = getCarouselData(imageAlt);

      h3Element.textContent = carouselData.title;
      h1Elements[0].textContent = carouselData.heading1;
      h1Elements[1].textContent = carouselData.heading2;
    }, 500); // Adjust the delay time if needed
  }, 500);
}

function getCarouselData(imageAlt) {
  // You can define an object or use any other data structure to store your carousel data
  const carouselData = {
    'Image 1': {
      title: 'URBAN THREAD COLLECTIONS',
      heading1: 'Aesthetic Jackets',
      heading2: 'Collections 2023',
    },
    'Image 2': {
      title: 'URBAN THREAD COLLECTIONS',
      heading1: 'Slick Tshirts',
      heading2: 'Collections 2023',
    },
    // Add more image descriptions here
  };

  return carouselData[imageAlt];
}

prevButton.addEventListener('click', function () {
  if (!transitioning) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
});

nextButton.addEventListener('click', function () {
  if (!transitioning) {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
});

showImage(currentIndex);