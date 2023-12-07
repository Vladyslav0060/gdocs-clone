import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DocumentsListPage.module.scss";
import { Header } from "../../components/Header";
import { DocumentCard } from "../../components/DocumentCard";
import { Grid, Container } from "@mui/material";
import { useJwt } from "react-jwt";

interface DocumentProps {
  name: string;
  creator_id: string;
  _id: string;
  created_at: string;
  updated_at: string;
}

export const DocumentsListPage = () => {
  const token = localStorage.getItem("token") || "";
  const { decodedToken }: any = useJwt(token);
  const [documents, setDocuments] = useState<DocumentProps[] | null>(null);
  const fetchDocuments = async () => {
    const url = "http://localhost:5000/api/documents";
    const token = localStorage.getItem("token") || "";
    axios.get(url, { params: { token } }).then((res) => {
      if (res.data) {
        setDocuments(res.data);
      }
    });
  };
  useEffect(() => {
    fetchDocuments();
    return () => {};
  }, []);
  return (
    <div className={styles.root}>
      <Header title="Documents" />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={2}>
          {/* <DocumentCard title="Empty document" /> */}
          <Grid item>
            <DocumentCard
              title={"New"}
              id={"new"}
              img="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              type="new"
              fetchDocuments={fetchDocuments}
              createdAt={new Date().toDateString()}
              updatedAt={new Date().toDateString()}
              author={decodedToken?.firstName}
            />
          </Grid>
          {documents &&
            documents
              .sort(
                (a, b) =>
                  Number(new Date(b.updated_at)) -
                  Number(new Date(a.updated_at))
              )
              .map((doc) => {
                return (
                  <Grid item>
                    <DocumentCard
                      title={doc.name || doc._id}
                      id={doc._id}
                      img="https://cdn-icons-png.flaticon.com/512/888/888108.png"
                      type="existing"
                      fetchDocuments={fetchDocuments}
                      createdAt={doc.created_at}
                      updatedAt={doc.updated_at}
                      author={decodedToken?.firstName}
                    />
                  </Grid>
                );
                // return <div>{doc.name || doc._id}</div>;
              })}
        </Grid>
      </Container>
    </div>
  );
};
