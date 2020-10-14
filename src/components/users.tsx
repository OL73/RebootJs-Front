import axios from 'axios';
import React, { Component } from 'react'
import User from './user';

export interface IUsersState {
    users: any[]
}

class Users extends Component<{}, IUsersState> {
    constructor(props: {}) {
        super(props);
        this.state = { users: [] };
    }

    async getUsers() {
        /* const users = await fetch('http://localhost:3000/api/users')
            .then(data => data.json()) */

        const users = await axios.get('http://localhost:3000/api/users')
            .then(res => res.data)
        console.log(users);

        this.setState({ users });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="my-3">
                <h1 className="text-center">Flint Messenger Users</h1>
                <ul className="list-group row">
                    {this.state.users.map((user, index) => (
                        <User
                            key={user._id}
                            user={user}
                            index={index}
                        />)
                    )}
                </ul>
            </div>

        );
    }
}

export default Users;