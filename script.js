const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxCDXzr8RkfU0sK9YJUxsEJaUnepHKrOaPC_wug3tmCVyU3yiAN9uHlmfBYuEgUtHhWZg/exec";

const form = document.getElementById("userForm");
const submitButton = document.getElementById("submitButton");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    // Frontend validation
    if (!name) {
        showMessage("Please enter your name.", "error");
        return;
    }

    if (!age) {
        showMessage("Please enter your age.", "error");
        return;
    }

    const ageNumber = Number(age);

    if (ageNumber < 1 || ageNumber > 120) {
        showMessage("Please enter a valid age.", "error");
        return;
    }

    if (!mobile) {
        showMessage("Please enter your mobile number.", "error");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showMessage(
            "Please enter a valid 10-digit mobile number.",
            "error"
        );
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const data = {
        name: name,
        age: ageNumber,
        mobile: mobile
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        showMessage(
            "Registration submitted successfully!",
            "success"
        );

        form.reset();

    } catch (error) {
        console.error(error);

        showMessage(
            "Something went wrong. Please try again.",
            "error"
        );

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    }
});


function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}