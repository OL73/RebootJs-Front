import React from 'react';

export interface ITodoProps {
    todo: { task: string, isDone: boolean }
    onComplete: (user: any) => void
}

const Todo: React.SFC<ITodoProps> = (props) => {

        function changeTextFormat() {
            let classes = props.todo.isDone ? 'list-group-item col-10 completeTodo' : 'list-group-item col-10';
            return classes;
        }

        return (
            <div className="row align-items-center">
                <input type="checkbox" className="col-1" onClick={props.onComplete} />
                <li
                    className={changeTextFormat()}
                >
                    {props.todo.task}
                </li>
            </div>
        );
}

export default Todo;