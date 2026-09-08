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
/* =========================================
   ADD MONEY PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const addMoneyForm = document.getElementById("addMoneyForm");

    if (!addMoneyForm) {
        return;
    }

    const amountInput =
        document.getElementById("addMoneyAmount");

    const fundingMethod =
        document.getElementById("fundingMethod");

    const summaryAmount =
        document.getElementById("addSummaryAmount");

    const summaryTotal =
        document.getElementById("addSummaryTotal");

    const modal =
        document.getElementById("addMoneyModal");

    const confirmAmount =
        document.getElementById("confirmAddAmount");

    const confirmTotal =
        document.getElementById("confirmAddTotal");

    const confirmMethod =
        document.getElementById("confirmFundingMethod");


    function formatMoney(amount) {

        return "₦" + Number(amount).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    }


    /* =========================================
       QUICK AMOUNT BUTTONS
    ========================================= */

    const quickButtons =
        document.querySelectorAll(".quick-amounts button");

    quickButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const amount =
                Number(this.dataset.amount);

            amountInput.value = amount;

            updateSummary();

        });

    });


    /* =========================================
       UPDATE SUMMARY
    ========================================= */

    function updateSummary() {

        let amount = Number(amountInput.value);

        if (!amount || amount < 0) {
            amount = 0;
        }

        summaryAmount.textContent =
            formatMoney(amount);

        summaryTotal.textContent =
            formatMoney(amount);

    }


    amountInput.addEventListener(
        "input",
        updateSummary
    );


    /* =========================================
       OPEN CONFIRMATION
    ========================================= */

    addMoneyForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const amount =
                Number(amountInput.value);

            const method =
                fundingMethod.value;


            if (!amount || amount < 100) {

                alert(
                    "Please enter an amount of at least ₦100."
                );

                amountInput.focus();

                return;
            }


            if (!method) {

                alert(
                    "Please select a funding method."
                );

                fundingMethod.focus();

                return;
            }


            let methodName = "—";


            if (method === "bank-card") {
                methodName = "Debit / ATM Card";
            }


            if (method === "bank-transfer") {
                methodName = "Bank Transfer";
            }


            confirmAmount.textContent =
                formatMoney(amount);

            confirmTotal.textContent =
                formatMoney(amount);

            confirmMethod.textContent =
                methodName;


            modal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }
    );


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeAddMoneyModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    document
        .getElementById("closeAddMoneyModal")
        .addEventListener(
            "click",
            closeAddMoneyModal
        );


    document
        .getElementById("addMoneyModalClose")
        .addEventListener(
            "click",
            closeAddMoneyModal
        );


    document
        .getElementById("cancelAddMoney")
        .addEventListener(
            "click",
            closeAddMoneyModal
        );


    /* =========================================
       CONTINUE FUNDING
       
       REAL MONEY PROCESSING WILL BE CONNECTED
       THROUGH THE SECURE BACKEND LATER.
    ========================================= */

    document
        .getElementById("confirmAddMoney")
        .addEventListener(
            "click",
            function () {

                alert(
                    "Funding request confirmed. Payment processing will be connected to the secure backend."
                );

                closeAddMoneyModal();

            }
        );

});
/* =========================================
   WITHDRAW MONEY PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const withdrawForm =
        document.getElementById("withdrawForm");

    if (!withdrawForm) {
        return;
    }


    const amountInput =
        document.getElementById("withdrawAmount");

    const withdrawMethod =
        document.getElementById("withdrawMethod");

    const withdrawAccount =
        document.getElementById("withdrawAccount");

    const withdrawBank =
        document.getElementById("withdrawBank");

    const withdrawAccountName =
        document.getElementById("withdrawAccountName");

    const accountMessage =
        document.getElementById("withdrawAccountMessage");


    const summaryAmount =
        document.getElementById("withdrawSummaryAmount");

    const withdrawFee =
        document.getElementById("withdrawFee");

    const summaryTotal =
        document.getElementById("withdrawSummaryTotal");


    const modal =
        document.getElementById("withdrawModal");


    const confirmAmount =
        document.getElementById("confirmWithdrawAmount");

    const confirmBank =
        document.getElementById("confirmWithdrawBank");

    const confirmAccount =
        document.getElementById("confirmWithdrawAccount");

    const confirmFee =
        document.getElementById("confirmWithdrawFee");

    const confirmTotal =
        document.getElementById("confirmWithdrawTotal");


    /*
     * Withdrawal fee is deliberately kept as a
     * configurable frontend value for now.
     *
     * In the real banking system, the server
     * must calculate and enforce the fee.
     */

    const WITHDRAWAL_FEE = 0;


    function formatMoney(amount) {

        return "₦" + Number(amount).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    }


    /* =========================================
       QUICK AMOUNT BUTTONS
    ========================================= */

    const quickButtons =
        document.querySelectorAll(
            ".withdraw-quick button"
        );


    quickButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                amountInput.value =
                    this.dataset.withdraw;

                updateWithdrawSummary();

            }
        );

    });


    /* =========================================
       UPDATE SUMMARY
    ========================================= */

    function updateWithdrawSummary() {

        let amount =
            Number(amountInput.value);


        if (!amount || amount < 0) {
            amount = 0;
        }


        const total =
            amount + WITHDRAWAL_FEE;


        summaryAmount.textContent =
            formatMoney(amount);


        withdrawFee.textContent =
            formatMoney(WITHDRAWAL_FEE);


        summaryTotal.textContent =
            formatMoney(total);

    }


    amountInput.addEventListener(
        "input",
        updateWithdrawSummary
    );


    /* =========================================
       ACCOUNT NUMBER
    ========================================= */

    withdrawAccount.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

            withdrawAccountName.value = "";

            accountMessage.textContent = "";


            if (this.value.length === 10) {

                /*
                 * Temporary frontend state only.
                 *
                 * Real account-name verification must
                 * be performed by the secure backend
                 * through the appropriate banking/provider
                 * infrastructure.
                 */

                withdrawAccountName.value =
                    "Account verification pending";

                accountMessage.textContent =
                    "Account details will be verified securely before processing.";

                accountMessage.style.color =
                    "#087a3d";

            }

        }
    );


    /* =========================================
       FORM SUBMISSION
    ========================================= */

    withdrawForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const amount =
                Number(amountInput.value);


            const account =
                withdrawAccount.value.trim();


            const bank =
                withdrawBank.value;


            if (!amount || amount < 100) {

                alert(
                    "Please enter a withdrawal amount of at least ₦100."
                );

                amountInput.focus();

                return;
            }


            if (withdrawMethod.value !== "bank-transfer") {

                alert(
                    "Please select a withdrawal method."
                );

                withdrawMethod.focus();

                return;
            }


            if (account.length !== 10) {

                alert(
                    "Please enter a valid 10-digit destination account number."
                );

                withdrawAccount.focus();

                return;
            }


            if (!bank) {

                alert(
                    "Please select the destination bank."
                );

                withdrawBank.focus();

                return;
            }


            const bankName =
                withdrawBank.options[
                    withdrawBank.selectedIndex
                ].text;


            const total =
                amount + WITHDRAWAL_FEE;


            confirmAmount.textContent =
                formatMoney(amount);


            confirmBank.textContent =
                bankName;


            confirmAccount.textContent =
                account;


            confirmFee.textContent =
                formatMoney(WITHDRAWAL_FEE);


            confirmTotal.textContent =
                formatMoney(total);


            modal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }
    );


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeWithdrawModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    document
        .getElementById("closeWithdrawModal")
        .addEventListener(
            "click",
            closeWithdrawModal
        );


    document
        .getElementById("withdrawModalClose")
        .addEventListener(
            "click",
            closeWithdrawModal
        );


    document
        .getElementById("cancelWithdraw")
        .addEventListener(
            "click",
            closeWithdrawModal
        );


    /* =========================================
       CONFIRM WITHDRAWAL
       
       REAL MONEY PROCESSING IS NOT DONE HERE.
       The secure backend will handle the actual
       withdrawal after we build it.
    ========================================= */

    document
        .getElementById("confirmWithdraw")
        .addEventListener(
            "click",
            function () {

                alert(
                    "Withdrawal request confirmed. Secure backend processing will be connected later."
                );

                closeWithdrawModal();

            }
        );

});
