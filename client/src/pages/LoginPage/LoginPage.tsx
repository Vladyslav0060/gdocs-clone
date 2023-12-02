import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/");
      console.log(res.message);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(currentTarget.name);
    setData((prevData) => ({
      ...prevData,
      [currentTarget.name]: currentTarget.value,
    }));
  };
  return (
    <div className={styles.root}>
      <form className={styles.root__form} onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        {error && <div>{error}</div>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
