import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_HOST;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const privateHeaders = {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};

export const privateHeadersMultipart = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};
