import "./List.css";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import Button from "./Button";

const filters = { ALL: 0, DONE: 1, UNDONE: 2 };

function List({ list, onCheckClick, onTrashClick, editText }) {
  const [filter, setFilter] = useState(filters.ALL);
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [taskList, setList] = useState([...list]);

  useEffect(() => {
    let drawList = [...list];

    if (sort) drawList.reverse();

    if (filter === filters.DONE) {
      drawList = drawList.filter((task) => task.isDone);
    } else if (filter === filters.UNDONE) {
      drawList = drawList.filter((task) => !task.isDone);
    }

    const newPagesAmount = Math.trunc((drawList.length - 1) / 5);

    drawList = drawList.slice(page * 5, (page + 1) * 5);
    setList(drawList);
    setPages(newPagesAmount);
    if (newPagesAmount < page) setPage(newPagesAmount);
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
            key={task.id}
            task={task}
            onCheckClick={() => onCheckClick(task.id)}
            onTrashClick={() => onTrashClick(task.id)}
            editText={(text) => editText(task.id, text)}
          />
        ))}
      </div>
      {pages > 0 && (
        <div className="pages">
          <Button
            className="page-btn page-btn-prev"
            onClick={() => setPage(0)}
            text="«"
          />
          {[...Array(pages + 1)].map((element, i) => (
            <Button
              key={"pb" + i}
              className={"page-btn " + (i === page && "page-btn-current")}
              onClick={() => setPage(i)}
              text={i + 1}
            />
          ))}
          <Button
            className="page-btn page-btn-next"
            onClick={() => setPage(pages)}
            text="»"
          />
        </div>
      )}
    </div>
  );
}

export default List;
