import { async } from "@firebase/util";
import { Co2Sharp } from "@mui/icons-material";
import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider";
import { checkingCredentials, logout, login } from "./"


export const checkingAuthentication = ( email, password) =>{
    return async ( dispatch )=>{
        await dispatch( checkingCredentials() );
    }
}
export const startGoogleSingIn = ( email, password) =>{
    return async ( dispatch )=>{
        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();

        if(!result.ok) return dispatch( logout(result.errorMessage) );

        return dispatch( login( result ) );

        
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName})=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials());

        const {ok,uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
    }

}

export const startLoginWithEmailPassword = ({email, password})=>{
 
    return async(dispatch) =>{
        dispatch(checkingAuthentication());
        const {ok,uid,displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName,email,photoURL}));
    }
}

export const startLogout = ()=>{
    return async(dispatch) =>{
        await logoutFireBase();
        dispatch(logout());
    }
}