import express from "express";
import config from "config";
import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import dataManager from "../dataManager.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));
  const params = {
    order: "asc",
    pp: 5,
    page: 1
  }
  params.filterBy =  req.query.filterBy;
  params.order =  req.query.order;
  params.pp =  req.query.pp ? req.query.pp : params.pp;
  params.page =  req.query.page ? req.query.page : params.page;
  res.send(dataManager.getEntrys(userId, params));
});

export default router;
