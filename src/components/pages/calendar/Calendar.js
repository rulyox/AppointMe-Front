import React from 'react';
import './Calendar.css';
import Header from '../../header/Header';

const CalendarTable = () => {

    const events = [
        {
            time: 3,
            color: '#FF0000',
            text: 'meet 1'
        },
        {
            time: 2,
            color: '#00FF00',
            text: 'meet 2'
        }
    ];

    const arr = [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, -1, 0, 0, 0],
        [0, 2, 0, -1, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    const rows = [];

    for(const time of arr) {

        const times = [<th className="calendar__table__time-column">9:00</th>];

        for(const item of time) {

            if(item === 0) times.push(<td className="calendar__table__day-column" />);
            else if(item > 0) {

                const event = events[item-1];
                times.push(
                    <td className="calendar__table__day-column" rowSpan={event.time} style={{'background-color': event.color}}>{event.text}</td>
                );

            }

        }

        rows.push(
            <tr>
                {times}
            </tr>
        );

    }

    return (
        <div className="calendar__table">
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

const Calendar = ({match}) => {

    const id = match.params.id;

    return (
        <div className="Calendar">

            <Header />

            <div className="calendar__top">
                <span id="calendar__top__name">{id}</span>
                <button id="calendar__top__add" type="button" className="btn btn-primary">Add</button>
            </div>

            <CalendarTable />

        </div>
    );

};

export default Calendar;
