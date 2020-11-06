import { Divider, Grid, List, TextField } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
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
        const todos = [...this.state.todos]
        const index = todos.indexOf(todo);
        todos[index] = { ...todo, isDone: !todo.isDone }
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
            <Fragment>
                <h1>Liste des taches :</h1>
                <List>
                    {this.state.todos.map((todo, index) => (
                        <div key={index}>
                            <Todo
                                todo={todo}
                                checked={todo.isDone}
                                onComplete={() => this.handleComplete(todo)}
                            />
                            <Divider variant="inset" component="li" />
                        </div>
                    ))}
                </List>
                <Grid container item sm={12}>
                    <Grid item sm={6} style={{ margin: 'auto' }}>
                        <TextField
                            fullWidth
                            type="text"
                            variant="filled"
                            label="ajouter un todo..."
                            onKeyDown={(e) => this.addTodo(e)}
                        />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default Todos;