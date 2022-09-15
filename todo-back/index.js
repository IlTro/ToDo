import express from "express";
import config from "config";

import tasks from "./tasks/userid.get.js";
import task from "./task/userid.post.js";
import dataManager from "./dataManager.js";

const app = express();
const port = config.get("host");

dataManager.readLocalFile();
app.use(express.json())
app.use("/tasks", tasks);
app.use("/task", task);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
