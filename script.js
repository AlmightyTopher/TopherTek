// This script handles the typewriter effect on the index page.
// It also originally contained hamburg/cancel functions,
// but those are now better handled within header.html.

// Typewriter effect
const roles = [
    "Web Developer", "Graphic Designer", "Content Creator", "Tech Enthusiast", "Software Sorcerer",
    "Cyber Guardian", "Network Navigator", "AI Experimenter"
];

let currentRoleIndex = Math.floor(Math.random() * roles.length);

function typeText(text, index = 0) {
    const typewriterText = document.getElementById("typewriter-text");
    if (!typewriterText) return;

    if (index < text.length) {
        typewriterText.textContent = text.substring(0, index + 1);
        setTimeout(() => typeText(text, index + 1), 100);
    } else {
        setTimeout(() => deleteText(text), 2000);
    }
}

function deleteText(text, index = text.length) {
    const typewriterText = document.getElementById("typewriter-text");
    if (!typewriterText) return;

    if (index >= 0) {
        typewriterText.textContent = text.substring(0, index);
        setTimeout(() => deleteText(text, index - 1), 50);
    } else {
        let nextRoleIndex;
        do {
            nextRoleIndex = Math.floor(Math.random() * roles.length);
        } while (nextRoleIndex === currentRoleIndex && roles.length > 1);
        currentRoleIndex = nextRoleIndex;

        setTimeout(() => typeText(roles[currentRoleIndex]), 500);
    }
}

// Start typewriter effect
document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text");
    if (typewriterText) {
        typeText(roles[currentRoleIndex]);
    }
});

// hamburg() and cancel() functions are now defined within header.html
// function hamburg() { ... }
// function cancel() { ... }