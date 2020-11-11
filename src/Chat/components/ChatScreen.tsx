import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { Loading } from '../../Layout/components/Loading';
import ChatInput from './ChatInput';
import { IConversation } from './../types';
//import { makeFetchConversationsList } from './actions/makeFetchConversations';
import {AttendeesList} from './AttendeesList';
import ChatMessages from './ChatMesssages';
import { Divider } from '@material-ui/core';
import { IUser } from '../../Users/types';

interface ChatScreenProps {
  match: any;
  history: any;
  location: any;
  conversation?: IConversation;
  users: IUser[];
  connectedUser?: IUser
}


class ChatScreen extends React.Component<ChatScreenProps> {

  componentDidMount() {
    /* getConversations().then(conversations => {
      console.log('conversations object', conversations);
      const conversationID = this.props.match.params.conversationID;

      this.setState({
        conversation: conversations.find(conv => conv._id === conversationID) // routage vers id
      })
    }) */
    //this.props.getConversations();

  }

  render(){
    const { conversation, users, connectedUser } = this.props;
    if(!conversation) return <Loading />

    return (
      <Fragment>
        <AttendeesList 
          users={conversation.targets} 
          connectedUser={connectedUser?._id}
        />
        <Divider />
        <ChatMessages 
          messages={conversation.messages}
          conversationId={conversation._id}
          users={users}
        />
        <ChatInput conversation={conversation} />
      </Fragment>
    )
  }
}

const mapStoreToProps = ({conversations, users}: IAppState, props: ChatScreenProps) => {
  const conversationID = props.match.params.conversationID;

  return {
    conversation: conversations.list.find(conv => conv._id === conversationID),
    users: users.list,
    connectedUser: users.connectedUser
  }
}

export default connect(mapStoreToProps)(withRouter(ChatScreen));