import { useState, useRef } from 'react';
import {
    TextField,
    Button,
    Alert,
    AlertTitle,
    Snackbar
} from "@mui/material/";
import Send from "@mui/icons-material/Send";
import React from "react";
import {
    addDoc, getFirestore, collection, serverTimestamp
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const db = getFirestore()

const Addcomment = ({ recipeId }) => {


    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user?.displayName
    const ava = user?.photoURL
    const [writeComment, setWriteComment] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!user.photoURL) {
            setError("You must have an avatar to add a comment, please update your profile in the top right corner.");
            console.error("Avatar not set");
            return;
        }

        try {
            await addDoc(collection(db, "comments"), {
                postedBy: displayName ? displayName : 'Anonymous',
                avatar: ava ? ava : 'Anonymous',
                text: writeComment,
                recipeId: recipeId,
                createdAt: serverTimestamp()
            });
            setWriteComment("");
            setSuccessMessage("Comment added successfully");
            setOpenSnackbar(true);
            scrollToCommentSection();
        } catch (err) {
            setError("Error occurred while adding the comment.");
            console.error("Error:", err);
        }
    };

    if (!auth.currentUser) { return (<p>You Must be Logged in to write a comment</p>) }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert
                    severity="success"
                    onClose={handleCloseSnackbar}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
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