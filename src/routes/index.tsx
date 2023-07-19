import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import SignIn from '../auths/sign';
import Home from '../screens/home';
import { Default } from '../screens/pageNotFount';

export default function NavRoute() {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<SignIn />} />
                <Route path='/home' element={<Home />} />
                <Route path='*' element={<Default />} />
          </Routes>
        </div>
    )
}

