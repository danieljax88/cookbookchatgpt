import React, { useContext, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Card,
    Stack,
    Typography,
    Avatar,
    Button,
    TextField,
} from "@mui/material";
import YouTag from "./YouTag";
// import ScoreChanger from "./ScoreChanger";
import ConfirmDelete from "./ConfirmDelete";
import { doc, getFirestore, updateDoc, getDoc, setDoc } from 'firebase/firestore'

const OwnReply = ({ onDel, replies, postedBy, onContent, onTar, comId, ava, index, reply, replyId, recipeId, createdAt, avatar, onReplyDeleted }) => {
    // console.log(comId, replyId)
    const db = getFirestore()
    const [clicked, setClicked] = useState(false);
    const [editingRep, setEditingRep] = useState(false);
    const [repText, setRepText] = useState(onContent);
    const [openModal, setOpenModal] = useState(false);
    const docRef = doc(db, 'comments', comId);
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const editReplyHandler = () => {

        setClicked(!clicked);
        setEditingRep(!editingRep);
    }
    const updateHandler = async () => {
        console.log(comId, replyId)
        try {

            let getSingleCommentData = [];
            await getDoc(docRef).then((doc) => {
                getSingleCommentData.push({ ...doc.data(), key: doc.id });
            });

            const updatedReplies = getSingleCommentData[0].replies.map((reply) => {
                if (reply.replyId === replyId) {
                    return {
                        ...reply,
                        replyText: repText
                    };
                }
                return reply;
            });

            await updateDoc(docRef, { replies: updatedReplies });
            setEditingRep(!editingRep);
            setClicked(!clicked);
            console.log("Reply field updated successfully.");
        } catch (error) {
            console.error("Error updating reply field:", error);
        }


    }

    return (
        <>
            <ConfirmDelete
                onOpen={openModal}
                onClose={handleClose}
                comId={comId}
                index={index}
                reply={reply}
                isReply={true}
                replies={replies}
                replyId={replyId}
                recipeId={recipeId}
                avatar={avatar}
                createdAt={createdAt}
                postedBy={postedBy}
                onDel={onDel}
                onReplyDeleted={onReplyDeleted}
            />
            <Card>
                <Box sx={{ p: "15px" }}>
                    <Stack spacing={2} direction="row">
                        <Box>
                            {/* <ScoreChanger onScore={onCount} /> */}
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Stack
                                spacing={2}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Avatar src={avatar}></Avatar>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{ color: "neutral.darkBlue" }}
                                    >
                                        {postedBy}
                                    </Typography>
                                    <YouTag />

                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        startIcon={<Delete />}
                                        sx={{
                                            color: "custom.softRed",
                                            fontWeight: 500,
                                            textTransform: "capitalize",
                                        }}
                                        onClick={() => {
                                            handleOpen();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="text"
                                        disabled={clicked}
                                        sx={{
                                            fontWeight: 500,
                                            textTransform: "capitalize",
                                            color: "custom.moderateBlue",
                                        }}
                                        startIcon={<Edit />}
                                        onClick={() => {
                                            editReplyHandler()
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            </Stack>
                            {editingRep ? (
                                <>
                                    <TextField
                                        sx={{ p: "20px 0" }}
                                        multiline
                                        fullWidth
                                        minRows={4}
                                        id="outlined-multilined"
                                        placeholder="Don't leave this blank!"
                                        value={repText}
                                        onChange={(e) => {
                                            setRepText(e.target.value);
                                        }}
                                    />
                                    <Button
                                        sx={{
                                            bgcolor: "custom.moderateBlue",
                                            color: "neutral.white",
                                            p: "8px 25px",
                                            float: "right",
                                            "&:hover": {
                                                bgcolor: "custom.lightGrayishBlue",
                                            },
                                        }}
                                        onClick={() => {
                                            !repText.trim()
                                                ? alert("Read the placeholder.")
                                                : updateHandler()
                                        }}
                                    >
                                        Update
                                    </Button>
                                </>
                            ) : (
                                <Typography
                                    component="div"
                                    sx={{ color: "neutral.grayishBlue", p: "20px 0" }}
                                >
                                    <Typography
                                        sx={{
                                            color: "custom.moderateBlue",
                                            width: "fit-content",
                                            display: "inline-block",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {`@${onTar}`}
                                    </Typography>{" "}
                                    {repText}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Box >
            </Card >
        </>
    );
};

export default OwnReply;
