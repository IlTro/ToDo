import { v1 as uuidv1, v5 as uuidv5, validate as uuidValidate } from "uuid";
import config from "config";
import dataManager from "./dataManager.js";

export const checkToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  const userId = uuidValidate(req.params.userId)
    ? req.params.userId
    : uuidv5(req.params.userId, config.get("uuidUserSpace"));

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if ((await dataManager.getHmac(userId)) === token) {
      next();
    } else {
      return res.json({
        success: false,
        message: "Auth Fail",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "No Auth",
    });
  }
};
