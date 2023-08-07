import axios from "axios";
import React from "react";

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
    // fetch(URL)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json.data);
    //     this.setState({
    //       todos: json.data,
    //     });
    //   });
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
        <div id="todos">
          <h2>ToDos:</h2>
          {this.state.todos.map((todo) =>
            !this.state.showAll && todo.completed ? null : (
              <div key={todo.id}>
                <p>
                  <span onClick={this.toggleTodo(todo.id)}>
                    {todo.completed ? "\u2612 " : "\u2610 "}-{" "}
                  </span>
                  {todo.name}
                </p>
              </div>
            )
          )}
        </div>
        <hr />
        <form onSubmit={this.postTodo}>
          <input
            type="text"
            placeholder="Add a new todo"
            value={this.state.nameInput}
            onChange={this.changeNameInput}
          />
          <button>Add</button>
        </form>
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
