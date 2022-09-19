import express from "express";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import config from "config";
import dataManager from "../dataManager.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  if (await dataManager.login(req.body.username, req.body.password)) {
    const userId = uuidv5(req.body.username, config.get("uuidUserSpace"));
    res.json({
      success: true,
      message: "Authentication successful!",
      token: await dataManager.getHmac(userId),
    });
  } else {
    res.sendStatus(403);
  }
});

export default router;
