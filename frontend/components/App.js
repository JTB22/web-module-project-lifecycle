import axios from "axios";
import React from "react";
import ToDoForm from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      nameInput: "",
      showAll: true,
    };
  }

  toggleShowAll = () => {
    this.setState({
      ...this.state,
      showAll: !this.state.showAll,
    });
  };

  changeNameInput = (event) => {
    const nameInput = event.target.value;
    this.setState({
      ...this.state,
      nameInput,
    });
  };

  postTodo = (event) => {
    event.preventDefault();
    axios.post(URL, { name: this.state.nameInput }).then((response) => {
      console.log(response.data.data);
      this.setState({
        ...this.state,
        todos: [...this.state.todos, response.data.data],
        nameInput: "",
      });
    });
  };

  toggleTodo = (id) => (evt) => {
    axios
      .patch(`${URL}/${id}`)
      .then((response) => {
        console.log(response.data.data);
        const updatedTodos = this.state.todos.map((todo) => {
          if (todo.id === id) {
            return response.data.data;
          }
          return todo;
        });
        this.setState({
          ...this.state,
          todos: updatedTodos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          ...this.state,
          todos: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="todo">
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          showAll={this.state.showAll}
        />
        <hr />
        <ToDoForm
          nameInput={this.state.nameInput}
          postTodo={this.postTodo}
          changeNameInput={this.changeNameInput}
        />
        <hr />
        {this.state.showAll ? (
          <button onClick={this.toggleShowAll} className="clear-btn">
            Hide completed
          </button>
        ) : (
          <button onClick={this.toggleShowAll} className="clear-btn">
            Show completed
          </button>
        )}
      </div>
    );
  }
}
