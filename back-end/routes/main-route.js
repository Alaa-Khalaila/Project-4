const express = require("express");
const mainRouter = express.Router();
const {viewAllProducts,productDetails,viewCategories,viewProducts,searchProducts} = require('../controllers/main-controller')

mainRouter.get("/", (req, res) => {
  res.json("HELLO WORLD");
});

// View all products
mainRouter.get("/allProducts", viewAllProducts);

// View a specific product's details
mainRouter.get("/product/:id", productDetails);

// View all product categories
mainRouter.get("/categories", viewCategories);

// View products by category
mainRouter.get("/products/:i",viewProducts);

// Search for products
mainRouter.get("/searchProducts/:i",searchProducts);

module.exports = mainRouter;
