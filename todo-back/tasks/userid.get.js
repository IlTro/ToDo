import express from "express";

const router = express.Router();

router.get("/:userID", (req, res) => {
  res.send("in");
});

export default router;
