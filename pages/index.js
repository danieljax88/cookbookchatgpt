import {
  getFirestore, collection, getDocs, orderBy, query
} from 'firebase/firestore'

import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import FoodCard from '../src/ui/FoodCard.js'
import firebase from '../firebase/initFirebase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'



const useStyles = makeStyles(theme => ({
  mainContainer: {

  }
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

        //  console.log(recipes);
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


    <FoodCard recipes={recipes} />

  )

}

