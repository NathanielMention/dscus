require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const initializePassport = require("./middleware/passportConfig");
initializePassport.initialize(passport);
app.use(cors());

// Parses data from form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
