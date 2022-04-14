import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RecipeDetailsUi from '../../src/ui/RecipeDetailsUi'

import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, doc, getDoc
} from 'firebase/firestore'

const RecipeDetails = () => {
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState([]);
    const router = useRouter()
    const recipeId = router.query.recipeId //Can be used as a variable to identify recipe id
    const db = getFirestore()
    //Collection
    const docRef = doc(db, 'recipes', `${recipeId}`)

    useEffect(() => {
        let getSingleRecipeData = []
        getDoc(docRef).then((doc) => {
            getSingleRecipeData.push({ ...doc.data(), key: doc.id })
            setRecipe(getSingleRecipeData)
            const key = doc.id
            setLoading(false)
        })
    }, [loading])
    return (
        // <h1>Welcome to the Page for {recipeId}</h1>
        <RecipeDetailsUi recipes={recipe} />
    )
}
export default RecipeDetails
