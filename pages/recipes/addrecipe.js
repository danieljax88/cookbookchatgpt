import firebase from '../../firebase/initFirebase'

import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import makeStyles from '@mui/styles/makeStyles'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/Icon'
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DropzoneArea } from 'react-mui-dropzone';
import { storage } from '../../firebase/initFirebase'

import { useRouter } from 'next/router'


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


const AddRecipe = () => {
    const { currentUser } = useContext(AuthContext)
    const random = Math.floor(Math.random() * 500) + 1
    // console.log(random)
    const classes = useStyles()

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
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(null);

    const router = useRouter()

    useEffect(() => {
        if (isLoading === null) {
            return null
        }
        firebase.firestore().collection('recipes')
            .add({
                title: title, description: description, author: author, category: Category, url: url, timetocook: timeToCook, serves: Serves, inputFields: inputFields, directions: directions, random: random, image: imageUrl
            }).then(() => {

                alert("Recipe has been successfully submitted, you will now be redirected to the homepage")
                setTitle('')
                setDescription('')
                setAuthor('')
                setUrl('')
                setTimeToCook('')
                setServes('')
                setDirections('')
                router.push('/')
            }).catch((error) => {
                alert(error.message)
            })
    }, [isLoading]);

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
        if (title && description && author && Category && directions) {
            const ref = storage.ref(`/images/${image.name}`);
            const uploadTask = ref.put(image);
            uploadTask.on("state_changed", console.log, console.error, () => {
                ref
                    .getDownloadURL()
                    .then((url) => {
                        setImage(null);
                        setImageUrl(url);
                        setIsLoading(false)

                    });
            })

        } else (
            alert("Please complete all required fields")
        )
    }
    if (currentUser) {
        return (
            <Grid container direction="column" >
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container direction="row">
                        <Grid item xs={12} sm={6} md={12} lg={3} style={{ marginBottom: "0.5em" }}>
                            <TextField
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
                            onChange={(event) => setServes(event.target.value)}
                            sx={{ m: 1, width: '50ch' }}
                            value={Serves}
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
                    <Grid item xs={9} md={6} style={{ marginBottom: "0.5em", marginLeft: "1.0em" }}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            filesLimit='1'
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => setImage(files[0])}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} style={{ marginBottom: "3.0em" }}>
                        <Divider sx={{ borderBottomWidth: 5, bgcolor: "primary" }} classes={{ root: classes.dividerColor }}></Divider>
                    </Grid>
                    <Grid direction="row">
                        <Grid item xs={12} md={3} >

                            {inputFields.map(inputField => (
                                <div key={inputField.id}>
                                    <TextField sx={{ marginRight: '1em' }}
                                        key={inputField.id}
                                        onChange={event => handleIngredientChangeInput(inputField.id, event)}
                                        name="ingredients"
                                        label="Ingredients"
                                        variant="outlined"
                                        color="secondary"
                                    />
                                    <TextField sx={{ marginRight: '1em' }}

                                        name="quantity"
                                        label="Quantity"
                                        variant="outlined"
                                        color="secondary"
                                        onChange={event => handleIngredientChangeInput(inputField.id, event)}
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
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item>
                        <Button sx={{ mt: 5, marginBottom: '6em', marginLeft: '10px' }}
                            type="submit"
                            colour="secondary"
                            variant="contained"
                            disabled={!image}>
                            Happy Cooking! (Submit)</Button>
                    </Grid>
                </form>
            </Grid >
        )
    } else {
        router.push("/login")
        return <></>
    }

}
export default AddRecipe