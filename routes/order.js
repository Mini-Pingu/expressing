var express = require("express");
var router = express.Router();

const authenticateJWT = require("../middlewares/token");

const Order = require("../models/Order");

router.get("/", authenticateJWT, async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.post("/", authenticateJWT, async (req, res) => {
  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const orderId = Date.now().toString().slice(1);
  console.log("orderId", orderId);

  const order = new Order({
    orderId: orderId,
    orderDateTime: dateTime,
    item: req.body.item,
  });
  await order.save();
  res.send(order);
});

module.exports = router;
