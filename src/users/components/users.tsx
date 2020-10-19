import React, { Component } from 'react'
import User from './user';
import { getUsers } from './../../api/users';
import { IUser } from '../types';
import { List } from '@material-ui/core';

export interface IUsersState {
    users: IUser[];
}

class Users extends Component<{}, IUsersState> {
    constructor(props: {}) {
        super(props);
        this.state = { users: [] };
    }

    /* async getUsers() {

        const users = await axios.get('http://localhost:3000/api/users')
            .then(res => res.data)
        console.log(users);

        this.setState({ users });
    } */

    componentDidMount() {
        getUsers().then(users => {
            console.log(users);

            this.setState({
                users: users
            });
        });
    }

    render() {
        if (this.state.users.length === 0) {
            return <h1>Loading</h1>

        } else {

            return (
                <div className="my-3">
                    <h1 className="text-center">Flint Messenger Users</h1>
                    {/* <ul className="list-group row">
                        {this.state.users.map((user, index) => (
                            <User
                                key={user.email}
                                user={user}
                                index={index}
                            />)
                        )}
                    </ul> */}
                    <List>
                        {this.state.users.map((user, index) => (
                            <User
                                key={user.email}
                                user={user}
                                index={index}
                            />)
                        )}
                    </List>
                </div>

            );
        }
    }
}

export default Users;