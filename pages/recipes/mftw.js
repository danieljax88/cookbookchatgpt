import { initializeApp } from 'firebase/app'
import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, getDocs, orderBy, query, where, onSnapshot
} from 'firebase/firestore'
import { React, useEffect, useState, Fragment } from 'react'
import MftwGenerator from '../../src/ui/MftwGenerator'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/styles'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const mealsForTheWeek = () => {
    const [mftwLoading, setMftwLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const db = getFirestore()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("md"))

    const docRef = collection(db, 'recipes')

    const q = query(docRef, where("category", "==", 'Main'), orderBy('title', 'asc'))

    useEffect(() => {
        let getRecipesFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getRecipesFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            // let randomRecipe = getRecipesFromFirebase[Math.floor(Math.random() * getRecipesFromFirebase.length)]

            const randomSelection = (n) => {
                let newRecipes = [];
                if (n >= getRecipesFromFirebase.length) {
                    return getRecipesFromFirebase;
                }
                for (let i = 0; i < n; i++) {
                    let newElem = getRecipesFromFirebase[Math.floor(Math.random() * getRecipesFromFirebase.length)];
                    while (newRecipes.includes(newElem)) {
                        newElem = getRecipesFromFirebase[Math.floor(Math.random() * getRecipesFromFirebase.length)];
                    }
                    newRecipes.push(newElem);
                }
                return newRecipes;
            }
            randomSelection(7)
            setRecipes(randomSelection(7))
            setMftwLoading(false);
        })

    }, [mftwLoading])

    const handleSubmit = (e) => {
        e.preventDefault()
        setMftwLoading(true)
    }
    const buttonRight = (
        <Button size="large" variant="contained" color="primary"
            startIcon={<RefreshIcon />} onClick={handleSubmit} sx={{
                borderRadius: "40px", borderRadius: "40px",
                width: "230px",
                height: "70px",
                marginLeft: "800px",
                alignItem: "center",
                marginRight: "10px",
                marginTop: "20px",
                fontWeight: "bold"
            }}> Try Again!</Button>
    )
    const buttonLeft = (
        <Button size="large" variant="contained" color="primary"
            startIcon={<RefreshIcon />} onClick={handleSubmit} sx={{
                borderRadius: "40px", borderRadius: "40px",
                width: "230px",
                height: "70px",
                alignItem: "center",
                marginRight: "10px",
                marginBottom: "10px",
                marginLeft: "30px",
                marginTop: "20px",
                fontWeight: "bold"
            }}> Try Again!</Button>
    )
    if (mftwLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={mftwLoading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return (
        <Fragment>
            <MftwGenerator recipes={recipes} />
            {matches ? buttonLeft : buttonRight}
        </Fragment>
    )
}

export default mealsForTheWeek