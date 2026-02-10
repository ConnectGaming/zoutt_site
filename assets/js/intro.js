window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const heroSection = document.querySelector(".intro-hero");

  if (preloader) {
    preloader.style.display = "none";
  }

  if (heroSection) {
    heroSection.classList.remove("hidden");
  }
});
