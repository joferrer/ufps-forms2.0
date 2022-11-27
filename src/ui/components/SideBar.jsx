import React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import {Box,Drawer,CssBaseline,Typography,Divider,IconButton,Avatar} from '@mui/material';
import {ChevronLeft,ChevronRight} from '@mui/icons-material';

import { ufpstheme } from '../../theme/ufpstheme';
import { NavBar } from './NavBar';
import { SideBarItemList } from './SideBarItemList';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Width de la SideBar
 */
const drawerWidth = 240;
const screen = window.screen.width;

/**
  * Estilos para que el componente sea responsive al abrirse la barra. 
*/
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

/**
  * Estilos para que el componente sea responsive al cerrarse la barra. 
*/
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width:  window.screen.width > 500 ? `calc(${theme.spacing(7)} + 1px)`: 0,
  [theme.breakpoints.up('sm')]: {
    width:`calc(${theme.spacing(8)} + 1px)`,
  },
});

/** Componente del SideBar donde va el Avatar del Usuario 
  * Acá se aprecian los estilos aplicados para el componente. 
  */

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '100px',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

/** Componente contenedor de todo el SideBar.
  * Acá se aplican todos los estilos para que la barra sea Responsive.
  * Está adactada para el proyecto, la fuente original es el componente Drawer de Material.
  * Más información del componente en: https://mui.com/material-ui/react-drawer/#responsive-drawer
  */
const DrawerComp = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ?  {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }:{
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    } )
  }),
);

/**
 * Este el componente completo de SideBar
 * @param {JSX} children Es el JSX que contiene todo la pagina actual. 
 * @returns Componente SideBar.jsx
 */
export const  SideBar=(props)=> {
  const {children} = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const {esAdministrador, photoURL,poblacion} = useSelector(state => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <NavBar 
        title='Ufps Forms' 
        handleDrawerOpen={handleDrawerOpen} 
        drawerwidth={drawerWidth}
        open={poblacion ==0 ? open: false}
        
        />
      
          {
            poblacion == 0 ? (
              <>
                <DrawerComp variant="permanent" open={open} >
                  <DrawerHeader>
                    <Avatar 
                      src ={photoURL!='' ? `${photoURL}` :'' }
                      sx={{ width: 56, height: 56, marginRight: '50px',bgcolor: ufpstheme.palette.primary.main } }>
                      
                    </Avatar>
                    <IconButton color='primary' onClick={handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                  </DrawerHeader>
                  
                  {/**
                   * Lista de items que se muestran en la SideBar
                   */}
                  <SideBarItemList/>

                  <Divider />
                  
                </DrawerComp>
                <Box  sx={{ flexGrow: 1, p: 3 }}>
                  <DrawerHeader />

                  {/** Aca va  el contenido de la pagina */}
                  {children}
                  
                  
                </Box>
              </>
            )
            :
            <>
                <Box  sx={{ flexGrow: 1, p: 3 }}>
                  <DrawerHeader />

                  {/** Aca va  el contenido de la pagina */}
                  {children}
                  
                  
                </Box>
            </>

          }

    </Box>
  );
}
