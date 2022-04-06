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
import Typography from '@mui/material/Typography';

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
                console.log(enteredEmail, enteredPassword)
                await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                Router.push("/")

            } catch (error) {
                console.log(error)
                alert(error)
            }
        },
        [Router]
    )

    return (

        <Grid container spacing={1} direction="row">

            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={30}
                className={classes['login-form']}
            >
                <Paper
                    variant="elevation"
                    elevation={2}
                    className={classes['login-background']}
                >
                    <Grid item justify="center">
                        <Link href="/" passHref>
                            <MUILink color="#36454f" underline="none" component="h1" variant="h5">
                                Sign in
                            </MUILink>
                        </Link>
                    </Grid>
                    <Grid item>
                        <form onSubmit={loginHandler}>
                            <Grid container direction="column" spacing={2}>
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
                                <Grid item>
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
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes['button-block']}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    );
}


export default EmailPasswordAuthLogin