import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { MapScreen } from '../map/MapScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../../firebase/config';
import { login } from '../../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Observable
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggedIn]);

    // Loading screen...
    if (checking) {
        return (
            <h1>Please wait...</h1>
        )
    }

    return (
        <Router>
            <div className="container">
                <Switch>
                    <PublicRoute 
                    path="/auth" 
                    isAuthenticated={isLoggedIn}
                    component={AuthRouter} />

                    <PrivateRoute 
                    exact 
                    isAuthenticated={isLoggedIn}
                    path="/" 
                    component={MapScreen} />

                    <Redirect 
                    to="/" />
                </Switch>
            </div>
        </Router>
    )
}
