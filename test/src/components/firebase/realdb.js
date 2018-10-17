import { realdb } from './firebase';



export const doCreateUser = (id, email) =>
  realdb.ref(`users/${id}`).set({
    email,
  });

export const onceGetUsers = () =>
  realdb.ref('users').once('value');
