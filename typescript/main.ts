interface signupPayLoad {
  name: string;
  email: string;
  password: string;
}
interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}
// Grab all DOM elements and cast them so TypeScript knows what they are
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const signupForm = document.getElementById("signupForm") as HTMLFormElement;

const nameError = document.getElementById("nameError") as HTMLElement;
const emailError = document.getElementById("emailError") as HTMLElement;
const passwordError = document.getElementById("passwordError") as HTMLElement;
const signupResponse = document.getElementById("SignupResponse") as HTMLElement;

function validateName(name: string): string {
  if (name.trim().length < 3) return "Name must be atleast 3 characters long";
  return "";
}
function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return "return please enter a valid email address";
  return "";
}
function validatePassword(password: string): string {
  if (password.length < 6) return "password should be 6 characters long";
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

signupForm.addEventListener("submit", async (e: Event) => {
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
  } else {
    const payload: signupPayLoad = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = (await response.json()) as APIResponse;
      signupResponse.classList.remove("hidden");
      signupResponse.textContent = JSON.stringify(data, null, 2);
      //alert("server response: " + JSON.stringify(data, null, 2));
    } catch (error) {
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  }
});
