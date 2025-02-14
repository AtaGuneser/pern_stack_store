import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // get all products
  res.json({
    message: "Hello World",
  });
});

router.post("/", (req, res) => {
  // create a product
  res.json({
    message: "Hello World",
  });
});

export default router;
