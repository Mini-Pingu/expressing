var createError = require("http-errors");
var express = require("express");
const path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// db connection
const db = require("./db");
const DB_URL = "mongodb://localhost:27017/library";
db.connect(DB_URL);

// router
const usersRouter = require("./routes/users");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// using router handler
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

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
