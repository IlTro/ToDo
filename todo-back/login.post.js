import express from "express";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import config from "config";
import dataManager from "./dataManager.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  if (dataManager.isUser(req.body.username, req.body.password)) {
    const userId = uuidv5(req.body.username, config.get("uuidUserSpace"));
    res.json({
      success: true,
      message: "Authentication successful!",
      token: await dataManager.getHmac(userId),
    });
  } else {
    res.send(403).json({
      success: false,
      message: "Authentication failed!",
    });
  }
  return true;
});

export default router;
