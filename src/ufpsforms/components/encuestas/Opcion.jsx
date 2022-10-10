
import { FormControlLabel,Radio, TextField } from "@mui/material"
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm"


export const Opcion = ({pregunta, setPregunta, indice}) => {
    const {index,enunciado,opciones} = pregunta;
    const {texto} = opciones[indice]; 
    console.log('aver: '+ texto+ " - "+ indice)
    const {enunciadoOpcion, enunciadoOpcionValid, formSubmitted ,onInputChange} = useForm({enunciadoOpcion: texto});
    useEffect(() => {

        const nuevaOpcion = {
            index: indice,
            texto: enunciadoOpcion
        }
        opciones[indice] = nuevaOpcion;
        const nueva = {
            index,
            enunciado,
            opciones
        }
        setPregunta(index, nueva);
      
        
      }, [enunciadoOpcion])
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
}
