// Reading progress bar shown on article pages
document.addEventListener('DOMContentLoaded', () => {
    // Only on single article pages (has main.content article)
    const article = document.querySelector('article');
    if (!article) return;

    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const update = () => {
        const docH = document.documentElement;
        const total = docH.scrollHeight - docH.clientHeight;
        const scrolled = window.scrollY;
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
});
