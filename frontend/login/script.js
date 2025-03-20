document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.msg); // Show error message from server
                    return;
                }

                // Store token and redirect (adjust as needed)
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect after login

            } catch (error) {
                console.error("Error during login:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
