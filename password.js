import { commonPageInit, navigateTo } from "./shared/common.js";

function onFormSubmit(e) {
    const password = e.target.querySelector('input').value;
    if (password === '1234') {
        localStorage.setItem('password', password);
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('destination')) {
           navigateTo(searchParams.get('destination')); 
        } else {
           navigateTo('/index.html'); 
        }
    } else {
        document.querySelector('.password-help').classList.add('shown');
        document.querySelector('.password-wrapper').classList.add('shake');
    }
    e.preventDefault();
}

function onInput() {
    document.querySelector('.password-help').classList.remove('shown');
    document.querySelector('.password-wrapper').classList.remove('shake');
}

window.onload = () => {
    commonPageInit();
    document.querySelector('form').addEventListener('submit', onFormSubmit); 
    document.querySelector('input').addEventListener('input', onInput); 
};