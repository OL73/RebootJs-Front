import React, { Fragment } from 'react'
import UsersListItem from '../../Users/components/UsersListItem';
import ContactName from './ContactName';

export interface AttendeesListProps {
    users: string[]
}

const AttendeesList: React.SFC<AttendeesListProps> = ({ users }) => {
    return (
        <div>
            {users.map((user, index) => (
                <Fragment key={index}>
                    {/* <UsersListItem
                        key = { user }
                        user = { user }
                    /> */}
                    <ContactName
                        key={index}
                        user={user}
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default AttendeesList;