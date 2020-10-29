import { IConversationMessage } from './../Chat/types';
import axios from 'axios';
import { IConversation } from "../Chat/types";

export async function getConversations(): Promise<IConversation[]> {
  // TODO
  // axios vers le back pour récuperer les messages
  const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/messages`, { withCredentials: true });
  const messages: IConversationMessage[] = res.data;

  // processus de transformation des messages -> une liste de conversations

  // 1ere étape : Rassembler les messages d'une meme conversation dans un tableau => { convId: [tous les messages de la conv 1], convId2: [tous les messages de la conv 2] }
  // 2eme étape : Créer les types depuis la liste de messages, restructure

  // 1ere etape : Reduce pour creer un objet (equivalent au resultat d'un groupBy) qui groupe les messages par conversationId
  const accInit: { [conversationId: string]: IConversationMessage[] } = {};
  const batches = messages.reduce(
    (acc, message) => {
      // Regarder le conversationId
      // Mettre le message au bon endroit dans l'accumulateur
      const convId = message.conversationId;
      if (acc[convId] === undefined) {
        acc[convId] = [message]
      } else {
        acc[convId].push(message)
      }
      return acc;
    },
    accInit
  );
  // 2eme etape : Prendre chaque tableau créés précédemment pour créer un nouvel object IConversation (avec les attributs qu'il faut)
  // { 123: [xxx], 12345: [xxx], 1234: [xxx] }

  //// ---------- Fin 1ERE ETAPE ---------

  // ------
  // 2eme étape : Créer les types depuis la liste de messages, restructure
  // { 123: [message, message2], 12345: [xxx], 1234: [xxx] } => [ conversation1, conversation2 ]

  const conversations: IConversation[] = [];
  for (const key in batches) {
    const value = batches[key];
    // 123 => key
    // [message, message2] => value
    const targetsNonDistincts = value.flatMap(message => [message.emitter, ...message.targets]);
    const targets = [...new Set(targetsNonDistincts)];
    // message : [emitter, target1, target2]
    // message2: [emitter2, target3, target4]
    // [[emitter, target1, target2],[emitter2, target3, target4]] => [emitter, target1, target2, emitter2, target3, target4]
    const updatedAt = messages.sort()[0].createdAt; // TODO completer sort
    conversations.push({
      _id: key,
      targets: targets,
      updatedAt: updatedAt,
      unseenMessages: 0,
      messages: value
    });
  }

  return conversations;

  /* return Promise.resolve([{
    _id: '1234',
    targets: ['5f8eb08e8bf2813b9e235976', '5f8eb0b28bf2813b9e235977'],
    updatedAt: new Date(),
    unseenMessages: 0,
    messages: [{
      _id: '123',
      conversationId: '1234',
      createdAt: new Date(),
      emitter: '5f8eb08e8bf2813b9e235976',
      targets: ['5f8eb0b28bf2813b9e235977'],
      content: 'Salut ça va ?',
    },
    {
      _id: '124',
      conversationId: '1234',
      createdAt: new Date(),
      emitter: '5f8eb0b28bf2813b9e235977',
      targets: ['5f8eb08e8bf2813b9e235976'],
      content: 'Oui et toi ?',
    }]
  },
  {
    _id: '12345',
    targets: ['5f8eb08e8bf2813b9e235976', '5f8eb0b28bf2813b9e235988'],
    updatedAt: new Date(),
    unseenMessages: 0,
    messages: [{
      _id: '123',
      conversationId: 'abcd',
      createdAt: new Date(),
      emitter: '5f8eb08e8bf2813b9e235976',
      targets: ['5f8eb0b28bf2813b9e235988'],
      content: 'Coucou ?',
    },
    {
      _id: '1234',
      conversationId: 'efgh',
      createdAt: new Date(),
      emitter: '5f8eb0b28bf2813b9e235988',
      targets: ['5f8eb08e8bf2813b9e235976'],
      content: 'yep !',
    }]
  }]) */
}

export async function sendMessage(content: string, conversationId: string, targets: string[]): Promise<IConversationMessage> {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/messages`,
    { content, conversationId, targets },
    { withCredentials: true }
  );
  return res.data;
}