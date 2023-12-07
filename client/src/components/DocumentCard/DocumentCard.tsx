import { useState } from "react";
import styles from "./DocumentCard.module.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { green } from "@mui/material/colors";
import { DocumentCardMenu } from "../DocumentCardMenu";
import { useNavigate } from "react-router-dom";
import { CreateDocumentModal, EditModal } from "./modals";
import DeleteDocumentModal from "./modals/DeleteDocumentModal";
import { formatDate } from "../../utils/utils";

interface DocumentCardProps {
  title: string;
  id: string;
  empty?: boolean;
  img: string;
  type: "new" | "existing";
  fetchDocuments: () => void;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export const DocumentCard = ({
  title,
  id,
  img,
  type,
  updatedAt,
  fetchDocuments,
  author,
}: DocumentCardProps) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getModalByType = (type: string) => {
    switch (type) {
      case "edit":
        return (
          <EditModal
            onClose={() => {
              fetchDocuments();
              setModalType("");
            }}
            open={true}
            docName={title}
            docId={id}
          />
        );
      case "delete":
        return (
          <DeleteDocumentModal
            docId={id}
            docName={title}
            open={true}
            onClose={() => {
              fetchDocuments();
              setModalType("");
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Card sx={{ width: 272, height: 400 }} className={styles.root}>
        {type === "new" ? (
          <CardHeader sx={{ minHeight: "66px" }} />
        ) : (
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                {author.split("")[0].toLocaleUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <DocumentCardMenu setType={setModalType} />
              </IconButton>
            }
            titleTypographyProps={{
              minWidth: 142,
              width: 142,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            title={title}
            subheader={formatDate(updatedAt)}
          />
        )}

        <CardMedia
          component="img"
          height="264"
          image={img}
          // image="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
          alt="Paella dish"
          sx={{
            cursor: "pointer",
            objectFit: "contain",
            width: "100%",
            marginTop: type === "existing" ? "15px" : "0px",
          }}
          onClick={() => {
            type === "new" ? setModalOpen(true) : navigate(`/documents/${id}`);
          }}
        />
        <CreateDocumentModal
          docId="aaaaa"
          docName="New doc"
          open={modalOpen}
          onClose={() => {
            fetchDocuments();
            setModalOpen(false);
          }}
          setOpen={setModalOpen}
        />
        {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent> */}
        {/* <MenuComponent /> */}
        {modalType && getModalByType(modalType)}
      </Card>
    </>
  );
};
