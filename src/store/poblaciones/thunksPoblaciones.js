import { ufpsformsApi } from "../api/ufpsformsApi";
import { regitrarError, setPoblaciones } from "./poblacionesSlice"

export const startSetPoblaciones = () => {
  
    return async (dispatch)=>{
        try{
            const URL = '/poblacion/poblaciones/';
            const {data} = await ufpsformsApi.get(URL);
            dispatch(setPoblaciones({poblaciones: data}));
        }
        catch (error){
            console.log(error);
            dispatch(regitrarError(error));
        }
    }
}
