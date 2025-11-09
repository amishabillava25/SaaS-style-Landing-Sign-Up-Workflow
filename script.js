// === Toggle signup section ===
const signupBtn = document.getElementById("signup-btn");
const signupSection = document.getElementById("signup-section");
const dashboardSection = document.getElementById("dashboard-section");
const landingSections = [document.getElementById("hero"), document.getElementById("features")];

signupBtn.addEventListener("click", () => {
  landingSections.forEach(sec => sec.classList.add("hidden"));
  signupSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Signup form ===
const signupForm = document.getElementById("signup-form");
const formMessage = document.getElementById("form-message");
const userNameSpan = document.getElementById("user-name");

signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    formMessage.textContent = "❌ Please fill all fields!";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "✅ Successfully signed up!";
  formMessage.style.color = "green";

  setTimeout(() => {
    signupSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
    userNameSpan.textContent = name;
  }, 1200);
});

// === Logout ===
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  dashboardSection.classList.add("hidden");
  landingSections.forEach(sec => sec.classList.remove("hidden"));
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Contact form ===
const contactForm = document.getElementById("contact-form");
const contactMsg = document.getElementById("contact-message");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  contactMsg.textContent = "✅ Message sent successfully!";
  contactMsg.style.color = "green";
  contactForm.reset();
});
