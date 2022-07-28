import React, { useCallback, useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Link as MUILink } from '@mui/material/'
import { auth } from "../../firebase/initFirebase"
import { signInWithEmailAndPassword } from "firebase/auth"


import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import classes from './EmailPassword.module.css';

const EmailPasswordAuthLogin = () => {
    const Router = useRouter()
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginHandler = useCallback(

        async (event) => {
            event.preventDefault()
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;
            try {
                // console.log(enteredEmail, enteredPassword)
                await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                Router.push("/")

            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User Not Found !')
                        break;
                    case 'auth/wrong-password':
                        alert('Incorrect Password !')
                        break;
                    default: alert(error)
                }

            }
        },
        [Router]
    )
    return (
        <Paper sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            marginTop: 2
        }} variant="elevation" elevation={2}>
            < Grid container >
                <Grid container alignItems="center" direction="column" xs={12} md={12}>

                    <Grid item >
                        <Link href="/login" passHref>
                            <MUILink sx={{ cursor: 'pointer' }} color="#36454f" underline="none" component="h1" variant="h5">
                                Sign in
                            </MUILink>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        marginTop: "60px"
                    }}>
                        <form onSubmit={loginHandler}>

                            <Grid item>
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    fullWidth
                                    name="username"
                                    variant="outlined"
                                    // value={email}
                                    // onChange={(event) => setEmail(event.target.value)}
                                    inputRef={emailInputRef}
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "5px"
                            }}>
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    // value={password}
                                    // onChange={(event) => setPassword(event.target.value)}
                                    inputRef={passwordInputRef}
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "5px"
                            }}>
                                <Link href="/passwordreset" passHref>
                                    <MUILink sx={{ cursor: 'pointer' }} color="#36454f" >
                                        Forgot Password
                                    </MUILink>
                                </Link>
                            </Grid>
                            <Grid item sx={{
                                marginTop: "20px"
                            }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes['button-block']}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid >
            </Grid >
        </Paper>
    );
}


export default EmailPasswordAuthLogin