import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { getFirestore, doc, deleteDoc, getDoc, updateDoc, arrayRemove, update, FieldValue } from "firebase/firestore";



const ConfirmDelete = ({ setReplyId, replyId, onDel, onOpen, onClose, comId, onCommentDeleted, onReplyDeleted, index, isReply, replies, id, recipeId, postedBy, avatar, createdAt }) => {

  // const { currentUser } = useContext(AuthContext);

  const db = getFirestore()
  const docRef = doc(db, 'comments/' + id)

  const deleteHandler = async () => {
    try {
      await deleteDoc(docRef);
      onCommentDeleted(id); // call the onCommentDeleted callback function
      onClose();
    } catch (error) {

    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogContent sx={{ maxWidth: "430px" }}>
        <DialogTitle sx={{ p: "0", marginBottom: "20px" }}>
          Delete comment
        </DialogTitle>
        <Typography
          component="p"
          sx={{ marginBottom: "20px", color: "neutral.grayishBlue" }}
        >
          Are you sure you want to delete this comment? This will remove the
          comment and it can't be undone.
        </Typography>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "neutral.grayishBlue",
              "&:hover": { bgcolor: "neutral.grayishBlue" },
            }}
            onClick={onClose}
          >
            No, cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "custom.softRed",
              "&:hover": { bgcolor: "custom.softRed" },
            }}
            onClick={() => {
              onReplyDeleted ? onReplyDeleted(comId, replyId) : deleteHandler(id);
            }}
          >
            Yes, delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
