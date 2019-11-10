import debounce from 'lodash/debounce';
import Api from './services/Api';

import initCountiesSelect  from './components/countriesSelect';

initCountiesSelect('.country-input');
const phoneInput = document.querySelector('.phone-input');

phoneInput.addEventListener('keyup', debounce(onPhoneKeyUp, 1000));

function onPhoneKeyUp(e) {
    const value = e.target.value;

    // Show spinner
    phoneInput.classList.add('progress');
    Api.sentPhone(value)
        .then(onSentPhoneSuccess)
        .catch(onSentPhoneError);
}

function onSentPhoneSuccess() {
    console.log('Success');
    // Hide spinner
    // Show next button
}

function onSentPhoneError() {
    console.log('do error stuff');
    // Hide spinner
    // Show form with phone again 
}