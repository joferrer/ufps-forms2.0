import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { login, logout, verificarPoblacion } from "../store/auth";


export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      
      onAuthStateChanged(FireBaseAuth , async( user )=>{
        if(!user) return dispatch( logout() );
        const {uid, displayName, email, photoURL} = user;
        const {poblacion, id_encuestado} = await verificarPoblacion(email);
        dispatch(login({uid,displayName,email, photoURL,poblacion, id_encuestado}));
      } );
    
    }, [])
  
    return {status}
  
}
