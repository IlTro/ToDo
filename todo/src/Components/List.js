import "./List.css";
import Task from "./Task";
import Button from "./Button";

function List({ list, page, pages, filter, sort, onCheckClick, onTrashClick, editText, onPageChange }) {

  return (
    <div className="tasks">
      <div className="controls">
        <div className="buttons">
          <Button text="All" className={!filter.filter && "page-btn-current" } onClick={() => filter.setFilter(filter.filters.ALL)} />
          <Button text="Done" className={filter.filter === filter.filters.DONE && "page-btn-current" } onClick={() => filter.setFilter(filter.filters.DONE)} />
          <Button text="Undone" className={filter.filter === filter.filters.UNDONE && "page-btn-current" } onClick={() => filter.setFilter(filter.filters.UNDONE)} />
        </div>
        <Button
          className="sortButton"
          text={sort.sort ? "Sort by Date ⇧" : "Sort by Date ⇩"}
          onClick={() => sort.setSort(!sort.sort)}
        />
      </div>
      <div className="list">
        {list.map((task) => (
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
