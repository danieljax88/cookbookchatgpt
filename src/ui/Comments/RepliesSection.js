import { Box, Card, Stack, Typography, Avatar, Button } from "@mui/material";
import React from "react";
import replyArrow from "../../../public/assets/icon-reply.svg"
import AddReply from "./AddReply.js";
import OwnReply from "./OwnReply.js";
import Image from "next/image";
import { getAuth } from "firebase/auth";

const RepliesSection = ({ onReplies, onClicked, onSetClicked, onTar, onPass, avatar, displayName, ava, comId, onCommentDeleted, onReplyDeleted }) => {
    // const auth = getAuth();
    // const userName = auth.currentUser;
    // const displayName = userName.displayName;
    return (
        <Stack spacing={2} width="800px" alignSelf="flex-end">
            {onReplies && Array.isArray(onReplies) && onReplies.length > 0 &&

                onReplies.map((rep) => {
                    const { createdAt, score, replyId, avatar, recipeId, postedBy, replyText } = rep;

                    // const userName = displayName;

                    return postedBy === displayName ? (
                        <OwnReply
                            key={replyId}
                            replyId={replyId}
                            onContent={replyText}
                            onTime={createdAt}
                            onCount={score}
                            onTar={onPass.postedBy}
                            postedBy={postedBy}
                            createdAt={createdAt}
                            ava={ava}
                            comId={comId}
                            avatar={avatar}
                            recipeId={recipeId}
                            onReplyDeleted={onReplyDeleted}

                        />
                    ) : (
                        <Card key={replyId}>
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
                                                <Avatar src={avatar}></Avatar>
                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{ color: "neutral.darkBlue" }}
                                                >
                                                    {postedBy}
                                                </Typography>
                                                <Typography sx={{ color: "neutral.grayishBlue" }}>
                                                    {createdAt && createdAt.toDate().toDateString()}
                                                </Typography>
                                            </Stack>
                                            <Button
                                                onClick={() => {
                                                    onSetClicked(!onClicked);
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
                                                {`@${onPass.postedBy}`}
                                            </Typography>{" "}
                                            {replyText}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Card>
                    );
                })
            }
            {onClicked && <AddReply

                onPass={onPass}
                ava={ava}
                displayName={displayName}
            />}
        </Stack>
    );
};

export default RepliesSection;
