import { Box, Button, Link, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url('https://previews.123rf.com/images/orelphoto/orelphoto1401/orelphoto140100143/25867039-blue-security-background-with-hex-code.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  sidemenu: {
    width: "450px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue[700],
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
    margin: "0 24px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: "15px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  submitButton: {
    width: "100%",
  },
});

export const LoginPage = () => {
  const classes = useStyles();
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
    setData((prevData) => ({
      ...prevData,
      [currentTarget.name]: currentTarget.value,
    }));
  };

  return (
    <div className={classes.root}>
      <Box className={classes.sidemenu}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            name="email"
            label="Email"
            type="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className={classes.input}
            name="password"
            label="Password"
            type="password"
            value={data.password}
            onChange={handleChange}
            fullWidth
          />
          {error && <div className={classes.error}>{error}</div>}
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Link
            sx={{
              width: "fit-content",
              cursor: "pointer",
              my: 1,
              textTransform: "uppercase",
              fontSize: 12,
            }}
            href="/signup"
          >
            Not a member yet?
          </Link>
        </form>
      </Box>
    </div>
  );
};
