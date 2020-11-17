import axios from "axios"
import { IUser } from "../Users/types";

export function getUsers(): Promise<IUser[]> {
  return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/`).then(res => res.data);
}

export function getConnectedUser(): Promise<IUser>{
  return axios.get(
    `${process.env.REACT_APP_BACKEND}/api/users/me`,
    { withCredentials: true }
  ).then(res => res.data);
}

export function login(email: string, password: string): Promise<IUser>{
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/api/auth/login`,
    {
      username: email,
      password: password
    },
    {
      withCredentials: true
    }
  ).then(res => res.data)
}

export function logout() {

  return axios.get(
    `${process.env.REACT_APP_BACKEND}/api/auth/logout`,
    {
      withCredentials: true
    }
  ).then(res => console.log(res));
}

export function register(email: string, firstname: string, lastname: string, password: string): Promise<IUser>{
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/api/users`,
    { email, firstname, lastname, password },
    {
      withCredentials: true
    }
  ).then(res => res.data)
}

export function patchConversationSeen(conversationId: string){
  return axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/users/conversation-seen`,
    { conversationId },
    {
      withCredentials: true
    }
  ).then(res => res.data);
}

export default {
  getUsers,
  login,
  register,
  getConnectedUser,
  patchConversationSeen
}
