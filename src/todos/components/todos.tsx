import React, { Component } from 'react';
import Todo from './todo';

const todos = [
    { task: 'terminer la journée 7', isDone: false },
    { task: 'Apprendre ReactJs', isDone: false },
    { task: 'Progresser avec RebootJS', isDone: false },
];

/* export interface ITodosProps {
    todo: { task: string, isDone: boolean }
} */


export interface ITodosState {
    todos: any[]
}

class Todos extends Component<{}, ITodosState>{

    constructor(props: {}) {
        super(props);
        this.state = { todos: [] }
    }

    componentDidMount() {
        this.setState({ todos })
    }

    handleComplete = (todo: any) => {
        const todos =  [...this.state.todos]
        const index = todos.indexOf(todo);
        todos[index] = { ...todo, isDone: !todo.isDone}
        console.log(todos[index]);
        this.setState({ todos });
    }

    addTodo = (e: any) => {
       if (e.key === 'Enter') {
           const newTask = {
               task: e.target.value,
               isDone: false
           }
           const todos = [...this.state.todos];
           todos.push(newTask);
           e.target.value = '';
           
           this.setState({ todos });
       }
    }

    render() {
        return (
            <>
                <h1>Liste des taches :</h1>
                <ul className="list-group">
                    {this.state.todos.map((todo, index) => (
                        <Todo
                            key={todo.task}
                            todo={todo}
                            onComplete={() => this.handleComplete(todo)}
                        />
                    ))}
                </ul>
                <div className="list-group d-flex align-items-center my-3">
                    <input 
                        type="text" 
                        className="list-group-item col-10" 
                        placeholder="ajouter un todo..." 
                        onKeyDown={(e) => this.addTodo(e)}
                    />
                </div>
            </>
        );
    }
}

export default Todos;