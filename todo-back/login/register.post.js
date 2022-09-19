import express from "express";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import config from "config";
import dataManager from "../dataManager.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  if (! await dataManager.isUser(req.body.username)) {
    const userId = uuidv5(req.body.username, config.get("uuidUserSpace"));
    dataManager.addUser(req.body.username, req.body.password);
    res.json({
      success: true,
      message: "Created",
      token: await dataManager.getHmac(userId),
    });
  } else {
    res.json({
      success: false,
      message: "User already exsist",
    });
  }
  return true;
});

export default router;
