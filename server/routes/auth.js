const express = require("express");
const router = express.Router();
const { pool } = require("../config/dbConfig");
const { body, check, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcrypt");

router.post(
  "/register",
  [
    //server side signup validation
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .trim()
      .isAlphanumeric()
      .withMessage("Username must have letters or numbers and no spaces")
      .custom((value, { req }) => {
        // Search for existing user in the database
        pool.query(
          `SELECT * FROM users_table
              WHERE username = $1`,
          [username],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            if (results.rows.length > 0) {
              return Promise.reject("Username already exists");
            }
            return true;
          }
        );
      }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must have at least 1 number"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password confirmation does not match password");
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  ],
  async (req, res) => {
    //errors from sign up validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Validation passed
    const { username, password, avatar } = req.body;
    console.log(username, password);
    // Hash password and store into database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Place the new user into the database
    pool.query(
      `INSERT INTO users_table (username, password, avatar)
            VALUES ($1, $2, $3)
            RETURNING id, password`,
      [username, hashedPassword, avatar],
      (err, results) => {
        if (err) {
          throw err;
        } else {
          console.log(results.rows);
          res.json({ success: true });
        }
      }
    );
  }
);

router.post(
  "/login",
  [
    //server side login validation
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .custom((value, { req }) => {
        // Search for existing user in the database
        pool.query(
          `SELECT * FROM users_table
                WHERE username = $1`,
          [username],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            if (!results) {
              return Promise.reject("Username does not exists");
            }
            return true;
          }
        );
      }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .custom((value, { req }) => {
        pool.query(
          `SELECT * FROM users_table
                  WHERE password = $1`,
          [password],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            if (results.rows[0] != value) {
              return Promise.reject("Password is incorrect");
            }
            return true;
          }
        );
      }),
  ],
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    //errors from login validation
    const loginErrors = validationResult(req);
    if (!loginErrors.isEmpty()) {
      return res.status(422).json({ loginErrors: loginErrors.array() });
    } else {
      res.json({ success: true });
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
