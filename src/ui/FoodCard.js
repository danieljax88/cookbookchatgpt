import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image'
//FoodCard Is now no longer used by the Core Index, this is because that is using InfiniteHits instead. This is used only for the individual, filtered pages.
function FoodCard(props) {
    return (
        <div>
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" marginTop="30px" >
                    <Grid container spacing={2}>
                        {props.recipes.map((recipe) => (
                            <Link key={recipe.key} href={`/recipes/${recipe.key}`} passHref>
                                <Grid item xs={12} md={4}>

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
                                                        priority={true}
                                                        width="400"
                                                        height="200"
                                                        alt={recipe.image ? recipe.title : "Coming Soon"}
                                                        src={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                                        layout="responsive"
                                                        objectFit="cover"
                                                        quality={35}
                                                        sizes={"20vw"}
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

