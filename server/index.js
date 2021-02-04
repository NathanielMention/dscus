require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./config/dbConfig");
const { connectionString } = require("./config/dbConfig");

const initializePassport = require("./middleware/passportConfig");
initializePassport.initialize(passport);
app.use(cors({ credentials: true, origin: true }));

// Parses data from form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    store: new pgSession({
      conString: connectionString,
    }),
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no value which we do not want to do
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

//initializes passport
app.use(passport.initialize());
// Store variables to use across the whole session, Works with app.use(Session) above
app.use(passport.session());

//routes
app.use("/", require("./routes/auth"));

const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
});

// const upload = multer({ storage: storage }).single("file");

// app.post("/api/chat/uploadfiles", auth, (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({ success: true, url: res.req.file.path });
//   });
// });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });

  socket.on("room", (data) => {
    console.log("room join");
    console.log(data);
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    console.log("leaving room");
    console.log(data);
    socket.leave(data.room);
  });

  socket.on("new message", (data) => {
    console.log(data.room);
    //put data in db here
    const message = data.message;
    try {
      pool.query(
        `INSERT INTO chat_table (message)
              VALUES ($1)
              RETURNING id, message`,
        [message],
        (err) => {
          if (err) {
            throw err;
          } else {
            socket.broadcast.to(data.room).emit("receive message", data);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(5001);

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
