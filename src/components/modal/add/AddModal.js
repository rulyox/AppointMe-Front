import React from 'react';
import './AddModal.css';

const AddModal = ({ userId }) => {
    return (
        <div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Year</span>
                </div>
                <input type="text" className="form-control" placeholder="Write here"
                       aria-label="Username" aria-describedby="addon-wrapping" />
            </div>

            <div className="input-group flex-nowrap add-modal__time-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Month</span>
                </div>
                <input type="text" className="form-control" placeholder="Write here"
                       aria-label="Username" aria-describedby="addon-wrapping" />
            </div>

            <div className="input-group flex-nowrap">
                <div className="input-group-prepend">
                    <span className="input-group-text">Date</span>
                </div>
                <input type="text" className="form-control" placeholder="Write here"
                       aria-label="Username" aria-describedby="addon-wrapping" />
            </div>

        </div>
    );
};

export default AddModal;
