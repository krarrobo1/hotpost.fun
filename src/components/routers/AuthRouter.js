import React from 'react';
import { 
    Switch, 
    Route,
    Redirect
} from 'react-router';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route path="/auth/login" component={ LoginScreen } />
                    <Route exact path="/auth/register" component={ RegisterScreen } />
                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </div>
    )
}
