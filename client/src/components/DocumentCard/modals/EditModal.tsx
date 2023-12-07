import { Modal, Box, Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface EditModalProps {
  open: boolean;
  handleClose?: any;
  onClose?: any;
  docName: string;
  docId: string;
}

const EditModal = (props: EditModalProps) => {
  const [open, setOpen] = useState<boolean>(props.open);
  const handleClose = () => {
    setOpen((prev) => !prev);
    props.onClose();
  };
  const [name, setName] = useState<string>(props.docName);
  const handleSubmit = async () => {
    const url = "http://localhost:5000/api/documents";
    const request = await axios.put(url, {
      docId: props.docId,
      oldName: props.docName,
      newName: name,
    });
    handleClose();
    console.log("response: ", request);
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
          minHeight: 217,
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
          Enter the new name:
        </Typography>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          sx={{ width: "100%", mt: 2.5 }}
          size="small"
          variant="outlined"
        />
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
            color="primary"
            onClick={handleSubmit}
            disabled={name === "" || name === props.docName}
          >
            OK
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default EditModal;
