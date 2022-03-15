import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy
} from 'firebase/firestore'

import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'


const Sides = () => {


    const [sidesloading, setSidesLoading] = useState(true);
    const [sidesRecipe, setSidesRecipe] = useState([]);

    const db = getFirestore()

    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Sides / Miscellaneous'), orderBy('title', 'asc'))

    useEffect(() => {
        const getSidesFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getSidesFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setSidesRecipe(getSidesFromFirebase)
            setSidesLoading(false)
            console.log(sidesRecipe)

        })

    }, [sidesloading]);

    if (sidesloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        < FoodCard recipes={sidesRecipe} />

        // <FoodCard recipes={recipes} />

    )

}
export default Sides