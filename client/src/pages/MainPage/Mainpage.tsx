import { Header } from "../../components/Header";
import styles from "./Mainpage.module.scss";

export const Mainpage = () => {
  return (
    <div className={styles.root}>
      <Header title="Home" />
      <div className={styles.root__content}>Main page!</div>
    </div>
  );
};
