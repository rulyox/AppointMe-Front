import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ click }) => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    return (
        <div id="login-modal">

            <div className="input-group flex-nowrap login-modal__input">
                <div className="input-group-prepend">
                    <span className="input-group-text">ID</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setId(e.target.value)} />
            </div>

            <div className="input-group flex-nowrap login-modal__input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Password</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setPw(e.target.value)} />
            </div>


            <button type="button" className="btn btn-primary"
                    onClick={() => click(id, pw)}>
                Login
            </button>

        </div>
    );

};

export default LoginModal;
