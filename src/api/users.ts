import { IUser } from './../users/types';
import axios from 'axios';

export function getUsers(): Promise<IUser[]> {
    return axios.get('http://localhost:3000/api/users').then(res => { return res.data });
}

export function login(email: string, password: string): Promise<IUser>{
    return axios.post(
      'http://localhost:3000/api/login/',
      {
        username: email,
        password: password
      }
    ).then(res => res.data)
  }