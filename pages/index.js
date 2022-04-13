import {
  getFirestore, collection, getDocs, orderBy, query
} from 'firebase/firestore'
import firebase from '../firebase/initFirebase'
import { React, useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import FoodCard from '../src/ui/FoodCard.js'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'

const useStyles = makeStyles(theme => ({
  mainContainer: {

  },
  paperRoot: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "15px"
  },
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CookBook() {
  const router = useRouter();

  const classes = useStyles()
  const theme = useTheme()

  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const db = getFirestore()

  const colRef = collection(db, 'recipes')

  const q = query(colRef, orderBy('title', 'asc'))

  useEffect(() => {
    let getRecipesFromFirebase = [];
    getDocs(q)
      .then((snapshot) => {
        let getRecipesFromFirebase = [];
        snapshot.docs.forEach((doc) => {
          getRecipesFromFirebase.push({ ...doc.data(), key: doc.id })
        })
        setRecipes(getRecipesFromFirebase);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Loading Data
          </Typography>
        </Box>
      </Modal>)
  }

  return (
    <Fragment>
      <Container maxWidth="lg">
        < Paper className={classes.paperRoot} elevation={5} >
          <div>
            <Typography sx={{
              fontSize: {
                lg: 25,
                md: 25,
                sm: 15,
                xs: 15
              }, fontWeight: 'bold', marginLeft: 1, marginTop: 1,
            }} >Welcome to the Beta Test of our Family Recipe Website!
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              I hope you like it :-)
            </Typography>
            <Typography sx={{
              fontSize: {
                lg: 25,
                md: 25,
                sm: 15,
                xs: 15
              }, fontWeight: 'bold', marginLeft: 1
            }}>
              Known bugs:
            </Typography>

            <Typography sx={{ marginLeft: 1 }}>
              - Meals for the week generator on mobiles, is missing the day of the week column
            </Typography>
            <Typography sx={{
              fontSize: {
                lg: 25,
                md: 25,
                sm: 15,
                xs: 15
              }, fontWeight: 'bold', marginLeft: 1
            }}>
              What's New?
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Ability to edit Submitted Recipes Live: 23/03/2022
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Authentication, only approved authenticated users will be able to add recipes, this is to protect it. Live: 07/04/2022
            </Typography>
            <Typography sx={{
              fontSize: {
                lg: 25,
                md: 25,
                sm: 15,
                xs: 15
              }, fontWeight: 'bold', marginLeft: 1
            }}>
              Future features:
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - The Ability to Search the site for a recipe
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Ability to autostore the recipes in a backup Onedrive location as a word document
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Upgraded the Upload Image Option in add recipes to support drag and drop
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Added an extra Add Recipe Entry for estimated time taken
            </Typography>
          </div>
        </Paper>

      </Container>
      <FoodCard recipes={recipes} />
    </Fragment >
  )

}

