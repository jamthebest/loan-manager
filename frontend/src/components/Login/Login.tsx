import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AxiosError } from 'axios';
import _ from 'lodash';

import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { API_URL } from '../../config';

function Copyright(props: any) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {/* {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'} */}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const navigate: NavigateFunction = useNavigate();
    const signIn = useSignIn();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
            .post(API_URL + 'auth/login/', {
                username,
                password,
            })
            .then((response) => {
                signIn({
                    token: response.data.access_token,
                    expiresIn: 10,
                    tokenType: 'Bearer',
                    authState: { id: response.data.id, email: response.data.email, name: response.data.name, username }
                });
                navigate('/');
                window.location.reload();
            }).catch((error: AxiosError) => {
                setErrorMessage(_.get(error, 'response.data.message', 'Login error'));
                setOpen(true);
            });
        // login(username, password).then(
        //     () => {
        //         navigate('/');
        //         window.location.reload();
        //     }
        // ).catch((error: AxiosError) => {
        //     console.log(error);
        //     setErrorMessage(_.get(error, 'response.data.message', 'Login error'));
        //     setOpen(true);
        // });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='username'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            autoFocus
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/register' variant='body2'>
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                {errorMessage && (
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                            <Alert
                                severity='error'
                                action={
                                    <IconButton
                                        aria-label='close'
                                        color='inherit'
                                        size='small'
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize='inherit' />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {errorMessage}
                            </Alert>
                        </Collapse>
                    </Box>
                )}
            </Container>
        </ThemeProvider>
    );
};