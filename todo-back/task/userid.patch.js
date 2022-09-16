import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";

const router = express.Router();

router.patch("/:userId/:uuid", (req, res) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  res.send(dataManager.updateEntry(userId, req.params.uuid, req.body));
});

export default router;
