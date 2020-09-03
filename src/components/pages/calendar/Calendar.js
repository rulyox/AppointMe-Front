import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Header from '../../header/Header';
import CalendarTable from './table/CalendarTable';
import Modal from '../../modal/Modal';
import AddModal from '../../modal/add/AddModal';
import requests from '../../../requests';

const Calendar = ({ match }) => {

    const userId = match.params.userId;
    const [userData, setUserData] = useState({});
    const [appointments, setAppointments] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {

        requests.user.getData(userId)
            .then((result) => setUserData(result))
            .catch((error) => console.log(error));

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect(() => {

        requests.appointment.get(userId, '20200820')
            .then((result) => setAppointments(result))
            .catch((error) => console.log(error));

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
        <div id="calendar">

            <Header />

            <div id="calendar__top">

                <span id="calendar__top__name">{userData.name}</span>

                <button id="calendar__top__add" type="button" className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}>
                    Add
                </button>

            </div>

            <CalendarTable data={appointments} />

            {
                showAddModal &&
                <Modal close={() => setShowAddModal(false)}>
                    <AddModal userId={userId} />
                </Modal>
            }

        </div>
    );

};

export default Calendar;
