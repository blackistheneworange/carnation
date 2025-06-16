'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../AppTheme';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import { hideNotification, showNotification } from '@/lib/features/notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  }
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notification);

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordRepeatError, setPasswordRepeatError] = React.useState(false);
  const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError || passwordRepeatError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    try{
      await axios.post('/api/admin/auth/signup', {
        email: data.get('email'),
        password: data.get('password')
      });
      dispatch(showNotification({ 
        message: 'Signup Successful',
        type: 'success'
      }));

      router.push('/admin/login');
    }
    catch(err: any) {
      dispatch(showNotification({ 
        message: err.response?.data?.message || err.message || err,
        type: 'error'
      }));
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const password_repeat = document.getElementById('password-repeat') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if(password_repeat.value !== password.value){
      setPasswordRepeatError(true);
      setPasswordRepeatErrorMessage('Password does not match');
      isValid = false;
    }
    else {
      setPasswordRepeatError(false);
      setPasswordRepeatErrorMessage('');
    }

    return isValid;
  };

  const handleNotificationClose = () => {
      dispatch(hideNotification());
  }

  return (
    <AppTheme>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" style={{ overflow: 'auto' }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Create new admin account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoFocus
                required
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                required
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <TextField
                error={passwordRepeatError}
                helperText={passwordRepeatErrorMessage}
                name="password-repeat"
                placeholder="••••••"
                type="password"
                id="password-repeat"
                required
                variant="outlined"
                color={passwordRepeatError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign Up
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an admin account?{' '}
              <Link
                href="/admin/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Card>

        <Toast open={notification.open} message={notification.message} handleClose={handleNotificationClose} type={notification.type} />
      </SignUpContainer>
    </AppTheme>
  );
}