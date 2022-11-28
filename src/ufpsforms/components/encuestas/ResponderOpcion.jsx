import React from "react";
import { memo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel,Radio, TextField } from "@mui/material"
import { useForm } from "../../../hooks/useForm"
import { startModificarOpcion } from "../../../store/crearEncuesta";

export const ResponderOpcion = memo(({pregunta, valor}) => {

    const dispatch = useDispatch();
    const {preguntas} = useSelector(state => state.crearEncuesta);
    const {poblacion} = useSelector(state => state.auth);
    const indice = pregunta.indice;


    const {opciones} = pregunta;
    const {texto} = opciones[valor]; 

    const {enunciadoOpcion, enunciadoOpcionValid, formSubmitted ,onInputChange} = useForm({enunciadoOpcion: texto});

    
    
    const onInputCaptureTexto = ()=>{
      dispatch(startModificarOpcion(indice, valor,{valor,enunciadoOpcion}));
    }

  return (
    <FormControlLabel sx={{mt:2}} value={valor} control={<Radio />} 
    label={
        <TextField    
            onBeforeInputCapture={onInputCaptureTexto}
            type="text"
            placeholder= {enunciadoOpcion}
            fullWidth 
            name= 'enunciadoOpcion'
            value= { enunciadoOpcion }
            onChange= { onInputChange }
            error= { !!enunciadoOpcionValid && formSubmitted}
            helperText = {enunciadoOpcionValid }
            disabled = {poblacion != 0}

            />
      } />
  )
})
