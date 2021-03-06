import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();

    const loadAppointments = () => {

        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const date = startDate.getDate();

        const week = `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`;

        requests.appointment.get(userId, week)
            .then((result) => setAppointments(result))
            .catch((error) => console.log(error));

    };

    const dateBackward = () => {

        const newStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
        const newEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);

        setStartDate(newStartDate);
        setEndDate(newEndDate);

    };

    const dateForward = () => {

        const newStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
        const newEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 7);

        setStartDate(newStartDate);
        setEndDate(newEndDate);

    };

    // load user data
    useEffect(() => {

        requests.user.getData(userId)
            .then((result) => setUserData(result))
            .catch((error) => {

                console.log(error);

                alert('This ID does not exist!');
                history.push('/');

            });

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    // calculate week data
    useEffect(() => {

        const today = new Date();
        const weekDay = today.getDay() > 0 ? today.getDay()-1 : 6;
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekDay);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);

        setStartDate(startDate);
        setEndDate(endDate);

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    // get appointments
    useEffect(loadAppointments,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate]);

    // check if admin
    useEffect(() => {

        const token = localStorage.getItem('token');

        if(token !== null) {

            requests.user.checkToken(token)
                .then((result) => {
                    const id = result.id;
                    if(id === userId) setIsAdmin(true);
                })
                .catch((error) => console.log(error));

        }


    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
        <div id="calendar">

            <Header />

            <div id="calendar__top">

                <span id="calendar__top__name">{userData.name}</span>

                {
                    isAdmin &&
                    <span id="calendar__top__my-account">my account</span>
                }

                <div id="calendar__top__menu">

                    <button type="button" className="btn btn-primary"
                            onClick={dateBackward}>
                        <i className="fas fa-chevron-left" />
                    </button>

                    <span id="calendar__top__date">
                        {startDate.getFullYear()}-{startDate.getMonth()+1}-{startDate.getDate()} - {endDate.getFullYear()}-{endDate.getMonth()+1}-{endDate.getDate()}
                    </span>

                    <button type="button" className="btn btn-primary"
                            onClick={dateForward}>
                        <i className="fas fa-chevron-right" />
                    </button>

                    <button id="calendar__top__add" type="button" className="btn btn-primary"
                            onClick={() => setShowAddModal(true)}>
                        Add
                    </button>

                </div>

            </div>

            <CalendarTable data={appointments} isAdmin={isAdmin} refresh={loadAppointments} />

            {
                showAddModal &&
                <Modal close={() => setShowAddModal(false)}>
                    <AddModal userId={userId} created={() => { setShowAddModal(false); loadAppointments(); }} />
                </Modal>
            }

        </div>
    );

};

export default Calendar;
