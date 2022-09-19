import { SideBar } from "../../ui"
import Typography from '@mui/material/Typography'
import { CrearFormPage } from "./CrearFormPage"
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"



export const FormsPage = () => {
  return (
    <>
        <UfpsFormsLayout >
          <NothingSelectedView/>
           
        </UfpsFormsLayout>
        

        
    </>
  )
}
