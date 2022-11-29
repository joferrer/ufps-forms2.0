import { async } from "@firebase/util"
import { postApi } from "../api/ufpsformsApi"
import { cambiarRespuesta, darRespuestas, registrarRespuesta } from "./respuestasSlice"


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

export const startResponderEncuesta = (r = [])=>{
    return async(dispatch)=>{
        
            const URL        = `/respuesta/responder`;
            const respuestas = r;
            console.log("QUE CHANGOS ES RESPUESTAS: " + JSON.stringify(respuestas))
            try {
                for (const respuesta of respuestas) {
                    console.log("ÑANGOS: "+ respuesta.indice);
                    const resp = {
                        "id_pregunta": respuesta.indice,
                        "id_opcion": respuesta.respuesta
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