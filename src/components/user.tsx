import React from 'react'

export interface IUserProps {
    user: { firstname: string, lastname: string, email: string }
    index: number
}
 
const User: React.SFC<IUserProps> = (props) => {
    return ( 
    <li className="list-group-item col-8 align-self-center">{props.index +1}. {props.user.firstname} - {props.user.lastname}</li>        
     );
}
 
export default User;