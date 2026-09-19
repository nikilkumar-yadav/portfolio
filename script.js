
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

const typingText = document.getElementById("typing");

const words = [
    "a Web Developer",
    "a Programmer",
    "an App Designer",
    "an AI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }


    typingText.textContent =
        currentWord.substring(0, charIndex);


    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {

        speed = 2000;
        isDeleting = true;

    }

    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex === words.length) {
            wordIndex = 0;
        }

        speed = 500;
    }


    setTimeout(typeEffect, speed);
}

if (typingText) {
    typeEffect();
}
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {

          fetch("https://portfolio-atur.onrender.com/api/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (data.success) {

                alert("Message sent successfully!");

                contactForm.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to send message. Please try again.");

        }

    


        contactForm.reset();

    });

}
