import countries from './countries.json';

export default function initCountriesSelect(selector, cb) {
    const inputField = selector && document.querySelector(selector);

    if (!inputField) {
        console.warn('Error! No inputField.\nselector: ', selector);
        return;
    }

    createContentFor(inputField, cb);
    
    inputField.addEventListener('focus', () => {
        initCountriesSelect.contentWrapper.classList.add('countries-select__content-wrapper_active');
        
        const formItem = document.querySelector('.country-form-item');
        formItem && formItem.classList.add('country-form-item_active');
    });

    inputField.addEventListener('blur', () => {
        initCountriesSelect.contentWrapper.classList.remove('countries-select__content-wrapper_active');
    
        const formItem = document.querySelector('.country-form-item');
        formItem && formItem.classList.remove('country-form-item_active');
    }); 
}

function createContentFor(inputField, cb) {
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('countries-select__content-wrapper');

    const content = document.createElement('div');
    content.classList.add('countries-select__content');

    countries.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('countries-select__item');

        const flag = document.createElement('img');
        flag.classList.add('countries-select__flag');
        flag.setAttribute('src', item.flag_base64);

        const countryName = document.createElement('span');
        countryName.classList.add('countries-select__name');
        countryName.innerHTML = item.country;

        const countryPhoneCode = document.createElement('span');
        countryPhoneCode.classList.add('countries-select__phone-code');
        countryPhoneCode.innerHTML = '+' + item.calling_code;

        const leftSide = document.createElement('div');
        leftSide.classList.add('countries-select__left-side');

        const rightSide = document.createElement('div');
        rightSide.classList.add('countries-select__right-side');

        element.addEventListener('mousedown', () => {
            inputField.value = item.country;
            cb(item);
        });

        leftSide.appendChild(flag);
        leftSide.appendChild(countryName);
        rightSide.appendChild(countryPhoneCode);

        element.appendChild(leftSide);
        element.appendChild(rightSide);

        content.appendChild(element);
    });

    contentWrapper.appendChild(content);
    inputField.parentElement.appendChild(contentWrapper);

    initCountriesSelect.contentWrapper = contentWrapper;
}