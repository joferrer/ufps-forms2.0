
import { FormControlLabel,Radio, TextField } from "@mui/material"
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm"
import React from "react";
import { memo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { startModificarOpcion } from "../../../store/crearEncuesta";

export const Opcion = memo(({pregunta, valor}) => {

    const dispatch = useDispatch();
    const {preguntas} = useSelector(state => state.crearEncuesta);
    console.log('COMO QUE CUAL VALOR: '+ valor);
    const indice = pregunta.indice;
    console.log('COMO QUE CUAL INDICE: '+ indice);

    const opciones = preguntas[indice].opciones;
    const {texto} = opciones[valor]; 
    //console.log('aver: '+ texto+ " - "+ indice)
    //console.log('Me generé :(')
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

        />} />
  )
})
