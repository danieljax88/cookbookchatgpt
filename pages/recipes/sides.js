import firebase from '../../firebase/initFirebase'
import {
    getFirestore, collection, query, where, onSnapshot, orderBy, limit, startAfter, getDocs
} from 'firebase/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { React, useEffect, useState } from 'react'
import FoodCard from '../../src/ui/FoodCard'


const Sides = () => {


    const [sidesloading, setSidesLoading] = useState(true);
    const [sidesRecipe, setSidesRecipe] = useState([]);
    const [last, setLast] = useState(null);
    const db = getFirestore()
    const [notify, setNotify] = useState(null);
    const docRef = collection(db, 'recipes')
    //Query
    const q = query(docRef, where("category", "==", 'Sides / Miscellaneous'), orderBy('title', 'asc'), limit(6))

    useEffect(() => {
        const getSidesFromFirebase = [];
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                setLast(lastVisible.data())
                getSidesFromFirebase.push({ ...doc.data(), key: doc.id })
            })
            setSidesRecipe(getSidesFromFirebase)
            setSidesLoading(false)

        })

    }, [sidesloading]);
    const fetchMoreData = () => {

        const field = "title"
        const next = query(docRef, orderBy(field, 'asc'), where("category", "==", 'Sides / Miscellaneous'), startAfter(last[field]), limit(20))
        getDocs(next)
            .then((querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const postList = []
                querySnapshot.forEach((doc) => {
                    postList.push({ ...doc.data(), key: doc.id });
                })

                if (lastVisible !== undefined) {
                    setSidesRecipe([...sidesRecipe, ...postList]);
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
    if (sidesloading) {
        return (
            <h2>Loading Data</h2>
        )
    }

    return (
        <InfiniteScroll
            dataLength={sidesRecipe.length}
            next={fetchMoreData}
            hasMore={true}>
            < FoodCard recipes={sidesRecipe} />
        </InfiniteScroll>
    )

}
export default Sides