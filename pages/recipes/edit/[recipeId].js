import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import EditRecipeUi from '../../../src/ui/EditRecipeUi'
import firebase from '../../../firebase/initFirebase'
import {
    getFirestore, collection, doc, getDoc
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

const RecipeDetails = () => {

    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [Category, setCategory] = useState('')
    const [url, setUrl] = useState('')
    const [timeToCook, setTimeToCook] = useState('')
    const [Serves, setServes] = useState('')
    const [directions, setDirections] = useState('')

    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), ingredients: '', quantity: '' },
    ]);
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
            setTitle(getSingleRecipeData[0].title)
            setDescription(getSingleRecipeData[0].description)
            setAuthor(getSingleRecipeData[0].author)
            setCategory(getSingleRecipeData[0].category)
            setUrl(getSingleRecipeData[0].url)
            setTimeToCook(getSingleRecipeData[0].timetocook)
            setServes(getSingleRecipeData[0].serves)
            setDirections(getSingleRecipeData[0].directions)
            setInputFields(getSingleRecipeData[0].inputFields)
            const key = doc.id
            setLoading(false)
        })
    }, [])


    return (

        !loading ? <EditRecipeUi


            recipes={recipe}
            key={doc.id}
            title={title}
            description={description}
            author={author}
            category={Category}
            url={url}
            serves={Serves}
            directions={directions}
            inputfields={inputFields}
            recipe={recipe}
            timetocook={timeToCook}
        /> : "loading"

    )
}
export default RecipeDetails
