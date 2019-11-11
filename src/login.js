import Api from './services/Api';

import initCountiesSelect  from './components/countriesSelect';



const phoneFormItem = document.querySelector('.phone-form-item');
const submitFormItem = document.querySelector('.submit-form-item');
const submitFormButton = submitFormItem.querySelector('.login-form__submit');
const phoneInput = document.querySelector('.phone-input');
let phoneMask = '';

initCountiesSelect('.country-input', (selectedCountry) => {
    const callingCode = selectedCountry.calling_code;

    if (!callingCode) {
        return;
    }

    phoneInput.value = `+ ${callingCode} `;
    phoneMask = phoneInput.value;
});

phoneInput.addEventListener('keyup', onPhoneKeyUp);
phoneInput.addEventListener('keyup', applyPhoneMask);
submitFormItem.addEventListener('click', sentPhone);


function onPhoneKeyUp(e) {
    const value = e.target.value;
    const isPhoneFilled = value.length > phoneMask.length;

    submitFormItem.classList.toggle('submit-form-item_active', isPhoneFilled);
}

function sentPhone() {
    submitFormButton.textContent = 'Please wait...';
    submitFormButton.classList.add('login-form__submit_progress');
    const value = phoneInput.value.trim();

    Api.sentPhone(value)
        .then(onSentPhoneSuccess)
        .catch(onSentPhoneError)
        .finally(() => {
            submitFormButton.classList.remove('login-form__submit_progress');
        })
}

function onSentPhoneSuccess() {
    phoneFormItem.classList.remove('error');
    window.location = '/code';
}

function onSentPhoneError() {
    phoneFormItem.classList.add('error');
}

function applyPhoneMask(e) {
    const value = e.target.value;
    phoneInput.value = phoneMask + value.slice(phoneMask.length, )
        .replace(/(\d{3})(\d{2})/g, "$1 $2 ");
}