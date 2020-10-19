import React from 'react'
import { IUser } from '../types';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';


export interface IUserProps {
    user: IUser //{ firstname: string, lastname: string, email: string }
    index: number
}

const User: React.SFC<IUserProps> = (props) => {

    const user = props.user;
    return (
        <>
            {/* <li className="list-group-item col-8 align-self-center">{props.index + 1}. {props.user.firstname} -  {props.user.lastname}</li> */}
            {<ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {user.firstname[0]} {user.lastname[0]}
                    </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={`${user.firstname} ${user.lastname}`}
                />
            </ListItem>}
        </>
    );
}

export default User;