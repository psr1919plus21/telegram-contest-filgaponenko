import Api from './services/Api';

const phoneInput = document.querySelector('.phone-input');

phoneInput.addEventListener('keyup', (e) => {
    const value = e.target.value;

    Api.sentPhone(value)
        .then((res) => console.log('res: ', res));
})