import React from 'react';
import './CalendarTable.css';

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

                    const startTime = Number(appointment.startTime.split(':')[0]);
                    const endTime = Number(appointment.endTime.split(':')[0]);

                    row.push(
                        <td className="calendar__table__day-column"
                            key={rowKey++}
                            rowSpan={endTime-startTime}
                            style={{'backgroundColor': appointment.color}}>
                            <span>{appointment.name}</span>
                            <br />
                            <span>{appointment.description}</span>
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

export default CalendarTable;
