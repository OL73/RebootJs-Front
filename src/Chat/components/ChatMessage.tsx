import React from 'react'

export interface ChatMessageProps {
    content: string;
}
 
const ChatMessage: React.SFC<ChatMessageProps> = ({content}) => {
    return ( 
        <div>
            <p>{content}</p>
        </div>
     );
}
 
export default ChatMessage;