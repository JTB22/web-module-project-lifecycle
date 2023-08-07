import axios from "axios";
import React from "react";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

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
          {this.state.todos.map((todo) => (
            <div key={todo.id}>
              <p>
                <span>{todo.completed ? "\u2612 " : "\u2610 "}- </span>
                {todo.name}
              </p>
            </div>
          ))}
        </div>
        <hr />
        <form>
          <input type="text" placeholder="Add a new todo" />
          <button>Add</button>
        </form>
        <hr />
        <button className="clear-btn">Hide completed</button>
      </div>
    );
  }
}
