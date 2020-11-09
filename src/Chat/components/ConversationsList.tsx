import { List } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { Loading } from '../../Layout/components/Loading';
import { IUser } from '../../Users/types';
import { IConversation } from '../types';
import ConversationsListItem from './ConversationsListItem';

export interface ConversationsListProps {
    conversations: IConversation[]
    user?: IUser
}

class ConversationsList extends React.Component<ConversationsListProps, {}> {

    /* showDetailsMessage = (id: string) => { ==> logique déplacée dans ConversationsListitem
        console.log('conversationId', id);
        history.push(`/conversation/${id}`);       
    } */

    render() {

        /* const filteredUsers = this.props.conversations.filter(conversation => conversation.targets[0] !== this.props.user?._id);
        console.log(filteredUsers); */

        if (!this.props.user) return <Alert severity='warning'>Please, login <Link to='/login'>here</Link> !</Alert>

        if (this.props.conversations.length === 0) {
            return <Loading />

        } else {
            return (
                <List>
                    {this.props.conversations.map((conversation, index) =>
                        <ConversationsListItem
                            key={index}
                            conversation={conversation}
                        />
                    )}
                </List>
            );
        }
    }
}

const mapStoreToProps = (state: IAppState) => ({
    conversations: state.conversations.list,
    user: state.users.connectedUser
})

export default connect(mapStoreToProps)(ConversationsList);