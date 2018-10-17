import { realdb } from './firebase';



export const doCreateUser = (id, email) =>
  realdb.ref(`users/${id}`).set({
    email,
  });
