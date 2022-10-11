
import { FormControlLabel,Radio, TextField } from "@mui/material"
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm"
import React from "react";
import { memo } from 'react'

export const Opcion = memo(({pregunta, indice,cambiarTexto}) => {
    const {index,enunciado,opciones} = pregunta;
    const {texto} = opciones[indice]; 
    //console.log('aver: '+ texto+ " - "+ indice)
    //console.log('Me generé :(')
    const {enunciadoOpcion, enunciadoOpcionValid, formSubmitted ,onInputChange} = useForm({enunciadoOpcion: texto});

    useEffect(() => {
        cambiarTexto(indice,enunciadoOpcion);
        
    }, [])
  return (
    <FormControlLabel sx={{mt:2}} value={indice} control={<Radio />} label={<TextField
        
        type="text"
        placeholder= {enunciadoOpcion}
        fullWidth 
        name= 'enunciadoOpcion'
        value= { enunciadoOpcion }
        onChange= { onInputChange }
        error= { !!enunciadoOpcionValid && formSubmitted}
        helperText = {enunciadoOpcionValid }

        />} key={indice}/>
  )
})
