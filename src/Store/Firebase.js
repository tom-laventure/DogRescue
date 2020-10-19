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


const fileTypes = [
  "image/jpeg",
  "image/png",
];

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.database = app.database()
    this.storageRef = app.storage().ref()
    this.firestore = app.firestore()
    // const messagesRef = this.firestore.collection('Dog Profiles').where("region", "==", "India")
    // messagesRef.get().then((qs) => {
    //   qs.forEach(doc => {
    //     console.log(doc.data())
    //   })
    // })
  }

  createNewUser = (data, id) => {
    this.database.ref('users/' + id).set(data)
  }

  createDogProfile = (profileInfo, file, callback) => {
    const messagesRef = this.firestore.collection('Dog Profiles')

    // const query = messagesRef.orderBy('createdAt').limit(25);
    // const [messages] = useCollectionData(query);
    let type;
    if(file.type ===  "image/jpeg"){
      type = ".jpeg"
    }
    else{ 
      type = '.png'
    }

    this.storageRef.child('DogPhotos/' + profileInfo.handlerId + profileInfo.createdTime + type).put(file).then((data) => {
      console.log(data, "success")
      profileInfo.dogImage = data.metadata.fullPath
      messagesRef.add(profileInfo).then((data) => {
        callback({flag: true, doc: data})
      })
    }).catch((err) => {
      console.log(err, "error")
      callback({flag: false, error: err});
    })

  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (fun) => this.auth.signOut().then(fun);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  authStateChange = (fun) => this.auth.onAuthStateChanged(fun);
}

export default Firebase;