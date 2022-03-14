import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy
} from 'firebase/firestore'

import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'


const Mains = () => {


    const [mainsloading, setMainsLoading] = useState(true);
    const [mainsRecipe, setMainsRecipe] = useState([]);

    const db = getFirestore()

    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Main'), orderBy('title', 'asc'))

    useEffect(() => {
        const getMainsFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getMainsFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setMainsRecipe(getMainsFromFirebase)
            setMainsLoading(false)
            console.log(mainsRecipe)

        })

    }, [mainsloading]);

    if (mainsloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        < FoodCard recipes={mainsRecipe} />

        // <FoodCard recipes={recipes} />

    )

}
export default Mains