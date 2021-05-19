var express = require("express");
var router = express.Router();

const _ = require("lodash");
const jwt = require("jsonwebtoken");

const users = require("../data/users");

const accessTokenSecret = "123";

router.post("/", function (req, res) {
  const { username, password } = req.body;
  const user = _.find(users.users, (u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );
    res.status(200);
    res.send({ acessToken: accessToken });
  } else {
    res.status(500);
    res.send("Username or password incorrect");
  }
});

module.exports = router;
