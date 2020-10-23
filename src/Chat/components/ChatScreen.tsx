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
  newMessage: string
}

class ChatScreen extends React.Component<ChatScreenProps, ChatScreenState> {

  constructor(props: ChatScreenProps) {
    super(props);
    this.state = {
      newMessage: ""
    }
  }

  componentDidMount() {
    getConversations().then(conversations => {
      console.log('conversations object', conversations);
      const conversationID = this.props.match.params.conversationID;

      this.setState({
        conversation: conversations.find(conv => conv._id === conversationID) // routage vers id
      })
    })
  }

  componentDidUpdate(prevProps: ChatScreenProps) {

    if (prevProps.match.params.conversationID !== this.props.match.params.conversationID) {

      getConversations().then(conversations => {
        console.log('conversations object', conversations);
        const conversationID = this.props.match.params.conversationID;
  
        this.setState({
          conversation: conversations.find(conv => conv._id === conversationID) // routage vers id
        })
      })
    }

  }

  handleChange = (newMessage: string) => {
    console.log(newMessage);
    
    this.setState({
      newMessage
    }); 
  }

  handleSubmit = () => {

    if (this.state.conversation) {

      const conversations = { ...this.state.conversation};

      /* [...conversations.messages, {
        emitter: // login user
        content: this.state.newMessage,
        conversationID: this.state.conversation._id,
        targets:
        createdAt: Date.now()
      }] */
    }
  }


  render() {
    if (this.state.conversation === undefined) return <Loading />

    return (
      <Fragment>
        <h1>Chat</h1>
        <ChatMessages
          messages={this.state.conversation?.messages}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <AttendeesList
          users={this.state.conversation.targets}
        />
      </Fragment>
    )
  }
}

export default withRouter(ChatScreen);