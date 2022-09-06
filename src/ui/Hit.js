import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image'
// import './Search.css';

const Hit = ({ hit }) => (
    <Link href={`/recipes/${hit.objectID}`} passHref>
        <Grid item key={hit.objectID} xs={12} md={4}>
            <Card elevation={3} sx={{ maxWidth: 400 }}>
                <CardActionArea>
                    <CardHeader
                        titleTypographyProps={{ fontWeight: "Bold" }}
                        title={hit.title}
                        subheader={hit.description}
                    />
                    {/* <CardMedia
                        component="img"
                        height="194"
                        image={hit.image}
                        alt="recipe"
                    /> */}
                    <CardMedia>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                width="400"
                                height="200"
                                alt="Coming Soon"
                                src={hit.image ? hit.image : "/assets/comingsoon.jpg"}
                                layout="responsive"
                                objectFit="cover"
                            // quality={30}
                            />
                        </div>
                    </CardMedia>

                </CardActionArea>
            </Card>
        </Grid>
    </Link>
);

Hit.propTypes = {
    hit: PropTypes.object.isRequired,

};


export default Hit;