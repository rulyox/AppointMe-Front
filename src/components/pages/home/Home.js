import React from 'react';
import './Home.css';

const Home = () => {

    return (
        <div className="Home">

            <div id="home__top">

                <span id="home__top__title">AppointMe</span>

            </div>

            <div className="home__id-search">

                <div className="home__id-input">
                    <input className="form-control" id="inputId" type="text" placeholder="Enter user ID" />
                </div>

                <button type="button" className="btn btn-primary">Search</button>

            </div>

        </div>
    );

};

export default Home;
