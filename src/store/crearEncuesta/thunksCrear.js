import { useGetDatosEncuesta } from "../../hooks";
import { ufpsformsApi } from "../api/ufpsformsApi";
import { 
    agregarPregunta,
    cambiarTitulo,
    publicarEncuesta, 
    cambiarEnunciado, 
    modificarOpcion,
    agregarOpcion,
    eliminarOpcion,
    cambiarFechaDeCierre,
    cambiarPoblacion,
    cambiarDescripcion,
} from "./"



export const startCambiarTituloEncuesta = (titulo)=>{
    return (dispatch)=>{
        dispatch(publicarEncuesta({titulo}));
    }
}


export const startCrearPregunta = ()=>{
    return (dispatch) =>{
        dispatch(agregarPregunta())
    }
} 

export const startCambiarEnunciado = (index, enunciado='' )=>{
    return dispatch => dispatch(cambiarEnunciado({index,enunciado}));
}

export const startModificarOpcion = (indice, valor ,opcion) =>{
    return dispatch => dispatch(modificarOpcion({indice,valor,opcion}));
}

export const startAgregarOpcion = (indice)=>{
    return dispatch => dispatch(agregarOpcion({indice}))
}

export const startEliminarOpcion = (indice)=>{
    return dispatch => dispatch(eliminarOpcion({indice}))
}

export const startCambiarFechaCierre = (fechaCierre)=>{
    return dispatch => dispatch(cambiarFechaDeCierre({fechaCierre}))
}

export const startCambiarPoblacion = (poblacion)=>{
    return dispatch => dispatch(cambiarPoblacion({poblacion}))
}

export const startCambiarDescripcion = (descripcion)=>{
    return dispatch => dispatch(cambiarDescripcion({descripcion}));
}

export const startPublicarEncuesta = (encuesta = {})=>{
    console.log('NO ENTIENDOS')
    return async dispatch => {
        try{
           
            console.log('Y si: '+JSON.stringify(encuesta));

            
            const URL_POST = `/encuesta/publicar/${encuesta.poblacion}`;
            
            const encuestaAPublicar = {
                id_encuesta: encuesta.index,
                titulo: encuesta.titulo,
                descripcion: encuesta.descripcion,
                id_poblacion: encuesta.poblacion,
                fechacierre: encuesta.fechaCierre
            }
            console.log(JSON.stringify(encuesta.preguntas[0].opciones))
            const publicar = await ufpsformsApi.post(URL_POST,encuestaAPublicar);
            const {data} = publicar;
            const {insertId} = data;
            

            const URL_PREGUNTA = `/pregunta/agregarpregunta/${insertId}`;

            publicarPreguntas(URL_PREGUNTA,insertId,encuesta.preguntas).then(resp => {
                console.log(JSON.stringify('Que cosas! '+ resp))
            }).catch();      

            return {
                error:false,
                msg: 'Encuesta publicada'
            }

        }
    
        catch(error){
    
            return {
                error: true,
                msg: `Ah ocurrido un error al publicar la encuesta: ${error}` 
            }
        }
    }    
    
}


const publicarPreguntas = async(URL, id, preguntas = [])=>{
    
    try {
        Promise.all( preguntas.map(async preg => {
            const pregunta = {
                id_pregunta: preg.indice,
                enunciado: preg.enunciado,
                id_encuesta: id,
                tipo: 0
            }
            const publicar = await ufpsformsApi.post(URL,pregunta);
            const {data} = publicar;
            const {insertId} = data;
            console.log("PREGUNTA: "+ JSON.stringify(data)+ "INSERTID: "+ insertId)
            const url_opcion = `/opcion/agregaropcion/${insertId}`
            publicarOpciones(url_opcion, insertId , preg.opciones).then(resp =>{
                console.log("Que cosas 2 !" +JSON.stringify(resp))
            }).catch()

        }));
    } catch (error) {
        throw new Error("Ha ocurrido un error: "+ error);
    }
    
}

const publicarOpciones = async(URL, id ,opciones= []) =>{
    
    try {
        Promise.all(opciones.map(async opcion =>{
            console.log('Insertando opcion:.... ' + opcion.valor + " - "+ opcion.texto + " " + id  );
            const opcionApublicar = {
                id_opcion   : opcion.valor,
                texto       : opcion.enunciadoOpcion,
                id_pregunta : id
            }   
            const {data} = await ufpsformsApi.post(URL,opcionApublicar);
            console.log("Funciona: "+ data);

            
        })  )  
    } catch (error) {
        throw new Error("Ha ocurrido un error: "+ error);
    }
    
}