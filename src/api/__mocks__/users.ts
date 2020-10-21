import { IUser } from "../../Users/types";

const users : IUser[] = [
  {firstname: "John", lastname: "Doe", email: "email"},
  {firstname: "Jane", lastname: "Doe", email: "anotherEmail"}
];
export const getUsers = jest.fn().mockReturnValue(Promise.resolve(users));

export default { getUsers }