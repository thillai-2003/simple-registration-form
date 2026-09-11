const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxCDXzr8RkfU0sK9YJUxsEJaUnepHKrOaPC_wug3tmCVyU3yiAN9uHlmfBYuEgUtHhWZg/exec";

const form = document.getElementById("userForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;

    const data = {
        name: name,
        age: age,
        mobile: mobile
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        alert("Registration successful!");

        form.reset();

    } catch (error) {
        console.error(error);

        alert("Something went wrong!");
    }
});