import React from 'react';
import './Modal.css';
import Portal from '../../Portal';

const Modal = ({ close, children }) => {

    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) close(e);
    };

    return (
        <Portal elementId="modal-root">
            <div id="modal__overlay" />
            <div id="modal__wrapper" tabIndex="-1" onClick={onMaskClick}>
                <div id="modal__inner" tabIndex="0">

                    <div id="modal__close" onClick={close}>
                        <i className="fas fa-times" />
                    </div>

                    {children}

                </div>
            </div>
        </Portal>
    );

};

export default Modal;
