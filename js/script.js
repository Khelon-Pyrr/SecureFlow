/* ==========================================================================
   SecureFlow Solutions - Main JavaScript File
   ========================================================================== 
   Handles interactivity, navigation, and scroll-triggered animations.
   ========================================================================== */

/**
 * Toggles the visibility of the mobile navigation menu.
 * It adds or removes the 'active' class on both the hamburger icon
 * and the navigation links container to trigger CSS transitions.
 */
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    // Toggle the 'active' state to slide menu in/out and animate hamburger icon
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * Navbar Scroll Effect
 * Listens for scroll events on the window. If the user scrolls down
 * more than 50 pixels, it adds a 'scrolled' class to the navigation bar.
 * This class applies a smaller padding and a shadow for better visibility.
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    // Check vertical scroll position
    if (window.scrollY > 50) {
        nav.classList.add('scrolled'); // Apply compact/shadowed style
    } else {
        nav.classList.remove('scrolled'); // Revert to transparent/larger style
    }
});

/* ==========================================================================
   Intersection Observers for Scroll Animations
   ========================================================================== 
   We use IntersectionObserver to detect when elements enter the viewport.
   This is more performant than binding to the scroll event directly.
   ========================================================================== */

// Shared options for both observers
// trigger when 10% of the element is visible, but artificially extend the 
// bottom margin so animations trigger slightly before scrolling them into view.
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

/**
 * General Section Fade-in Animation
 * Observes all <section> elements and adds a 'visible' class when they 
 * enter the viewport, triggering CSS opacity/transform transitions.
 */
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // If the section is in the viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Trigger animation
        }
    });
}, observerOptions);

// Initialize the section observer
// First add the initial 'fade-in' setup class, then start observing
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
});

/**
 * Staggered Team Card Animations
 * Specifically observes the team member cards to trigger staggered animations.
 * Unlike the section observer, this unobserves the element after the first 
 * animation to prevent it from animating repeatedly when scrolling up and down.
 */
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Trigger animation
            cardObserver.unobserve(entry.target); // Stop observing after first reveal
        }
    });
}, observerOptions);

// Initialize the card observer for all team member cards
document.querySelectorAll('.team-card').forEach(card => {
    cardObserver.observe(card);
});
