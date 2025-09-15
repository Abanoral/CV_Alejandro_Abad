(function () {
    const params = new URLSearchParams(window.location.search);
    const buttons = document.querySelectorAll('.lang-switch button');
    const preferred =
        params.get('lang') ||
        localStorage.getItem('cv_lang') ||
        (navigator.language || 'es').slice(0, 2);
    const lang = preferred === 'en' ? 'en' : 'es';

    function setActiveButton(l) {
        buttons.forEach((b) =>
            b.classList.toggle('active', b.dataset.lang === l)
        );
    }

    function applyI18n(dict) {
        // Update text nodes
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        // Update attributes
        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            const spec = el.getAttribute('data-i18n-attr');
            spec.split(',').forEach((pair) => {
                const [attr, key] = pair.split(':').map((s) => s.trim());
                if (dict[key]) el.setAttribute(attr, dict[key]);
            });
        });
        // Title & meta
        if (dict['doc.title']) document.title = dict['doc.title'];
        const meta = document.querySelector('#metaDescription');
        if (meta && dict['doc.metaDescription']) {
            meta.setAttribute('content', dict['doc.metaDescription']);
        }
        // html lang
        document.documentElement.setAttribute('lang', lang);
        setActiveButton(lang);
    }

    function loadAndApply(l) {
        fetch(`assets/i18n/${l}.json`)
            .then((r) => r.json())
            .then((dict) => applyI18n(dict))
            .catch(() => setActiveButton(l));
    }

    // Initial load
    loadAndApply(lang);
    localStorage.setItem('cv_lang', lang);

    // Wire buttons
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const l = btn.dataset.lang;
            localStorage.setItem('cv_lang', l);
            const url = new URL(window.location);
            url.searchParams.set('lang', l);
            history.replaceState(null, '', url.toString());
            loadAndApply(l);
        });
    });
})();
