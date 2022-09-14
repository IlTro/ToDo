import React, { useState } from 'react';
import './App.css';
import Input from './Components/Input';
import List from './Components/List';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: new Date().getTime(), text, status: false, date: new Date() }]);
  }

  function setCheck(id) {
    const asd = tasks.map(el => {
      if (el.id === id) {
        const copy = { ...el, status: !el.status }
        return copy
      };
      return el;
    })
    setTasks(asd)///////
  }

  function removeTask(id) {
    setTasks(tasks.filter(el => el.id !== id));
  }

  function editText(id, text) {
    setTasks(tasks.map(el => {
      el.id === id && (el.text = text);/////
      return el;
    }))
  }

  return (
    <div className='main'>
      <div className="container">
        <div className="title">
          ToDo
        </div>
        <Input onKeyDown={e => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
            e.preventDefault();
          }
          if (e.key === "Escape") {
            e.target.value = "";
          }
        }} />
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
