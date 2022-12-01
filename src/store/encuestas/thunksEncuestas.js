import { ufpsformsApi } from '../api/ufpsformsApi';
import { eliminarEncuesta, loadEncuestas, setEncuestas, setError } from './encuestasSlice'


export const startLoadingEncuestas = (poblacion= '', page =0) => {
    return async (dispatch)=>{
        try{
            dispatch(loadEncuestas())
            const URL = poblacion === '' ? `/encuesta/encuestas`: `/encuesta/encuestas?p=${poblacion}`;
            const {data} = await ufpsformsApi.get(URL);
            dispatch(setEncuestas({encuestas: data , page: page + 1} ));
        }
        catch (error){
            dispatch(setError({error}))
        }
    }
}


export const getEncuestasFinalizadas= ()=>{
    return async (dispatch)=>{

    }
}


export const startEliminarEncuesta = (id_encuesta)=>{
    return async (dispatch)=>{
        try{
            console.log('Eliminando....')
            const URL = `/encuesta/eliminar/${id_encuesta}`;
            const resp = await ufpsformsApi.delete(URL);
            dispatch(eliminarEncuesta({id_encuestas: id_encuesta}));

            return {
                error: false,
                msg: 'Encuesta eliminada con exito'
            }
        }
        catch (error){
            return {
                error:true,
                msg: 'Error al eliminar la encuesta' + error
            }
        }
        


    }
}