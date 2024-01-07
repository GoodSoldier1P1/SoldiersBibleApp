import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Login.css"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.twitch.tv/goodsoldier1p1_7">
                GoodSoldier1P1_7
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

interface NewUser {
    firstName: string
    lastName: string
}

export default function Signup() {

    const [newUser, setNewUser] = React.useState<NewUser>({
        firstName: "",
        lastName: ""
    })

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const handleSignupSuccess = (userId: string) => {
        navigate('/login', {state: { userId }})
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
                    // Signed up 
                    const userId = userCredential.user.uid
                    console.log(userId)

                    await setDoc(doc(db, 'newUser', userId), {
                        userId: userId,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName
                    })

                    handleSignupSuccess(userId)
                } catch (error) {
                    if (error instanceof Error && 'code' in error && 'message' in error) {
                        const errorCode = error.code
                        const errorMessage = error.message
                        alert(`${errorCode}: ${errorMessage}`)
                    } else {
                        console.error('An unknown error occured', error)
                    }
                }
        
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Link rel="stylesheet" href="/" >
                            <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                        </Link>
                    </div>
                    <Typography component="h1" variant="h5" className='pageInfo'>
                        <h1>Sign Up</h1>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className='box'>
                        <TextField
                            onChange={(event) => {
                                setNewUser({ ...newUser, firstName: event.target.value })
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => {
                                setNewUser({ ...newUser, lastName: event.target.value })
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => {
                                setUser({ ...user, email: event.target.value })
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => {
                                setUser({ ...user, password: event.target.value })
                            }}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='button'
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" className='links'>
                                    <strong> Forgot password?</strong>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2" className='links'>
                                    <strong>{"Already have an account? Login!"}</strong>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}