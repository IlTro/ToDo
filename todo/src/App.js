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

const filters = { ALL: null, DONE: "done", UNDONE: "undone" };

function App() {
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState(true);
  const [taskCount, setTaskCount] = useState(0);
  const [filter, setFilter] = useState(filters.ALL);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = {
      order: "asc",
      pp: 5,
      page: 1,
    };
    getTasksAPI(query)
      .then((response) => {
        setTasks(response.data.tasks);
        setTaskCount(response.data.count);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    const query = {
      order: sort ? "asc" : "desc",
      pp: 5,
      page: page + 1,
    };
    if (filter !== null) query.filterBy = filter;
    getTasksAPI(query)
      .then((response) => {
        setTasks(response.data.tasks);
        if (taskCount !== response.data.count) {
          setPage(Math.min(page, Math.trunc((response.data.count - 1) / 5)));
          setTaskCount(response.data.count);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [filter, page, sort, taskCount]);

  const addTask = () => {
    addTaskAPI(mainInput)
      .then((response) => {
        if (tasks.length < 5) {
          const newTasks = [...tasks, response.data];
          setTasks(newTasks);
        }
        setTaskCount(taskCount + 1);
        setMainInput("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const removeTask = (uuid) => {
    removeTaskAPI(uuid)
      .then((response) => {
        const newTasks = tasks.filter((task) => task.uuid !== uuid);
        const pages = Math.trunc((taskCount - 2) / 5);
        setTasks(newTasks);
        setTaskCount(taskCount - 1);
        if (page > pages) setPage(page - 1);
        else setPage(page);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const setCheck = (uuid) => {
    const updatedTask = tasks.find((task) => task.uuid === uuid);
    updatedTask.done = !updatedTask.done;
    updateTaskAPI(updatedTask)
      .then((response) => {
        const newTasks = tasks.map((task) => {
          if (task.uuid === uuid) {
            return updatedTask;
          }
          return task;
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const editText = (uuid, text) => {
    const updatedTask = { ...tasks.find((task) => task.uuid === uuid) };
    updatedTask.name = text;
    updateTaskAPI(updatedTask)
      .then((response) => {
        const newTasks = tasks.map((task) => {
          if (task.uuid === uuid) {
            return updatedTask;
          }
          return task;
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

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
          filter={{ filter, filters, setFilter }}
          sort={{ sort, setSort }}
          onPageChange={(n) => setPage(n)}
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
