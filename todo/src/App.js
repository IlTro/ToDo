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

  useEffect(() => {
    const query = {
      order: listState.sort ? "asc" : "desc",
      pp: 5,
      page: listState.page + 1,
    };
    if (listState.filter) query.filterBy = listState.filter;
    getTasksAPI(query)
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
        console.log(err);
        setError(err.response.data.message);
      });
  }, [listState]);

  const addTask = () => {
    addTaskAPI(mainInput)
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
  };

  const removeTask = (uuid) => {
    removeTaskAPI(uuid)
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
  };

  const setCheck = (uuid) => {
    const updatedTask = { ...tasks.find((task) => task.uuid === uuid) };
    updatedTask.done = !updatedTask.done;
    updateTaskAPI(updatedTask)
      .then((response) => {
        if (listState.filter) {
          updateListState({taskCount: listState.taskCount - 1});
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
  };

  const editText = (uuid, text) => {
    const updatedTask = { ...tasks.find((task) => task.uuid === uuid) };
    updatedTask.name = text;
    updateTaskAPI(updatedTask)
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
  };

  const updateListState = (newState) => {
    setListState({ ...listState, ...newState });
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
      {error && <Notification text={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
