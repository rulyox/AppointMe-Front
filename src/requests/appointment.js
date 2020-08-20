import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const get = (id, week) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/appointment/' + id + '/' + week)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
