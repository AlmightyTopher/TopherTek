function hamburg() {
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
}

function cancel() {
    document.querySelector(".dropdown").style.transform = "translateY(-500px)";
}

document.addEventListener("DOMContentLoaded", () => {
    let e = ["Web Developer", "Graphic Designer", "Content Creator", "Tech Enthusiast", "Digital Wizard", "Tech Alchemist", "Code Craftsman", "Innovation Architect", "System Overlord", "Electronics Whisperer", "AI Experimenter", "Cyber Guardian", "Tech Trailblazer", "Digital Blacksmith", "Byte-Sized Genius", "The Fixer", "Digital Engineer", "Cloud Commander", "Automation Architect", "Software Sorcerer", "Hardware Guru", "Network Navigator", "Cyber Fixer", "Digital Craftsman", "Gadget Tinkerer", "Security Strategist", "Media Maestro", "Tech Visionary", "Quantum Debugger", "Pixel Pusher", "Cloud Juggler", "Bit Wrangler", "Latency Overlord", "404 Strategist", "Algorithm Whisperer", "Packet Shaman", "Syntax Sorcerer", "Tech Ninja", "Firmware Philosopher", "Data Necromancer", "Cache Lord", "Wi-Fi Warlock", "Glitch Bender", "Kernel Conjurer", "Logic Gatekeeper", "Hyperlink Hypnotist", "Quantum Bufferer", "Cybernetic Overthinker", "Bandwidth Barbarian", "Error Code Prophet", "Syntax Yogi", "Debugger of Doom"],
        t = document.getElementById("typewriter-text");

    function r(t) {
        let r;
        do r = Math.floor(Math.random() * e.length);
        while (r === t);
        return r;
    }

    function n(e, r = 0) {
        r < e.length ? (t.textContent = e.substring(0, r + 1), setTimeout(() => n(e, r + 1), 100)) : setTimeout(() => o(e), 2000);
    }

    function o(a, i = a.length) {
        if (i >= 0) t.textContent = a.substring(0, i), setTimeout(() => o(a, i - 1), 50);
        else {
            let l = r(e.indexOf(a));
            setTimeout(() => n(e[l]), 500);
        }
    }
    n(e[Math.floor(Math.random() * e.length)])
}), document.addEventListener("DOMContentLoaded", function () {
    function e(e, t) {
        fetch(e).then(t => {
            if (!t.ok) throw Error(`Failed to load ${e}: ${t.status}`);
            return t.text()
        }).then(e => {
            document.getElementById(t).innerHTML = e
        }).catch(t => console.error("Error loading " + e, t))
    }
    document.getElementById("header") && e("../../header.html", "header"), document.getElementById("footer") && e("../../footer.html", "footer")
});