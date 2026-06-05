const slider = document.querySelector("[data-slider]");
const slides = [...document.querySelectorAll(".slide")];
const dotsContainer = document.querySelector(".dots");
const thumbnailsContainer = document.querySelector(".thumbnails");
const previousButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");
const autoplayButton = document.querySelector("[data-autoplay]");

let currentIndex = 0;
let isPlaying = true;
let autoplayTimer;

const buildControls = () => {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Show image ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);

    const thumbnail = document.createElement("button");
    const image = slide.querySelector("img");
    thumbnail.className = "thumbnail";
    thumbnail.type = "button";
    thumbnail.setAttribute("aria-label", `Show ${slide.querySelector("h2").textContent}`);
    thumbnail.innerHTML = `<img src="${image.src}" alt="">`;
    thumbnail.addEventListener("click", () => showSlide(index));
    thumbnailsContainer.appendChild(thumbnail);
  });
};

const updateControls = () => {
  const dots = [...document.querySelectorAll(".dot")];
  const thumbnails = [...document.querySelectorAll(".thumbnail")];

  slides.forEach((slide, index) => {
    const isActive = index === currentIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    dots[index].classList.toggle("is-active", isActive);
    dots[index].setAttribute("aria-selected", String(isActive));
    thumbnails[index].classList.toggle("is-active", isActive);
  });
};

const showSlide = (index) => {
  currentIndex = (index + slides.length) % slides.length;
  updateControls();
  restartAutoplay();
};

const nextSlide = () => showSlide(currentIndex + 1);
const previousSlide = () => showSlide(currentIndex - 1);

const startAutoplay = () => {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, 4200);
};

const stopAutoplay = () => {
  clearInterval(autoplayTimer);
};

const restartAutoplay = () => {
  if (isPlaying) {
    startAutoplay();
  }
};

const toggleAutoplay = () => {
  isPlaying = !isPlaying;
  autoplayButton.textContent = isPlaying ? "Pause" : "Play";
  autoplayButton.setAttribute("aria-pressed", String(isPlaying));

  if (isPlaying) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);
autoplayButton.addEventListener("click", toggleAutoplay);

slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", restartAutoplay);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    previousSlide();
  }

  if (event.key === "ArrowRight") {
    nextSlide();
  }
});

buildControls();
updateControls();
startAutoplay();
