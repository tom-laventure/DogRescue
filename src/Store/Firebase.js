import app from 'firebase/app';
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.database = app.database()
  }
  
  createNewUser = (data, id) => {
    this.database.ref('users/' + id).set(data)
  }

  // createPoll = (data, res) => {
  //   this.database.ref('polls').push(data).then((i) => {
  //     this.database.ref('users/' + data.members[0].id).transaction(r => {
  //       if(r){
  //         if(!r.groups){
  //           r.groups = [{id: i.key, name: data.name}]
  //         }
  //         else{
  //           r.groups.push({id: i.key, name: data.name})
  //         }
  //       }
  //       return r
  //     })
  //     res(i)
  //   })
  // }

  // joinPoll = (data, id) => {
  //   this.database.ref('polls/' + id).transaction((poll) => {
  //     if (poll) {
  //       if(!poll.hasOwnProperty("members")){
  //         poll.members = []
  //       }
  //       poll.members.push(data)
  //     }
  //     return poll
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // leavePoll = (data, id) => {
  //   this.database.ref('polls/' + id).transaction((poll) => {
  //     if (poll) {
  //       poll.members = poll.members.filter((i) => i.id !== data.id)
  //     }
  //     return poll
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }





  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (fun) => this.auth.signOut().then(fun);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  authStateChange = (fun) => this.auth.onAuthStateChanged(fun);
}

export default Firebase;