// script.js for NextGen Arrivals responsive nav and form

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
    });

    // Simple email signup handler (no backend)
    const form = document.querySelector('.signup-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
            form.innerHTML = `<span style='color:#1a73e8;font-weight:bold;'>Thank you for signing up!</span>`;
        }
    });

    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Clear previous errors
            document.getElementById('name-error').textContent = '';
            document.getElementById('email-error').textContent = '';
            document.getElementById('message-error').textContent = '';
            document.getElementById('contact-success').textContent = '';

            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();
            let valid = true;

            // Name validation
            if (!name) {
                document.getElementById('name-error').textContent = 'Name is required.';
                valid = false;
            }

            // Email validation (regex)
            const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required.';
                valid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                valid = false;
            }

            // Message validation
            if (!message) {
                document.getElementById('message-error').textContent = 'Message is required.';
                valid = false;
            }

            if (valid) {
                document.getElementById('contact-success').textContent = 'Thank you for contacting us! We will get back to you soon.';
                contactForm.reset();
            }
        });
    }
});
