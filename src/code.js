import Api from './services/Api';
import debounce from 'lodash/debounce'

let user;

try {
    user = JSON.parse(localStorage.getItem('user'));
} catch(e) {
    console.warn('Error with parsing user.');
    console.log(e);
}

if (!user) {
    alert('No user founded. Please, enter Your phone on previous step.');
    window.location = '/';
}

const codeInput = document.querySelector('.code-input');

codeInput.addEventListener('keyup', debounce(signIn, 500));

function signIn(e) {
    console.log('sign in');

    const { value } = e.target;
    Api.logIn({
        phone_number: user.phone_number,
        phone_code_hash: user.phone_code_hash,
        code: value.trim(),
    }).then((result) => {
        console.log('on client!: ', result);
    });
}