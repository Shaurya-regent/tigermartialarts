// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".menu-toggle");

  if (menu && !menu.contains(event.target) && !toggle.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// Set active navigation link based on current page
function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

// Tabs functionality
function initTabs() {
  const tabTriggers = document.querySelectorAll(".tab-trigger");
  const tabContents = document.querySelectorAll(".tab-content");

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked trigger and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// Animation on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-on-scroll");
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document
    .querySelectorAll(".card, .section-header, .hero-text")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Form submission handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const program = formData.get("program");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Show success message (in real app, you'd send to server)
      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success";
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you, ${name}! We'll contact you soon to schedule your free trial class.</span>
      `;

      // Insert success message above form
      contactForm.parentNode.insertBefore(successMessage, contactForm);

      // Reset form
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setActiveNavigation();
  initTabs();
  initScrollAnimations();
  initContactForm();
});

// Smooth scrolling for anchor links (if any exist on page)
document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add loading animation for page transitions
function showPageLoading() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="loader-content">
      <i class="fas fa-spinner fa-spin"></i>
      <span>Loading...</span>
    </div>
  `;
  document.body.appendChild(loader);

  // Remove loader after a short delay
  setTimeout(() => {
    loader.remove();
  }, 500);
}

// Add page loading to navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("a[href$='.html']");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Only show loading for external page navigation
      if (
        this.getAttribute("href") !== window.location.pathname.split("/").pop()
      ) {
        showPageLoading();
      }
    });
  });
});

// Login Modal Functions
function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    // Reset to login form
    switchToLogin();
  }
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function switchToLogin() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const modalTitle = document.getElementById("modalTitle");

  if (loginForm && signupForm && modalTitle) {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    modalTitle.textContent = "Sign in to Tiger Martial Arts";
  }
}

function switchToSignup() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const modalTitle = document.getElementById("modalTitle");

  if (loginForm && signupForm && modalTitle) {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    modalTitle.textContent = "Join Tiger Martial Arts";
  }
}

// Close modal when clicking outside
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeLoginModal();
      }
    });
  }

  // Handle form submissions (placeholder for Firebase integration)
  const loginForm = document.querySelector("#loginForm form");
  const signupForm = document.querySelector("#signupForm form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("signupFirstName").value;
      const lastName = document.getElementById("signupLastName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword",
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

    
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLoginModal();
    }
  });
});
