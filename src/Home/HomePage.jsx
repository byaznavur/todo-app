import { Component, createRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import TodoForm from "../components/form";
import TodoHeader from "../components/header";
import TodoCard from "../components/cards";
import { v4 } from "uuid";
import { toast } from "react-toastify";
// import TodoCard from "../components/cards";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.state = {
      activeTab: "all",

      todos: JSON.parse(localStorage.getItem("todos")) || [
        {
          name: "Reading books",
          done: true,
          importance: "high",
          date: "2024-09-16",
          id: 0,
        },
        {
          name: "English lessons",
          done: true,
          importance: "middle",
          date: "2024-09-17",
          id: 1,
        },
        {
          name: "Sliping today",
          done: false,
          importance: "low",
          date: "2024-09-15",
          id: 2,
        },
      ],
      todo: {
        name: "",
        date: new Date().toISOString().split("T")[0],
        importance: "high",
      },
      selected: null,
      search: "",
      importance: "all",
      validated: false,
    };
  }

  render() {
    const { activeTab, todos, todo, selected, search, importance, validated } =
      this.state;
    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };
    let handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };
    const submit = (e) => {
      e.preventDefault();

      if (e.target.checkValidity()) {
        let newTodos;
        let newTodo = { ...todo, id: v4() };
        if (selected === null) {
          newTodos = [...todos, newTodo];
          toast.success("Todo add", {
            autoClose: 1000,
          });
        } else {
          newTodos = todos.map((todo) => {
            if (todo.id === selected) {
              return newTodo;
            }
            return todo;
          });
          toast.warn("Todo edit", {
            autoClose: 1000,
          });
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));

        this.setState({
          todos: newTodos,
          todo: {
            name: "",
            date: new Date().toISOString().split("T")[0],
            importance: "high",
            done: false,
          },
          selected: null,
          validate: false,
        });
      } else {
        this.setState({ validated: true });
      }
    };
    const handleTodo = (e) => {
      this.setState({ todo: { ...todo, [e.target.id]: e.target.value } });
    };

    const handleImportance = (e) => {
      this.setState({ importance: e.target.value });
    };
    let allTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(search)
    );

    if (importance !== "all") {
      allTodos = allTodos.filter((todo) => todo.importance === importance);
    }
    let doneTodos = allTodos.filter((todo) => todo.done);
    let unDoneTodos = allTodos.filter((todo) => !todo.done);

    const doneTodo = (id) => {
      let newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = true;
        }
        return todo;
      });
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      toast.info("Todo done", {
        autoClose: 1000,
      });
    };

    const deleteTodo = (id) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      toast.error("Todo deleted", {
        autoClose: 1000,
      });
    };

    const editTodo = (id) => {
      this.setState({ selected: id });
      const todo = todos.find((todo) => todo.id === id);
      this.setState({ todo });
    };
    return (
      <Container>
        <h1 className="text-center mt-3">Todo App</h1>
        <TodoForm
          todo={todo}
          submit={submit}
          validated={validated}
          selected={selected}
          handleTodo={handleTodo}
        />
        <TodoHeader
          importance={importance}
          searchRef={this.searchRef}
          handleSearch={handleSearch}
          handleImportance={handleImportance}
        />
        <Tabs
          fill
          variant="pills"
          className="mb-3 "
          activeKey={activeTab}
          onSelect={changeTab}
        >
          <Tab eventKey="all" title="All">
            {allTodos.map((todo, i) => (
              <TodoCard
                key={i}
                {...todo}
                editTodo={editTodo}
                doneTodo={doneTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </Tab>
          <Tab eventKey="done" title="Done">
            {doneTodos.map((todo, i) => (
              <TodoCard
                key={i}
                {...todo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </Tab>
          <Tab eventKey="undone" title="Undone">
            {unDoneTodos.map((todo, i) => (
              <TodoCard
                key={i}
                {...todo}
                editTodo={editTodo}
                doneTodo={doneTodo}
              />
            ))}
          </Tab>
        </Tabs>
        {/* <TodoCard /> */}
      </Container>
    );
  }
}

export default HomePage;
