import { async } from "@firebase/util";
import { consultarApi, ufpsformsApi } from "../api/ufpsformsApi";
import { cambiarDescripcion, cambiarIdEncuesta, cambiarPreguntas, cambiarTitulo, insertarPregunta } from "./crearSlice";

export const startCargarEncuesta = (encuestaId = 1)=>{
    return async (dispatch) =>{
        try {
            const URL_ENCUESTA = `/encuesta/encuestas/encuesta/${encuestaId}`;
            const encuesta = await consultarApi(URL_ENCUESTA);
            const {titulo,descripcion, id_encuestas} = encuesta[0];
            console.log('TITULO: '+ titulo)
            dispatch(cambiarTitulo({titulo}));
            dispatch(cambiarDescripcion({descripcion}));
            dispatch(cambiarIdEncuesta({index: id_encuestas}));

            const preguntas = await traerPreguntas(encuestaId);
            console.log("PREGUNTAS LENGHT: " + preguntas.length);
            console.log("PREGUNTA 0: " + preguntas[0].enunciado);
            dispatch(cambiarPreguntas({preguntas}));
            
        } catch (error) {
            return {
                error:true,
                msg: "Ha ocurrido un error "+ error
            }
        }
        
    }
}

const traerOpciones = async(pregunta = 0) =>{
    try {
        const URL_OPCIONES = `/opcion/opciones/${pregunta}`;
        //Array con las preguntas-Si no hay devuelve []
        const data =     await consultarApi(URL_OPCIONES);    
        const opciones = await data.map((opcion,index)=>({valor: index , texto: opcion.texto}))
        console.log("ahHHHHHHHHHHHHHHHHHH: "+ JSON.stringify(opciones))
        
        return opciones;
    } catch (error) {
        return []
    }
} 

const traerPreguntas = async(encuesta = 1)=>{
    try {
        const URL_PREGUNTAS = `/pregunta/preguntas/${encuesta}`;
        //Array con las preguntas-Si no hay devuelve []
        const data      =   await consultarApi(URL_PREGUNTAS); 
        const opciones  =   await Promise.all(data.map(async (pregunta)=> await traerOpciones(pregunta.id_pregunta)));
        const preguntas =   await data.map((pregunta,index)=>
            ({
                indice: pregunta.id_pregunta,
                enunciado:pregunta.enunciado, 
                opciones: opciones[index] 
            })
        )
        
        //{valor:0 , texto: opciones[index].texto}
        console.log('OPCIONES!!! '+  JSON.stringify(opciones))
        return preguntas;

    } catch (error) {
        return [];
    }
}

