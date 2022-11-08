import { ufpsformsApi, consultarApi, postApi } from "../api/ufpsformsApi";
import { registrarListaPoblacion, regitrarError, setPoblaciones } from "./poblacionesSlice"





export const startSetPoblaciones = () => {
  
    return async (dispatch)=>{
        try{
            const URL    = '/poblacion/poblaciones/';
            const {data} = await ufpsformsApi.get(URL);
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
        if(!!data.error) return error.msg;
        dispatch(registrarListaPoblacion({id_poblacion, listaEncuestados: data}))
    }
}

const startResgistrarEncuestadoAPoblacion = async (usuario, poblacion)=>{


        const URL  = `/encuestado/registrar/${poblacion}`;
        const data = await postApi(URL, usuario); 
        console.log("REGISTRAR: "+ data);
        if(!!data.error) return error.msg;
    
}

export const startResgistrarEncuestadosAPoblacion = (usuarios =[], poblacion)=>{
    return async (dispatch)=>{
        await usuarios.forEach(async u =>{
            console.log('u: '+ u.correo);
           const resp = await startResgistrarEncuestadoAPoblacion(u,poblacion);
           console.log(resp);
        });
    }
}
