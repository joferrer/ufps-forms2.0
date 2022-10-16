import { ArrowForwardOutlined, ArrowOutwardOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
/**
 * Ej: cabecera = [nombre, cantidad]
 * filas = [{nombre : 'Estudiantes', cantidad: 0}, {nombre: 'profesores', cantidad: 0}, {nombre: 'Graduados', cantidad: 0}]
 * @param {*} param0 
 * @returns 
 */
export const Tabla = ({cabeceras, filas}) => {
  return (
    <TableContainer component={Paper} sx={{maxHeight: '80%', maxWidth: '96%'}}>
        <Table sx={{ minWidth: 360 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {
                        cabeceras.map((titulo, index)=>(
                            <TableCell key={`cabecera-tabla ${index}`}>{titulo}</TableCell>
                        ))
                    }
                </TableRow>
                
            </TableHead>

            <TableBody>
                {
                    filas.map((fila, index)=>(
                        <TableRow
                            key={`fila-tabla: ${index}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                Object.keys(fila).map((valor,index)=>(
                                    valor !== 'link' ?  
                                    <TableCell key={`columna-tabla: ${index}`} >{fila[valor]}</TableCell>
                                    : 
                                    <TableCell key={`columna-tabla: ${index}`} >
                                        <Link to={`/poblacion?p=${index}`}><ArrowForwardOutlined /></Link>
                                    </TableCell>

                                ))
                            }
                            
                        </TableRow>                       
                    ))
                }
                
            </TableBody>

        </Table>
    </TableContainer>
  )
}
