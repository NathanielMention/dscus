require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { pingTimeout: 60000 });
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

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {});

  socket.on("room", (data) => {
    console.log("room join");
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    console.log("leaving room");
    socket.leave(data.room);
  });

  socket.on("new message", (data) => {
    //put data in db here
    const message = data.message;
    const userId = data.userId;
    try {
      pool.query(
        `INSERT INTO chat_table (message, userid)
              VALUES ($1, $2)
              RETURNING id, message, userid`,
        [message, userId],
        (err) => {
          if (err) {
            throw err;
          } else {
            io.in("test-room").emit("receive message", data);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(5001);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
