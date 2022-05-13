import React, { useContext, useEffect } from 'react'
import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, doc, getDoc, updateDoc, deleteDoc
} from 'firebase/firestore'
import { AuthContext } from "../../context/AuthContext"
import Grid from "@mui/material/Grid"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/Icon'
import TextField from '@mui/material/TextField'
import makeStyles from '@mui/styles/makeStyles'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles({
    field: {
        marginTop: 10,
        marginBottom: 40,
        display: 'block'
    },
    submit: {
        martinTop: 10,
        marginLeft: 20
    },


})

const category = [
    {
        value: 'Starter',
        label: 'Starter',
    },
    {
        value: 'Main',
        label: 'Main',
    },
    {
        value: 'Dessert',
        label: 'Dessert',
    },
    {
        value: 'Breakfast',
        label: 'Breakfast',
    },
    {
        value: 'Sides / Miscellaneous',
        label: 'Sides / Miscellaneous',
    }
];
const serves = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 8,
        label: '8',
    },

];

const EditRecipeUi = (props) => {

    console.log(props)
    const classes = useStyles()
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [author, setAuthor] = useState(props.author)
    const [Category, setCategory] = useState(props.category)
    const [url, setUrl] = useState(props.url)
    const [timeToCook, setTimeToCook] = useState(props.timetocook)
    const [Serves, setServes] = useState(props.serves)
    const [directions, setDirections] = useState(props.directions)
    const { currentUser } = useContext(AuthContext)
    const [inputFields, setInputFields] = useState(props.inputfields);
    const [deleteOpen, setDeleteOpen] = useState(false)

    const router = useRouter()

    const recipeId = router.query.recipeId
    const db = getFirestore()
    const docRef = doc(db, 'recipes', `${recipeId}`)
    useEffect(() => {
        if (props.timetocook == undefined) {
            setTimeToCook('')

        }
    }, [])
    const handleIngredientChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })
        setInputFields(newInputFields)
    }

    const handleAddIngredients = () => {
        event.preventDefault()
        setInputFields([...inputFields, { id: uuidv4(), ingredients: '', quantity: '' }])
    }
    const handleRemoveIngredients = id => {
        event.preventDefault()
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        updateDoc(docRef, {
            title: title, description: description, author: author, category: Category, url: url, timetocook: timeToCook, serves: Serves, inputFields: inputFields, directions: directions
        })
            .then(() => {
                alert("Recipe has been successfully edited, you will now be redirected to the homepage")
                setTitle('')
                setDescription('')
                setAuthor('')
                setUrl('')
                setTimeToCook('')
                setServes('')
                setDirections('')
                router.push('/')
            })
    }
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const deleteRecipeHandler = (event) => {
        event.preventDefault()
        deleteDoc(docRef).then((doc) => {
            alert("Recipe has been successfully Deleted, you will now be redirected to the homepage")
            router.push('/')
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <Grid container direction="column" >


            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                        <TextField
                            // defaultValue={recipe.title}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            label="Title"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            required>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em", }}>
                        <TextField
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            label="Description"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            required>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                        <TextField
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            label="Author"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            required>

                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                        <TextField
                            onChange={(event) => setCategory(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            value={Category}
                            label="Select Category"
                            variant="outlined"
                            color="secondary"
                            select
                            size="medium"
                            required>
                            {category.map((categoryoption) => (
                                <MenuItem key={categoryoption.value} value={categoryoption.value}>
                                    {categoryoption.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                        <TextField
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            label="URL(Where applicable):"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            r>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                        <TextField
                            value={timeToCook}
                            onChange={(event) => setTimeToCook(event.target.value)}
                            sx={{ m: 1, width: '90%' }}
                            label="Time To Cook (est)"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            r>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={6} md={6} style={{ marginBottom: "0.5em" }}>
                    <TextField
                        value={Serves}
                        onChange={(event) => setServes(event.target.value)}
                        sx={{ m: 1, width: '50ch' }}
                        label="Serves"
                        variant="outlined"
                        color="secondary"
                        select
                        size="medium"
                        type="number"
                        required>
                        {serves.map((servesoption) => (
                            <MenuItem key={servesoption.value} value={servesoption.value}>
                                {servesoption.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>

                <Grid item xs={12} md={12} style={{ marginBottom: "3.0em" }}>
                    <Divider sx={{ borderBottomWidth: 5, bgcolor: "primary" }} classes={{ root: classes.dividerColor }}></Divider>
                </Grid>
                <Grid direction="row">
                    <Grid item xs={12} md={3} >

                        {inputFields?.map(ingredientitem => (
                            <div key={ingredientitem.id}>
                                <TextField sx={{ marginRight: '1em' }}
                                    key={ingredientitem.id}
                                    onChange={event => handleIngredientChangeInput(ingredientitem.id, event)}
                                    name="ingredients"
                                    label="Ingredients"
                                    variant="outlined"
                                    color="secondary"
                                    value={ingredientitem.ingredients}
                                />
                                <TextField sx={{ marginRight: '1em' }}
                                    name="quantity"
                                    label="Quantity"
                                    variant="outlined"
                                    color="secondary"
                                    value={ingredientitem.quantity}
                                    onChange={event => handleIngredientChangeInput(ingredientitem.id, event)}
                                />

                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={3} style={{ marginLeft: "10px", marginBottom: "1.5em" }}>
                        <IconButton size="large" sx={{ marginTop: '0.5em', marginRight: '1em' }}
                            type="submit"
                            colour="secondary"
                            onClick={handleAddIngredients}>
                            <AddIcon />
                        </IconButton>
                        <IconButton sx={{ marginTop: '0.5em' }}
                            type="submit"
                            colour="secondary"
                            variant="contained" onClick={handleRemoveIngredients}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid item xs={10} md={8} style={{ marginLeft: "8px", marginBottom: "0.5em" }}>
                    <TextField
                        value={directions}
                        onChange={(event) => setDirections(event.target.value)}
                        type="text"
                        label="Directions"
                        variant="outlined"
                        color="secondary"
                        required
                        multiline
                        rows={10}
                        // sx={{ width: '150ch' }}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button style={{ marginTop: 20, marginRight: 100, marginLeft: 20 }}
                        type="submit"
                        colour="secondary"
                        variant="contained"
                    >
                        Update Recipe</Button>
                    {currentUser && (
                        <Button onClick={handleDeleteOpen} style={{ marginTop: 20 }} color="error" variant="contained">Delete Recipe</Button>
                    )}
                    <Dialog
                        open={deleteOpen}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you Sure you Want to Delete"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Selecting yes will permenantly delete this recipe!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={deleteRecipeHandler}>yes</Button>
                            <Button color="secondary" onClick={handleDeleteClose} autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

            </form>

        </Grid >

    )
}
export default EditRecipeUi