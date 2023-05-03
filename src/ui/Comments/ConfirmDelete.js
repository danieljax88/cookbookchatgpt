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



const ConfirmDelete = ({ onOpen, onClose, id, onCommentDeleted, onDel, comId }) => {
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore()
  const docRef = doc(db, 'comments/' + id)

  // const deleteHandler = () => {
  //   deleteDoc(docRef)
  //   onClose().then(() => {
  //     onCommentDeleted(id);
  //   })

  // }
  const deleteHandler = async () => {
    try {
      await deleteDoc(docRef);
      // console.log(id)
      onCommentDeleted(id); // call the onCommentDeleted callback function
      onClose();
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            onClick={
              deleteHandler
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