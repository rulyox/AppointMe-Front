import React, { useEffect } from 'react';
import './Modal.css';
import Portal from '../../Portal';

const Modal = ({ visible, close, children }) => {

    // disable background scroll
    useEffect(() => {

        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;

        return () => {
            const scrollY = document.body.style.top
            document.body.style.cssText = `position: ""; top: "";`
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        };

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) close(e);
    };

    return (
        <Portal elementId="modal-root">
            <div id="ModalOverlay" style={{'display': visible?'block':'none'}} />
            <div id="ModalWrapper" tabIndex="-1" onClick={onMaskClick} style={{'display': visible?'block':'none'}}>
                <div id="ModalInner" tabIndex="0">

                    <div id="ModalClose" onClick={close}>
                        <i className="fas fa-times" />
                    </div>

                    {children}

                </div>
            </div>
        </Portal>
    );

};

export default Modal;
