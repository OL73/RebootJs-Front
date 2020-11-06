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
      if (acc[convId] === undefined) { // si la conversationId n'existe pas dans const messages 
        acc[convId] = [message] // alors on crée une clé convId et on ajoute le message dans un tableau 
      } else {                  // sinon si la conversationId existe, on l'ajoute au tableau contenant le même conversationID
        acc[convId].push(message)
      }
      return acc; // résultat attendu... { 0001234: [ {_id: "xxx", emitter: "yyy", createdAt: "datetime", conversationId: "0001234", content: "hello ?"}, {_id: "zzz", emitter: "ooo", createdAt: "datetime", conversationId: "0001234", content: "comment ça va ?"}]}, { 000555: [{ ... }]}
    },
    accInit
  );
  // console.log('1ère étape, creation de objet messages avec le même conversationId', batches);
  
  // 2eme etape : Prendre chaque tableau créés précédemment pour créer un nouvel object IConversation (avec les attributs qu'il faut)
  // { 123: [xxx], 12345: [xxx], 1234: [xxx] }

  //// ---------- Fin 1ERE ETAPE ---------

  // ------
  // 2eme étape : Créer les types depuis la liste de messages, restructure
  // { 0001234: [message, message2], 12345: [xxx], 1234: [xxx] } => [ conversation1, conversation2 ]

  const conversations: IConversation[] = [];
  for (const key in batches) {
    const value = batches[key];
    //console.log('key', key); // ===> 0001234 => key
    // console.log('value', value); // ===> [message, message2] => value
    
    const targetsNonDistincts = value.flatMap(message => [message.emitter, ...message.targets]); // on récupère l'ensemble des targets et emitter
    //console.log('targetsNonDistincts', targetsNonDistincts); 
    
    const targets = [...new Set(targetsNonDistincts)];// on prend tous les targetsNonDistincts et on garde les distincts (like SQL) dans un tableau de targets
    //console.log('targets', targets);

    // message : [emitter, target1, target2]
    // message2: [emitter2, target3, target4]
    // [[emitter, target1, target2],[emitter2, target3, target4]] => [emitter, target1, target2, emitter2, target3, target4]
    const updatedAt = messages.sort()[0].createdAt; // TODO completer sort
    conversations.push({
      _id: key, // 0001234
      targets: targets, // ["5f903250f8fe4f6135088c60", "5f90332df8fe4f6135088c61"]
      updatedAt: updatedAt, // on récupère la date de création du premier message "2020-10-21T13:19:00.319Z"
      unseenMessages: 0,
      messages: value // [ {_id: "xxx", emitter: "yyy", createdAt: "datetime", conversationId: "0001234", content: "hello ?"}, {_id: "zzz", emitter: "ooo", createdAt: "datetime", conversationId: "0001234", content: "comment ça va ?"}]
    });
  }
  console.log(conversations);
  

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