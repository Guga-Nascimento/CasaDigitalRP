const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const servicesToggle = document.getElementById("servicesToggle");
const servicesItem = document.querySelector(".nav-item-dropdown");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

if (servicesToggle && servicesItem) {
  servicesToggle.addEventListener("click", () => {
    if (window.innerWidth <= 960) {
      servicesItem.classList.toggle("open");

      const expanded = servicesToggle.getAttribute("aria-expanded") === "true";
      servicesToggle.setAttribute("aria-expanded", String(!expanded));
    }
  });
}