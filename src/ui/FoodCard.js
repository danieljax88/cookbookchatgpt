import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea';

function FoodCard(props) {


    return (
        <div>
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" marginTop="30px" >
                    <Grid container spacing={2}>
                        {props.recipes.map((recipe) => (

                            <Link href={`/recipes/${recipe.key}`} passHref>
                                <Grid key={recipe.key} item xs={12} md={6}>

                                    <Card elevation={3} sx={{ maxWidth: 400 }}>
                                        <CardActionArea>
                                            <CardHeader
                                                titleTypographyProps={{ fontWeight: "Bold" }}
                                                title={recipe.title}
                                                subheader={recipe.description}
                                            />

                                            <CardMedia
                                                component="img"
                                                height="194"
                                                // image="/assets/comingsoon.jpg"
                                                image={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                                alt="Mac and Cheese"
                                            />
                                        </CardActionArea>
                                    </Card>

                                </Grid>

                            </Link>

                        ))}
                    </Grid>

                </Grid >
            </Container>
        </div>
    )
}
export default FoodCard

