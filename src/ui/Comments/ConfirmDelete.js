import React, { useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";



const ConfirmDelete = ({ onOpen, onClose, id, onCommentDeleted, onDel, comId, index, handleDeleteReply, isReply, reply }) => {
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore()
  // const docRef = doc(db, 'comments/' + id)

  // const handleReplyDelete = async () => {
  //   await deleteDoc(doc(db, "comments", id)).then(() => onDelete(index));
  // };



  // const deleteHandler = async () => {
  //   try {
  //     await deleteDoc(docRef);
  //     // console.log(id)
  //     onCommentDeleted(id); // call the onCommentDeleted callback function
  //     onClose();
  //   } catch (error) {
  //     console.error("Error deleting comment:", error);
  //   }
  // };

  const docRef = doc(db, isReply ? 'replies/' + id : 'comments/' + id);

  // const deleteHandler = async () => {
  //   try {
  //     await deleteDoc(docRef);
  //     if (isReply) {
  //       onDel();
  //     } else {
  //       onCommentDeleted(id);
  //     }
  //     onClose();
  //   } catch (error) {
  //     console.error("Error deleting comment or reply:", error);
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
            onClick={
              handleDeleteReply
              // onDel ? onDel(comId) : deleteComment(id);
            }
          >
            Yes, delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
