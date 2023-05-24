import React, { useState, useEffect, useContext } from "react";
import firebase from '../../../firebase/initFirebase'
import {
    doc, getFirestore, updateDoc, getDoc, collection, where, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore'
import Backdrop from '@mui/material/Backdrop';
import SingleComment from "./SingleComment";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { AuthContext } from "../../../context/AuthContext";

const Comments = ({ recipeId }) => {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const db = getFirestore()
    const commentsRef = collection(db, 'comments')
    const [last, setLast] = useState(null);
    const { currentUser } = useContext(AuthContext);


    const handleCommentDeleted = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);

    };
    const handleDeleteReply = async (comId, replyId) => {
        console.log(replyId)
        try {
            const docRef = doc(db, 'comments/' + comId)
            let getSingleCommentData = []
            await getDoc(docRef).then((doc) => {
                getSingleCommentData.push({ ...doc.data(), key: doc.id })
            })
            console.log(getSingleCommentData)
            const updatedReplies = getSingleCommentData[0].replies.filter(
                (reply) => reply.replyId !== replyId
            );


            await updateDoc(docRef, {
                replies: updatedReplies

            });
            setReplies(updatedReplies);


        } catch (error) {
            console.error("Error deleting comment:", error);
        }

    };
    useEffect(() => {
        const q = query(collection(db, "comments"), where("recipeId", "==", recipeId), orderBy("createdAt", "desc"));
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

        });
        return unsubscribe
    }, [recipeId]);


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
                        return <SingleComment key={comment.id} replyId={comment.replies} onPass={comment} onCommentDeleted={handleCommentDeleted} onReplyDeleted={handleDeleteReply} />; //onReplyDelete={handleDeleteReply}
                    })}
                </Stack>
            </Container >
        </div >

    );
};

export default Comments;

