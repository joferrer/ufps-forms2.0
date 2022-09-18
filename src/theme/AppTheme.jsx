import { ThemeProvider } from "@emotion/react"
import { ufpstheme } from "./ufpstheme";
import {CssBaseline} from '@mui/material';


export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={ufpstheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
