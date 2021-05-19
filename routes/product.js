var express = require("express");
var router = express.Router();

const authenticateJWT = require("../middlewares/token");

const Product = require("../models/Product");

router.get("/", authenticateJWT, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post("/", authenticateJWT, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    code: req.body.code,
    price: req.body.price,
  });
  await product.save();
  res.send(product);
});

module.exports = router;
