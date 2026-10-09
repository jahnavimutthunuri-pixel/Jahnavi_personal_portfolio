// ES6+ interactions: theme switcher, project filter, navigation state and form validation.
const themeToggle = document.querySelector("#themeToggle");
const root = document.documentElement;

const setTheme = (theme) => {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeToggle.innerHTML = isLight
    ? '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>'
    : '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
};

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

const filterButtons = [...document.querySelectorAll(".filter-btn")];
const projectItems = [...document.querySelectorAll(".project-item")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectItems.forEach((project) => {
      const shouldShow = selectedFilter === "all" || project.dataset.category === selectedFilter;
      project.classList.toggle("d-none", !shouldShow);
    });
  });
});

const navLinks = [...document.querySelectorAll(".nav-link")];
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    const navMenu = document.querySelector("#portfolioNav");
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

const contactForm = document.querySelector("#contactForm");
const feedback = document.querySelector("#formFeedback");
const fields = {
  fullName: document.querySelector("#fullName"),
  email: document.querySelector("#email"),
  subject: document.querySelector("#subject"),
  message: document.querySelector("#message")
};

const validators = {
  fullName: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  subject: (value) => value.trim().length > 0,
  message: (value) => value.trim().length >= 10
};

Object.entries(fields).forEach(([key, field]) => {
  field.addEventListener("input", () => {
    const valid = validators[key](field.value);
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isFormValid = true;

  Object.entries(fields).forEach(([key, field]) => {
    const valid = validators[key](field.value);
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
    if (!valid) isFormValid = false;
  });

  feedback.className = "form-feedback mt-3";
  if (!isFormValid) {
    feedback.textContent = "Please review the highlighted fields and correct the information.";
    feedback.classList.add("error");
    const firstInvalid = contactForm.querySelector(".is-invalid");
    firstInvalid?.focus();
    return;
  }

  feedback.textContent = "Thank you! Your details passed validation. This demo form is not connected to an email service yet.";
  feedback.classList.add("success");
  contactForm.reset();
  Object.values(fields).forEach((field) => field.classList.remove("is-valid", "is-invalid"));
});

document.querySelector("#year").textContent = new Date().getFullYear();
setTheme("dark");
