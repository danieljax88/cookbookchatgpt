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
// import CommentContext from "../commentContext";
// import ScoreChanger from "./ScoreChanger";
import ConfirmDelete from "./ConfirmDelete";
import { getFirestore, doc, arrayRemove, getDoc, updateDoc } from "firebase/firestore";
const OwnReply = ({ replies, postedBy, onContent, onCount, onTar, onDel, comId, ava, index, reply, replyId, recipeId, createdAt, avatar, replyText }) => {
    // console.log(reply)
    const [clicked, setClicked] = useState(false);
    const [editingRep, setEditingRep] = useState(false);
    const [repText, setRepText] = useState(onContent);
    const [openModal, setOpenModal] = useState(false);
    const db = getFirestore()
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };



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
                replyText={replyText}
            // onConfirm={() => handleDelete(index)}
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
                                    <Avatar src={ava}></Avatar>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{ color: "neutral.darkBlue" }}
                                    >
                                        {postedBy}
                                    </Typography>
                                    <YouTag />
                                    <Typography sx={{ color: "neutral.grayishBlue" }}>
                                        Just now
                                    </Typography>
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
                                            setClicked(!clicked);
                                            setEditingRep(!editingRep);
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
                                                : setEditingRep(!editingRep);
                                            setClicked(!clicked);
                                            console.log("check if it works");
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
                </Box>
            </Card>
        </>
    );
};

export default OwnReply;
