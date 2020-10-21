import React, { Component, FormEvent, Fragment } from "react";
import { ITodo } from "../types";
import Todo from "./Todo";

export interface ITodoListState {
  newTodoInput: string;
  todos: ITodo[];
}

class TodoList extends Component<{}, ITodoListState> {
  constructor(props: {}){
    super(props);
    this.state = {
      newTodoInput: '',
      todos: [
        { text: 'Finir le jour 7', done: true},
        { text: 'Apprendre React', done: false},
        { text: 'Progresser grâce à RebootJS', done: false}
      ]
    }
  }

  changeTodoDone = (text: string) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.text === text){
          return { ...todo, done: !todo.done }
        }
        return todo
      })
    })
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // ajouter le todo
    this.setState({
      newTodoInput: '',
      todos: [
        ...this.state.todos,
        {
          text: this.state.newTodoInput,
          done: false
        }
      ]
    })
  }

  handleChange = (newTodoInput: string) => {
    this.setState({newTodoInput: newTodoInput})
  }

  render(){
    return (
      <Fragment>
        <ul>
          {this.state.todos.map((todo, index) =>
            <Todo changeTodoDone={this.changeTodoDone} key={index} todo={todo} />
          )}
        </ul>
        <form data-testid="todolist-form" onSubmit={this.handleSubmit}>
          <input
            name="newTodoInput"
            data-testid="newTodoInput"
            type="text"
            value={this.state.newTodoInput}
            onChange={(e) => this.handleChange(e.target.value)}
          />
          <input type="submit" value="Ajouter"/>
        </form>
      </Fragment>
    )
  }
}

export default TodoList;