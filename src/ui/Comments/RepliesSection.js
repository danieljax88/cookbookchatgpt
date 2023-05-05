import { Box, Card, Stack, Typography, Avatar, Button } from "@mui/material";
import React, { useContext, useState } from "react";
// import ScoreChanger from "./ScoreChanger";
import replyArrow from "../../../public/assets/icon-reply.svg"
import AddReply from "./AddReply.js";
import OwnReply from "./OwnReply.js";
import Image from "next/image";

const RepliesSection = ({ onReplies, onClicked, onTar, onPass, ava, displayName }) => {
    // const { IMGOBJ } = useContext(CommentContext);
    // console.log(ava)
    const [repliess, setReplies] = useState(onReplies);
    const addReply = (data) => {
        setReplies([
            ...repliess,
            {
                // id: Math.floor(Math.random() * 10000),
                // content: data,
                createdAt: "Just now",
                score: 0,
                replyingTo: `${onTar}`,
                replies: [],
                user: { username: displayName },
            },
        ]);
    };
    const deleteReply = (id) => {
        setReplies(repliess.filter((reply) => reply.id !== id));
    };
    return (
        <Stack spacing={2} width="800px" alignSelf="flex-end">
            {onReplies && Array.isArray(onReplies) && onReplies.length > 0 &&

                repliess.map((rep) => {
                    const { content, createdAt, score, user, replyingTo } = rep;
                    const userName = displayName;
                    const ava = ava;
                    return userName === "juliusomo" ? (
                        <OwnReply
                            key={rep.id}
                            comId={rep.id}
                            onContent={content}
                            onTime={createdAt}
                            onCount={score}
                            onTar={replyingTo}
                            onDel={deleteReply}
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
                                                    {createdAt}
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
                                                {`@${replyingTo}`}
                                            </Typography>{" "}
                                            {content}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Card>
                    );
                })
            }
            {onClicked && <AddReply onAdd={addReply} onPass={onPass} ava={ava} displayName={displayName} />}
        </Stack>
    );
};

export default RepliesSection;
