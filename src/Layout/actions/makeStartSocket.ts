import { IUser } from './../../Users/types';
import io from 'socket.io-client';
import { makeUpdateUser } from '../../Users/actions/makeUpdateUser';

export function makeStartSocket(){
  return (dispatch: any) => {
    const socketServer = io.connect('http://localhost:3000');

    socketServer.on('connect', () => {
      console.log('Je suis bien connecté au back');
    })

    socketServer.on('mon-super-event', (data: any) => {
      console.log(data);
    })

    socketServer.on('user-status-update', ({user}: {user: IUser}) => {
        console.log(user);
        dispatch(makeUpdateUser(user));
      })
  }
}