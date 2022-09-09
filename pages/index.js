// import {
//   getFirestore, collection, getDocs, orderBy, query, limit, startAfter
// } from 'firebase/firestore'
// import firebase from '../firebase/initFirebase'
import { React, Fragment } from 'react'
// import { useRouter } from 'next/dist/client/router'

// import { useTheme } from '@mui/material/styles'
// import { makeStyles } from '@mui/styles'
import CustomSearchBox from '../src/ui/MuiSearch'
import InfiniteHits from '../src/ui/InfiniteHits'
import { InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  '3NONBKD267',
  '1c15f9b7d67f66e32c75202a8ce4d6f1',
);
// const useStyles = makeStyles(theme => ({
//   mainContainer: {

//   },
//   paperRoot: {
//     backgroundColor: theme.palette.primary.main,
//     borderRadius: "15px"
//   },
// }))

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'red',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function CookBook() {
  // const router = useRouter();

  // const classes = useStyles()
  // const theme = useTheme()

  // const [loading, setLoading] = useState(true);
  // const [recipes, setRecipes] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [last, setLast] = useState(null);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const db = getFirestore()

  // const colRef = collection(db, 'recipes')

  // const firstBatch = query(colRef, orderBy('title', 'asc'), limit(6))

  return (
    <Fragment>
      <InstantSearch indexName="algoliarecipes" searchClient={searchClient}>
        <CustomSearchBox />
        <InfiniteHits minHitsPerPage={6} />
      </InstantSearch>
    </Fragment >

  )

}

