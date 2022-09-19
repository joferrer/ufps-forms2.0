import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {  checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';



export const LoginPage = () => {

  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event )=>{
      event.preventDefault();
      console.log({email, password});

      dispatch( startLoginWithEmailPassword(formState));

      console.log(errorMessage);
  }

  const onGoogleSignIn = ()=>{
      console.log('ongoogle signin');
      dispatch( startGoogleSingIn() );

  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit } 
      className='animate__animated animate__fadeIn animate__faster'>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth 
            name='email'
            onChange={ onInputChange }
            value={ email }
            />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Contraseña"
            type="password"
            placeholder="contraseña"
            fullWidth 
            name='password'
            onChange={ onInputChange }
            value={ password }
            />
        </Grid>
        <Grid item xs={12} display={!!errorMessage ? '':'none'} >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Button 
              disabled= {isAuthenticating}
              type='submit' 
              variant='contained' 
              fullWidth
            >Login</Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button 
              disabled= {isAuthenticating}
              variant='contained' 
              fullWidth
              onClick={ onGoogleSignIn }>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>



  )
}
