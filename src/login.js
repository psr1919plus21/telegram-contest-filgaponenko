import debounce from 'lodash/debounce';
import Api from './services/Api';

import initCountiesSelect  from './components/countriesSelect';

initCountiesSelect('.country-input');
const phoneFormItem = document.querySelector('.phone-form-item');
const submitFormItem = document.querySelector('.submit-form-item');
const phoneInput = document.querySelector('.phone-input');

phoneInput.addEventListener('keyup', debounce(onPhoneKeyUp, 1000));

function onPhoneKeyUp(e) {
    const value = e.target.value;

    phoneInput.classList.add('progress');
    phoneFormItem.classList.remove('error');
    submitFormItem.classList.remove('submit-form-item_active');
    Api.sentPhone(value)
        .then(onSentPhoneSuccess)
        .catch(onSentPhoneError);
}

function onSentPhoneSuccess() {
    console.log('Success');
    phoneInput.classList.remove('progress');
    // Show next button
    submitFormItem.classList.add('submit-form-item_active');
}

function onSentPhoneError() {
    console.log('do error stuff');
    phoneInput.classList.remove('progress');
    phoneFormItem.classList.add('error');
    // Hide spinner
    // Show form with phone again 
}