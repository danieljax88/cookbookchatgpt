import { useState } from 'react';
import {
    TextField,
    Button,
} from "@mui/material/";
import Send from "@mui/icons-material/Send";
import React from "react";
import {
    addDoc, getFirestore, collection, serverTimestamp
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { AuthContext } from '../../../context/AuthContext'
const db = getFirestore()





const Addcomment = ({ recipeId }) => {
    const postId = recipeId
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName
    const ava = user.photoURL
    const [writeComment, setWriteComment] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "comments"), {
            postedBy: displayName,
            avatar: ava,
            text: writeComment,
            postId: postId,
            createdAt: serverTimestamp()
        }).then(() => { setWriteComment("") && setSubmitComplete(false) })
    };

    return (

        <form onSubmit={handleSubmit}>
            <TextField
                multiline
                fullWidth
                minRows={4}
                id="outlined-multilined"
                placeholder="Add a comment"
                value={writeComment}
                onChange={(e) => setWriteComment(e.target.value)}
            />
            <Button
                startIcon={<Send />}
                size="large"
                type="submit"
                disabled={!writeComment}
                sx={{
                    bgcolor: "custom.moderateBlue",
                    color: "neutral.white",
                    p: "8px 25px",
                    "&:hover": {
                        bgcolor: "custom.lightGrayishBlue",
                    },
                }}

            >
                Send
            </Button>
        </form>
    )

}

export default Addcomment