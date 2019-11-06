import axios from 'axios';

document.addEventListener('click', () => {
    console.log('send request');
    axios.post('/api/send_phone', {
        data: '943'
    });
})