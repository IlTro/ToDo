import {
  getTasksAPI,
  addTaskAPI,
  removeTaskAPI,
  updateTaskAPI,
} from "./Utility/Services";
import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import List from "./Components/List";
import Notification from "./Components/Notification";

function App() {
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const [page, setPage] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = {
      order: "asc",
      pp: 5,
      page: 1,
    };
    getTasksAPI(query).then((response) => {
      setTasks(response.data.tasks);
      setTaskCount(response.data.count);
    });
  }, []);

  const addTask = () => {
    addTaskAPI(mainInput).then((response) => {
      const newTasks = [...tasks, response.data];
      setTasks(newTasks);
      setTaskCount(taskCount + 1);
      setMainInput("");
    }).catch(err => {
      console.log(err);
      setError(err.response.data.message);
    });
  };

  const removeTask = (uuid) => {
    removeTaskAPI(uuid).then((response) => {
      const newTasks = tasks.filter((task) => task.uuid !== uuid);
      setTasks(newTasks);
    });
  };

  const setCheck = (uuid) => {
    const updatedTask = tasks.find((task) => task.uuid === uuid);
    updatedTask.done = !updatedTask.done;
    updateTaskAPI(updatedTask).then((response) => {
      const newTasks = tasks.map((task) => {
        if (task.uuid === uuid) {
          return updatedTask;
        }
        return task;
      });
      setTasks(newTasks);
    });
  };

  const editText = (id, text) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        const copy = { ...task, text: text };
        return copy;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const changePage = (n) => {
    const query = {
      order: "asc",
      pp: 5,
      page: n + 1,
    };
    getTasksAPI(query).then((response) => {
      setTasks(response.data.tasks);
      setPage(n);
    });
  }

  return (
    <div className="main">
      <div className="container">
        <div className="title">ToDo</div>
        <Input
          value={mainInput}
          onChange={(e) => setMainInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
              e.preventDefault();
            }
            if (e.key === "Escape") {
              setMainInput("");
            }
          }}
        />
        <List
          list={tasks}
          page={page}
          pages={Math.trunc((taskCount - 1) / 5)}
          onPageChange={(n) => changePage(n)}
          onCheckClick={(id) => setCheck(id)}
          onTrashClick={(id) => removeTask(id)}
          editText={(id, text) => editText(id, text)}
        />
      </div>
      {error && <Notification text={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
