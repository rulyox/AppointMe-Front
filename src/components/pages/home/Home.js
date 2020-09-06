import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Modal from '../../modal/Modal';
import LoginModal from '../../modal/login/LoginModall';
import SignUpModal from '../../modal/signup/SignUpModal';

const Home = () => {

    const [userId, setUserId] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const buttonElement = document.getElementById('home__id-button');

    const handleKeyPress = (e) => {

        if(e.key ==='Enter') buttonElement.click();

    };

    const login = (id, pw) => {

        setShowLoginModal(false);

        console.log(id, pw);

    };

    const signUp = (id, name, pw) => {

        setShowSignUpModal(false);

        console.log(id, name, pw);

    };

    return (
        <div id="home">

            <div id="home__top">

                <span id="home__top__title">AppointMe</span>
                <span id="home__top__desc">Easily create and share personal appointments.</span>

            </div>

            <div id="home__bottom">

                <div id="home__bottom__id-search">

                    <div id="home__bottom__id-input">
                        <input className="form-control" id="inputId" type="text" placeholder="Enter user ID"
                               onKeyPress={handleKeyPress}
                               onChange={(e) => setUserId(e.target.value)} />
                    </div>

                    <Link to={`/${userId}`}>
                        <button type="button" className="btn btn-primary" id="home__id-button">Search</button>
                    </Link>

                </div>

                <div id="home__bottom__account">

                    <button type="button" className="btn btn-primary"
                            onClick={() => setShowLoginModal(true)}>
                        Login
                    </button>

                    <div style={{'width': '30px'}} />

                    <button type="button" className="btn btn-primary"
                            onClick={() => setShowSignUpModal(true)}>
                        Sign Up
                    </button>

                </div>

            </div>

            {
                showLoginModal &&
                <Modal close={() => setShowLoginModal(false)}>
                    <LoginModal click={login} />
                </Modal>
            }

            {
                showSignUpModal &&
                <Modal close={() => setShowSignUpModal(false)}>
                    <SignUpModal click={signUp} />
                </Modal>
            }

        </div>
    );

};

export default Home;
