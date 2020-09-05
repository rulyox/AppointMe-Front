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

export const create = (id, date, startTime, endTime, name, description, color) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/appointment/' + id,
            {
                date: date,
                startTime: startTime,
                endTime: endTime,
                name: name,
                description: description,
                color: color
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
