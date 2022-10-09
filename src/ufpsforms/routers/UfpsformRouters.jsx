import { Navigate, Route, Routes } from "react-router-dom";

import { CrearFormPage, EncuestasFinalizadasPage, FormsPage, PoblacionPage } from "../pages";



export const UfpsformRouters = () => {
  const encuesta = '/encuestas';
  const poblacion = '/poblacion'
  return (
    <Routes>
        <Route path="/" element={<FormsPage/>}/>
        <Route path={`${encuesta}/crear`} element={<CrearFormPage/>}/>
        <Route path={`${encuesta}/finalizadas`} element={<EncuestasFinalizadasPage/>}/>
        <Route path={`${poblacion}`} element={<PoblacionPage/>}/>
        <Route path="/*" element = {<Navigate to="/" />} />
    </Routes>
  )
}
