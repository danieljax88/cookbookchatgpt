// import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy, limit, startAfter, getDocs
} from 'firebase/firestore'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const Mains = () => {


    const [mainsloading, setMainsLoading] = useState(true);
    const [mainsRecipe, setMainsRecipe] = useState([]);
    const [last, setLast] = useState(null);
    const db = getFirestore()
    const [notify, setNotify] = useState(null);
    const docRef = collection(db, 'recipes')
    //Query
    const firstBatch = query(docRef, where("category", "==", 'Main'), orderBy('title', 'asc'), limit(7))

    useEffect(() => {
        const getMainsFromFirebase = [];
        onSnapshot(firstBatch, (snapshot) => {
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            setLast(lastVisible.data())
            snapshot.docs.forEach((doc) => {
                getMainsFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setMainsRecipe(getMainsFromFirebase)
            setMainsLoading(false)

        })

    }, [mainsloading]);

    const fetchMoreData = () => {

        const field = "title"
        const next = query(docRef, orderBy(field, 'asc'), where("category", "==", 'Main'), startAfter(last[field]), limit(25))
        getDocs(next)
            .then((querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const postList = []
                querySnapshot.forEach((doc) => {
                    postList.push({ ...doc.data(), key: doc.id });
                })

                if (lastVisible !== undefined) {
                    setMainsRecipe([...mainsRecipe, ...postList]);
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

    if (mainsloading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={mainsloading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <InfiniteScroll
            dataLength={mainsRecipe.length}
            next={fetchMoreData}
            hasMore={true}>
            < FoodCard recipes={mainsRecipe} />
        </InfiniteScroll>


    )

}
export default Mains