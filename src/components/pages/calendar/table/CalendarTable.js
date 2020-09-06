import React, {useState} from 'react';
import './CalendarTable.css';
import Modal from '../../../modal/Modal';
import DeleteModal from '../../../modal/delete/DeleteModal';
import requests from '../../../../requests';

// Check if color is dark or light (https://awik.io/determine-color-bright-dark-using-javascript/)
const isColorDark = (color) => {

    let r, g, b;

    if (color.match(/^rgb/)) { // RGB

        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];

    } else { // HEX (convert to RGB)

        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (http://alienryderflex.com/hsp.html)
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if(hsp > 127.5) return false;
    else return true;

};

const CalendarTable = (props) => {

    const list = props.data.list;
    const matrix = props.data.matrix;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [targetId, setTargetId] = useState(0);

    const clickAppointment = (id) => {

        if(props.isAdmin) {
            setTargetId(id);
            setShowDeleteModal(true);
        }

    };

    const deleteAppointment = () => {

        setShowDeleteModal(false);

        if(targetId !== 0) {

            const token = localStorage.getItem('token');

            requests.appointment.deleteAppointment(token, targetId)
                .then(() => props.refresh())
                .catch((error) => console.log(error));

        }

    };

    // parse appointment data
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

                    const textColor = isColorDark(appointment.color) ? '#FAFAFA' : '#222222';

                    row.push(
                        <td className="align-middle calendar__table__day-column"
                            key={rowKey++}
                            rowSpan={endTime-startTime}
                            style={{'backgroundColor': appointment.color, 'color': textColor}}
                            onClick={() => clickAppointment(appointment.id)}>
                            <div className="calendar__table__name">{appointment.name}</div>
                            <div className="calendar__table__desc">{appointment.description}</div>
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

            {
                showDeleteModal &&
                <Modal close={() => setShowDeleteModal(false)}>
                    <DeleteModal click={deleteAppointment} />
                </Modal>
            }
        </div>
    );

};

export default CalendarTable;
