document.addEventListener("DOMContentLoaded", () => {
    const words = [ 
        "Web Developer",
        "Graphic Designer",
        "Content Creator",
        "Tech Enthusiast",
        "Digital Wizard",
        "Tech Alchemist",
        "Code Craftsman",
        "Innovation Architect",
        "System Overlord",
        "Electronics Whisperer",
        "AI Experimenter",
        "Cyber Guardian",
        "Tech Trailblazer",
        "Digital Blacksmith",
        "Byte-Sized Genius",
        "The Fixer",
        "Digital Engineer",
        "Cloud Commander",
        "Automation Architect",
        "Software Sorcerer",
        "Hardware Guru",
        "Network Navigator",
        "Cyber Fixer",
        "Digital Craftsman",
        "Gadget Tinkerer",
        "Security Strategist",
        "Media Maestro",
        "Tech Visionary",
        "Quantum Debugger",
        "Pixel Pusher",
        "Cloud Juggler",
        "Bit Wrangler",
        "Latency Overlord",
        "404 Strategist",
        "Algorithm Whisperer",
        "Packet Shaman",
        "Syntax Sorcerer",
        "Tech Ninja",
        "Firmware Philosopher",
        "Data Necromancer",
        "Cache Lord",
        "Wi-Fi Warlock",
        "Glitch Bender",
        "Kernel Conjurer",
        "Logic Gatekeeper",
        "Hyperlink Hypnotist",
        "Quantum Bufferer",
        "Cybernetic Overthinker",
        "Bandwidth Barbarian",
        "Error Code Prophet",
        "Syntax Yogi",
        "Debugger of Doom"
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
