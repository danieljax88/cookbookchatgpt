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

const Comments = ({ recipeId }) => {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    // const [writeComment, setWriteComment] = useState("");
    const db = getFirestore()
    const commentsRef = collection(db, 'comments')
    // const firstBatch = query(commentsRef, where("postId", "==", postId), orderBy("createdAt"), limit(14))
    const [last, setLast] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleCommentDeleted = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);

    };

    // const handleDeleteReply = (commentId, replyId) => {
    //     // console.log(commentId, replyId)
    //     // console.log("Comment ID:", commentId);
    //     // console.log("Initial Comments:", comments);
    //     const updatedComments = comments.map(comment => {
    //         if (comment.id === commentId) {
    //             // const updatedReplies = comment.replies.filter(reply => {console.log(reply.id, replyId) return reply.id !== replyId});
    //             const updatedReplies = comment.replies.filter(reply => {

    //                 console.log(typeof reply.replyId, typeof replyId);
    //                 return reply.replyId !== replyId;
    //             });
    //             return { ...comment, replies: updatedReplies };
    //         }
    //         // console.log(comment)
    //         return comment;

    //     });
    // console.log(updatedComments);
    //     setComments(updatedComments);
    // };

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
                        return <SingleComment key={comment.id} replyId={comment.replies} onPass={comment} onCommentDeleted={handleCommentDeleted} />; //onReplyDelete={handleDeleteReply}
                    })}
                </Stack>
            </Container >
        </div >

    );
};

export default Comments;

