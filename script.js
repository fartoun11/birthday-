/* =========================
   SETTINGS
========================= */

// بدّل هنا الـ code اللي تحب عليه
const SECRET_CODE = "1234";


/* =========================
   ELEMENTS
========================= */

const envelope = document.getElementById("envelope");
const heartBtn = document.getElementById("heartBtn");

const continueBtn = document.getElementById("continueBtn");
const codeSection = document.getElementById("codeSection");

const codeInputs = document.querySelectorAll(".code-input");
const openBtn = document.getElementById("openBtn");

const error = document.getElementById("error");


/* =========================
   OPEN ENVELOPE
========================= */

heartBtn.addEventListener("click", () => {

    envelope.classList.add("open");

    // يظهر زر Continue بعد ما يكمل الـ message
    setTimeout(() => {
        continueBtn.classList.add("show");
    }, 3900);

});


/* =========================
   SHOW CODE
========================= */

continueBtn.addEventListener("click", () => {

    codeSection.classList.add("show");

    // أول input يتعمله focus تلقائياً
    setTimeout(() => {
        codeInputs[0].focus();
    }, 500);

});


/* =========================
   MOVE BETWEEN INPUTS
========================= */

codeInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        // نخلي الرقم فقط
        input.value = input.value.replace(/[^0-9]/g, "");

        // يمشي للـ input اللي بعده
        if (input.value && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
        }

    });


    input.addEventListener("keydown", (event) => {

        // Backspace يرجع للـ input السابق
        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {
            codeInputs[index - 1].focus();
        }

    });

});


/* =========================
   CHECK CODE
========================= */

openBtn.addEventListener("click", () => {

    let enteredCode = "";

    codeInputs.forEach(input => {
        enteredCode += input.value;
    });


    if (enteredCode === SECRET_CODE) {

        error.classList.remove("show");

        // animation صغيرة قبل الانتقال
        codeSection.style.transform = "scale(1.1)";
        codeSection.style.opacity = "0";

        setTimeout(() => {

            window.location.href = "page2.html";

        }, 600);

    } else {

        error.classList.add("show");

        // clear inputs
        codeInputs.forEach(input => {
            input.value = "";
        });

        codeInputs[0].focus();

        // shake animation
        codeSection.querySelector(".code-card").animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 400
            }
        );

    }

});