import { createStyles, Grid, makeStyles, Theme, Checkbox, Typography } from '@material-ui/core';
import React from 'react';

export interface ITodoProps {
    todo: { task: string, isDone: boolean }
    onComplete: (user: any) => void
    checked: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        content: {
            alignSelf: 'center',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
    }),
);

const Todo: React.SFC<ITodoProps> = (props) => {

    const classes = useStyles();

    function changeTextFormat() {
        let customClasses = props.todo.isDone ? `completeTodo` : ``;
        return customClasses;
    }

    return (
        <div className={classes.root}>
            <Grid container item sm={12}>
                <Grid sm={1} item style={{ padding: '10px' }}>
                    {/* <input type="checkbox" onClick={props.onComplete} /> */}
                    <Checkbox
                        checked={props.checked}
                        color="primary"
                        onClick={props.onComplete}
                    />
                </Grid>
                <Grid sm={11} item style={{alignSelf: 'center'}}>
                    <Typography 
                        className={changeTextFormat()}
                        color="primary"
                        >
                            {props.todo.task}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Todo;