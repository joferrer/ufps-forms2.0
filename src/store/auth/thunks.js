
import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider";
import { consultarApi } from "../api/ufpsformsApi";
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
        const poblacion = await verificarPoblacion(result.email);
        const datos = {
            ...result,
            poblacion: poblacion
        }
        console.log("POBLACION PERDIDA 1" + poblacion);
        return dispatch( login( datos ) );

        
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
        const poblacion = await verificarPoblacion(email);
        if(poblacion != `El correo ${email} no se encuetra registrado`){
            console.log("POBLACION PERDIDA 2.1");
            const {ok,uid,displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password});
            if(!ok) return dispatch(logout({errorMessage}));
            dispatch(login({uid, displayName,email,photoURL,poblacion}));
        }
        else{
            console.log("POBLACION PERDIDA 2");
            return dispatch(logout({errorMessage: 'Este correo no se encuentra registrado'}));
        }
        
    }
}

export const startLogout = ()=>{
    return async(dispatch) =>{
        await logoutFireBase();
        dispatch(logout());
    }
}

/**
 * 1. Consultar si es admnistrador, SI NO
 * 2. Consultar si es estudiante, SI NO
 * 3. Consultar si es profesor, SI NO
 * 4. Consultar si es graduado, SI NO
 * 5. Negar inicio de sección. 
 */
export const verificarPoblacion = async(correo = '')=>{

    
    try {
        const URL = `/admin/registrados/${correo}`;
        const consultaAdmin = await consultarApi(URL);
        if(consultaAdmin.length != 0) return 0
        
        const encuestadosURL = `/encuestado/mostrar`;
        const consultaEncuestados = await consultarApi(encuestadosURL);
        if(consultaEncuestados.length > 0){
            console.log("a ver");
            return consultaEncuestados.find(encuestado => encuestado.correo == correo).id_poblacion;
        }
            


    } catch (error) {
        console.log("POBLACION PERDIDA 3");
        return `El correo ${correo} no se encuetra registrado`
    }
   
        
     

}