import {
    getFirestore, collection, getDocs, orderBy, query
} from 'firebase/firestore'


import React, { useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

import { auth } from "../../firebase/initFirebase"
import { signOut } from "firebase/auth"
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
import useMediaQuery from '@mui/material/useMediaQuery'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { useTheme } from '@mui/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Link as MUILink } from '@mui/material/'
import Link from 'next/link'

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
    title: {
        color: "black",
        variant: "h4"
    },
    drawer: {
        backgroundColor: theme.palette.primary.main
    }


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
        url: '/assets/prawnbutton.jpg',
        title: 'Starters',
        width: '20%',
        link: '/recipes/starters'
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
    {
        url: '/assets/samosasbutton.jpg',
        title: 'Sides & Sauces',
        width: '20%',
        link: '/recipes/sides'
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
    const theme = useTheme()
    const classes = useStyles();
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false)

    const { currentUser } = useContext(AuthContext)

    const signOutHandler = async () => {
        await signOut(auth)
        alert("Sucessfully Logged Out")
    }

    const signOutHandlerMobile = async () => {
        setOpenDrawer(false)
        await signOut(auth)
        alert("Sucessfully Logged Out")
    }
    const title = (
        <React.Fragment>
            <Link href="/" passHref>
                <MUILink underline="none" color="#36454f" gutterBottom="true" style={{ flex: 1 }} sx={{
                    fontSize: {
                        lg: 75,
                        ml: 50,
                        ms: 30,
                        md: 30,
                        sm: 35,
                        xs: 30
                    },
                    fontFamily: 'Pacifico'
                }}>
                    Welcome To the Family Heirloom
                </MUILink>
            </Link>
            {
                currentUser && (
                    <Link href="/recipes/addrecipe" passHref>
                        <Button
                            href="/estimate" size="large" variant="contained" color="primary"
                            startIcon={<AddIcon />}
                            sx={{
                                borderRadius: "40px",
                                width: "230px",
                                height: "100px",
                                marginLeft: "30px",
                                alignItem: "center",
                            }} >Add A recipe</Button></Link>)
            }
            <Link href="/recipes/mftw" passHref>
                <Button size="large" variant="contained" color="primary"
                    startIcon={<RefreshIcon />} sx={{
                        borderRadius: "40px", borderRadius: "40px",
                        width: "230px",
                        height: "100px",
                        marginLeft: "10px",
                        alignItem: "center",
                        marginRight: "5px"
                    }}> Meals for the Week</Button></Link>
            {
                !currentUser && (
                    <Link href="/login" passHref>
                        <Button size="large" variant="contained" color="primary"
                            sx={{
                                borderRadius: "0.25rem",
                                width: "200px",
                                height: "70px",
                                marginLeft: "40px",
                                alignItem: "center",
                                marginRight: "5px",
                                backgroundColor: "#6200ee",
                                color: "#fff",
                                fontSize: "1.5rem",
                                outline: 0,
                                border: 0,
                                boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                                overflow: "hidden"
                            }}> Sign In</Button></Link>)
            }
            {
                currentUser && (
                    <Link href="/" passHref>
                        <Button size="large" variant="contained" color="primary" onClick={signOutHandler}
                            sx={{
                                borderRadius: "0.25rem",
                                width: "200px",
                                height: "70px",
                                marginLeft: "40px",
                                alignItem: "center",
                                marginRight: "5px",
                                backgroundColor: "#6200ee",
                                color: "#fff",
                                fontSize: "1.5rem",
                                outline: 0,
                                border: 0,
                                boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                                overflow: "hidden"
                            }}> Sign Out</Button></Link>)
            }
        </React.Fragment>
    )
    const buttons = (
        <React.Fragment>
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
                                    p: 15,
                                    pt: 2,
                                    ml: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Link>
            ))
            }

        </React.Fragment >
    )
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer}
                onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)} classes={{ paper: classes.drawer }}>
                <List disablePadding>
                    {!currentUser && (
                        <Link href="/login" passHref>
                            <MUILink underline="none" color="#36454f">
                                <ListItem divider style={{ paddingBottom: 30 }} onClick={() => setOpenDrawer(false)}>
                                    <listItemText disableTypography style={{ color: "#6200ee" }}>
                                        Sign In
                                    </listItemText>
                                </ListItem >
                            </MUILink>
                        </Link>)}
                    {currentUser && (
                        <Link href="/" passHref>
                            <MUILink underline="none" color="#36454f">
                                <ListItem divider style={{ paddingBottom: 30 }} onClick={signOutHandlerMobile}>
                                    <listItemText disableTypography style={{ color: "#6200ee" }} >
                                        Sign Out
                                    </listItemText>
                                </ListItem >
                            </MUILink>
                        </Link>)}
                    <Link href="/" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Home
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    <Link href="/recipes/breakfast" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Breakfast
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    <Link href="/recipes/starters" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Starters
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    <Link href="/recipes/mains" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Mains
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    <Link href="/recipes/desserts" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText >
                                    Desserts
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    <Link href="/recipes/sides" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Sides & Sauces
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                    {currentUser && (
                        <Link href="/recipes/addrecipe" passHref>
                            <MUILink underline="none" color="#36454f">
                                <ListItem divider onClick={() => setOpenDrawer(false)}>
                                    <listItemText>
                                        Add A Recipe
                                    </listItemText>
                                </ListItem>
                            </MUILink>
                        </Link>)}
                    <Link href="/recipes/mftw" passHref>
                        <MUILink underline="none" color="#36454f">
                            <ListItem divider onClick={() => setOpenDrawer(false)}>
                                <listItemText>
                                    Meals For the Week
                                </listItemText>
                            </ListItem>
                        </MUILink>
                    </Link>
                </List>
            </SwipeableDrawer>
            <IconButton style={{ backgroundColor: 'transparent' }} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon style={{ height: '50px', width: '50px' }} />
            </IconButton>
            <Link href="/" passHref>
                <MUILink underline="none" color="#36454f" marginLeft="10px" gutterBottom="true" sx={{
                    fontSize: {
                        lg: 100,
                        md: 60,
                        sm: 35,
                        xs: 25
                    },
                    fontFamily: 'Pacifico',
                    fontWeight: 'Bold'

                }}>
                    Welcome To the Family Heirloom
                </MUILink>
            </Link>
        </React.Fragment>
    )
    return (<React.Fragment>
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar disableGutters>
                {matches ? drawer : title}
            </Toolbar>
        </AppBar>
        {matches ? null : buttons}
    </React.Fragment >
    )
}
export default Header