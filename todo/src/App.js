import React, { useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import List from "./Components/List";

function App() {
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");

  const addTask = () => {
    const newTasks = [
      ...tasks,
      {
        id: new Date().getTime(),
        text: mainInput,
        isDone: false,
        date: new Date(),
      },
    ];
    setTasks(newTasks);
    setMainInput("");
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const setCheck = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        const copy = { ...task, isDone: !task.isDone };
        return copy;
      }
      return task;
    });
    setTasks(newTasks);
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
