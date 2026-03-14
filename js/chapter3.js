/* Chapter 3 JS — terminal typewriter & animations */
document.addEventListener('DOMContentLoaded', () => {

    // Hero terminal typewriter
    const cmdEl = document.getElementById('hero-cmd');
    const outEl = document.getElementById('hero-out');

    const demos = [
        { cmd: 'sudo apt install zorin-os-education', out: 'Setting up zorin-os-education...' },
        { cmd: 'ls /usr/bin/ | wc -l', out: '1,247 programs available' },
        { cmd: 'uname -r', out: '6.8.0-51-generic' },
        { cmd: 'cat /etc/os-release | head -2', out: 'NAME="Zorin OS"' },
    ];

    let di = 0;

    function typeCmd(text, callback) {
        if (!cmdEl) return;
        cmdEl.textContent = '';
        let i = 0;
        const iv = setInterval(() => {
            cmdEl.textContent += text[i++];
            if (i >= text.length) {
                clearInterval(iv);
                setTimeout(callback, 800);
            }
        }, 45);
    }

    function clearCmd(callback) {
        if (!cmdEl) return;
        let txt = cmdEl.textContent;
        const iv = setInterval(() => {
            txt = txt.slice(0, -1);
            cmdEl.textContent = txt;
            if (!txt.length) {
                clearInterval(iv);
                if (outEl) outEl.style.display = 'none';
                setTimeout(callback, 300);
            }
        }, 20);
    }

    function runDemo() {
        const demo = demos[di % demos.length];
        typeCmd(demo.cmd, () => {
            if (outEl) {
                outEl.textContent = demo.out;
                outEl.style.display = 'flex';
            }
            di++;
            setTimeout(() => clearCmd(runDemo), 2200);
        });
    }

    if (cmdEl) setTimeout(runDemo, 600);

    // Animate command cards on scroll with stagger
    const cmdCards = document.querySelectorAll('.cmd-card, .apt-card, .adv-item, .method-card, .prob-card');
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

    cmdCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(14px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s, border-color 0.3s';
        observer.observe(card);
    });

});
