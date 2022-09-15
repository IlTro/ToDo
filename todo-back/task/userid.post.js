import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";

const router = express.Router();

router.post("/:userId", (req, res) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  res.send(
    dataManager.addEntry({
      uuid: uuidv1(),
      name: req.body.name,
      done: req.body.done,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      userId: userId,
    })
  );
});

router.patch("/:userId/:uuid", (req, res) => {
  res.send(dataManager.updateEntry(req.params.uuid, req.body));
});

export default router;
