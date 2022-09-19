import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import tasks from "./task/task.get.js";
import taskPost from "./task/task.post.js";
import taskPatch from "./task/task.patch.js";
import taskDelete from "./task/task.delete.js";
import login from "./login/login.post.js";
import register from "./login/register.post.js"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.post('/login', login);
app.post('/register', register)
app.use("/tasks", tasks);
app.use("/task", taskPost);
app.use("/task", taskPatch);
app.use("/task", taskDelete)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
