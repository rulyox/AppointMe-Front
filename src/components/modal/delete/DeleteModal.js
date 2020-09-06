import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ click }) => {

    return (
        <div id="delete-modal">

            <span style={{'marginBottom': '30px'}}>Will you delete this appointment?</span>

            <button type="button" className="btn btn-primary"
                    onClick={click}>
                Yes
            </button>

        </div>
    );

};

export default DeleteModal;
