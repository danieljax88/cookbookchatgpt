import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import React, { useState, useContext } from "react";
import { Delete, Edit } from "@mui/icons-material";
import replyArrow from "../../../public/assets/icon-reply.svg"
import Image from 'next/image'
import { getAuth } from "firebase/auth";
import ConfirmDelete from './ConfirmDelete'
import { AuthContext } from '../../../context/AuthContext'
import YouTag from "./YouTag";
import TextField from '@mui/material/TextField'
import {
    getFirestore, doc, updateDoc
} from 'firebase/firestore'
const SingleComment = ({ onPass, onCommentDeleted }) => {

    // console.log(onPass)
    const auth = getAuth();
    const user = auth.currentUser;
    const { id, postId, text, createdAt, postedBy } = onPass;
    const [editingComm, setEditingComm] = useState(false);
    const [commentText, setCommentText] = useState(text);
    const [clicked, setClicked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { userData } = useContext(AuthContext);


    // console.log(user.displayName, user.photoURL, user.emailVerified)

    // const displayName = user.displayName;
    // const ava = user.photoURL

    const db = getFirestore()
    const docRef = doc(db, 'comments/' + onPass.id)



    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);

    };
    const handleUpdate = (event) => {


        updateDoc(docRef, {
            text: commentText
        })
            .then(() => {
                setEditingComm(!editingComm)

            })
    }
    // const handleDeleteComment = (commentId) => {
    //     // Remove the comment from the local state array
    //     const updatedComments = onPass.filter((comment) => comment.id !== commentId);
    //     setComments(updatedComments);
    // };


    return (
        <Card sx={{ mt: "1em", }}>
            <ConfirmDelete onOpen={openModal} onClose={handleClose} id={onPass.id} onCommentDeleted={onCommentDeleted} />
            <Box sx={{ p: "15px", }}>
                <Stack spacing={2} direction="row">
                    <Box>
                        {/* <ScoreChanger onScore={"1"} /> */}
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Stack
                            spacing={2}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack spacing={2} direction="row" alignItems="center">
                                {user && user.displayName ? (
                                    <Avatar src={user.photoURL}></Avatar>
                                ) : null}
                                {user && user.displayName ? (
                                    <Typography
                                        fontWeight="bold"
                                        sx={{ color: "neutral.darkBlue" }}
                                    >
                                        {user.displayName}

                                    </Typography>
                                ) : <Typography
                                    fontWeight="bold"
                                    sx={{ color: "neutral.darkBlue" }}
                                >
                                    {PostedBy}

                                </Typography>}
                                {user && user.displayName === user.displayName && <YouTag />}
                                <Typography sx={{ color: "neutral.grayishBlue" }}>
                                    {createdAt && createdAt.toDate().toLocaleString()}
                                </Typography>
                            </Stack>
                            {user && user.displayName === user.displayName ? (
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
                                        disabled={editingComm}
                                        sx={{
                                            fontWeight: 500,
                                            textTransform: "capitalize",
                                            color: "custom.moderateBlue",
                                        }}
                                        startIcon={<Edit />}
                                        onClick={() => setEditingComm(!editingComm)}
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setClicked(!clicked);
                                    }}
                                    variant="text"
                                    sx={{
                                        fontWeight: 500,
                                        textTransform: "capitalize",
                                        color: "custom.moderateBlue",
                                    }}
                                    startIcon={<Image src={replyArrow} alt="reply sign" />}
                                >
                                    Reply
                                </Button>
                            )}
                        </Stack>
                        {editingComm ? (
                            <>
                                <TextField
                                    sx={{ p: "20px 0" }}
                                    multiline
                                    fullWidth
                                    minRows={4}
                                    id="outlined-multilined"
                                    placeholder="Don't leave this blank!"
                                    value={commentText}
                                    onChange={(e) => {
                                        setCommentText(e.target.value);
                                    }}
                                />
                                <Button
                                    sx={{
                                        float: "right",
                                        bgcolor: "custom.moderateBlue",
                                        color: "neutral.white",
                                        p: "8px 25px",
                                        "&:hover": {
                                            bgcolor: "custom.lightGrayishBlue",
                                        },
                                    }}
                                    onClick={() => {
                                        !commentText.trim()
                                            ? alert(
                                                "If  you want to remove the comment text, just delete the comment."
                                            )
                                            : handleUpdate()
                                    }}
                                >
                                    Update
                                </Button>
                            </>
                        ) : (
                            <Typography sx={{ color: "neutral.grayishBlue", p: "20px 0" }}>
                                {commentText}
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </Box>
        </Card>
    )




}
export default SingleComment