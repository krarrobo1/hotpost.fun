import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithPersonalData } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [formState, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirm: '',
        country: ''
    });



    const { name, email, password, password2, country } = formState;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterWithPersonalData(email, password, name, country))
        }
    }
    
    const isFormValid = () =>{
        if(name.trim().length === 0){
            dispatch(setError("You must set your name!"));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError("Invalid email!"));
            return false;
        }else if(password !== password2 || password.length < 5){
            dispatch(setError("Invalid password!"));
            return false
        }else if(country === "Choose your country..."){
            dispatch(setError("You must choose your country!"));
            return false
        }
        dispatch(removeError())
        return true;
    }
    
    return (
        <div>
            <h3 className="auth__title mb-5">Register</h3>

            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    (<div className="auth__alert-error">
                        { msgError }
                    </div>)
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="off"
                >
                </input>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="off"
                >
                </input>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="off"
                >
                </input>
                <input
                    type="password"
                    placeholder="Confirm"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    className="auth__input"
                    autoComplete="off"
                >
                </input>
                <select 
                name="country" 
                className="auth__input" 
                value={country}
                onChange={handleInputChange}
                >
                    <option>Choose your country...</option>
                    <option>Ecuador</option>
                </select>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
            </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
            </Link>

            </form>
        </div>
    )
}
