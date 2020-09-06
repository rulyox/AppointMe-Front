import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const getData = (id) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user/data/' + id)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getToken = (id, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/user/token',
            {
                id: id,
                pw: pw
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const signUp = (id, name, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/user',
            {
                id: id,
                name: name,
                pw: pw
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const checkToken = (token) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
