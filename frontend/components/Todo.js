import React from "react";

export default class Todo extends React.Component {
  render() {
    const { todo } = this.props;
    return (
      <div key={todo.id}>
        <p>
          <span onClick={this.props.toggleTodo(todo.id)}>
            {todo.completed ? "\u2612 " : "\u2610 "}-{" "}
          </span>
          {todo.name}
        </p>
      </div>
    );
  }
}
