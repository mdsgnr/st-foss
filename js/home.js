/* Home page specific JS */
// Particle animation on hero
document.addEventListener('DOMContentLoaded', () => {
    // Animate orbit icons with a slight delay for stagger
    document.querySelectorAll('.orbit-icon').forEach((icon, i) => {
        icon.style.animationDelay = `${i * -3}s`;
    });
});
