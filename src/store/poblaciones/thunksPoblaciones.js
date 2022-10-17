import { async } from "@firebase/util";
import { ufpsformsApi } from "../api/ufpsformsApi";
import { registrarListaPoblacion, regitrarError, setPoblaciones } from "./poblacionesSlice"

const consultarApi = async (url)=>{
    try{
        const URL    = url;
        const {data} = await ufpsformsApi.get(URL);
        return data;
    }
    catch(e){
        return {
            error: true,
            msg: 'Ha ocurrido un error: '+ e
        }

    }
}

export const startSetPoblaciones = () => {
  
    return async (dispatch)=>{
        try{
            const URL = '/poblacion/poblaciones/';
            let {data} = await ufpsformsApi.get(URL);
            data.forEach((poblacion, index) => data[index] = {...poblacion, listaEncuestados:  []});
            

            dispatch(setPoblaciones({poblaciones: data}));
            
        }
        catch (error){
            console.log(error);
            dispatch(regitrarError(error));
        }
    }
}
export const startCargarEncuestadosPorPoblacion = (id_poblacion)=>{
    return async (dispatch)=>{
        const URL  = `/encuestado/mostrar/${id_poblacion}`;
        const data = await consultarApi(URL);
        console.log('ls: '+ data)
        if(!!data.error) return error.msg;
        
        dispatch(registrarListaPoblacion({id_poblacion, listaEncuestados: data}))
    }
}

