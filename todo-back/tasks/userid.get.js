import express from "express";
import dataManager from "../dataManager.js";

const router = express.Router();

router.get("/:userID", (req, res) => {
  res.send(dataManager.getEntrys());
});

export default router;
