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

/* 🚀 ADDED CODE STARTS HERE 🚀 */

// ✅ Load Header & Footer Dynamically
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("header")) {
        loadHTML("header.html", "header");
    }
    if (document.getElementById("footer")) {
        loadHTML("footer.html", "footer");
    }

    function loadHTML(file, elementId) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === "header") {
                    setHeaderLinks();
                    disableCurrentPageLink();
                }
            })
            .catch(error => console.error("Error loading " + file, error));
    }

    function setHeaderLinks() {
        const basePath = window.location.pathname.includes('/Links/') ? '../../' : '';

        const links = {
            "home-link": "https://tophertek.com",
            "about-link": basePath + "Links/about/about.html",
            "skills-link": basePath + "Links/skills/skills.html",
            "services-link": basePath + "Links/services/services.html",
            "blogs-link": basePath + "Links/blogs/blogs.html",
            "contact-link": basePath + "Links/contact-us/contact-us.html",
            "dropdown-home-link": "https://tophertek.com",
            "dropdown-about-link": basePath + "Links/about/about.html",
            "dropdown-skills-link": basePath + "Links/skills/skills.html",
            "dropdown-services-link": basePath + "Links/services/services.html",
            "dropdown-blogs-link": basePath + "Links/blogs/blogs.html",
            "dropdown-contact-link": basePath + "Links/contact-us/contact-us.html"
        };

        Object.keys(links).forEach(id => {
            let linkElement = document.getElementById(id);
            if (linkElement) linkElement.href = links[id];
        });
    }

    function disableCurrentPageLink() {
        const currentPath = window.location.pathname.split("/").pop();
        const pageMap = {
            "about.html": ["about-link", "dropdown-about-link"],
            "skills.html": ["skills-link", "dropdown-skills-link"],
            "services.html": ["services-link", "dropdown-services-link"],
            "blogs.html": ["blogs-link", "dropdown-blogs-link"],
            "contact-us.html": ["contact-link", "dropdown-contact-link"]
        };

        if (pageMap[currentPath]) {
            pageMap[currentPath].forEach(id => {
                let linkElement = document.getElementById(id);
                if (linkElement) {
                    linkElement.classList.add("disabled-link");
                    linkElement.removeAttribute("href");
                }
            });
        }
    }
});

/* 🚀 ADDED CODE ENDS HERE 🚀 */
