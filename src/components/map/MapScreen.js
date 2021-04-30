import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogOut } from '../../actions/auth';

export const MapScreen = () => {

    const dispatch = useDispatch();
    const handleLogOut = () =>{
        console.log('Logged Out!');
        dispatch(startLogOut());
    }
    return (
        <div>
            <h1>MapScreen</h1>
            <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>
        </div>
    )
}
