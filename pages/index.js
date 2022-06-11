import {
  getFirestore, collection, getDocs, orderBy, query, limit, startAfter
} from 'firebase/firestore'
import firebase from '../firebase/initFirebase'
import { React, useState, Fragment } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import CustomSearchBox from '../src/ui/MuiSearch'

import InfiniteHits from '../src/ui/InfiniteHits'
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  '3NONBKD267',
  '1c15f9b7d67f66e32c75202a8ce4d6f1',
);
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
  const [last, setLast] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const db = getFirestore()

  const colRef = collection(db, 'recipes')

  const firstBatch = query(colRef, orderBy('title', 'asc'), limit(6))

  return (
    <Fragment>
      {/* <Container maxWidth="lg">
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
              - None
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
              - Authentication, only approved authenticated users will be able to add recipes, this is to protect it. Live: 07/04/2022
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Pagination, Page only renders first 6 recipes, then relies on scrolling to load more
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Upgraded the Upload Image Option in add recipes to support drag and drop
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Fixed a bug that would not let you edit a recipe unless you completed all fields
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - Added "are you sure" protection to delete recipe button
            </Typography>
            <Typography sx={{ marginLeft: 1 }}>
              - updated the header to include more button options
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
              - Removal and changing of Ingredients array into textfield for better compatability
            </Typography>
          </div>
        </Paper>
      </Container> */}

      <InstantSearch indexName="algoliarecipes" searchClient={searchClient}>
        <Configure hitsPerPage={4} />
        <CustomSearchBox />
        <InfiniteHits minHitsPerPage={4} />
      </InstantSearch>

    </Fragment >
    // </InfiniteScroll>
  )

}

