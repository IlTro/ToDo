import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";
import {checkToken} from "../auth-check.js"

const router = express.Router();

router.use('/:userId',checkToken);

router.post("/:userId", async (req, res, next) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  const entry = await dataManager.addEntry({
    name: req.body.name,
    done: req.body.done,
    userId,
  });
  res.send(entry);
});

export default router;
