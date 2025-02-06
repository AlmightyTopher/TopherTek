document.addEventListener("DOMContentLoaded", () => {
  // Typewriter Effect
  const words = [
      "Tech Support Specialist",
      "Web Developer",
      "System Administrator",
      "Creative Problem Solver",
      "AI Enthusiast"
  ];

  let i = 0;
  const typewriterSpan = document.getElementById("typewriter-text");

  function changeWord() {
      typewriterSpan.textContent = words[i];
      i = (i + 1) % words.length; // Loop back to the first word
  }

  setInterval(changeWord, 3000); // Change word every 3 seconds
  changeWord(); // Initialize immediately

  // Initialize AOS animations
  AOS.init({ offset: 0 });

  // Mobile Navigation Toggle
  const dropdown = document.querySelector(".dropdown");
  const hamburg = document.querySelector(".hamburg");
  const cancel = document.querySelector(".cancel");

  if (hamburg) {
      hamburg.addEventListener("click", () => {
          dropdown.style.transform = "translateY(0px)";
      });
  }

  if (cancel) {
      cancel.addEventListener("click", () => {
          dropdown.style.transform = "translateY(-500px)";
      });
  }

  // Admin Link Security (Hide link if not authorized)
  const adminLink = document.getElementById("adminLink");
  if (adminLink) {
      const userRole = localStorage.getItem("userRole");
      if (userRole !== "admin") {
          adminLink.style.display = "none";
      }
  }
});
