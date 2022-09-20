// import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy, limit, startAfter, getDocs
} from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Starters = () => {


    const [startersloading, setStartersLoading] = useState(true);
    const [startersRecipe, setStartersRecipe] = useState([]);
    const [last, setLast] = useState(null);
    const db = getFirestore()
    const [notify, setNotify] = useState(null);
    const docRef = collection(db, 'recipes')
    //Query
    const firstBatch = query(docRef, where("category", "==", 'Starter'), orderBy('title', 'asc'), limit(7))

    useEffect(() => {
        const getStartersFromFirebase = [];
        onSnapshot(firstBatch, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                setLast(lastVisible.data())
                getStartersFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setStartersRecipe(getStartersFromFirebase)
            setStartersLoading(false)
            console.log(startersRecipe)

        })

    }, [startersloading]);
    const fetchMoreData = () => {

        const field = "title"
        const next = query(docRef, orderBy(field, 'asc'), where("category", "==", 'Starter'), startAfter(last[field]), limit(20))
        getDocs(next)
            .then((querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const postList = []
                querySnapshot.forEach((doc) => {
                    postList.push({ ...doc.data(), key: doc.id });
                })

                if (lastVisible !== undefined) {
                    setStartersRecipe([...startersRecipe, ...postList]);
                    setLast(lastVisible.data());

                } else {
                    setNotify("nothing to load.");
                    return;
                }

            })
            .catch((err) => {
                console.log(err)
            })
    };

    if (startersloading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={startersloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <InfiniteScroll
            dataLength={startersRecipe.length}
            next={fetchMoreData}
            hasMore={true}>
            < FoodCard recipes={startersRecipe} />
        </InfiniteScroll>
    )

}
export default Starters