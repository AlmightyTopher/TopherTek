function hamburg() {
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
}

function cancel() {
    document.querySelector(".dropdown").style.transform = "translateY(-500px)";
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter-text");
    const roles = [
        "Web Developer", "Graphic Designer", "Content Creator", "Tech Enthusiast", "Software Sorcerer", 
        "Cyber Guardian", "Network Navigator", "AI Experimenter"
    ];

    function getRandomRole(exclude) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * roles.length);
        } while (roles[newIndex] === exclude);
        return newIndex;
    }

    function typeText(text, index = 0) {
        if (index < text.length) {
            typewriterText.textContent = text.substring(0, index + 1);
            setTimeout(() => typeText(text, index + 1), 100);
        } else {
            setTimeout(() => deleteText(text), 2000);
        }
    }

    function deleteText(text, index = text.length) {
        if (index >= 0) {
            typewriterText.textContent = text.substring(0, index);
            setTimeout(() => deleteText(text, index - 1), 50);
        } else {
            setTimeout(() => typeText(roles[getRandomRole(text)]), 500);
        }
    }

    typeText(roles[Math.floor(Math.random() * roles.length)]);
});
