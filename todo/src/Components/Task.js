import "./Task.css";
import React, { useState, useRef, useEffect } from "react";

function Task(props) {
  const [edit, setEdit] = useState(false);
  const input = useRef(null);

  function inputOnKeyDown(event) {
    if (event.key === "Enter") {
      props.editText(event.target.value);
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
        <button className="check" onClick={props.onCheckClick}>
          {props.status ? "✓" : ""}
        </button>
        {edit ? (
          <input
            ref={input}
            defaultValue={props.text}
            onKeyDown={(e) => inputOnKeyDown(e)}
            onBlur={() => setEdit(false)}
          />
        ) : (
          <div onClick={(e) => onTextClick(e)}>{props.text}</div>
        )}
      </div>
      <div className="right">
        <div className="date">
          {props.date ? props.date.toLocaleDateString() : ""}
        </div>
        <button className="trash" onClick={props.onTrashClick}>
          🗑
        </button>
      </div>
    </div>
  );
}

export default Task;
