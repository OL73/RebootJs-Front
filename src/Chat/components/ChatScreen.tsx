import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { Loading } from '../../Layout/components/Loading';
import ChatInput from './ChatInput';
import { IConversation } from './../types';
//import { makeFetchConversationsList } from './actions/makeFetchConversations';
import {AttendeesList} from './AttendeesList';
import {ChatMessages} from './ChatMesssages';

interface ChatScreenProps {
  match: any;
  history: any;
  location: any;
  conversation?: IConversation;
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
    const { conversation } = this.props;
    if(!conversation) return <Loading />

    return (
      <Fragment>
        <h1>Chat</h1>
        <ChatMessages messages={conversation.messages} />
        <ChatInput conversation={conversation} />
        <AttendeesList users={conversation.targets}/>
      </Fragment>
    )
  }
}

const mapStoreToProps = ({conversations}: IAppState, props: ChatScreenProps) => {
  const conversationID = props.match.params.conversationID;

  return {
    conversation: conversations.list.find(conv => conv._id === conversationID)
  }
}

export default connect(mapStoreToProps)(withRouter(ChatScreen));