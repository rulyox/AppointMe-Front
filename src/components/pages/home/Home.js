import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Home.css';
import Modal from '../../modal/Modal';
import LoginModal from '../../modal/login/LoginModall';
import SignUpModal from '../../modal/signup/SignUpModal';
import requests from '../../../requests';

const Home = () => {

    const [searchId, setSearchId] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [userId, setUserId] = useState(undefined);
    const history = useHistory();
    const buttonElement = document.getElementById('home__id-button');

    const handleKeyPress = (e) => {

        if(e.key ==='Enter') buttonElement.click();

    };

    const login = (id, pw) => {

        setShowLoginModal(false);

        requests.user.getToken(id, pw)
            .then((result) => {

                const token = result.token;

                if(token === undefined) alert('Login failed!');
                else {
                    localStorage.setItem('token', token);
                    checkToken();
                }

            })
            .catch((error) => console.log(error));

    };

    const signUp = (id, name, pw) => {

        setShowSignUpModal(false);

        requests.user.signUp(id, name, pw)
            .then((result) => {
                if(result.result === 101) alert('Sign Up successful!');
                else alert('Unexpected error!');
            })
            .catch((error) => console.log(error));

    };

    const checkToken = () => {

        const token = localStorage.getItem('token');

        requests.user.checkToken(token)
            .then((result) => {
                const id = result.id;
                setUserId(id);
            })
            .catch((error) => console.log(error));

    };

    const logout = () => {
        localStorage.removeItem('token');
        setUserId(undefined);
    }

    // check token
    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token !== null) checkToken();

    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

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
                               onChange={(e) => setSearchId(e.target.value)} />
                    </div>

                    <Link to={`/${searchId}`}>
                        <button type="button" className="btn btn-primary" id="home__id-button">Search</button>
                    </Link>

                </div>

                {
                    userId === undefined &&
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
                }

                {
                    userId !== undefined &&
                    <div id="home__bottom__account">

                        <button type="button" className="btn btn-primary"
                                onClick={() => history.push('/' + userId)}>
                            My Account : {userId}
                        </button>

                        <div style={{'width': '30px'}} />

                        <button type="button" className="btn btn-primary"
                                onClick={logout}>
                            Logout
                        </button>

                    </div>
                }

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
