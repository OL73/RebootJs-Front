import React from 'react'

export interface ContactNameProps {
    user: string
}
 
const ContactName: React.SFC<ContactNameProps> = ({user}) => {
    return ( 
        <p>{user}</p>
     );
}
 
export default ContactName;