import {
    Avatar,
    Button,
    Card,
    Stack,
    TextField,
    ThemeProvider,
} from "@mui/material";
// import { Box } from "@mui/system";
import Box from '@mui/material/Box'
import React, { useContext, useState, ava } from "react";
import {
    addDoc, getFirestore, collection, serverTimestamp, updateDoc, doc, getDoc
} from 'firebase/firestore';
// import CommentContext from "../commentContext";
// import theme from "../theme";
import { v4 as uuidv4 } from 'uuid';

const AddReply = ({ onAdd, onPass, ava, displayName, onAddReply }) => {
    const db = getFirestore()

    const [replyText, setReplyText] = useState("");
    const { id, recipeId, text, createdAt, postedBy, replies } = onPass;
    const replyId = uuidv4()

    const docRef = doc(db, 'comments', id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const reply = {
            recipeId: recipeId,
            replyText: replyText,
            postedBy: displayName,
            avatar: ava,
            createdAt: createdAt,
            replyId: replyId
        };
        // const updatedReplies = [...replyData, reply];

        const docSnap = await getDoc(docRef);
        const existingReplies = docSnap.data().replies || [];
        const updatedReplies = [...existingReplies, reply];


        await updateDoc(docRef, {
            replies: updatedReplies
        }).then(() => { setReplyText("") && onAddReply(updatedReplies) })
    };

    return (
        // <ThemeProvider theme={theme}>
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
            </Box>
        </Card>

        // </ThemeProvider>
    );
};

export default AddReply;