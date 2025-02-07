document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "Tech Support Specialist",
        "Web Developer",
        "System Administrator",
        "Creative Problem Solver",
        "AI Enthusiast"
    ];

    const typewriterSpan = document.getElementById("typewriter-text");

    function getRandomWord(excludeIndex) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * words.length);
        } while (randomIndex === excludeIndex); // Ensure a different word is selected
        return randomIndex;
    }

    function typeWriterEffect(word, index = 0) {
        if (index < word.length) {
            typewriterSpan.textContent = word.substring(0, index + 1);
            setTimeout(() => typeWriterEffect(word, index + 1), 100); // Typing speed (100ms)
        } else {
            setTimeout(() => eraseWord(word), 2000); // Pause before erasing
        }
    }

    function eraseWord(word, index = word.length) {
        if (index >= 0) {
            typewriterSpan.textContent = word.substring(0, index);
            setTimeout(() => eraseWord(word, index - 1), 50); // Erasing speed (50ms)
        } else {
            let newIndex = getRandomWord(words.indexOf(word)); // Get a new random word
            setTimeout(() => typeWriterEffect(words[newIndex]), 500); // Short delay before typing again
        }
    }

    // Start with a random word
    let firstIndex = Math.floor(Math.random() * words.length);
    typeWriterEffect(words[firstIndex]);
});

// ✅ Mobile Navigation Toggle (Same as Original)
function hamburg(){
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
}

function cancel(){
    document.querySelector(".dropdown").style.transform = "translateY(-500px)";
}
