import { Box, Card, Stack, Typography, Avatar, Button } from "@mui/material";
import React, { useContext, useState } from "react";
// import ScoreChanger from "./ScoreChanger";
import replyArrow from "../../../public/assets/icon-reply.svg"
import AddReply from "./AddReply.js";
import OwnReply from "./OwnReply.js";
import Image from "next/image";
import { getFirestore, doc, arrayRemove, updateDoc } from "firebase/firestore";
const RepliesSection = ({ replies, onClicked, onTar, onPass, avatar, displayName, ava, postedBy, comId }) => {
    // const [repliess, setReplies] = useState(onReplies);
    const [replyData, setReplyData] = useState([]);
    // const [replies, setReplies] = useState(replies);
    // console.log(replies)
    const db = getFirestore()

    // const handleDeleteReply = async (index, replies) => {

    //     const commentRef = doc(db, "comments", comId);
    //     console.log(commentRef)
    //     const updatedReplies = [...replies]; // create a copy of the replies array
    //     updatedReplies.splice(index, 1); // remove the reply at the specified index
    //     await updateDoc(commentRef, {
    //         replies: updatedReplies,
    //     });
    // };
    const handleDeleteReply = async (index) => {
        const commentRef = doc(db, "comments", comId);
        const updatedReplies = arrayRemove(commentRef.replies, commentRef.replies[index]); // remove the reply at the specified index
        await updateDoc(commentRef, {
            replies: updatedReplies,
        });
    };


    const handleAddReply = (newReply) => {
        setReplyData((prevReplies) => [...prevReplies, newReply]);
    };

    return (
        <Stack spacing={2} width="800px" alignSelf="flex-end">
            {replies && Array.isArray(replies) && replies.length > 0 &&

                replies.map((rep, index) => {
                    const { replies, createdAt, score, user, replyingTo, } = rep;
                    const userName = displayName;

                    return userName === displayName ? (
                        <OwnReply
                            key={index}
                            comId={index}
                            onContent={replies}
                            onTime={createdAt}
                            onCount={score}
                            onTar={postedBy}
                            // onDel={() => handleDeleteReply(index, replies)}
                            handleDeleteReply={handleDeleteReply}
                            ava={ava}
                            index={index}
                            replies={replies}
                            postedBy={rep.postedBy}


                        />
                    ) : (
                        <Card key={rep.id}>
                            <Box sx={{ p: "15px" }}>
                                <Stack spacing={2} direction="row">
                                    <Box>
                                        {/* <ScoreChanger onScore={score} /> */}
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
                                                    {userName}
                                                </Typography>
                                                <Typography sx={{ color: "neutral.grayishBlue" }}>
                                                    {createdAt && createdAt.toDate().toLocaleString()}
                                                </Typography>
                                            </Stack>
                                            <Button
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
                                        </Stack>
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
                                                {`@${postedBy}`}
                                            </Typography>{" "}
                                            {replies}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Card>
                    );
                })
            }
            {onClicked && <AddReply
                // onAdd={addReply}

                onAddReply={handleAddReply}
                onPass={onPass}
                ava={ava}
                displayName={displayName}
                replyData={replyData}
                setReplyData={setReplyData} />}
        </Stack>
    );
};

export default RepliesSection;
