export function navigateTo(href) {
    document.body.dataset.loading = "true";
    window.setTimeout(() => {
        location.href = href;
    }, 250);
}

export function commonPageInit() {
    if (document.body.dataset.locked === "true" && !localStorage.getItem('password')) {
        location.href = `password.html?destination=.${location.pathname}`;
        return;
    }
    for (const link of document.querySelectorAll('[data-nav-link]')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.href);
        });
        if (link.href !== location.href) continue;   
        link.classList.add('current');
    }

    const btn = document.querySelector('#nav-button');
    const items = document.querySelector('nav .items');
    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        items.classList.toggle('shown');
    });
    document.body.dataset.loading = "false";
};