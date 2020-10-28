import axios from "axios"
import { IUser } from "../Users/types";

export function getUsers(): Promise<IUser[]> {
  return axios.get('http://localhost:3000/api/users/').then(res => res.data);
}

export function getConnectedUser(): Promise<IUser>{
  return axios.get(
    'http://localhost:3000/api/users/me',
    { withCredentials: true }
  ).then(res => res.data);
}

export function login(email: string, password: string): Promise<IUser>{
  return axios.post(
    'http://localhost:3000/api/login/',
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
    'http://localhost:3000/api/login/logout',
    {
      withCredentials: true
    }
  ).then(res => console.log(res));
}

export function register(email: string, firstname: string, lastname: string, password: string): Promise<IUser>{
  return axios.post(
    'http://localhost:3000/api/users/',
    { email, firstname, lastname, password },
    {
      withCredentials: true
    }
  ).then(res => res.data)
}

export function patchConversationSeen(conversationId: string){
  return axios.patch(
    'http://localhost:3000/api/users/conversation-seen',
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
