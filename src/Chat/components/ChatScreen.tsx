import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getConversations } from '../../api/messages';
import { Loading } from '../../Layout/components/Loading';
import { IConversation } from './../types';
import AttendeesList from './AttendeesList';
import ChatMessages from './ChatMesssages';

interface ChatScreenProps {
  match: any;
  history: any;
  location: any;
}

interface ChatScreenState {
  conversation?: IConversation;
}

class ChatScreen extends React.Component<ChatScreenProps, ChatScreenState> {

  constructor(props: ChatScreenProps) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    getConversations().then(conversations => {
      console.log(conversations);
      const conversationID = this.props.match.params.conversationID;

      this.setState({
        conversation: conversations.find(conv => conv._id === conversationID) // routage vers id
      })
    })
  }

  render() {
    if (this.state.conversation === undefined) return <Loading />

    return (
      <Fragment>
        <h1>Chat</h1>
            <ChatMessages 
              messages = { this.state.conversation?.messages }
            />
            <AttendeesList
              users = { this.state.conversation.targets}
            />            
      </Fragment>
    )
  }
}

export default withRouter(ChatScreen);