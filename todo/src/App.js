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
import Login from "./Components/Login";
import Button from "./Components/Button";

const FILTERS = { ALL: null, DONE: "done", UNDONE: "undone" };

function App() {
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const [listState, setListState] = useState({
    page: 0,
    sort: true,
    taskCount: 0,
    filter: FILTERS.ALL,
  });
  const [error, setError] = useState(null);
  const [authReq, setAuthReq] = useState(false);

  useEffect(() => {
    const query = {
      order: listState.sort ? "asc" : "desc",
      pp: 5,
      page: listState.page + 1,
    };
    if (listState.filter) query.filterBy = listState.filter;
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      getTasksAPI(
        query,
        localStorage.getItem("username"),
        localStorage.getItem("token")
      )
        .then((response) => {
          if (listState.taskCount !== response.data.count) {
            updateListState({
              page: Math.min(
                listState.page,
                Math.trunc((response.data.count - 1) / 5)
              ),
              taskCount: response.data.count,
            });
          }
          setTasks(response.data.tasks);
        })
        .catch((err) => {
          if (
            err.response.data.message &&
            err.response.data.message === "No Auth"
          ) {
            setAuthReq(true);
          } else {
            console.log(err);
            setError(err.response.data.message);
          }
        });
    } else {
      setAuthReq(true);
    }
  }, [listState, authReq]);

  const addTask = () => {
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      addTaskAPI(
        mainInput,
        localStorage.getItem("username"),
        localStorage.getItem("token")
      )
        .then((response) => {
          if (tasks.length < 5) {
            const newTasks = [...tasks, response.data];
            setTasks(newTasks);
          }
          updateListState({ taskCount: listState.taskCount + 1 });
          setMainInput("");
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  const removeTask = (uuid) => {
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      removeTaskAPI(
        uuid,
        localStorage.getItem("username"),
        localStorage.getItem("token")
      )
        .then((response) => {
          const newTasks = tasks.filter((task) => task.uuid !== uuid);
          const pages = Math.trunc((listState.taskCount - 2) / 5);
          const page =
            listState.page > pages ? listState.page - 1 : listState.page;
          updateListState({ taskCount: listState.taskCount - 1, page });
          setTasks(newTasks);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  const setCheck = (uuid) => {
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      const updatedTask = { ...tasks.find((task) => task.uuid === uuid) };
      updatedTask.done = !updatedTask.done;
      updateTaskAPI(
        updatedTask,
        localStorage.getItem("username"),
        localStorage.getItem("token")
      )
        .then((response) => {
          if (listState.filter) {
            updateListState({ taskCount: listState.taskCount - 1 });
          } else {
            const newTasks = tasks.map((task) => {
              if (task.uuid === uuid) {
                return response.data;
              }
              return task;
            });
            setTasks(newTasks);
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  const editText = (uuid, text) => {
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      const updatedTask = { ...tasks.find((task) => task.uuid === uuid) };
      updatedTask.name = text;
      updateTaskAPI(
        updatedTask,
        localStorage.getItem("username"),
        localStorage.getItem("token")
      )
        .then((response) => {
          const newTasks = tasks.map((task) => {
            if (task.uuid === uuid) {
              return response.data;
            }
            return task;
          });
          setTasks(newTasks);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  const updateListState = (newState) => {
    setListState({ ...listState, ...newState });
  };

  const logout = () => {
    localStorage.clear();
    setTasks([]);
    setAuthReq(true);
  }

  return (
    <div className="main">
      <div className="container">
        <div className="title">ToDo</div>
        <Input
          value={mainInput}
          placeholder="I want to..."
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
          page={listState.page}
          pages={Math.trunc((listState.taskCount - 1) / 5)}
          filter={{ filter: listState.filter, filters: FILTERS }}
          sort={listState.sort}
          updateListState={(state) => updateListState(state)}
          onCheckClick={(id) => setCheck(id)}
          onTrashClick={(id) => removeTask(id)}
          editText={(id, text) => editText(id, text)}
        />
      </div>
      <Button className="logout" onClick={() => logout()} text={"Logout"} />
      {error && <Notification text={error} onClose={() => setError(null)} />}
      {authReq && <Login setAuthReq={setAuthReq} />}
    </div>
  );
}

export default App;
