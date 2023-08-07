import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.postTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={this.props.nameInput}
          onChange={this.props.changeNameInput}
        />
        <button>Add</button>
      </form>
    );
  }
}
