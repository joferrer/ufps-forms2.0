import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingEncuestas } from '../../../store/encuestas';
import { startSetPoblaciones } from '../../../store/poblaciones';
import { TablaEncuestas } from '../../components';
import { UfpsFormsLayout } from '../../layout/UfpsFormsLayout';
import { NothingSelectedView } from '../../views/NothingSelectedView';

export const EncuestasDisponiblesPage = () => {
    const dispatch = useDispatch();

    const {poblacion} = useSelector(state => state.auth);
    const {encuestas} = useSelector(state => state.encuestas);

    const cargarEncuestas = ()=>{
        dispatch(startLoadingEncuestas());
      }
    const cargarPoblaciones = ()=>{
       dispatch(startSetPoblaciones());
    }
    
      useEffect(() => {
        cargarEncuestas();
        cargarPoblaciones();
      
        
      }, [])

    const encuestasPoblacion = useMemo(() => encuestas.filter(encuesta => encuesta.id_poblacion == poblacion), [encuestas])
    return (
        <UfpsFormsLayout>
            <h1>Encuestas disponibles para ti: </h1>
            {
                encuestas.length === 0 ? <NothingSelectedView/>
                :<TablaEncuestas cabeceras={['ID','Titulo','Población','Decripción','Fecha de cierre']} filas={encuestasPoblacion}></TablaEncuestas>
            }
        </UfpsFormsLayout>
        
    )
}
