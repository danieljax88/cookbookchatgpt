import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea';

function FilterMains(props) {
    return (
        <div>
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" >
                    <Grid container spacing={2}>
                        {props.filteredrecipes.map((filteredrecipe) => (
                            <Link href={`/recipes/${filteredrecipe.key}`} passHref>
                                <Grid key={filteredrecipe.id} item xs={12} md={6}>
                                    <Card elevation={3} sx={{ maxWidth: 400 }}>
                                        <CardActionArea>
                                            <CardHeader
                                                titleTypographyProps={{ fontWeight: "Bold" }}
                                                title={filteredrecipe.title}
                                                subheader={filteredrecipe.description}
                                            />

                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image="/assets/comingsoon.jpg"
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
export default FilterMains

