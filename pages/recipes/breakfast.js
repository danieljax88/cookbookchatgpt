import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy
} from 'firebase/firestore'

import { React, useEffect, useState } from 'react'
import FilterMains from '../../src/ui/FilterMains'
import { useRouter } from 'next/dist/client/router'
import FoodCard from '../../src/ui/FoodCard'




const Breakfast = () => {



    const [breakfastloading, setBreakfastLoading] = useState(true);
    const [breakfastRecipe, setBreakfastRecipe] = useState([]);

    const db = getFirestore()

    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Breakfast'), orderBy('title', 'asc'))

    useEffect(() => {
        const getBreakfastFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getBreakfastFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setBreakfastRecipe(getBreakfastFromFirebase)
            setBreakfastLoading(false)
            console.log(breakfastRecipe)

        })

    }, [breakfastloading]);

    if (breakfastloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        <FoodCard recipes={breakfastRecipe} />

        // <FoodCard recipes={recipes} />

    )

}
export default Breakfast