import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC13ykS-d_KjcI9NyGAy0yw1EZN2Y2A02I',
  authDomain: 'fir-e42e6.firebaseapp.com',
  databaseURL: 'https://fir-e42e6.firebaseio.com',
  projectId: 'fir-e42e6',
  storageBucket: 'fir-e42e6.appspot.com',
  messagingSenderId: '272134861989',
  appId: '1:272134861989:web:26bdf171b2c6d6de13494c',
};

let fb;
if (!firebase.apps.length) {
  fb = firebase.initializeApp(firebaseConfig);
}

export const database = fb.database();
