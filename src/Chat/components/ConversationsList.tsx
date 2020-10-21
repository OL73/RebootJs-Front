import { List } from '@material-ui/core';
import React from 'react';
import { getConversations } from '../../api/messages';
import { Loading } from '../../Layout/components/Loading';
import { IConversation } from '../types';
import ConversationsListItem from './ConversationsListItem';

export interface ConversationsListState {
    conversations: IConversation[];
}

class ConversationsList extends React.Component<{}, ConversationsListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            conversations: []
        };
    }

    componentDidMount() {
        getConversations().then(conversations => {

            this.setState({
                conversations
            })
        })
    }

    render() {
        if (this.state.conversations.length === 0) return <Loading />

        return (
            <List>
                {this.state.conversations.map((conversation, index) => 
                    <ConversationsListItem 
                        key={index} 
                        conversation={conversation} 
                    />
                )}
            </List>
        );
    }
}

export default ConversationsList;