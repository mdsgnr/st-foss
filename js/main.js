/* ===================================================
   FOSS Course - Shared JavaScript
   Classia by Mr. Mirad M
   =================================================== */

// ─── THEME MANAGEMENT ───────────────────────────────
const THEME_KEY = 'foss-theme';

function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleIcons(theme);
}

function updateThemeToggleIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<span class="material-symbols-outlined">light_mode</span>'
            : '<span class="material-symbols-outlined">dark_mode</span>';
        btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    });
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ─── SCROLL REVEAL ───────────────────────────────────
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── ACTIVE TOC HIGHLIGHTING ─────────────────────────
function initActiveToc() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (!tocLinks.length) return;

    const sectionIds = Array.from(tocLinks).map(a => a.getAttribute('href')?.replace('#', '')).filter(Boolean);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-15% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ─── SMOOTH TOC SCROLL ───────────────────────────────
function initSmoothTocScroll() {
    document.querySelectorAll('.toc-list a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ─── NAV SHADOW ON SCROLL ────────────────────────────
function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.15)' : '';
    }, { passive: true });
}

// ─── COPY CODE BLOCKS ────────────────────────────────
function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);

        const btn = document.createElement('button');
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">content_copy</span>';
        btn.title = 'Copy code';
        btn.style.cssText = `
      position: absolute; top: 0.5rem; right: 0.5rem;
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 6px; padding: 0.25rem 0.5rem; cursor: pointer;
      font-size: 0.8rem; opacity: 0; transition: opacity 0.2s;
      color: var(--text-muted); display: flex; align-items: center;
    `;

        wrapper.addEventListener('mouseenter', () => btn.style.opacity = '1');
        wrapper.addEventListener('mouseleave', () => btn.style.opacity = '0');

        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;color:#4ade80">check</span>';
                setTimeout(() => btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">content_copy</span>', 1800);
            });
        });

        wrapper.appendChild(btn);
    });
}

// ─── ACTIVE TOC LINK STYLE ───────────────────────────
(function addTocActiveStyle() {
    const style = document.createElement('style');
    style.textContent = `
    .toc-list a.active {
      background: var(--bg-accent);
      color: var(--accent-primary);
      padding-left: 1rem;
    }
    .toc-list li.toc-sub a.active {
      padding-left: 1.75rem;
    }
  `;
    document.head.appendChild(style);
})();

// ─── INIT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Apply stored theme immediately
    applyTheme(getStoredTheme());

    // Wire up theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    initScrollReveal();
    initActiveToc();
    initSmoothTocScroll();
    initNavScroll();
    initCodeCopy();
});

// Apply theme as early as possible to avoid flash
applyTheme(getStoredTheme());
