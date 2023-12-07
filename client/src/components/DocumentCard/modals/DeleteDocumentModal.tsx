import { Modal, Box, Typography, Card, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface DeleteDocumentModalProps {
  open: boolean;
  onClose?: any;
  docId: string;
  docName: string;
}

const DeleteDocumentModal = (props: DeleteDocumentModalProps) => {
  const [open, setOpen] = useState<boolean>(props.open);
  const handleClose = () => {
    setOpen((prev) => !prev);
    props.onClose();
  };

  const handleDelete = async () => {
    const url = "http://localhost:5000/api/documents";
    console.log(props.docId);
    await axios.delete(url, {
      data: {
        docId: props.docId,
      },
    });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          width: 391,
          minHeight: 117,
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "24px 24px 20px 24px",
          borderRadius: "8px",
        }}
        elevation={24}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontSize={22}
          fontWeight={400}
        >
          Edit document
        </Typography>
        <Typography
          id="modal-modal-label"
          sx={{ mt: 1 }}
          // component="span"
          fontSize={16}
          fontWeight={400}
          color="InactiveCaptionText"
        >
          Are you sure want to delete the document?
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "14px",
          }}
        >
          <Button
            size="medium"
            variant="outlined"
            color="info"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default DeleteDocumentModal;
