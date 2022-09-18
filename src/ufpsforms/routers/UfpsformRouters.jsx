import { Navigate, Route, Routes } from "react-router-dom";
import { FormsPage } from "../pages/FormsPage";


export const UfpsformRouters = () => {
  return (
    <Routes>
        <Route path="/" element={<FormsPage/>}/>
        <Route path="/*" element = {<Navigate to="/" />} />
    </Routes>
  )
}
