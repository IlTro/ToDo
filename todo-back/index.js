import express from "express";
import config from "config";

import tasks from "./tasks/userid.get.js";

const app = express();
const port = config.get("host");

app.use("/tasks", tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
