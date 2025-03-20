// Remove the old get-started click handler since we're using links now
// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add fade effect to page transitions
    document.body.style.opacity = '1';
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navRight = document.querySelector('.nav-right');

mobileMenuToggle.addEventListener('click', () => {
    navRight.classList.toggle('active');
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('rotate-negative-45');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navRight.classList.contains('active')) {
        navRight.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navRight.classList.remove('active');
        }
    });
});

// Ripple Effect
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Number Counter Animation
function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 16);
    const isThousands = end >= 1000;

    const animate = () => {
        current += increment;
        if (current >= end) {
            current = end;
        }

        const displayValue = isThousands 
            ? `${(current / 1000).toFixed(1)}k+`
            : `${Math.floor(current)}+`;
        
        element.textContent = displayValue;

        if (current < end) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-number')) {
                const count = parseInt(entry.target.getAttribute('data-count'));
                animateNumber(entry.target, 0, count, 2000);
            }
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.hero-text, .hero-image, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe stat numbers for counter animation
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .rotate-45 {
        transform: rotate(45deg) translate(5px, 5px) !important;
    }

    .opacity-0 {
        opacity: 0 !important;
    }

    .rotate-negative-45 {
        transform: rotate(-45deg) translate(7px, -6px) !important;
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .hero-image {
        animation: float 6s ease-in-out infinite;
    }
`;

document.head.appendChild(style);

// Password Visibility Toggle
document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Sign Up Form Handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Collect form data
        const formData = {
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value,
            password: password
        };

        // Here you would typically send the data to your server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Account created successfully! Redirecting to login...');
        // Redirect to login page (you can change this to your actual login page)
        // window.location.href = '/login';
    });
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove all non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Format the number
        if (value.length > 0) {
            if (value.length <= 3) {
                this.value = value;
            } else if (value.length <= 6) {
                this.value = value.slice(0,3) + '-' + value.slice(3);
            } else {
                this.value = value.slice(0,3) + '-' + value.slice(3,6) + '-' + value.slice(6,10);
            }
        }
    });
}

// Input validation styling
document.querySelectorAll('.signup-form input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    });
});