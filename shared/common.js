import { getEncryptedData } from "./databaseReader.js";

export function navigateTo(href) {
    document.body.dataset.loading = "true";
    window.setTimeout(() => {
        location.href = href;
    }, 250);
}

function fillDataFields(data) {
    const getField = (field) => {
        let curr = data;
        for (const part of field.split('.')) {
            curr = curr[part];
        }
        return curr;
    }
    for (const textElem of document.querySelectorAll('[data-text]')) {
        textElem.innerText = getField(textElem.dataset.text);
    }
    for (const ifElem of document.querySelectorAll('[data-if]')) {
        if (!getField(ifElem.dataset.if)) {
           ifElem.style.display = 'none';
        }
    }
    for (const imgElem of document.querySelectorAll('[data-image]')) {
        imgElem.style.backgroundImage = `url(${getField(imgElem.dataset.image)})`;
    }
}

export async function commonPageInit() {
    if (document.body.dataset.locked === "true" && !localStorage.getItem('password')) {
        location.href = `password.html?destination=${location.pathname}`;
        return;
    } else if (document.body.dataset.locked === "true") {
        fillDataFields(await getEncryptedData(localStorage.getItem('password')));
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