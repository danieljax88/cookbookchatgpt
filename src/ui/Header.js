import React, { useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

import { auth } from "../../firebase/initFirebase"
import { signOut } from "firebase/auth"
import Toolbar from "@mui/material/Toolbar";
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link as MUILink } from '@mui/material/'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import { getAuth } from "firebase/auth";

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
    },
    stickyButtons: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 20,

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
    position: 'sticky',
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
    position: 'sticky',
    top: 0,
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

const Header = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const theme = useTheme()
    const classes = useStyles();
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUser } = useContext(AuthContext)

    const open = Boolean(anchorEl);
    const signOutHandler = async () => {
        setAnchorEl(null);
        await signOut(auth)
        alert("Sucessfully Logged Out")
    }

    const signOutHandlerMobile = async () => {
        setOpenDrawer(false)
        await signOut(auth)
        alert("Sucessfully Logged Out")
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = event => setAnchorEl(event.currentTarget);

    // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
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
                    The Jackson CookBook
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
                        marginRight: "1em"
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
                                bgcolor: "custom.moderateBlue",
                                color: "neutral.white",
                                fontSize: "1.5rem",
                                outline: 0,
                                border: 0,
                                boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                                overflow: "hidden",
                                p: "8px 25px",
                                "&:hover": {
                                    bgcolor: "custom.lightGrayishBlue",
                                },
                            }}> Sign In</Button></Link>)
            }
            {/* {
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
                                bgcolor: "custom.moderateBlue",
                                color: "neutral.white",
                                fontSize: "1.5rem",
                                outline: 0,
                                border: 0,
                                boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                                overflow: "hidden",
                                p: "8px 25px",
                                "&:hover": {
                                    bgcolor: "custom.lightGrayishBlue",
                                },
                            }}> Sign Out</Button></Link>)
            } */}
            {currentUser && (

                <Button
                    sx={{ marginRight: "1em", textTransform: "none", fontSize: "1rem" }}
                    id="profile-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    // aria-label={label && translate(label, { _: label })}
                    // className={UserMenuClasses.userButton}
                    color="inherit"
                    startIcon={

                        <Avatar
                            sx={{ width: '3em', height: '3em' }}
                            // // className={UserMenuClasses.avatar}
                            src={user.photoURL}
                            alt={"User"}
                        />

                    }
                    onClick={handleMenu}
                >
                    {user.displayName}
                </Button>
            )
            }
            {/* <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            ></Popper> */}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Link href="/profile" passHref><MenuItem >Profile</MenuItem></Link>
                <MenuItem onClick={signOutHandler}>Logout</MenuItem>
            </Menu>

        </React.Fragment >
    )
    const buttons = (
        <React.Fragment>
            {images.map((image) => (

                <Link key={image.title} href={image.link} >
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width
                        }}

                    >
                        <ImageSrc style={{
                            backgroundImage: `url(${image.url})`
                        }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image alt={image.title}>
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
                    The CookBook
                </MUILink>
            </Link>
        </React.Fragment>
    )
    return (<React.Fragment>
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar disableGutters>
                {matches ? drawer : title}
            </Toolbar>
            <div className="stickyButtons">
                {matches ? null : buttons}
            </div>
        </AppBar>

    </React.Fragment >
    )
}
export default Header