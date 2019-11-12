import axios from 'axios';

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function sentPhone(phone_number) {
    return axios.post('/api/send_phone', {
        phone_number: phone_number.replace(/\s/g, ''),
    }, options);
}

function logIn({ phone_number, phone_code_hash, code }) {
    return axios.post('/api/login', {
        phone_number,
        phone_code_hash,
        code,
    }, options);
}


export default {
    sentPhone,
    logIn,
}

