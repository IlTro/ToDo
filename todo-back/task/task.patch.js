import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";
import {checkToken} from "../auth-check.js"

const router = express.Router();

router.use('/:userId',checkToken);

router.patch("/:userId/:uuid", async (req, res) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  res.send((await dataManager.updateEntry(userId, req.params.uuid, req.body))[1]);
});

export default router;
