const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("mobile-open");

        if (navbar.classList.contains("mobile-open")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }
    });
}


const mobileLinks = document.querySelectorAll("#navMenu a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("mobile-open");

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }
    });
});