// Typewriter Effect Module
const typewriterModule = (() => {
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
        // ... (rest of the words)
    ];

    
      // ... (rest of the words)
    ];

    const typewriterSpan = document.getElementById("typewriter-text");

    function getRandomWord(excludeIndex) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * words.length);
        } while (randomIndex === excludeIndex);
        return randomIndex;
    }

    function typeWriterEffect(word, index = 0) {
        if (index < word.length) {
            typewriterSpan.textContent = word.substring(0, index + 1);
            setTimeout(() => typeWriterEffect(word, index + 1), 100);
        } else {
            setTimeout(() => eraseWord(word), 2000);
        }
    }

    function eraseWord(word, index = word.length) {
        if (index >= 0) {
            typewriterSpan.textContent = word.substring(0, index);
            setTimeout(() => eraseWord(word, index - 1), 50);
        } else {
            let newIndex = getRandomWord(words.indexOf(word));
            setTimeout(() => typeWriterEffect(words[newIndex]), 500);
        }
    }

    return {
        init: () => {
            let firstIndex = Math.floor(Math.random() * words.length);
            typeWriterEffect(words[firstIndex]);
        }
    };
})();

// Mobile Navigation Module
const navModule = (() => {
    return {
        hamburg: () => {
            document.querySelector(".dropdown").style.transform = "translateY(0px)";
        },
        cancel: () => {
            document.querySelector(".dropdown").style.transform = "translateY(-500px)";
        }
    };
})();

// Dynamic Content Loading Module
const contentLoaderModule = (() => {
    function loadHTML(file, elementId) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;

                // Gray out the current page link
                const currentPage = window.location.pathname;
                const links = document.querySelectorAll('.links a');
                links.forEach(link => {
                    if (link.href.includes(currentPage)) {
                        link.classList.add("disabled-link");
                    }
                });
            })
            .catch(error => console.error("Error loading " + file, error));
    }

    return {
        init: () => {
            if (document.getElementById("header")) {
                loadHTML("/header.html", "header");
            }
            if (document.getElementById("footer")) {
                loadHTML("/footer.html", "footer");
            }
        }
    };
})();

// Initialize Modules
document.addEventListener("DOMContentLoaded", () => {
    typewriterModule.init();
    contentLoaderModule.init();
});

// Expose Navigation Functions to Global Scope
window.hamburg = navModule.hamburg;
window.cancel = navModule.cancel;