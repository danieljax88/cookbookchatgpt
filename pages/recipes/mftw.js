import { initializeApp } from 'firebase/app'
import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, getDocs, orderBy, query
} from 'firebase/firestore'
import { React, useEffect, useState, Fragment } from 'react'
import MftwGenerator from '../../src/ui/MftwGenerator'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh';

const mealsForTheWeek = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    const db = getFirestore()

    const colRef = collection(db, 'recipes')

    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
                let getRecipesFromFirebase = [];
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
                console.log(randomSelection(7))
                setRecipes(randomSelection(7))
                setLoading(false);
            })

    }, [loading])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Button Clicked")
        setLoading(true)
    }

    return (
        <Fragment>
            <MftwGenerator recipes={recipes} />
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
        </Fragment>
    )
}

export default mealsForTheWeek