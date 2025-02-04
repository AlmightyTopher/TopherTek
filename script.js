document.addEventListener("DOMContentLoaded", () => {
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
});

// Mobile Navigation Toggle
function hamburg(){
  document.querySelector(".dropdown").style.transform = "translateY(0px)";
}

function cancel(){
  document.querySelector(".dropdown").style.transform = "translateY(-500px)";
}
