document.addEventListener("DOMContentLoaded", function () {
    const passwordToggles = document.querySelectorAll(".toggle-password");
  
    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling;
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          this.textContent = "🙈";
        } else {
          passwordInput.type = "password";
          this.textContent = "👁️";
        }
      });
    });
  
    const form = document.getElementById("signup-form");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const email = form.querySelector('input[type="email"]').value;
      const firstName = form.querySelectorAll('input[type="text"]')[0].value;
      const lastName = form.querySelectorAll('input[type="text"]')[1].value;
      const phone = form.querySelector('input[type="tel"]').value;
      const password = form.querySelectorAll('input[type="password"]')[0].value;
      const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
  
      const userData = { firstName, lastName, email, phone, password, confirmPassword };
  
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Sign-up successful! You can now log in.");
          window.location.href = "C:/sgp/frontend/signup/lindex.html"; // Redirect to login page
        } else {
          alert(`Error: ${result.msg}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong! Please try again.");
      }
    });
  });
  