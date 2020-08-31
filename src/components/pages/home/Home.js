import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

    const [userId, setUserId] = useState('');

    return (
        <div id="home">

            <div id="home__top">

                <span id="home__top__title">AppointMe</span>

            </div>

            <div className="home__id-search">

                <div className="home__id-input">
                    <input className="form-control" id="inputId" type="text" placeholder="Enter user ID"
                           onChange={(e) => setUserId(e.target.value)} />
                </div>

                <Link to={`/${userId}`}>
                    <button type="button" className="btn btn-primary">Search</button>
                </Link>

            </div>

        </div>
    );

};

export default Home;
