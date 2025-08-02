# NextGen Arrivals - Static Frontend

A modern, responsive landing page for the NextGen SmartWatch X, featuring:

* Mobile-first, responsive design using CSS media queries
* Collapsible navigation menu for mobile
* Dark mode toggle
* Early access signup form (front-end only)
* Feature highlights with icons
* Social media links
* **Contact form with validation** (Name, Email, Message, error/success messages)

## Features

* **Responsive Layout:**  
   * Uses CSS Flexbox and Grid for flexible layouts  
   * Media queries for breakpoints at 900px and 768px  
   * Stacks columns vertically and reduces font sizes on mobile  
   * Navigation collapses into a hamburger menu on small screens  
   * Images scale fluidly within containers  
   * Prevents horizontal overflow and scrolling issues
* **Dark Mode:**  
   * Toggle button to switch between light and dark themes
* **Signup Form:**  
   * Collects email for early access (no backend integration)  
   * Shows a thank you message on submit
* **Contact Form:**  
   * Fields: Name, Email, Message  
   * JavaScript validation for non-empty fields and valid email (regex)  
   * Error messages shown below each field if invalid  
   * Prevents submission if invalid, shows success message if valid  
   * Handles edge cases (empty, invalid email, special characters)
* **Tech Stack:**  
   * HTML5  
   * CSS3 (custom properties, flex, grid, media queries)  
   * JavaScript (for nav toggle, dark mode, form handling, and contact validation)

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── src/                # Assets directory
│   ├── logo.png        # Company logo
│   ├── smartwatch-hero.jpg  # Hero image
│   ├── feature1.png    # Feature images
│   ├── feature2.png
│   ├── feature3.png
│   ├── feature4.png
│   ├── facebook.svg    # Social media icons
│   ├── instagram.svg
│   └── twitter.svg
└── README.md           # This file
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. No build process or dependencies required

## Notes

* This is a **static frontend-only** project
* All buttons and forms are for demonstration purposes only
* No backend functionality or data persistence
* Images and icons are placeholders—replace with your own as needed

---

© 2025 NextGen Arrivals. All rights reserved.
