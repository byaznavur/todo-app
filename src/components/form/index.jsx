import { Component } from "react";
import { Button, Form } from "react-bootstrap";

export class TodoForm extends Component {
  render() {
    const { todo, handleTodo, submit, selected, validated } = this.props;

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={submit}
        className="mx-auto my-5"
        style={{ maxWidth: "500px", width: "100%" }} // Mobil uchun moslashgan o'lcham
      >
        <Form.Group className="mb-3 w-100" controlId="name">
          <Form.Label>Todo name</Form.Label>
          <Form.Control
            onChange={handleTodo}
            value={todo.name}
            required
            type="text"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 w-100" controlId="date">
          <Form.Label>Todo date</Form.Label>
          <Form.Control
            onChange={handleTodo}
            value={todo.date}
            required
            type="date"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="importance">
          <Form.Label>Importance</Form.Label>
          <Form.Select onChange={handleTodo} value={todo.importance} required>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group>

        <Button className="w-100" type="submit">
          {selected === null ? "Add" : "Save"} Todo
        </Button>
      </Form>
    );
  }
}

export default TodoForm;
