
import {List,ListItem,ListItemIcon,ListItemButton,ListItemText} from '@mui/material';
import {MoveToInbox,Mail, Feed, CheckBox, AddTask} from '@mui/icons-material';
import { MouseOverPopover } from './MouseOverPopover';
import { NavLink, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';

const iconsList = [  <Feed color='primary' />, <CheckBox color='primary'/> ,<MoveToInbox color='primary' />, <AddTask color='primary'/>];

const opciones = [
  {
    index: 0,
    opcion: 'Encuestas vigentes',
    link: '/encuestas'
  },
  {
    index: 1,
    opcion: 'Encuestas finalizadas',
    link: '/encuestas/finalizadas'
  },
  {
    index: 2,
    opcion: 'Poblaciones',
    link: '/poblacion'
  },
  {
    index: 3,
    opcion: 'Crear Encuesta',
    link: '/encuestas/crear'
  },
]

export const SideBarItemList = () => {
  const location = useLocation();

  //console.log(location.pathname)

  return (
    <List >
          {opciones.map(({index,opcion,link}) => (
           
                <ListItem key={link} disablePadding sx={{ display: 'block' , backgroundColor: location === link ? rgba(0,0,0,.8) :'inherit',}}>
                   <NavLink to={link} style={{textDecoration: 'none', color:'inherit',}}>
                <MouseOverPopover>
                <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location === link ? grey[400] :'inherit',
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',                    
                  }}
                >
                  {iconsList[index]}
                </ListItemIcon>
                <ListItemText primary={opcion} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
                </MouseOverPopover>
                </NavLink>  
            </ListItem>
            
            
          ))}
        </List>
  )
}
