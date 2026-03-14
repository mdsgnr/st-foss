/* Chapter 2 JS */
document.addEventListener('DOMContentLoaded', () => {
    // Animate license cards on scroll
    const licCards = document.querySelectorAll('.lic-card, .lf-card, .freedom-card, .alg2-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    licCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s';
        observer.observe(card);
    });

    // Animate copyleft chain
    const chain = document.querySelector('.copyleft-chain');
    if (chain) {
        const chainObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const steps = chain.querySelectorAll('.cc-step, .cc-arrow');
                steps.forEach((el, i) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                    }, i * 150);
                });
                chainObs.unobserve(chain);
            }
        }, { threshold: 0.2 });

        chain.querySelectorAll('.cc-step, .cc-arrow').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-15px)';
            el.style.transition = 'opacity 0.4s, transform 0.4s';
        });

        chainObs.observe(chain);
    }
});
