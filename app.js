var createError = require("http-errors");
var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// db connection
const db = require("./db");
const DB_URL = "mongodb://localhost:27017/library";
db.connect(DB_URL);

// router
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/user", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
