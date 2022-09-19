import { styled } from '@mui/material/styles';
import {AppBar,Toolbar,Typography,IconButton, Grid} from '@mui/material';
import {Menu,LogoutOutlined} from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

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

  const dispatch = useDispatch();

  const onLogout = ()=>{
      dispatch(startLogout());
  }
  return (
    <AppBarComp position="fixed" open={open} drawerwidth={drawerwidth}>
        <Toolbar>
        <Grid  
                container
                direction      = 'row'
                alignItems     = 'center'
                justifyContent = 'space-between'
                
            >
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
          <IconButton 
                    onClick={onLogout}
                    color = 'inherit'
                    edge="end">
                    <LogoutOutlined/>
          </IconButton>
        </Grid>
          
        </Toolbar>
        
      </AppBarComp>
  )
}
