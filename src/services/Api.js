import axios from 'axios';

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function sentPhone(phoneNumber) {
    return axios.post('/api/send_phone', {
        phone_number: phoneNumber
    }, options);
}


export default {
    sentPhone,
}

