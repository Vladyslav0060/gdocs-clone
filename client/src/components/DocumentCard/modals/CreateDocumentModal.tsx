import { v4 as uuidv4 } from "uuid";
import { Modal, Box, Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CreateDocumentModalProps {
  open: boolean;
  onClose?: any;
  docName: string;
  docId: string;
  setOpen: any;
}

const CreateDocumentModal = (props: CreateDocumentModalProps) => {
  const navigate = useNavigate();
  const handleClose = () => {
    props.setOpen((prev: boolean) => !prev);
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
      open={props.open}
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
          Create new document
        </Typography>
        <form
          onSubmit={async (e: any) => {
            e.preventDefault();
            const url = "http://localhost:5000/api/documents";
            const token = localStorage.getItem("token") || "";
            const documentId = uuidv4();
            await axios.post(
              url,
              {
                doc_name: e.target.name.value,
                doc_id: documentId,
              },
              { headers: { Token: token } }
            );
            navigate(`/documents/${documentId}`);
          }}
        >
          <TextField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            sx={{ width: "100%", mt: 2.5 }}
            size="small"
            variant="outlined"
            label="Name"
            name="name"
            required
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
              type="submit"
              disabled={
                name === "" ||
                (name === props.docName && props.docName !== "New doc")
              }
            >
              OK
            </Button>
          </Box>
        </form>
      </Card>
    </Modal>
  );
};

export default CreateDocumentModal;
