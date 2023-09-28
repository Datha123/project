// public/js/script.js

// Get references to the "Sign Up" and "Sign In" buttons
const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton');

// Add click event listeners to the buttons
signupButton.addEventListener('click', () => {
    // Navigate to the sign-up page
    window.location.href = '/signup';
});

signinButton.addEventListener('click', () => {
    // Navigate to the sign-in page
    window.location.href = '/signin';
});

// Add any other JavaScript functionality here
