import { Alert } from "react-bootstrap";
import { Component } from "react";

export class TodoCard extends Component {
  render() {
    let dataColor = {
      high: "danger",
      middle: "warning",
      low: "secondary",
    };

    const { name, date, importance, done, doneTodo, id, deleteTodo, editTodo } =
      this.props;
    return (
      <Alert
        variant={`${dataColor[importance]}`}
        className="d-flex justify-content-between flex-wrap sm:flex-nowrap align-items-center"
      >
        <div>
          <h5>{name}</h5>
          <span className="badge bg-warning p-1 rounded-sm text-white">
            {date}
          </span>
        </div>

        <div>
          <button className="btn me-3 btn-success" onClick={() => editTodo(id)}>
            Edit
          </button>
          {done ? (
            <>
              <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
                Delete
              </button>
            </>
          ) : (
            <button
              className="btn me-3 btn-primary"
              onClick={() => doneTodo(id)}
            >
              Done
            </button>
          )}
        </div>
      </Alert>
    );
  }
}

export default TodoCard;
