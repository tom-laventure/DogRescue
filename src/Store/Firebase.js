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
    this.functions = app.functions()
  }


  //retrieves a key array, selects the paginated items required and gets those items
  getDogWaitList = (region, callback, paginationStart, paginationEnd) => {
    const dogRef = this.firestore.collection('Dog Profiles')
    const rescueRef = this.firestore.collection('Rescue List').doc(region)
    return this.firestore.runTransaction((transaction) => {
      return transaction.get(rescueRef).then(doc => {
        if (doc.exists) {
          let tempList = [...doc.data().waitList]
          let pagReturn = tempList.slice(paginationStart, paginationEnd)
          let temp = []
          let counter = paginationStart;
          let counterFlag = paginationEnd
          pagReturn.forEach(item => {
            dogRef.doc(item).get().then(doc => {
              counter++;
              temp.push(doc.data())
              if (counterFlag === counter) {
                callback(temp)
              }
            })
          })
        }
      })
    })
  }

  createNewUser = (data, id) => {
    this.database.ref('users/' + id).set(data)
  }

  createDogProfile = (profileInfo, file, callback) => {
    const messagesRef = this.firestore.collection('Dog Profiles')
    const dogRegionCount = this.firestore.collection('Rescue List').doc(profileInfo.region)
    let tempProfileId = profileInfo.createdTime + profileInfo.handlerId
    return this.firestore.runTransaction(transaction => {
      return transaction.get(dogRegionCount).then((doc) => {
        if (doc.exists) {
          let newWaitlist = doc.data().waitList.concat([tempProfileId])
          dogRegionCount.update('waitList', newWaitlist)
        }
        else {
          dogRegionCount.set({ waitList: [tempProfileId] })
        }
        let type = '.png';
        if (file.type === "image/jpeg") {
          type = ".jpeg"
        }

        this.storageRef.child('DogPhotos/' + profileInfo.handlerId + profileInfo.createdTime + type).put(file).then((data) => {
          profileInfo.dogImage = data.metadata.fullPath
          messagesRef.doc(tempProfileId).set(profileInfo).then((data) => {
            callback({ flag: true, doc: data, tempID: tempProfileId })
          })
        }).catch((err) => {
          callback({ flag: false, error: err });
        })
      })
    })
  }



  sendEmail = (data) => {
    let sendEmail = this.functions.httpsCallable('sendEmail')
    sendEmail(data)
  }

  getProfileInfo = (id, callback) => {
    const profileRef = this.firestore.collection('Dog Profiles').doc(id)
    profileRef.get().then(doc => {
      console.log(doc.data())
      callback(doc.data())
    })
  }

  getProfileImage = (ref, callback) => {
    this.storageRef.child(ref).getDownloadURL().then((url) => {
      callback({ URL: url })
    })
  }


  confirmDogProfile = (profileInfo, oldRef, callback) => {
    const dogProfileRef = this.firestore.collection('Dog Profiles')
    dogProfileRef.doc(oldRef).update(profileInfo).then(() => {
      console.log("much simpler")
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