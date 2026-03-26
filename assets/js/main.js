const track = document.querySelector(".hero-slider-track");
const slides = document.querySelectorAll(".hero-slide");

let index = 0;
const totalSlides = slides.length;

/* cria clone do primeiro slide */
const firstClone = slides[0].cloneNode(true);
track.appendChild(firstClone);

function moveSlider() {
  index++;
  track.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(moveSlider, 4000);

/* quando chega no clone volta invisivelmente para o primeiro */
track.addEventListener("transitionend", () => {
  if (index === totalSlides) {
    track.style.transition = "none";
    index = 0;
    track.style.transform = `translateX(0)`;

    /* força o navegador a aplicar a mudança */
    track.offsetHeight;

    track.style.transition = "transform 0.7s ease";
  }
});