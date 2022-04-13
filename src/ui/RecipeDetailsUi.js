import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from 'next/link'



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
        borderRadius: "15px"
    },
    TypographyAll: {
        userSelect: 'none'
    }

}))




const RecipeDetailsUi = (props) => {
    const classes = useStyles();
    const inputFields = []
    const { currentUser } = useContext(AuthContext)

    return (


        <Container maxWidth="lg">
            {props.recipes.map((recipe) => (
                < Grid container key={recipe.key} spacing={1} >
                    < Paper className={classes.paperRoot} elevation={5} >
                        <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                            <Grid key={recipe.key} item xs={12}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    // image="/assets/comingsoon.jpg"
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
                                <Grid item xs={12}>
                                    <Link href={`/recipes/edit/${recipe.key}`} passHref>
                                        <Button style={{ marginBottom: 20 }} size="large" color="secondary" variant="text">Edit Recipe</Button></Link>
                                </Grid>)}
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={2.6} md={1.3}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }} >
                                    Author:
                                </Typography>
                            </Grid>
                            <Grid item xs={9.4} md={8} >
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    },
                                }} style={{ marginLeft: 5, marginBottom: 10 }} >
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

                                }} variant="h4">
                                    {recipe.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={3.4} md={12}>
                                <Typography className={classes.TypographyAll} sx={{
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
                                <Typography style={{ marginBottom: 10 }} sx={{
                                    fontSize: {
                                        lg: 25,
                                        md: 25,
                                        sm: 20,
                                        xs: 16
                                    }
                                }} variant="h4">
                                    <a href={recipe.url}>{recipe.url}</a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row">
                            <Grid item xs={2.8} md={1.4}>
                                <Typography className={classes.TypographyAll} sx={{
                                    fontSize: {
                                        lg: 30,
                                        md: 25,
                                        sm: 20,
                                        xs: 25
                                    }, fontWeight: 'bold'
                                }}>
                                    Serves:
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6} md={1.4}>
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
                                }}>
                                    Time To Cook:
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6} md={12}>
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