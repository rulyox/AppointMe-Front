import React, { useState } from 'react';
import './AddModal.css';
import requests from '../../../requests';

const AddModal = ({ userId }) => {

    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const clickCreate = () => {

        const dateString = `${year}-${month}-${date}`;

        requests.appointment.create(userId, dateString, startTime, endTime, name, description)
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

    };

    return (
        <div id="add-modal">

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Year</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setYear(Number(e.target.value))} />
            </div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Month</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setMonth(Number(e.target.value))} />
            </div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Date</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setDate(Number(e.target.value))} />
            </div>

            <div className="input-group add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Start and End time</span>
                </div>
                <input type="text" aria-label="First name" className="form-control"
                       onChange={(e) => setStartTime(Number(e.target.value))} />
                <input type="text" aria-label="Last name" className="form-control"
                       onChange={(e) => setEndTime(Number(e.target.value))} />
            </div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Description</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setDescription(e.target.value)} />
            </div>

            <button type="button" className="btn btn-primary" onClick={clickCreate}>Create Appointment</button>

        </div>
    );

};

export default AddModal;
