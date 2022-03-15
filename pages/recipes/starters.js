import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy
} from 'firebase/firestore'

import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'


const Starters = () => {


    const [startersloading, setStartersLoading] = useState(true);
    const [startersRecipe, setStartersRecipe] = useState([]);

    const db = getFirestore()

    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Starter'), orderBy('title', 'asc'))

    useEffect(() => {
        const getStartersFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getStartersFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setStartersRecipe(getStartersFromFirebase)
            setStartersLoading(false)
            console.log(startersRecipe)

        })

    }, [startersloading]);

    if (startersloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        < FoodCard recipes={startersRecipe} />

        // <FoodCard recipes={recipes} />

    )

}
export default Starters