import Api from './services/Api';
import debounce from 'lodash/debounce'

let user;
const errosMap = {
    'DEFAULT': 'Code',
    'PHONE_CODE_EXPIRED': 'Expired code',
    'PHONE_CODE_INVALID': 'Invalid code',
}

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

const codeFormItem = document.querySelector('.code-form-item');
const codeInput = document.querySelector('.code-input');
const codeLabel = document.querySelector('.code-label');
const loginContainer = document.querySelector('.login');


codeInput.addEventListener('keyup', debounce(signIn, 500));

function signIn(e) {
    codeFormItem.classList.remove('error');
    loginContainer.classList.remove('error');
    codeLabel.textContent = errosMap['DEFAULT'];

    const { value } = e.target;

    if (!value) {
        return;
    }

    Api.logIn({
        phone_number: user.phone_number,
        phone_code_hash: user.phone_code_hash,
        code: value.trim(),
    })
    .then(onLoginSuccess)
    .catch(onLoginError)
}

function onLoginSuccess(result) {
    console.log('on client!: ', result);
}

function onLoginError(error) {
    codeFormItem.classList.add('error');
    loginContainer.classList.add('error');
    
    codeLabel.textContent = errosMap[error.response.data.error_message];
}