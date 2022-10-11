import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, FormControlLabel, Grid, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Opcion } from './Opcion';
import { memo } from 'react'
/**
const opciones = [
    {
        index: 0,
        texto: '',

    }
]
 */
export const Pregunta = memo(({pregunta, setPregunta}) => {
    //const [enunciado, setEnunciado] = useState('');
    const {enunciadoPregunta,enunciadoPreguntaValid, formSubmitted ,onInputChange} = useForm(); 
    const {index,enunciado,opciones} = pregunta;
    //console.log("OPCIONES PREGUNTA : "+ opciones[0].texto);
    //const [enunciadoPregunta, setenunciadoPregunta] = useState(enunciado);
    const [value, setValue] = useState(0);
    const [opcionesPregunta,setOpcionesPregunta] = useState(opciones);
    //console.log(opcionesPregunta[0])
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const cambiarPregunta = ()=>{
      const nueva = {
        index: index,
        enunciado: enunciadoPregunta,
        opciones: opcionesPregunta
      }  
      setPregunta(index,nueva);
    }
    useMemo(()=>cambiarPregunta(),[enunciadoPregunta,opcionesPregunta]);
    

    
    

    const onAgregarOpcion = ( )=>{
        const nuevaOpcion = {
            index: opcionesPregunta.length,
            texto: `Opcion ${opcionesPregunta.length +1}`
        }
       // console.log("changos: "+ nuevaOpcion.index)
       setOpcionesPregunta([... opcionesPregunta, nuevaOpcion]);
    }
    
    const onEliminarOpcion= ()=>{
        opcionesPregunta.pop();
        
        setOpcionesPregunta([...opcionesPregunta]);
    }

    const onCambiarTextoOpcion = (indiceOpcion, texto)=>{
        opcionesPregunta[indiceOpcion].texto = texto;
        setOpcionesPregunta([...opcionesPregunta]);

    }

  return (
    <div>
        
            
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography>{index}.</Typography>
                  <TextField
                    label="Enunciado de la Pregunta"
                    type="text"
                    placeholder="Enunciado de la pregunta"
                    fullWidth 
                    name= 'enunciadoPregunta'
                    value= { enunciadoPregunta }
                    onChange= { onInputChange }
                    error= { !!enunciadoPreguntaValid && formSubmitted}
                    helperText = {enunciadoPreguntaValid }
                    />
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
                        opciones.map(({index,texto}) =>(
                            <Opcion key={pregunta.index+"-"+index} indice={index} pregunta={pregunta} cambiarTexto={onCambiarTextoOpcion} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
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

        </Grid>
        <Divider/>
    </div>
  )
}
)