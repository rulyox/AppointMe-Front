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
