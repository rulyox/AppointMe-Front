import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
            <Link to={'/'} id="header__title">
                <span>AppointMe</span>
            </Link>
        </div>
    );
}

export default Header;
