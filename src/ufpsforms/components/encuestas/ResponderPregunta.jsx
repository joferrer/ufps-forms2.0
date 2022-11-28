

import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Opcion } from './Opcion';
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAgregarOpcion, startCambiarEnunciado, startEliminarOpcion } from '../../../store/crearEncuesta';
import { ResponderOpcion } from './ResponderOpcion';


export const ResponderPregunta = memo(({pregunta}) => {

    const {enunciadoPregunta,enunciadoPreguntaValid, formSubmitted ,onInputChange} = useForm(); 
    const {indice} = pregunta;


    const dispatch = useDispatch();
    const {opciones} = pregunta;
    const {poblacion} = useSelector(state => state.auth);

    //const opciones = useMemo(()=>  preguntas[indice]?.opciones, []);
    const [value, setValue] = useState(0);
    console.log("VALUE: !! "+ value);

    const onAgregarOpcion = ()=>{
      dispatch(startAgregarOpcion(indice))
    }

    const onEliminarOpcion = ()=>{
      dispatch(startEliminarOpcion(indice));
    }
    

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
  
    


  return (
    <div>
        
            
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography>{indice}. {pregunta.enunciado}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl>
                
                <RadioGroup
                     aria-labelledby="demo-controlled-radio-buttons-group"
                     name="controlled-radio-buttons-group"
                     value={value}
                     onChange={handleChange}
                >
                    {
                        opciones?.map(({valor,texto},index) =>(
                            <ResponderOpcion key={index +" Opcion: "+pregunta.indice+"-"+valor} valor={valor} pregunta={pregunta} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
              {
                poblacion == 0 ? 
                <>
                    <Box sx={{ minWidth: 200 }}>
                    <Button color="primary"
                          sx={{padding: 2}}
                          onClick={onAgregarOpcion}
                          >
                      <AddOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Agregar opcion
                    </Button>
                    
                  </Box>
                  <Box sx={{ minWidth: 200 }}>
                    <Button color="primary"
                          sx={{padding: 2}}
                          onClick={onEliminarOpcion}
                          >
                      <RemoveOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Eliminar opcion
                    </Button>
                    
                  </Box>
                </>
                :
                <></>
              }
                  

        </Grid>
        <Divider/>
    </div>
  )
}
)
