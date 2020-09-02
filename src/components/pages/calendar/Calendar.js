import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Header from '../../header/Header';
import Modal from '../../modal/Modal';
import AddModal from '../../modal/add/AddModal';
import requests from '../../../requests';

const CalendarTable = (props) => {

    const list = props.data.list;
    const matrix = props.data.matrix;

    const rows = [];
    let rowKey = 0;

    if(matrix !== undefined) {

        for(const [index, time] of matrix.entries()) {

            const row = [<th className="calendar__table__time-column" key={rowKey++}>{index}:00</th>];

            for(const item of time) {

                if(item === 0) row.push(<td className="calendar__table__day-column" key={rowKey++}/>);
                else if(item > 0) {

                    const appointment = list[item-1];

                    const startTime = Number(appointment.start_time.split(':')[0]);
                    const endTime = Number(appointment.end_time.split(':')[0]);

                    row.push(
                        <td className="calendar__table__day-column"
                            key={rowKey++}
                            rowSpan={endTime-startTime}
                            style={{'backgroundColor': appointment.app_color}}>
                            <span>{appointment.app_name}</span>
                            <br />
                            <span>{appointment.app_description}</span>
                        </td>
                    );

                }

            }

            rows.push(<tr key={rowKey++}>{row}</tr>);

        }

    }

    return (
        <div id="calendar__table">
            <table className="table table-bordered">
                <tbody>

                    <tr>
                        <th className="calendar__table__time-column"/>
                        <th className="calendar__table__day-column">Monday</th>
                        <th className="calendar__table__day-column">Tuesday</th>
                        <th className="calendar__table__day-column">Wednesday</th>
                        <th className="calendar__table__day-column">Thursday</th>
                        <th className="calendar__table__day-column">Friday</th>
                        <th className="calendar__table__day-column">Saturday</th>
                        <th className="calendar__table__day-column">Sunday</th>
                    </tr>

                    {rows}

                </tbody>
            </table>
        </div>
    );

};

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
