import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy, limit, startAfter, getDocs
} from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { React, useEffect, useState } from 'react'
import FilterMains from '../../src/ui/FilterMains'
import { useRouter } from 'next/dist/client/router'
import FoodCard from '../../src/ui/FoodCard'




const Breakfast = () => {



    const [breakfastloading, setBreakfastLoading] = useState(true);
    const [breakfastRecipe, setBreakfastRecipe] = useState([]);
    const [last, setLast] = useState(null);
    const db = getFirestore()
    const [notify, setNotify] = useState(null);
    const docRef = collection(db, 'recipes')
    //Query
    const firstBatch = query(docRef, where("category", "==", 'Breakfast'), orderBy('title', 'asc'), limit(6))

    useEffect(() => {
        const getBreakfastFromFirebase = [];
        onSnapshot(firstBatch, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                setLast(lastVisible.data())
                getBreakfastFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setBreakfastRecipe(getBreakfastFromFirebase)
            setBreakfastLoading(false)

        })

    }, [breakfastloading]);

    const fetchMoreData = () => {

        const field = "title"
        const next = query(docRef, orderBy(field, 'asc'), where("category", "==", 'Breakfast'), startAfter(last[field]), limit(20))
        getDocs(next)
            .then((querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const postList = []
                querySnapshot.forEach((doc) => {
                    postList.push({ ...doc.data(), key: doc.id });
                })

                if (lastVisible !== undefined) {
                    setBreakfastRecipe([...breakfastRecipe, ...postList]);
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
    if (breakfastloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        <InfiniteScroll
            dataLength={breakfastRecipe.length}
            next={fetchMoreData}
            hasMore={true}>
            <FoodCard recipes={breakfastRecipe} />
        </InfiniteScroll>
    )

}
export default Breakfast