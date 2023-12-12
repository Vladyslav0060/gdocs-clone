import { Container, Box, Typography, SxProps, Theme } from "@mui/material";
import { Header } from "../../components/Header";
import { listItems, selfHostedListItems } from "./mock";
import styles from "./Mainpage.module.scss";

interface BlockLineProps {
  title: string;
  text: string;
  sx?: SxProps<Theme>;
}

const BlockLine = ({ title, text, sx }: BlockLineProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
      // mb: 2,
      ...sx,
    }}
  >
    <Typography variant="h6">{title}:</Typography>
    <Typography>{text}</Typography>
  </Box>
);

const ListItem = ({ title, text }: BlockLineProps) => (
  <li className={styles.root__list__item}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
      <Typography>
        <span style={{ fontWeight: 700, width: "fit-content" }}>{title}</span>:{" "}
        {text}
      </Typography>
    </Box>
  </li>
);

export const Mainpage = () => {
  return (
    <div className={styles.root}>
      <Header title="Home" />
      <Container maxWidth="lg">
        <Box className={styles.root__content}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Project Overview
          </Typography>
          {/* <BlockLine title="Project Overview" text="Google Docs Analog" /> */}
          {/* <BlockLine
            title="Problem Definition"
            text="The existing document collaboration platforms, such as Google Docs, have become integral to modern workflows. However, certain limitations and privacy concerns may arise when relying on third-party services for document creation and editing. This project aims to address these issues by developing a self-hosted alternative to Google Docs."
            sx={{ flexDirection: "column", alignItems: "flex-start" }}
          /> */}
          <Typography variant="h6">Technological Features:</Typography>
          <hr />
          <ul className={styles.root__list}>
            {listItems.map((item) => (
              <ListItem title={item.title} text={item.text} />
            ))}
          </ul>
          <Typography variant="h6">Advantages and Key Features:</Typography>
          <hr />
          <ul className={styles.root__list}>
            {selfHostedListItems.map((item) => (
              <ListItem title={item.title} text={item.text} />
            ))}
          </ul>
        </Box>
      </Container>
    </div>
  );
};
