import React, { useState } from 'react';
import './SignUpModal.css';

const SignUpModal = ({ click }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');

    return (
        <div id="signup-modal">

            <div className="input-group flex-nowrap signup-modal__input">
                <div className="input-group-prepend">
                    <span className="input-group-text">ID</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setId(e.target.value)} />
            </div>

            <div className="input-group flex-nowrap signup-modal__input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="input-group flex-nowrap signup-modal__input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Password</span>
                </div>
                <input type="text" className="form-control"
                       onChange={(e) => setPw(e.target.value)} />
            </div>


            <button type="button" className="btn btn-primary"
                    onClick={() => click(id, name, pw)}>
                Sign Up
            </button>

        </div>
    );

};

export default SignUpModal;
