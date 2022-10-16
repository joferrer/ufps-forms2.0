import { ufpsformsApi } from "../api/ufpsformsApi";
import { loadEncuestas, setEncuestas, setError } from "./encuestasSlice"


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
