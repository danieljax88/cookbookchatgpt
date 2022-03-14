import {
    getFirestore, collection, getDocs, orderBy, query
} from 'firebase/firestore'

import React from 'react'
import Link from 'next/link'

import { AppBar, Toolbar, alpha } from "@mui/material";
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles } from '@mui/styles'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';


const searchClient = algoliasearch('3NONBKD267', '1c15f9b7d67f66e32c75202a8ce4d6f1') //Key only has browse permissions

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

}))
/*Image Button Styling Begins*/
const images = [
    {
        url: '/assets/breakfastMenu.jpg',
        title: 'Breakfast',
        width: '20%',
        link: '/recipes/breakfast'
    },
    {
        url: '/assets/steak.jpg',
        title: 'Mains',
        width: '20%',
        link: '/recipes/mains'
    },
    {
        url: '/assets/desserts.jpg',
        title: 'Desserts',
        width: '20%',
        link: '/recipes/desserts'
    },
];
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.common.primary,
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 150,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));
/*Image Button Styling Ends*/

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const Header = () => {
    const classes = useStyles();
    return (<React.Fragment>
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar disableGutters>

                {images.map((image) => (
                    <Link key={image.title} href={image.link} >
                        <ImageButton
                            focusRipple
                            key={image.title}
                            style={{
                                width: image.width,
                            }}
                        >
                            <ImageSrc style={{
                                backgroundImage: `url(${image.url})`
                            }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="white"
                                    fontWeight="bold"

                                    sx={{
                                        position: 'relative',
                                        p: "7em",
                                        pt: "2em",
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    </Link>
                ))}
                <Link href="/recipes/addrecipe" passHref>
                    <Button
                        href="/estimate" size="large" variant="contained" color="primary"
                        startIcon={<AddIcon />}
                        sx={{
                            borderRadius: "40px", borderRadius: "40px",
                            width: "230px",
                            height: "100px",
                            marginLeft: "20px",
                            alignItem: "center",
                        }} >Add A recipe</Button></Link>
                <Link href="/recipes/mftw" passHref>
                    <Button size="large" variant="contained" color="primary"
                        startIcon={<RefreshIcon />} sx={{
                            borderRadius: "40px", borderRadius: "40px",
                            width: "230px",
                            height: "100px",
                            marginLeft: "20px",
                            alignItem: "center",
                            marginRight: "10px"
                        }}> Meals for the Week</Button></Link>

                {/* <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search> */}
            </Toolbar>
        </AppBar>


    </React.Fragment >
    )
}

export default Header