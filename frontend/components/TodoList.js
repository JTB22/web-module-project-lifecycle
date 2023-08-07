import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
        <h2>ToDos:</h2>
        {this.props.todos.map((todo) =>
          !this.props.showAll && todo.completed ? null : (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={this.props.toggleTodo}
            />
          )
        )}
      </div>
    );
  }
}
