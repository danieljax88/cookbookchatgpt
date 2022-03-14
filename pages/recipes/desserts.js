import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy
} from 'firebase/firestore'


import { React, useEffect, useState } from 'react'
import FilterMains from '../../src/ui/FilterMains'
import { useRouter } from 'next/dist/client/router'
import FoodCard from '../../src/ui/FoodCard'




const Desserts = () => {


    const [dessertsloading, setDessertsLoading] = useState(true);
    const [dessertsRecipe, setDessertsRecipe] = useState([]);

    const db = getFirestore()

    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Dessert'), orderBy('title', 'asc'))

    useEffect(() => {
        const getDessertsFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getDessertsFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setDessertsRecipe(getDessertsFromFirebase)
            setDessertsLoading(false)
            console.log(dessertsRecipe)

        })

    }, [dessertsloading]);

    if (dessertsloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        <FoodCard recipes={dessertsRecipe} />

        // <FoodCard recipes={recipes} />

    )

}
export default Desserts