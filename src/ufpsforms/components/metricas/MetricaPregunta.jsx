import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { startTraerRespuestas } from '../../../store/respuestas';
import { Chart } from "react-google-charts";


export const MetricaPregunta = ({enunciado= '',pregunta={}}) => {
    
    
    const {opciones} = pregunta;
    const [opcionesState, setopcionesState] = useState(opciones);
    const dispatch = useDispatch();
    const {respuestas} = useSelector(state => state.respuestas);
    const [respuestasState, setrespuestasState] = useState([]);

    /*
     const data = [
        ["Opcion", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7], // CSS-style declaration
      ];
      */
     const data = respuestas.length >0 ? 
        [["Opcion", "Cantidad"], ... respuestasState.map((resp,index) => [`${opciones[index]?.texto}`,`${resp?.cantidad}`])]
        : []
      console.log('DATAAAAAAA:' + data.length)
       const options = {
        title: "Respuestas",
        pieHole: 0.4,
        is3D: false,
      };

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

        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />

            <Divider/>
        </Grid>
    )
}
