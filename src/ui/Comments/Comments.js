import React, { useState, useEffect, useContext } from "react";
import firebase from '../../../firebase/initFirebase'
import {
    getFirestore, collection, where, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore'
import Backdrop from '@mui/material/Backdrop';
import SingleComment from "./SingleComment";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { AuthContext } from "../../../context/AuthContext";

const Comments = ({ postId }) => {
    // console.log(postId)
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    // const [writeComment, setWriteComment] = useState("");
    const db = getFirestore()
    const commentsRef = collection(db, 'comments')
    // const firstBatch = query(commentsRef, where("postId", "==", postId), orderBy("createdAt"), limit(14))
    const [last, setLast] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleCommentDeleted = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));

    };

    useEffect(() => {
        const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const getCommentsFromFirebase = [];
            querySnapshot.forEach((doc) => {
                getCommentsFromFirebase.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            setComments(getCommentsFromFirebase)
            setCommentsLoading(false)
            // console.log(comments);
        });
        return unsubscribe
    }, [postId]);


    if (commentsLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={commentsLoading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (

        < div >
            < Container maxWidth="md" >
                <Stack spacing={3}>
                    {comments && comments.map((comment) => {
                        return <SingleComment key={comment.postId} onPass={comment} onCommentDeleted={handleCommentDeleted} />;
                    })}
                </Stack>
            </Container >
        </div >

    );
};

export default Comments;

