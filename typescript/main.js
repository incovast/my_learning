"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Grab all DOM elements and cast them so TypeScript knows what they are
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupForm = document.getElementById("signupForm");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const signupResponse = document.getElementById("SignupResponse");
function validateName(name) {
    if (name.trim().length < 3)
        return "Name must be atleast 3 characters long";
    return "";
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return "return please enter a valid email address";
    return "";
}
function validatePassword(password) {
    if (password.length < 6)
        return "password should be 6 characters long";
    return "";
}
nameInput.addEventListener("input", () => {
    nameError.textContent = validateName(nameInput.value);
});
emailInput.addEventListener("input", () => {
    emailError.textContent = validateEmail(emailInput.value);
});
passwordInput.addEventListener("input", () => {
    passwordError.textContent = validatePassword(passwordInput.value);
});
signupForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const passwordErr = validatePassword(passwordInput.value);
    // update UI
    nameError.textContent = nameErr;
    emailError.textContent = emailErr;
    passwordError.textContent = passwordErr;
    if (nameErr || emailErr || passwordErr) {
        alert("Please fix the errors in the form before submitting.");
    }
    else {
        const payload = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };
        try {
            const response = yield fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = (yield response.json());
            signupResponse.classList.remove("hidden");
            signupResponse.textContent = JSON.stringify(data, null, 2);
            //alert("server response: " + JSON.stringify(data, null, 2));
        }
        catch (error) {
            alert("An error occurred while submitting the form. Please try again later.");
        }
    }
}));
