import { commonPageInit, navigateTo } from "./shared/common.js";
import { checkPassword } from "./shared/databaseReader.js";

async function onFormSubmit(e) {
    e.preventDefault();
    const password = e.target.querySelector('input').value;
    if (await checkPassword(password)) {
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