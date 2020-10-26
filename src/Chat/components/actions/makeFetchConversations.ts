import { getConversations } from "../../../api/messages"
import { updateConversationsList } from "./updateConversationsList";

export function makeFetchConversationsList() {

    return async (dispatch: any) => {
        try {
            const conversations = await getConversations();
            dispatch(updateConversationsList(conversations))

        } catch (err) {
            console.log(err);

        }
    }
}