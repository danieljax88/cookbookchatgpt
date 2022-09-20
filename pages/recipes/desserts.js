// import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy, limit, startAfter, getDocs
} from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { React, useEffect, useState } from 'react'
import FilterMains from '../../src/ui/FilterMains'
import { useRouter } from 'next/dist/client/router'
import FoodCard from '../../src/ui/FoodCard'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Desserts = () => {


    const [dessertsloading, setDessertsLoading] = useState(true);
    const [dessertsRecipe, setDessertsRecipe] = useState([]);
    const [last, setLast] = useState(null);
    const db = getFirestore()
    const [notify, setNotify] = useState(null);
    const docRef = collection(db, 'recipes')
    //Query
    const firstBatch = query(docRef, where("category", "==", 'Dessert'), orderBy('title', 'asc'), limit(7))

    useEffect(() => {
        const getDessertsFromFirebase = [];
        onSnapshot(firstBatch, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                setLast(lastVisible.data())
                getDessertsFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setDessertsRecipe(getDessertsFromFirebase)
            setDessertsLoading(false)

        })

    }, [dessertsloading]);

    const fetchMoreData = () => {

        const field = "title"
        const next = query(docRef, orderBy(field, 'asc'), where("category", "==", 'Dessert'), startAfter(last[field]), limit(20))
        getDocs(next)
            .then((querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const postList = []
                querySnapshot.forEach((doc) => {
                    postList.push({ ...doc.data(), key: doc.id });
                })

                if (lastVisible !== undefined) {
                    setDessertsRecipe([...dessertsRecipe, ...postList]);
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

    if (dessertsloading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={dessertsloading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <InfiniteScroll
            dataLength={dessertsRecipe.length}
            next={fetchMoreData}
            hasMore={true}>
            <FoodCard recipes={dessertsRecipe} />
        </InfiniteScroll>

    )

}
export default Desserts