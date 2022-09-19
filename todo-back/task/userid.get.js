import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  const params = {
    order: "asc",
    pp: 5,
    page: 1,
  };
  res.send(await dataManager.getEntrys(userId, { ...params, ...req.query }));
});

export default router;
