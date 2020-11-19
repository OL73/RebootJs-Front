import { Divider, Grid, List, TextField } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import Todo from './todo';

const todos = [
    { task: 'créer une app type Messenger avec ReactJs, Typescript et Material-UI', isDone: true },
    { task: 'Connecter l\'app au back-end développé avec NodeJs et MongoDB', isDone: true },
    { task: 'Intégration et livraison continue avec Github, Travis et Heroku', isDone: true },
    { task: 'Implémenter une authentification avec Passport côté back', isDone: true },
    { task: 'Mettre en place Redux pour regrouper les données dans un store global', isDone: true },
    { task: 'Utiliser les web sockets détecter les users connectés et les nouveaux messages', isDone: true },
    { task: 'Ajouter des emojis aux messages', isDone: false },
    { task: 'Personnaliser les détails du user avec une photo ou une image de son choix', isDone: false },
    { task: 'Mettre en place le web RTC pour les appels en visio', isDone: false },
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
                    <Grid item sm={6} style={{ margin: '30px auto 100px auto' }}>
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