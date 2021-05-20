var express = require("express");
var router = express.Router();

const _ = require("lodash");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const accessTokenSecret = "123";

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    belong: req.body.belong,
  });
  await user.save();
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await User.find();
  const user = _.find(users, (u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username },
      accessTokenSecret
    );
    res.status(200);
    res.json({
      code: 200,
      message: "Login successfully",
      data: {
        username: user.username,
        accessToken: accessToken,
      },
    });
  } else {
    res.status(200);
    res.json({
      code: 500,
      message: "Username or password incorrect",
      data: {},
    });
  }
});

module.exports = router;
