import React, { useCallback, useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Link as MUILink } from '@mui/material/'
import { auth } from "../../firebase/initFirebase"
import { sendPasswordResetEmail } from "firebase/auth"


import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import classes from './EmailPassword.module.css';

const EmailPasswordReset = () => {
    const Router = useRouter()
    const emailInputRef = useRef();

    const resetHandler = useCallback(
        async (event) => {
            event.preventDefault()
            const enteredEmail = emailInputRef.current.value;
            try {
                await sendPasswordResetEmail(auth, enteredEmail)
                alert("Password reset link sent!");
                Router.push("/")

            } catch (error) {
                console.log(error)
                alert(error)
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
                        <Link href="/passwordreset" passHref>
                            <MUILink sx={{ cursor: 'pointer' }} color="#36454f" underline="none" component="h1" variant="h5">
                                Password Reset
                            </MUILink>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        marginTop: "60px"
                    }}>
                        <form onSubmit={resetHandler}>

                            <Grid item>
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    fullWidth
                                    name="username"
                                    variant="outlined"
                                    inputRef={emailInputRef}
                                    required
                                    autoFocus
                                />
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


export default EmailPasswordReset 