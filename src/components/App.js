import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';

const App = () => {
    return (
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/:id' component={Calendar} />
        </div>
    );
};

export default App;
