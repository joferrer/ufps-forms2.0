import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import dayjs from 'dayjs';
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TablaEncuestas } from "../components";
import { TablaFinalizadas } from "../components/encuestas/TablaFinalizadas";

export const EncuestasFinalizadasPage = () => {

  const fechaActual = dayjs(new Date(Date.now()).toISOString());

  const dispatch = useDispatch();
  const {encuestas} = useSelector(state => state.encuestas);

  const encuestasFinalizadas = useMemo(() => 
    encuestas.filter(  
      encuesta => dayjs(new Date(encuesta.fechacierre)).isBefore(fechaActual)), [encuestas]);

  return (
    <UfpsFormsLayout >
          {
            encuestasFinalizadas.length === 0 ? <NothingSelectedView/>
            :<TablaFinalizadas cabeceras={['ID','Titulo','Población','Decripción','Fecha de cierre','link','Eliminar']} filas={encuestasFinalizadas.map(e => e)}></TablaFinalizadas>
          }
           
    </UfpsFormsLayout>
  )
}
