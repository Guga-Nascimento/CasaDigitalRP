const track = document.querySelector(".hero-slider-track");
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const prevButton = document.querySelector(".hero-arrow-left");
const nextButton = document.querySelector(".hero-arrow-right");

if (track && slides.length > 0 && dots.length > 0) {
  let index = 0;
  const totalSlides = slides.length;
  let sliderInterval;

  const firstClone = slides[0].cloneNode(true);
  track.appendChild(firstClone);

  /* Atualiza qual bolinha está ativa */
  function updateDots(activeIndex) {
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[activeIndex]?.classList.add("active");
  }

  /* Vai para um slide específico */
  function goToSlide(slideIndex) {
    index = slideIndex;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
  }

  /* Avança automaticamente para o próximo slide */
  function moveSlider() {
    index++;
    track.style.transform = `translateX(-${index * 100}%)`;

    if (index < totalSlides) {
      updateDots(index);
    }
  }

  /* Volta para o slide anterior */
  function prevSlide() {
    if (index === 0) {
      index = totalSlides - 1;
    } else {
      index--;
    }

    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
  }

  /* Avança manualmente para o próximo slide */
  function nextSlide() {
    index++;

    if (index >= totalSlides) {
      index = 0;
    }

    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
  }

  /* Inicia o autoplay */
  function startAutoplay() {
    sliderInterval = setInterval(moveSlider, 4000);
  }

  /* Reinicia o autoplay após interação manual */
  function resetAutoplay() {
    clearInterval(sliderInterval);
    startAutoplay();
  }

  startAutoplay();

  /* Quando chega no slide clonado, volta sem mostrar o salto */
  track.addEventListener("transitionend", () => {
    if (index === totalSlides) {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0)";

      track.offsetHeight;

      track.style.transition = "transform 0.7s ease";
      updateDots(index);
    }
  });

  /* Clique nas bolinhas */
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      goToSlide(dotIndex);
      resetAutoplay();
    });
  });

  /* Clique na seta esquerda */
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });
  }

  /* Clique na seta direita */
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });
  }

  updateDots(0);
}