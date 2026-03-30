// Seleciona o trilho que se move horizontalmente
const track = document.querySelector(".hero-slider-track");

// Seleciona todos os slides originais
const slides = document.querySelectorAll(".hero-slide");

// Seleciona todas as bolinhas do indicador
const dots = document.querySelectorAll(".hero-dot");

// Só executa se os elementos existirem na página
if (track && slides.length > 0 && dots.length > 0) {
  // Começa no primeiro slide
  let index = 0;

  // Quantidade total de slides originais
  const totalSlides = slides.length;

  // Cria uma cópia do primeiro slide para dar efeito de loop infinito
  const firstClone = slides[0].cloneNode(true);

  // Adiciona esse clone no final do trilho
  track.appendChild(firstClone);

  // Função que atualiza qual bolinha está ativa
  function updateDots(activeIndex) {
    // Remove a classe active de todas as bolinhas
    dots.forEach((dot) => dot.classList.remove("active"));

    // Adiciona active apenas na bolinha do slide atual
    if (dots[activeIndex]) {
      dots[activeIndex].classList.add("active");
    }
  }

  // Função para ir diretamente para um slide específico
  function goToSlide(slideIndex) {
    // Atualiza o índice atual
    index = slideIndex;

    // Move o trilho até o slide desejado
    track.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza a bolinha ativa
    updateDots(index);
  }

  // Função que avança automaticamente para o próximo slide
  function moveSlider() {
    // Vai para o próximo índice
    index++;

    // Move o trilho para a esquerda
    track.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza os dots enquanto ainda está nos slides originais
    if (index < totalSlides) {
      updateDots(index);
    }
  }

  // Faz o slider avançar sozinho a cada 4 segundos
  setInterval(moveSlider, 4000);

  // Quando a animação termina, verifica se chegou no slide clonado
  track.addEventListener("transitionend", () => {
    if (index === totalSlides) {
      // Remove a transição temporariamente
      track.style.transition = "none";

      // Volta invisivelmente para o primeiro slide original
      index = 0;
      track.style.transform = "translateX(0)";

      // Força o navegador a reconhecer essa mudança antes de reativar a transição
      track.offsetHeight;

      // Reativa a transição para os próximos movimentos
      track.style.transition = "transform 0.7s ease";

      // Atualiza a bolinha para a primeira
      updateDots(index);
    }
  });

  // Adiciona clique em cada bolinha
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      // Vai para o slide correspondente à bolinha clicada
      goToSlide(dotIndex);
    });
  });

  // Garante que a primeira bolinha comece ativa
  updateDots(0);
}