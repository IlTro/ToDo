import { getTasksAPI, addTaskAPI, removeTaskAPI, updateTaskAPI} from "./Utility/Services";
import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import List from "./Components/List";

function App() {
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");

  useEffect(() => {
    getTasksAPI().then((response) => setTasks(response));
  }, []);

  const addTask = () => {
    addTaskAPI(mainInput).then((response) =>{
      const newTasks = [
        ...tasks,
        response,
      ];
      setTasks(newTasks);
      setMainInput("");
    })
  };

  const removeTask = (uuid) => {
    removeTaskAPI(uuid).then((response) => {
      const newTasks = tasks.filter((task) => task.uuid !== uuid);
      setTasks(newTasks);
    })
  };

  const setCheck = (uuid) => {
    const updatedTask = tasks.find(task => task.uuid === uuid)
    updatedTask.done = !updatedTask.done;
    updateTaskAPI(updatedTask).then((response) => {
      const newTasks = tasks.map((task) => {
        if (task.uuid === uuid) {
          return updatedTask;
        }
        return task;
      });
      setTasks(newTasks);
    })
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
          onCheckClick={(id) => setCheck(id)}
          onTrashClick={(id) => removeTask(id)}
          editText={(id, text) => editText(id, text)}
        />
      </div>
    </div>
  );
}

export default App;
