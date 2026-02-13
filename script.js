// Elements
const passwordInput = document.getElementById("password");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const gifContainer = document.getElementById("gifContainer");

// Criteria list items
const criteriaEls = {
  length: document.getElementById("c-length"),
  upper: document.getElementById("c-upper"),
  lower: document.getElementById("c-lower"),
  number: document.getElementById("c-number"),
  special: document.getElementById("c-special"),
};

const CRITERIA = [
  { key: "length", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { key: "upper",  label: "Uppercase letter",     test: (pw) => /[A-Z]/.test(pw) },
  { key: "lower",  label: "Lowercase letter",     test: (pw) => /[a-z]/.test(pw) },
  { key: "number", label: "Number",              test: (pw) => /\d/.test(pw) },
  // Special character = non-alphanumeric. Underscore is treated as special by \W? No.
  // Use an explicit class for clarity.
  { key: "special",label: "Special character",    test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function evaluatePassword(password) {
  // Empty input
  if (!password || password.length === 0) {
    return {
      strength: "Nothing Entered",
      met: Object.fromEntries(CRITERIA.map(c => [c.key, false])),
      score: 0,
    };
  }

  // Evaluate criteria
  const met = {};
  let score = 0;
  for (const c of CRITERIA) {
    met[c.key] = c.test(password);
    if (met[c.key]) score += 1;
  }

  // Strength mapping (same logic as your original, but safer)
  let strength = "Weak";
  if (score <= 2) strength = "Weak";
  else if (score <= 4) strength = "Medium";
  else strength = "Strong";

  return { strength, met, score };
}

function setCriterionState(liEl, isMet) {
  if (!liEl) return;
  liEl.classList.toggle("met", isMet);
  liEl.classList.toggle("not-met", !isMet);

  const status = liEl.querySelector(".status");
  if (status) status.textContent = isMet ? "✓" : "○";
}

function updateUI() {
  const password = passwordInput.value;
  const { strength, met } = evaluatePassword(password);

  // Update result text
  result.textContent = `Password Strength: ${strength}`;

  // Update color + GIF
  gifContainer.innerHTML = "";
  result.className = ""; // reset any previous classes

  if (strength === "Nothing Entered") {
    result.classList.add("strength-none");
  } else if (strength === "Weak") {
    result.classList.add("strength-weak");
  } else if (strength === "Medium") {
    result.classList.add("strength-medium");
  } else {
    result.classList.add("strength-strong");
    gifContainer.innerHTML = `
      <img src="Images/arnold schwarzenegger flexing.gif"
           alt="Strong Password"
           width="120" height="120">
    `;
  }

  // Update checklist
  for (const c of CRITERIA) {
    setCriterionState(criteriaEls[c.key], met[c.key]);
  }
}

// Button click (kept for your original UX)
checkBtn.addEventListener("click", updateUI);

// Live feedback while typing
passwordInput.addEventListener("input", updateUI);

// Initialize on load
updateUI();
