import "./List.css";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import Button from "./Button";

const filters = { ALL: 0, DONE: 1, UNDONE: 2 };

function List({ list, page, pages, onCheckClick, onTrashClick, editText, onPageChange }) {

  const [filter, setFilter] = useState(filters.ALL);
  const [sort, setSort] = useState(false);
  const [taskList, setList] = useState([...list]);

  useEffect(() => {
    let drawList = [...list];

    if (sort) drawList.reverse();

    if (filter === filters.DONE) {
      drawList = drawList.filter((task) => task.done);
    } else if (filter === filters.UNDONE) {
      drawList = drawList.filter((task) => !task.done);
    }

    setList(drawList);
  }, [list, filter, sort, page]);

  return (
    <div className="tasks">
      <div className="controls">
        <div className="buttons">
          <Button text="All" onClick={() => setFilter(filters.ALL)} />
          <Button text="Done" onClick={() => setFilter(filters.DONE)} />
          <Button text="Undone" onClick={() => setFilter(filters.UNDONE)} />
        </div>
        <Button
          className="sortButton"
          text={sort ? "Sort by Date ⇧" : "Sort by Date ⇩"}
          onClick={() => setSort(!sort)}
        />
      </div>
      <div className="list">
        {taskList.map((task) => (
          <Task
            key={task.uuid}
            task={task}
            onCheckClick={() => onCheckClick(task.uuid)}
            onTrashClick={() => onTrashClick(task.uuid)}
            editText={(text) => editText(task.uuid, text)}
          />
        ))}
      </div>
      {pages > 0 && (
        <div className="pages">
          <Button
            className="page-btn page-btn-prev"
            onClick={() => onPageChange(0)}
            text="«"
          />
          {[...Array(pages + 1)].map((element, i) => (
            <Button
              key={"pb" + i}
              className={"page-btn " + (i === page && "page-btn-current")}
              onClick={() => onPageChange(i)}
              text={i + 1}
            />
          ))}
          <Button
            className="page-btn page-btn-next"
            onClick={() => onPageChange(pages)}
            text="»"
          />
        </div>
      )}
    </div>
  );
}

export default List;
