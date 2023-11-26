const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;

// const User = require("./models/user");

const MongoStore = require("connect-mongo");

const app = express();

const mongoose = require("mongoose");
const Document = require("./schemas/Document");
const User = require("./schemas/User");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCollection = process.env.DB_COLLECTION;

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@gdocscluster.l5mmayw.mongodb.net/${dbCollection}?retryWrites=true&w=majority`
  )
  .then(() => console.log("CONNECTED TO MONGO DB"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:8000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: db.client.s.url }),
    cookie: { secure: false }, // Set secure to false if not using HTTPS
    proxy: true, // Add this line if your app is behind a proxy
    rolling: true, // Extend session on each request
    credentials: true, // Include credentials in cross-origin requests
  })
);

const strategy = new LocalStrategy(User.authenticate());
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.post("/register", function (req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  })
);

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     session: true,
//     failureRedirect: "/login-failure",
//     successRedirect: "/login-success",
//   })
//   // passport.authenticate("local", {
//   //   session: true,
//   //   failureRedirect: "/login-failure",
//   //   successRedirect: "/login-success",
//   // }),
//   // (err, req, res, next) => {
//   //   if (err) next(err);
//   // }
// );

app.get("/login-failure", (req, res, next) => {
  console.log(req.session);
  res.send("Login Attempt Failed.");
});

app.get("/login-success", (req, res, next) => {
  console.log(req.session);
  console.log("after login isAuthenticated: ", req.isAuthenticated());
  res.send("Login Attempt was successful.");
});

app.get("/profile", function (req, res) {
  console.log("/profile: ", req.session);
  if (req.isAuthenticated()) {
    res.json({ message: "You made it to the secured profie" });
  } else {
    res.json({ message: "You are not authenticated" });
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error during logout");
    }

    // Redirect to the home page or any other page after logout
    res.json({ message: "Logged out" });
  });
});

app.get("/check-session", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    // return res.status(200).json({ authenticated: true, user: req.user });
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false, user: null });
    // return res.status(401).json({ authenticated: false, user: null });
  }
});

app.listen(8000, () => {
  console.log("Server started.");
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
      console.log(delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
  console.log("connected");
});

const defaultValue = "";

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
