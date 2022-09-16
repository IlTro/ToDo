import express from "express";
import cors from 'cors';
import config from "config";
import * as dotenv from 'dotenv';
dotenv.config();

import tasks from "./task/userid.get.js";
import taskPost from "./task/userid.post.js";
import taskPatch from "./task/userid.patch.js";
import taskDelete from "./task/userid.delete.js";
import dataManager from "./dataManager.js";

const app = express();
const port = process.env.PORT;

dataManager.readLocalFile();
app.use(express.json())
app.use(cors());
app.use("/tasks", tasks);
app.use("/task", taskPost);
app.use("/task", taskPatch);
app.use("/task", taskDelete)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
