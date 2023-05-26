import {
    Avatar,
    Button,
    Card,
    Stack,
    TextField,
    Alert,
    AlertTitle,
    Snackbar
} from "@mui/material";
// import { Box } from "@mui/system";
import Box from '@mui/material/Box'
import React, { useContext, useState, ava } from "react";
import {
    getFirestore, serverTimestamp, updateDoc, doc, getDoc
} from 'firebase/firestore';
// import CommentContext from "../commentContext";
// import theme from "../theme";
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth";

const AddReply = ({ onAdd, onPass, ava, displayName, onAddReply }) => {
    const db = getFirestore()
    const auth = getAuth();
    const [replyText, setReplyText] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { id, recipeId, text, postedBy, replies } = onPass;
    const replyId = uuidv4()

    const docRef = doc(db, 'comments', id)
    const user = auth?.currentUser;
    const loginAva = user?.photoURL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!loginAva) {
            setError("You must have an avatar to add a reply.");
            return;
        }

        const reply = {
            recipeId: recipeId,
            replyText: replyText,
            postedBy: displayName,
            avatar: ava,
            replyId: replyId
        };

        const docSnap = await getDoc(docRef);
        const existingReplies = docSnap.data().replies || [];
        const updatedReplies = [...existingReplies, reply];


        await updateDoc(docRef, {
            replies: updatedReplies
        })
        setReplyText("");
        setSuccessMessage("Reply added successfully");
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (

        <Card>
            <Box sx={{ p: "15px" }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                        src={ava}
                        variant="rounded"
                        alt="user-avatar"
                    />
                    <TextField
                        multiline
                        fullWidth
                        minRows={4}
                        id="outlined-multilined"
                        placeholder="Add a Reply"
                        value={replyText}
                        onChange={(e) => {

                            setReplyText(e.target.value);
                        }}
                    />

                    <Button
                        size="large"
                        sx={{
                            bgcolor: "custom.moderateBlue",
                            color: "neutral.white",
                            p: "8px 25px",
                            "&:hover": {
                                bgcolor: "custom.lightGrayishBlue",
                            },
                        }}
                        onClick={
                            // !replyText.trim() ? e.preventDefault() : 
                            handleSubmit
                        }
                    >
                        Reply
                    </Button>

                </Stack>
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert severity="success" onClose={handleCloseSnackbar}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Card>

        // </ThemeProvider>
    );
};

export default AddReply;