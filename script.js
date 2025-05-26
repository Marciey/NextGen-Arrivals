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
});
