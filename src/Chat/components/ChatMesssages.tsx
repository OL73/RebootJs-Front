import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { IUser } from '../../Users/types';
import { IConversationMessage } from '../types';
import { makeUpdateConversationSeen } from './actions/makeUpdateConversationSeen';
import ChatMessage from './ChatMessage';

/*
Composant en classe
componentDidMount(){ //chargement initial
  ACTION A REALISEE
}
componentDidUpdate(prevProps){
  if(this.props.messages !== prevProps.messages){
    ACTION A REALISEE
  }
}
*/

interface ChatMessagesProps {
  messages: IConversationMessage[];
  conversationId: string;
  makeUpdateConversationSeen: (convId: string) => void;
  users: IUser[];
}

export function ChatMessages({messages, conversationId, makeUpdateConversationSeen, users}: ChatMessagesProps){

  useEffect( // équivalent à componentDidMount() + componentDidUpdate()
    () => {
      makeUpdateConversationSeen(conversationId)
    },
    [messages.length, conversationId, makeUpdateConversationSeen]
  )

  return (
    <ul>
      {messages.map((message, index) => 
        <ChatMessage 
          key={index} 
          message={message}
          users={users}
        />)}
    </ul>
  )
}

// type de dispatch: ThunkDispatch<IAppState, void, Action>
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  makeUpdateConversationSeen: (conversationId: string) => dispatch(makeUpdateConversationSeen(conversationId))
});

export default connect(undefined, mapDispatchToProps)(ChatMessages);