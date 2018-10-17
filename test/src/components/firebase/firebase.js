import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDC77gQ7Tb9Vkocst0Q_4OSeC7OTow0zUw",
    authDomain: "eztraveling-feee0.firebaseapp.com",
    databaseURL: "https://eztraveling-feee0.firebaseio.com",
    projectId: "eztraveling-feee0",
    storageBucket: "eztraveling-feee0.appspot.com",
    messagingSenderId: "105121234859"
  };
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const realdb= firebase.database();
export {
  auth,
  realdb
};
