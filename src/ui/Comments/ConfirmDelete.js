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



const ConfirmDelete = ({ setReplyId, onDel, onOpen, onClose, comId, onCommentDeleted, onReplyDelete, index, isReply, replies, id, recipeId, postedBy, avatar, createdAt }) => {
  const [commentData, setCommentData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const db = getFirestore()
  const docRef = doc(db, 'comments/' + `${comId}`)
  // console.log(docRef)
  // const docRef = doc(db, isReply ? 'replies/' + comId : 'comments/' + comId);
  const deleteHandler = async () => {
    try {
      await deleteDoc(docRef);
      // console.log(id)
      onCommentDeleted(id); // call the onCommentDeleted callback function
      onClose();
    } catch (error) {
      // console.error("Error deleting comment:", error);
    }
  };

  // const handleDeleteReply = async () => {

  //   try {
  //     let getSingleCommentData = []
  //     await getDoc(docRef).then((doc) => {
  //       getSingleCommentData.push({ ...doc.data(), key: doc.id })
  //     })

  //     const updatedReplies = getSingleCommentData[0].replies.filter(reply => reply.replyId !== replyId);

  //     setCommentData(updatedReplies);
  //     await updateDoc(docRef, {
  //       replies: updatedReplies

  //     }).then(() => { onDel(comId) && onClose(); })

  // onCommentDeleted(id);



  // } catch (error) {
  //   console.error("Error deleting comment:", error);
  // }
  //   };
  // const handleDeleteReply = async () => {
  //   try {
  //     const updatedReplies = replies ? replies.filter((reply) => {

  //       return reply.replyId !== replyId;
  //     }) : [];
  //     console.log(updatedReplies)
  //     await updateDoc(docRef, {
  //       replies: updatedReplies,
  //     }).then(() => {
  //       onClose(); //onReplyDelete(comId, replyId) && 
  //     });
  //   } catch (error) {
  //     console.error("Error deleting comment:", error);
  //   }
  // };


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
            // onClick={() => {
            //   onDel ? setReplyId(replyId) && onDel(replyId) : deleteHandler(id);
            // }}
            onClick={() => {
              if (onDel) {
                // setReplyId(replyId);
                onDel(replyId);
              } else {
                deleteHandler();
              }
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
