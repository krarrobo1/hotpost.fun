import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/config';
import { startLoading, endLoading} from './ui';

export const startLoginCredentials = (email, password) => {
    return async(dispatch) => {
        try {
            dispatch(startLoading());
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(
                login(user.uid, user.displayName)
            )
        } catch (error) {
            const { message } = error;
            console.log('Login err', { error });
            Swal.fire('Invalid access', message, 'error');
        }finally{
            dispatch(endLoading());
        }
    }
}

export const startRegisterWithPersonalData = (email, password, name, country) => {
    return async (dispatch) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: name });
            dispatch(
                login(user.uid, user.displayName)
            );
        } catch (error) {
            console.log("auth err", error);
        }
    }
}

export const startGoogleLogin = () => {
    return async (dispatch) => {
        try {
            const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
            dispatch(
                login(user.uid, user.displayName)
            )
        } catch (error) {
            console.log("Google auth err", error);
        }
    }
}

export const login = (uid, displayName) =>
({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogOut = () => {
    return async(dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch(logOut());
        } catch (error) {
            console.log('Sign out err', error);            
        }
    }
}

export const logOut = () => ({
    type: types.logout
})