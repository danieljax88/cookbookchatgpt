import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from 'next/link'

import firebase from '../../firebase/initFirebase'
import {
    getFirestore, doc, deleteDoc
} from 'firebase/firestore'



const useStyles = makeStyles(theme => ({

    button: {
        ...theme.typography.mainmenu,
        borderRadius: "40px",
        width: "230px",
        height: "130px",
        marginLeft: "30px",
        alignItem: "center",
        "&:hover": {
            backgroundColor: theme.palette.secondary
        },
        [theme.breakpoints.down("sm")]: {
            width: '100% !important', // Overrides inline-style
            height: 100
        },
    },
    paperRoot: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "15px",

    },
    TypographyAll: {
        userSelect: 'none',

    }
}))
const RecipeDetailsUi = (props) => {
    const classes = useStyles();
    const inputFields = []
    const { currentUser } = useContext(AuthContext)
    const router = useRouter()
    const recipeId = router.query.recipeId //Can be used as a variable to identify recipe id
    const db = getFirestore()
    const docRef = doc(db, 'recipes', `${recipeId}`)



    return (
        <Container maxWidth="lg" >
            {props.recipes.map((recipe) => (
                < Grid container key={recipe.key} spacing={1} marginTop="5px" >
                    < Paper className={classes.paperRoot} elevation={5} >
                        <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                            <Grid key={recipe.key} item xs={12} md={4}>
                                <CardMedia
                                    component="img"
                                    width='100%'
                                    image={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                    alt={recipe.title}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography className={classes.TypographyAll} color="#36454f" sx={{
                                    fontSize: {
                                        lg: 60,
                                        md: 45,
                                        sm: 35,
                                        xs: 30
                                    }, fontWeight: 'bold', fontFamily: 'Pacifico', fontWeight: 'Bold'
                                }}>
                                    {recipe.title}
                                </Typography>
                            </Grid>
                            {currentUser && (
                                <Grid item xs={5} md={2}>
                                    <Link href={`/recipes/edit/${recipe.key}`} passHref>
                                        <Button style={{ marginBottom: 20, marginRight: 10 }} size="large" color="secondary" variant="contained">Edit Recipe</Button></Link>
                                </Grid>)}

                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} variant="h4">
                                    Author:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    },
                                }} style={{ marginBottom: 10 }} >
                                    {recipe.author}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} variant="h4">
                                    Description:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <Typography className={classes.TypographyAll} style={{ marginBottom: 10 }} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 20
                                    },

                                }}>
                                    {recipe.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={3.4} md={12}>
                                <Typography noWrap style={{ wordWrap: "break-word" }} className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    },
                                    fontWeight: 'bold'
                                }} variant="h4">
                                    Website:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* <div style={{ whiteSpace: "normal", overflow: "hidden", width: '30rem' }}> */}
                                <Typography noWrap style={{ width: "25rem", marginBottom: 10 }} sx={{

                                    fontSize: {
                                        lg: 25,
                                        md: 25,
                                        sm: 20,
                                        xs: 16
                                    }
                                }} variant="h4">
                                    <a href={recipe.url} target="_blank" rel="noreferrer">{recipe.url} </a>
                                </Typography>
                                {/* </div> */}
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={2.8} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} variant="h4">
                                    Serves:
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6} md={12}>
                                <Typography style={{ marginBottom: 1 }} className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }
                                }}>
                                    {recipe.serves}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} variant="h4">
                                    Time To Cook:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography style={{ marginBottom: 15 }} className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }
                                }}>
                                    {recipe.timetocook}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }}>
                                    Ingredients:
                                </Typography>
                            </Grid>
                            {recipe.inputFields?.map((inputfield) => (
                                <Grid item className={classes.TypographyAll} key={recipe.id} xs={12}>
                                    <Typography sx={{
                                        fontSize: {
                                            lg: 30,
                                            md: 25,
                                            sm: 20,
                                            xs: 20
                                        }
                                    }}>
                                        {inputfield.quantity} {inputfield.ingredients}
                                    </Typography>
                                </Grid>
                            ))}</Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item style={{ marginTop: "2em" }} xs={12}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} >
                                    Directions:
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.TypographyAll} sx={{
                                fontSize: {
                                    lg: 30,
                                    md: 25,
                                    sm: 20,
                                    xs: 20
                                }
                            }} whiteSpace="pre-line">
                                {recipe.directions}
                            </Typography>
                        </Grid>
                    </Paper >
                </Grid >
            ))
            }
        </Container >

    )
}
export default RecipeDetailsUi