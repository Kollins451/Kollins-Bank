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
/* =========================================
   SEND MONEY / TRANSFER PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const transferForm = document.getElementById("transferForm");

    if (!transferForm) {
        return;
    }

    const accountInput = document.getElementById("recipientAccount");
    const recipientName = document.getElementById("recipientName");
    const accountMessage = document.getElementById("accountMessage");

    const amountInput = document.getElementById("transferAmount");

    const summaryAmount = document.getElementById("summaryAmount");
    const summaryTotal = document.getElementById("summaryTotal");

    const transferModal = document.getElementById("transferModal");

    const closeTransferModal = document.getElementById("closeTransferModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const cancelTransferBtn = document.getElementById("cancelTransferBtn");
    const confirmTransferBtn = document.getElementById("confirmTransferBtn");

    const confirmRecipient = document.getElementById("confirmRecipient");
    const confirmAccount = document.getElementById("confirmAccount");
    const confirmAmount = document.getElementById("confirmAmount");
    const confirmTotal = document.getElementById("confirmTotal");


    const TRANSFER_FEE = 5;


    /* =========================================
       FORMAT MONEY
    ========================================= */

    function formatMoney(amount) {

        return "₦" + Number(amount).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    }


    /* =========================================
       ACCOUNT NUMBER CHECK
       
       FRONTEND PLACEHOLDER ONLY.
       Real recipient lookup must happen
       securely on the backend.
    ========================================= */

    accountInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        recipientName.value = "";
        accountMessage.textContent = "";
        accountMessage.style.color = "";

        if (this.value.length === 10) {

            /*
             * Temporary frontend behavior.
             * This does NOT represent a real bank lookup.
             * Later this will call the secure backend API.
             */

            recipientName.value = "Recipient account";

            accountMessage.textContent =
                "Account number entered. Recipient verification will happen securely.";

            accountMessage.style.color = "#087a3d";
        }

    });


    /* =========================================
       UPDATE TRANSFER TOTAL
    ========================================= */

    amountInput.addEventListener("input", function () {

        let amount = Number(this.value);

        if (!amount || amount < 0) {
            amount = 0;
        }

        summaryAmount.textContent = formatMoney(amount);

        const total = amount + TRANSFER_FEE;

        summaryTotal.textContent = formatMoney(total);

    });


    /* =========================================
       OPEN CONFIRMATION MODAL
    ========================================= */

    transferForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const accountNumber = accountInput.value.trim();
        const amount = Number(amountInput.value);
        const description =
            document.getElementById("transferDescription").value.trim();

        if (accountNumber.length !== 10) {

            alert("Please enter a valid 10-digit recipient account number.");

            accountInput.focus();

            return;
        }


        if (!amount || amount <= 0) {

            alert("Please enter a valid transfer amount.");

            amountInput.focus();

            return;
        }


        const total = amount + TRANSFER_FEE;


        confirmRecipient.textContent =
            recipientName.value || "Recipient account";

        confirmAccount.textContent = accountNumber;

        confirmAmount.textContent = formatMoney(amount);

        confirmTotal.textContent = formatMoney(total);


        transferModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        transferModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    closeTransferModal.addEventListener("click", closeModal);

    modalCloseBtn.addEventListener("click", closeModal);

    cancelTransferBtn.addEventListener("click", closeModal);


    /* =========================================
       CONFIRM TRANSFER
       
       IMPORTANT:
       This currently DOES NOT move real money.
       Real transfer processing will be connected
       to the secure backend later.
    ========================================= */

    confirmTransferBtn.addEventListener("click", function () {

        alert(
            "Transfer confirmation received. Real transaction processing will be connected to the secure bank backend."
        );

        closeModal();

    });

});
