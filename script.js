/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {

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

        if (navbar) {
            navbar.classList.remove("mobile-open");
        }

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    });

});


/* =========================
   SHOW / HIDE PASSWORD
========================= */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";
        button.textContent = "Hide";

    } else {

        input.type = "password";
        button.textContent = "Show";

    }
}


/* =========================
   SIGNUP FORM
========================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("signupMessage");


        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            return;
        }


        if (password.length < 8) {

            message.textContent =
                "Password must contain at least 8 characters.";

            return;
        }


        /*
         * IMPORTANT:
         * This does NOT create a real bank account.
         *
         * Real registration will be connected to
         * the secure backend later.
         */

        message.textContent =
            `Registration form received for ${firstName} ${lastName}.`;

    });

}


/* =========================
   LOGIN FORM
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const message =
            document.getElementById("loginMessage");


        if (!email) {

            message.textContent =
                "Please enter your email address.";

            return;
        }


        /*
         * Real authentication will be connected
         * to the secure backend later.
         */

        message.textContent =
            "Login system will be connected to the secure banking backend.";

    });

}
/* =========================
   DASHBOARD SIDEBAR
========================= */

const dashboardMenu = document.getElementById("dashboardMenu");
const sidebar = document.getElementById("sidebar");

if (dashboardMenu && sidebar) {

    dashboardMenu.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

}


/* =========================
   BALANCE SHOW / HIDE
========================= */

const balanceToggle = document.getElementById("balanceToggle");
const balanceAmount = document.getElementById("balanceAmount");

if (balanceToggle && balanceAmount) {

    let balanceVisible = true;

    balanceToggle.addEventListener("click", () => {

        balanceVisible = !balanceVisible;

        if (balanceVisible) {
            balanceAmount.textContent = "₦250,000.00";
            balanceToggle.textContent = "👁";
        } else {
            balanceAmount.textContent = "₦••••••••";
            balanceToggle.textContent = "◉";
        }

    });

}


/* =========================
   COPY ACCOUNT NUMBER
========================= */

const copyAccount = document.getElementById("copyAccount");
const accountNumber = document.getElementById("accountNumber");

if (copyAccount && accountNumber) {

    copyAccount.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                accountNumber.textContent.trim()
            );

            copyAccount.textContent = "Copied";

            setTimeout(() => {
                copyAccount.textContent = "Copy";
            }, 1500);

        } catch (error) {

            copyAccount.textContent = "Copy failed";

        }

    });

}
