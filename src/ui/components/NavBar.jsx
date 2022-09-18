import { styled } from '@mui/material/styles';
import {AppBar,Toolbar,Typography,IconButton} from '@mui/material';

import {Menu} from '@mui/icons-material';

const drawerWidth = 240;

const AppBarComp = styled(AppBar, {
    
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open, drawerwidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerwidth,
      width: `calc(100% - ${drawerwidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


export const NavBar = ({title, handleDrawerOpen, drawerwidth, open}) => {
  return (
    <AppBarComp position="fixed" open={open} drawerwidth={drawerwidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBarComp>
  )
}
