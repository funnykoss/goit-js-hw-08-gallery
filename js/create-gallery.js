import gallery from "./gallery-items.js";


const imgGallery = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxbutton = document.querySelector('button[data-action="close-lightbox"]');
let currentImg;

function createImagesListMarckup(items) {
  return items.map(({ preview, original, description }) =>{
    return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;}).join(' ');
}

const imagesPattern = createImagesListMarckup(gallery);
imgGallery.insertAdjacentHTML('beforeend', imagesPattern);

imgGallery.addEventListener('click', onImagesClick);
lightboxbutton.addEventListener('click', onCloseModal);

lightboxOverlay.addEventListener("click", () => onCloseModal());

 

function onImagesClick(event) {
  console.log(event.target);
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  currentImg = event.target;
  

  lightBox.classList.add('is-open');
  addLightboxContent(currentImg);
   document.addEventListener("keydown", onEscKeyPress);
  
  
};

function onCloseModal() {
  lightBox.classList.remove("is-open");
  document.removeEventListener("keydown", onEscKeyPress);
  
}
function addLightboxContent(event) {
  lightboxImage.src = event.dataset.source;
  lightboxImage.alt = event.getAttribute('alt');
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = "Escape";
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

// function imageArrowsFlipping(e) {
//   const parrent = currentImg.closest("li");

//   if (e.code === "ArrowRight") {
//     onNextKeyPress(parrent);
//   } else if (e.code === "ArrowLeft") {
//     onPrevKeyPress(parrent);
//   }
// }

// function onNextKeyPress(parrent) {
//   currentImg = parrent.nextElementSibling.querySelector("img");
//   addLightboxContent(currentImg);
// }

// function onPrevKeyPress(parrent) {
//   currentImg = parrent.previousElementSibling.querySelector("img");
//   addLightboxContent(currentImg);
// }


document.addEventListener('keydown', imageArrowsFlipping);

function imageArrowsFlipping(event) {
const imagesList  = document.querySelectorAll('.gallery__image');
 
  const arrayGallery = [];
  imagesList.forEach(el => {
    arrayGallery.push(el.getAttribute('data-source'));
  });
  
  let newIndex;
  const currentId = arrayGallery.indexOf(lightboxImage.src);
  if (event.key === 'ArrowLeft') {
    if (newIndex == -1) {
      newIndex = arrayGallery.length - 1;
    }
  } else if (event.key === 'ArrowRight') {
    newIndex = currentId + 1;
    if (newIndex === arrayGallery.length) {
      newIndex = 0;
    }
  }
lightboxImage.src = arrayGallery[newIndex];
};
  