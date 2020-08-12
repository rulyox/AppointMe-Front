import React from 'react';
import './Home.css';

const Home = () => {

    return (
        <div className="Home">

            <span id="home__title">AppointMe</span>

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
