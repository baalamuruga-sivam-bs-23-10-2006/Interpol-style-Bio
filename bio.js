
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".bio-section");
  sections.forEach((sec, i) => {
    setTimeout(() => {
      sec.style.opacity = 1;
      sec.style.transform = "translate(0, 0)";
      sec.style.transition = "all 0.8s ease-out";
    }, i * 500); // Delay each section
  });
});