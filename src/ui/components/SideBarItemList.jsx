
import {List,ListItem,ListItemIcon,ListItemButton,ListItemText} from '@mui/material';
import {MoveToInbox,Mail, Feed, CheckBox, AddTask} from '@mui/icons-material';
import { MouseOverPopover } from './MouseOverPopover';

const iconsList = [  <Feed color='primary' />, <CheckBox color='primary'/> ,<MoveToInbox color='primary' />, <AddTask color='primary'/>];

export const SideBarItemList = () => {
  return (
    <List >
          {['Encuestas vigentes', 'Encuestas finalizadas', 'Cargar Personal', 'Crear Encuesta'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <MouseOverPopover>
                <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
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
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
                </MouseOverPopover>
              
            </ListItem>
          ))}
        </List>
  )
}
