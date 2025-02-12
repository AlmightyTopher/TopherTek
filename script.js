/* script.js */

/**
 * Opens the mobile navigation dropdown.
 */
function hamburg() {
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
    document.querySelector(".dropdown").setAttribute("aria-hidden", "false"); // Improves accessibility
}

/**
 * Closes the mobile navigation dropdown.
 */
function cancel() {
    document.querySelector(".dropdown").style.transform = "translateY(-500px)";
    document.querySelector(".dropdown").setAttribute("aria-hidden", "true"); // Improves accessibility
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text");
    const phrases = [
        "Web Developer", "Graphic Designer", "Content Creator", "Tech Enthusiast",
        "Digital Wizard", "Tech Alchemist", "Code Craftsman", "Innovation Architect"
    ];
    let currentPhrase = -1;

    /**
     * Gets a random phrase index, ensuring it's different from the previous one.
     */
    function getRandomPhraseIndex() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === currentPhrase);
        return newIndex;
    }

    /**
     * Typewriter effect that types out text character by character.
     */
    function typeText(text, index = 0) {
        if (index < text.length) {
            typewriterText.textContent = text.substring(0, index + 1);
            setTimeout(() => typeText(text, index + 1), 100);
        } else {
            setTimeout(() => deleteText(text), 2000);
        }
    }

    /**
     * Deletes text character by character to create a typing loop.
     */
    function deleteText(text, index = text.length) {
        if (index >= 0) {
            typewriterText.textContent = text.substring(0, index);
            setTimeout(() => deleteText(text, index - 1), 50);
        } else {
            currentPhrase = getRandomPhraseIndex();
            setTimeout(() => typeText(phrases[currentPhrase]), 500);
        }
    }

    // Start the typewriter effect
    currentPhrase = getRandomPhraseIndex();
    typeText(phrases[currentPhrase]);

    /**
     * Dynamically loads external content (header and footer) into designated elements.
     */
    function loadContent(url, targetId) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
                return response.text();
            })
            .then(html => {
                document.getElementById(targetId).innerHTML = html;
            })
            .catch(error => console.error("Error loading", url, error));
    }

    if (document.getElementById("header")) {
        loadContent("../../header.html", "header");
    }
    if (document.getElementById("footer")) {
        loadContent("../../footer.html", "footer");
    }
});