import { async } from "@firebase/util"
import { consultarApi, postApi } from "../api/ufpsformsApi"
import { actualizarRespuestas, cambiarRespuesta, darRespuestas, registrarRespuesta } from "./respuestasSlice"


export const startCambiarRespuesta = ( pregunta = -1, respuesta = -1 )=>{
    return (dispatch) =>{
        if( pregunta != -1 && respuesta != -1){
            dispatch(cambiarRespuesta({pregunta, respuesta}))
        }
    }
}

export const startCrearRespuesta = (pregunta = -1, respuesta = -1, indice = -1) => {
    return (dispatch) =>{
        if( indice !=-1 && pregunta != -1 && respuesta != -1){
            dispatch(registrarRespuesta({pregunta, respuesta ,indice}))
        }
    }
}

export const startResponderEncuesta = (id_encuestado = -1,r = [])=>{
    return async(dispatch)=>{
            if(id_encuestado== -1) return{
                error: true,
                msg: "Falta el id_encuestado",
            }
            const URL        = `/respuesta/responder`;
            const respuestas = r;
           
            try {
                for (const respuesta of respuestas) {
                    console.log("ÑANGOS: "+ respuesta.indice);
                    const resp = {
                        "id_pregunta"  : respuesta.indice,
                        "id_opcion"    : respuesta.respuesta,
                        "id_encuestado":  id_encuestado
                    }    
                    await postApi(URL,resp);
                }
                return  {
                    error: false,
                    msg: "Se respondió la encuesta correctamente",
                }
            } catch (error) {
                return {
                    error: true,
                    msg: "Ocurrio un error al enviar las respuestas: "+ error,
                }
            }
                
            
        
    }
}


export const startTraerRespuestas = (pregunta = -1 )=>{
    return async(dispatch)=>{
        if(pregunta == -1 )return;
        try {
            const URL  = `/respuesta/respuestas/${pregunta}`;
            const data = await consultarApi(URL);
            console.log("QUE CHANGOS ES RESPUESTAS: " + JSON.stringify(data))
            data.forEach((respuesta,index) => {
                console.log('sojhdsjfs: '+ index)
                dispatch(actualizarRespuestas({indice: respuesta.id_pregunta, pregunta: index, respuesta:respuesta.id_opcion}))
            });
        } catch (error) {
            
        }
    }
}