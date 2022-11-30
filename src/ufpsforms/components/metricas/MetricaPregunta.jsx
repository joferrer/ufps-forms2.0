import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { startTraerRespuestas } from '../../../store/respuestas';



export const MetricaPregunta = ({enunciado= '',pregunta={}}) => {
    
    
    const {opciones} = pregunta;
    const [opcionesState, setopcionesState] = useState(opciones);
    const dispatch = useDispatch();
    const {respuestas} = useSelector(state => state.respuestas);
    const [respuestasState, setrespuestasState] = useState([]);

    

    const traerRespuestas = async()=>{
        await dispatch(startTraerRespuestas(pregunta.indice));
    }
    
    const respuestaPorOpcion = ()=>{
        
        const stateOpc = opciones.map((opc, index)=>{
            const cantidadRespuestas = respuestas.filter((resp)=>  resp.respuesta == opc.id_opcion ).length;
            const op = {
                id_opcion: opc.id_opcion,
                cantidad: cantidadRespuestas
            }
            return op;
        })
        console.log("CANTIADD: "+ JSON.stringify(stateOpc));
        setrespuestasState([...stateOpc])
        
    }

    useEffect(() => {
        console.log('OJO:' + JSON.stringify(opcionesState))
        setopcionesState([...pregunta.opciones]);
        traerRespuestas();
        if(respuestas.length>0 ){
            respuestaPorOpcion();
        }

    }, [opciones,respuestas])
    
    return (
        <Grid>
            <Typography variant='h4'>{enunciado}</Typography>
          
            {
                opcionesState.map((opcion, index)=>
                    <Typography variant='body1' >{index}. {opcion.texto} -- {JSON.stringify(respuestasState[index]?.cantidad)} </Typography>
                )
            }

           

            <Divider/>
        </Grid>
    )
}
