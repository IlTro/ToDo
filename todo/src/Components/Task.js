import "./Task.css";
import React, { useState, useRef, useEffect } from "react";

function Task({ task, editText, onCheckClick, onTrashClick }) {
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  function inputOnKeyDown(event) {
    if (event.key === "Enter") {
      editText(event.target.value);
      setEdit(false);
    }
    if (event.key === "Escape") {
      setEdit(false);
    }
  }

  function onTextClick(event) {
    setEdit(true);
  }

  useEffect(() => {
    if (edit) {
      input.current.focus();
    }
  }, [edit]);

  return (
    <div className="task">
      <div className="left">
        <button className="check" onClick={onCheckClick}>
          {task.isDone ? "✓" : ""}
        </button>
        {edit ? (
          <input
            ref={input}
            defaultValue={task.text}
            onKeyDown={(e) => inputOnKeyDown(e)}
            onBlur={() => setEdit(false)}
          />
        ) : (
          <div onDoubleClick={(e) => onTextClick(e)}>{task.text}</div>
        )}
      </div>
      <div className="right">
        <div className="date">
          {task.date ? task.date.toLocaleDateString() : ""}
        </div>
        <button className="trash" onClick={onTrashClick}>
          🗑
        </button>
      </div>
    </div>
  );
}

export default Task;
