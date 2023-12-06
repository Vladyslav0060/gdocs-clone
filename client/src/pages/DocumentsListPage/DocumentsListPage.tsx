import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DocumentsListPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

export const DocumentsListPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<any>(null);
  useEffect(() => {
    const url = "http://localhost:5000/api/documents";
    const token = localStorage.getItem("token") || "";
    axios.get(url, { params: { token } }).then((res) => {
      if (res.data) {
        setDocuments(res.data);
      }
      console.log(res.data);
    });
  }, []);
  return (
    <div className={styles.root}>
      <Header title="Documents" />
      <p>Documents</p>
      <div>
        {documents &&
          documents.map((doc) => {
            return <div>{doc.name || doc._id}</div>;
          })}
      </div>
    </div>
  );
};
