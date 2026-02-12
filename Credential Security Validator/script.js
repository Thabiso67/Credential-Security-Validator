// Get references to elements
const passwordInput = document.getElementById("password");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const gifContainer = document.getElementById("gifContainer");

checkBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  const strength = checkStrength(password);

  // Reset text + GIF each time
  result.textContent = `Password Strength: ${strength}`;
  gifContainer.innerHTML = "";

  // Change color based on strength
   if (strength === "Nothing Entered")
    result.style.color = "red";
  if (strength === "Weak") {
    result.style.color = "orange";
  } else if (strength === "Medium") {
    result.style.color = "yellow";
  } else if (strength === "Strong") {
    result.style.color = "green";

    // Add the GIF only for strong passwords
    gifContainer.innerHTML = `
      <img src="Images/arnold schwarzenegger flexing.gif"
           alt="Strong Password"
           style="width: 120px; height: auto;">
    `;
  }
});

// Strength scoring function
function checkStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W]/.test(password)) score++;

  if (score <= 0) return "Nothing Entered";
  if (score <= 2) return "Weak";
  else if (score <= 4) return "Medium";
  else return "Strong";
}
