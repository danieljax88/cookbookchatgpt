import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles'
import CardMedia from '@mui/material/CardMedia';

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
    console.log(props.recipes.directions)
    const classes = useStyles();
    const inputFields = []

    return (


        <Container>
            {props.recipes.map((recipe) => (

                < Paper className={classes.paperRoot} elevation={5} >
                    < Grid key={recipe.key} container justify="center" alignItems="center" >
                        <Grid container spacing={1}>
                            <Grid key={recipe.key} item xs={6}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    // image="/assets/comingsoon.jpg"
                                    image={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                    alt="Mac and Cheese"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.TypographyAll} sx={{ fontWeight: 'bold' }} variant="h2">
                                    {recipe.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.TypographyAll} variant="h4">
                                    Author: {recipe.author}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.TypographyAll} variant="h4">
                                    Description: {recipe.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Website: <a href={recipe.url}>{recipe.url}</a>
                                </Typography>
                            </Grid>
                            <Grid item style={{ marginBottom: "0.5em" }} xs={12}>
                                <Typography className={classes.TypographyAll} variant="h4">
                                    Serves: {recipe.serves}
                                </Typography>
                            </Grid>
                            {recipe.inputFields?.map((inputfield) => (
                                <Grid item className={classes.TypographyAll} key={recipe.id} xs={12}>
                                    <Typography variant="h4">
                                        {inputfield.ingredients} {inputfield.quantity}
                                    </Typography>

                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Typography className={classes.TypographyAll} variant="h4" whiteSpace="pre-line">
                                    Directions:
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.TypographyAll} variant="body1" whiteSpace="pre-line">
                                    {recipe.directions}
                                </Typography>
                            </Grid>


                        </Grid>
                    </Grid>
                </Paper>
            ))
            }
        </Container >

    )
}
export default RecipeDetailsUi