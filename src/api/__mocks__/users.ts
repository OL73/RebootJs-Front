import { IUser } from "../../Users/types";

const users : IUser[] = [
  {_id: "1", firstname: "John", lastname: "Doe", email: "email", conversationsSeen: {}},
  {_id: "2", firstname: "Jane", lastname: "Doe", email: "anotherEmail", conversationsSeen: {}}
];
export const getUsers = jest.fn().mockReturnValue(Promise.resolve(users));

export default { getUsers }