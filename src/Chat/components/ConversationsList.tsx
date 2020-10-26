import { List } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { Loading } from '../../Layout/components/Loading';
import { IConversation } from '../types';
import ConversationsListItem from './ConversationsListItem';

export interface ConversationsListProps {
    conversations: IConversation[]
}

class ConversationsList extends React.Component<ConversationsListProps, {}> {

    /* showDetailsMessage = (id: string) => { ==> logique déplacée dans ConversationsListitem
        console.log('conversationId', id);
        history.push(`/conversation/${id}`);       
    } */

    render() {
        if (this.props.conversations.length === 0) return <Loading />

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

const mapStoreToProps = (state: IAppState) => ({
    conversations: state.conversations.list
})

export default connect(mapStoreToProps)(ConversationsList);