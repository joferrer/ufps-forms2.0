import { Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { startCargarEncuesta } from "../../store/crearEncuesta/thunksResponder";
import { MetricaPregunta } from "../components";
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"


//TODO: Metricas de una encuesta.
export const MetricasEncuesta = () => {
  
  const dispatch    = useDispatch();
  const location    = useLocation();
  const {search}    = location;
  const {encuestas} = useSelector(state => state.encuestas); 
  const {preguntas} = useSelector(state => state.crearEncuesta);
  const encuesta    = search.length != '' ? 
            encuestas.find(encuesta => encuesta.id_encuestas == search.split('=')[1])
           :
            {
              id_encuestas: -1
            } 

  useEffect(() => {
    if(preguntas.length <= 1 && search.length != 0){
      console.log('Encuesta: '+ Number(search.split('=')[1]));
      dispatch(startCargarEncuesta(Number(search.split('=')[1])))
    }
    
  }, [])
  
  return (
    <UfpsFormsLayout>
        <Typography variant="h3">{encuesta.titulo}</Typography>
        <Typography variant="p">{encuesta.descripcion}</Typography>

        <Divider/>
        {
            preguntas.map((pregunta, index)=><MetricaPregunta key={`MetricaPregunta-${index}`} enunciado={pregunta.enunciado} pregunta={pregunta} />)
        }



    </UfpsFormsLayout>
  )
}
