import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image'

function FoodCard(props) {
    return (
        <div>
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" marginTop="30px" >
                    <Grid container spacing={2}>
                        {props.recipes.map((recipe) => (
                            <Link href={`/recipes/${recipe.key}`} passHref>
                                <Grid key={recipe.key} item xs={12} md={4}>

                                    <Card elevation={3} sx={{ maxWidth: 400 }}>
                                        <CardActionArea>
                                            <CardHeader
                                                titleTypographyProps={{ fontWeight: "Bold" }}
                                                title={recipe.title}
                                                subheader={recipe.description}
                                            />

                                            <CardMedia  >
                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                    <Image
                                                        width="400"
                                                        height="200"
                                                        alt="Coming Soon"
                                                        src={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                                        layout="responsive"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            </CardMedia>
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

